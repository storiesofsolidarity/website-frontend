/*global Solidarity, Backbone, JST, d3, topojson */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryMap = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/storyMap.ejs'],
        el: '#content',
        events: {},

        initialize: function () {
            this.collection = new Solidarity.Collections.Locations({});
        },

        getData: function() {
            var self = this;
            this.collection.fetch({
                success: function() {
                    // do first render
                    self.renderStories();

                    // bind for further additions, changes
                    self.listenTo(self.collection, 'add change', self.renderStories);
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
                .attr('width', width)
                .attr('height', height)
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

        render: function () {
            this.$el.html(this.template());
            this.drawMap();
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
                .data(this.collection.models)
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
                    Backbone.history.navigate('/list/'+d.attributes.state.toLowerCase()+'/'+d.attributes.city.toLowerCase(),
                        {trigger: true});
                });
        }

    });

})();
