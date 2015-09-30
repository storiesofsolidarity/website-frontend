/*global Solidarity, Backbone, JST, d3, queue, topojson, jenks */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryMap = Solidarity.Views.BaseView.extend({

        template: JST['app/templates/storyMap.html'],
        el: '#content',
        events: {},
        dataCache: {
            us: undefined,
            counties: {},
            zips: {}
        },

        initialize: function () {
            this.states = new Solidarity.Collections.States({});
            this.counties = new Solidarity.Collections.Counties({});
            this.locations = new Solidarity.Collections.Locations({});
            this.colorUnselected = '#CCCCCC';
            this.colorList = ['#E4E4E4','#F3EB99','#FAC85F','#F9A946','#EC913D'];
        },
        
        onShow: function() {
            var self = this;
            this.drawMap();
            this.states.fetch({
                success: function() {
                    // do first render
                    self.renderStates();
                }
            });
        },

        drawMap: function () {
            var width = 960,
                height = 500,
                activeState = d3.select(null),
                activeCounty = d3.select(null);

            this.projection = d3.geo.albersUsaPr() // US including puerto rico
                .scale(1000)
                .translate([width / 2, height / 2]);

            var zoom = d3.behavior.zoom()
                .translate([0, 0])
                .scale(1)
                .scaleExtent([1, 8])
                .on('zoom', zoomed);

            var path = d3.geo.path()
                .projection(this.projection);

            this.svg = d3.select('#map').append('svg')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', '0 0 '+width+' '+height)
                .classed('svg-content-responsive', true)
                .on('click', stopped, true);

            this.svg.append('rect')
                .attr('class', 'background')
                .attr('width', width)
                .attr('height', height)
                .on('click', resetZoom);

            this.map = this.svg.append('g');
            var self = this;

            this.svg
                .call(zoom) // allow free zooming, but only when scale > 1
                .call(zoom.event);

            if (this.us_states === undefined) {
                d3.json(Solidarity.dataRoot + 'geography/states.topo.json', function(error, us) {
                    Solidarity.log('requesting states.json');
                    self.dataCache.us = us; //cache for view reload
                    drawStates(error, self.dataCache.us);
                });
            } else {
                Solidarity.log('using cached states.topo.json');
                drawStates(null, this.dataCache.us);
            }

            function drawStates(error, data) {
                if (error) { Solidarity.error(error, 'error in drawStates'); return false; }

                var us = self.map.append('g')
                  .attr('class', 'country')
                  .attr('id', 'US');

                //merge all states for background
                us.append('path')
                  .datum(topojson.merge(data, data.objects.states.geometries))
                  .attr('class', 'background')
                  .attr('d', path);

                // add individual states as paths
                us.selectAll('path')
                  .attr('class', 'states')
                  .data(topojson.feature(data, data.objects.states).features)
                .enter().append('path')
                  .attr('d', path)
                  .attr('class', 'feature')
                  .on('click', clickState);

                // mesh borders
                us.append('path')
                  .datum(topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; }))
                  .attr('class', 'mesh')
                  .attr('d', path);
            }

            function zoomToBounds(d, scaleFactor) {
                if (scaleFactor === undefined) {
                    scaleFactor = 0.9;
                }

                var bounds = path.bounds(d),
                  dx = bounds[1][0] - bounds[0][0],
                  dy = bounds[1][1] - bounds[0][1],
                  x = (bounds[0][0] + bounds[1][0]) / 2,
                  y = (bounds[0][1] + bounds[1][1]) / 2,
                  scale = scaleFactor / Math.max(dx / width, dy / height),
                  translate = [width / 2 - scale * x, height / 2 - scale * y];

                self.svg.transition()
                  .duration(750)
                  .call(zoom.translate(translate).scale(scale).event);
            }

            function clickState(d) {
                Solidarity.log('clickState', d.properties.name);

                // zoom back out if double clicked
                if (activeState.node() === this) { return resetZoom(); }

                activeState.style('fill', this.colorUnselected);
                activeState.classed('active', false);
                activeState = d3.select(this).classed('active', true);

                // clear existing state counties
                d3.selectAll('g.state').remove();

                var scaleFactor = 0.9;
                // northeastern states needs to be zoomed out a little
                if (d.id === '25') { scaleFactor = 0.75; } //MA
                if (d.id === '36') { scaleFactor = 0.6; } //NY
                if (d.id === '09') { scaleFactor = 0.5; } //CT
                if (d.id === '44') { scaleFactor = 0.3; } //RI
                if (d.id === '11') { scaleFactor = 0.2; } //DC

                zoomToBounds(d, scaleFactor);

                // load state-specific topojson, with county boundaries
                var fn = d.properties.name.replace(' ','_');
                queue()
                    .defer(d3.json, Solidarity.dataRoot + 'geography/counties/'+fn+'.topo.json')
                    .await(drawCounties);

                queue()
                    .defer(d3.json, Solidarity.dataRoot + 'geography/zcta/'+fn+'.topo.json')
                    .await(loadZips);
            }

            function drawCounties(error, data) {
                Solidarity.log('drawCounties', data);
                if (error) { Solidarity.error(error, 'error in drawCounties'); return false; }

                for(var geomKey in data.objects) { break; }
                var stateName = geomKey.split('.')[0];

                var state = self.map.append('g')
                  .attr('class', 'state')
                  .attr('id', stateName);

                var counties = state.selectAll('path')
                  .attr('class','counties')
                  .style('fill', self.colorUnselected)
                  .data(topojson.feature(data, data.objects[geomKey]).features)
                .enter().append('path')
                  .attr('d', path)
                  .attr('class', 'feature county')
                  .on('click', clickCounty);

                // merge county boundaries for mesh
                state.append('path')
                  .datum(topojson.mesh(data, data.objects[geomKey]))
                  .attr('class', 'mesh')
                  .style('border', 'white')
                  .attr('d', path);

                self.renderCounties(stateName);
            }

            function loadZips(error, data) {
                Solidarity.log('loadZips', data);
                if (error) { Solidarity.error(error, 'error in loadZips'); return false; }

                for(var geomKey in data.objects) { break; }
                Solidarity.log('loaded',geomKey);
                self.dataCache.zips[geomKey] = data;
                // save to dataCache
            }

            function drawZips(d) {
                // draw zips for selected state
                // assumes topojson is present in dataCache

                var state = d3.selectAll('.state');
                var geomKey = state[0][0].id + '.geo'; // ugly hack to get id from svg element
                console.log(geomKey);
                console.log(self.dataCache);
                var data = self.dataCache.zips[geomKey];
                console.log('drawZips', data);
                console.log('state', state);

                var counties = state.selectAll('path')
                  .attr('class','zipcodes')
                  .style('fill', self.colorUnselected)
                  .data(topojson.feature(data, data.objects[geomKey]).features)
                .enter().append('path')
                  .attr('d', path)
                  .attr('class', 'feature terminal')
                  .on('click', clickZip);

                state.append('path')
                  .datum(topojson.mesh(data, data.objects[geomKey])) // don't provide mesh function here
                  .attr('class', 'mesh')
                  .attr('d', path);
            }

            function clickCounty(d) {
                Solidarity.log('clickCounty', d.properties.name);
                d3.selectAll(d).style('fill', 'transparent');
                zoomToBounds(d);
                drawZips(d);
            }

            function clickZip(d) {
                Solidarity.log('clickZip', d.id);
                // make us country background transparent
                d3.selectAll('g.country path.states').style('fill', 'transparent');
            }

            function resetZoom() {
                activeState.style('fill', this.colorUnselected);
                activeState.classed('active', false);
                activeState = d3.select(null);

                activeCounty.classed('active', false);
                activeCounty = d3.select(null);

                d3.selectAll('g.state').remove();

                self.svg.transition()
                  .duration(750)
                  .call(zoom.translate([0, 0]).scale(1).event);

                self.renderStates();
            }

            function zoomed() {
                if (d3.event.scale > 1) {
                    self.map.style('stroke-width', 1.5 / d3.event.scale + 'px');
                    self.map.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
                }
            }

            function stopped() {
                if (d3.event.defaultPrevented) { d3.event.stopPropagation(); }
            }
        },

        colorScale: function(list, key) {
            // compute colors using jenks natural breaks
            var data = _.pluck(list, key).sort();
            var breaks = jenks(data, 5);
            breaks[4] = breaks[4] + 1;
            var colorScale = d3.scale.quantile()
                .domain(breaks.slice(1))
                .range(this.colorList);
            return colorScale;
        },

        renderStates: function() {
            // extract model attributes from the backbone collection
            var state_stories = this.states.models.map(function(s) { return s.attributes; });
            var state_geoms = this.map.selectAll('g.country path.states').data();
            // join manually, might zip be faster?
            var states_joined = _.map(state_geoms, function(state, index) {
                if (state.properties) {
                    var s = _.findWhere(state_stories, {name: state.properties.name});
                    if (s) { state.properties.story_count = s.story_count; }
                }
                return state;
            });
            
            var colorFunction = this.colorScale(state_stories, 'story_count');

            var tip = d3.tip().html(function(d) {
                if (d.properties && d.properties.story_count) {
                    var tmpl = '<%= story_count %> stor<%= story_count > 1 ? "ies" : "y"%>'+
                               ' in <%= name %>';
                    return _.template(tmpl)(d.properties);
                }
            });
            this.map.call(tip);

            this.map.selectAll('g.country path.states')
              .data(states_joined)
              .style('fill', function(d) {
                    if (d.properties === undefined) { return this.colorUnselected; }
                    return colorFunction(d.properties.story_count || 0);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
        },

        renderCounties: function(stateName) {
            Solidarity.log('renderCounties: '+stateName);

            // unset all state background colors
            d3.selectAll('g.country path.states')
                .style('fill', this.colorUnselected);
            // make active state transparent, so higher resolution geometry appears
            d3.select('g.country path.active')
                .style('fill', 'transparent');

            // extract model attributes from the backbone collection
            var county_stories = this.counties.models.map(function(s) { return s.attributes; });
            var county_geoms = d3.selectAll('g.state path').data();
            // join manually, might zip be faster?
            var counties_joined = _.map(county_geoms, function(county, index) {
                if (county.properties) {
                    var s = _.findWhere(county_stories, {name: county.properties.name});
                    if (s) { county.properties.story_count = s.story_count; }
                }
                return county;
            });

            var colorFunction = this.colorScale(county_stories, 'story_count');
            this.map.selectAll('g.state path')
              .data(counties_joined)
              .style('fill', function(d) {
                    if (d.properties === undefined) { return this.colorUnselected; }
                    return colorFunction(d.properties.story_count || 0);
            });
        },

        renderStories: function() {
            var projection = this.projection;

            var opacity = d3.scale.log();
            opacity.domain([1, 100]).range([0.5, 0]);

            var tip = d3.tip().html(function(d) {
                var tmpl = '<%= story_count %> stor<%= story_count > 1 ? "ies" : "y"%>'+
                           ' in <%= city %>, <%= state %>';
                return _.template(tmpl)(d.attributes);
            });
            this.map.call(tip);

            this.map.append('g')
                .attr('class', 'bubble')
              .selectAll('circle')
                .data(this.locations.models)
              .enter()
                .append('circle')
                  .attr('r', function(d) { return 5; })
                  .attr('transform', function(d) {
                    var coords = projection([d.attributes.lon, d.attributes.lat]);
                    return 'translate(' + coords + ')';
                })
                .style('opacity', function(d) {
                    return opacity(d.attributes.story_count);
                })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .on('click', function(d) {
                    tip.hide();
                    Backbone.history.navigate('/list/'+d.attributes.state.toLowerCase()+'/'+d.attributes.city.toLowerCase(),
                        {trigger: true});
                });
        }

    });

})();
