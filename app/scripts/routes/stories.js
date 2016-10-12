/*global Solidarity, Backbone, d3 */

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Stories = Solidarity.Routers.Base.extend({
        routes: {
            'map': 'storyMap',
            'map/:state_name': 'storyMap',
            'map/:state_name/:county_name': 'storyMap',
            'read': 'storyList',
            'read/story/:id': 'storyView',
            'view/:state_name': 'storyListState',
            'view/:state_name/:county_name': 'storyListCounty',
            'view/:state_name/:city/:zipcode': 'storyListZipcode',
        },

        cached: {
            storyListLocation: {}
        },

        storyMap: function(state_name, county_name) {
            var storyMap = this.cached.storyMap;
            if (storyMap === undefined) { storyMap = new Solidarity.Views.StoryMap(); }
            Solidarity.mainContent.show(storyMap, '#/map');

            // load geometry callbacks
            if (state_name) {
                Backbone.listenToOnce(storyMap, 'render-states', function() {
                    var state = d3.selectAll('g.country .feature.state').filter(function(d) {
                        return d.properties.name === state_name;
                    });
                    if(state && state[0].length) { storyMap.clickState(state.data()[0]); }
                });
            }
            if (county_name) {
                Backbone.listenToOnce(storyMap, 'render-counties', function() {
                    var county = d3.selectAll('g.state .feature.county').filter(function(d) {
                        return d.properties.name === county_name;
                    });
                    if(county && county[0].length) { storyMap.clickCounty(county.data()[0]); }
                });
            }

            // set map zoom, lat, lon
            var scale = window.urlParam('zoom');
            var lat = window.urlParam('lat');
            var lon = window.urlParam('lon');

            if (scale && lat && lon) {
                storyMap.zoom.scale(scale);
                var tx = storyMap.coordsToMapPoint([lon, lat]);  // note flipped order here
                if (tx) {
                    storyMap.map.transition()
                      .call(storyMap.zoom.translate(tx).scale(scale).event);
                } else {
                    // requested coords are outside projection area
                    Solidarity.log('invalid initial coordinates', [lat, lon].join(','));
                    // recenter to default
                    storyMap.map.transition()
                      .call(storyMap.zoom.translate([0, 0]).scale(1).event);
                    Solidarity.log('reset translate and scale');
                }
            }

            // cache view
            this.cached.storyMap = storyMap;
        },
        storyList: function() {
            if (this.cached.storyList === undefined) {
                this.cached.storyList = new Solidarity.Views.StoryList();
            }
            Solidarity.mainContent.show(this.cached.storyList, '#/read');
        },
        storyListState: function(state_name) {
            var key = state_name;
            if (this.cached.storyListLocation[key] === undefined) {
                this.cached.storyListLocation[key] = new Solidarity.Views.StoryListLocation(
                    {state_name: state_name});
            }
            Solidarity.mainContent.show(this.cached.storyListLocation[key], '#/read');
        },
        storyListCounty: function(state_name, county_name) {
            var key = state_name+':'+county_name;
            if (this.cached.storyListLocation[key] === undefined) {
                this.cached.storyListLocation[key] = new Solidarity.Views.StoryListLocation(
                    {state_name: state_name, county: county_name});
            }
            Solidarity.mainContent.show(this.cached.storyListLocation[key], '#/read');
        },
        storyListZipcode: function(state_name, city, zipcode) {
         var key = state_name+':'+zipcode;
            if (this.cached.storyListLocation[key] === undefined) {
                this.cached.storyListLocation[key] = new Solidarity.Views.StoryListLocation(
                    {state_name: state_name, city: city, zipcode: zipcode});
            }
            Solidarity.mainContent.show(this.cached.storyListLocation[key], '#/read');
        },
        storyView: function(id) {
            Solidarity.mainContent.show(
                new Solidarity.Views.Story({
                    model: new Solidarity.Models.Story({id: id}),
                }), '#/read');
        },
    });

})();
