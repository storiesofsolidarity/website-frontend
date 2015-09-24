/*global Solidarity, Backbone, JST, d3, topojson, jenks */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryMap = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/storyMap.ejs'],
        el: '#content',
        events: {},

        initialize: function () {
            this.states = new Solidarity.Collections.States({});
            this.counties = new Solidarity.Collections.Counties({});
            this.locations = new Solidarity.Collections.Locations({});

            this.colorList = ['#E4E4E4','#F3EB99','#FAC85F','#F9A946','#EC913D'];
        },
        
        onShow: function() {
            var self = this;
            this.drawMap();
            this.states.fetch({
                success: function() {
                    // do first render
                    self.renderStates();

                    // bind for further additions, changes
                    // self.listenTo(self.locations, 'add change', self.renderStories);
                }
            });
        },

        drawMap: function () {
            var width = 960,
                height = 500,
                active = d3.select(null);

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
                .on('click', reset);

            this.map = this.svg.append('g');
            var self = this;

            this.svg
                //.call(zoom) // delete this line to disable free zooming
                .call(zoom.event);

            if (this.us_json === undefined) {
                d3.json(Solidarity.siteRoot + 'scripts/map/us.json', function(error, us) {
                    //console.log('requesting scripts/map/us.json');
                    self.us_json = us; //cache for view reload
                    drawStates(error, self.us_json);
                });
            } else {
                //console.log('using cached scripts/map/us.json');
                drawStates(null, this.us_json);
            }

            function drawStates(error, us) {
                self.map.selectAll('path')
                  .data(topojson.feature(us, us.objects.states).features)
                .enter().append('path')
                  .attr('d', path)
                  .attr('class', 'feature')
                  .on('click', clicked);

                self.map.append('path')
                  .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                  .attr('class', 'mesh')
                  .attr('d', path);
            }

            function clicked(d) {
                if (active.node() === this) { return reset(); }
                active.classed('active', false);
                active = d3.select(this).classed('active', true);

                var scaleFactor = 0.9;
                // northeastern states needs to be zoomed out a little
                if (d.id === '25') { scaleFactor = 0.75; } //MA
                if (d.id === '36') { scaleFactor = 0.6; } //NY
                if (d.id === '09') { scaleFactor = 0.5; } //CT
                if (d.id === '44') { scaleFactor = 0.3; } //RI
                if (d.id === '11') { scaleFactor = 0.2; } //DC

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

            function reset() {
                active.classed('active', false);
                active = d3.select(null);

                self.svg.transition()
                  .duration(750)
                  .call(zoom.translate([0, 0]).scale(1).event);
            }

            function zoomed() {
                self.map.style('stroke-width', 1.5 / d3.event.scale + 'px');
                self.map.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
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
            var state_geoms = this.map.selectAll('path').data();
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

            this.map.selectAll('path')
              .data(states_joined)
              .style('fill', function(d) {
                    if (d.properties === undefined) { return 'none'; }
                    return colorFunction(d.properties.story_count || 0);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
        },

        // old stories as dots functionality
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
