/*global Solidarity, Backbone, d3 */

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Stories = Solidarity.Routers.Base.extend({
        routes: {
            'map': 'storyMap',
            'map/:z/:y/:x': 'storyMap',
            'read': 'storyList',
            'read/story/:id': 'storyView',
            'view/:state_name': 'storyListState',
            'view/:state_name/:county': 'storyListCounty',
            'view/:state_name/:city/:zipcode': 'storyListZipcode',
        },

        cached: {
            storyListLocation: {}
        },

        storyMap: function(z, y, x) {
            var storyMap = this.cached.storyMap;
            if (storyMap === undefined) { storyMap = new Solidarity.Views.StoryMap(); }
            Solidarity.mainContent.show(storyMap, '#map');

            if (z && y && x) {
                storyMap.map.transition()
                  .call(storyMap.zoom.translate([x,y]).scale(z).event);
            }
            this.cached.storyMap = storyMap;
        },
        storyList: function() {
            if (this.cached.storyList === undefined) { this.cached.storyList = new Solidarity.Views.StoryList(); }
            Solidarity.mainContent.show(this.cached.storyList, '#read');
        },
        storyListState: function(state_name) {
            var key = state_name;
            if (this.cached.storyListLocation[key] === undefined) {
                this.cached.storyListLocation[key] = new Solidarity.Views.StoryListLocation(
                    {state_name: state_name});
            }
            Solidarity.mainContent.show(this.cached.storyListLocation[key], '#read');
        },
        storyListCounty: function(state_name, county) {
             var key = state_name+':'+county;
            if (this.cached.storyListLocation[key] === undefined) {
                this.cached.storyListLocation[key] = new Solidarity.Views.StoryListLocation(
                    {state_name: state_name, county: county});
            }
            Solidarity.mainContent.show(this.cached.storyListLocation[key], '#read');
        },
        storyListZipcode: function(state_name, city, zipcode) {
         var key = state_name+':'+zipcode;
            if (this.cached.storyListLocation[key] === undefined) {
                this.cached.storyListLocation[key] = new Solidarity.Views.StoryListLocation(
                    {state_name: state_name, city: city, zipcode: zipcode});
            }
            Solidarity.mainContent.show(this.cached.storyListLocation[key], '#read');
        },
        storyView: function(id) {
            Solidarity.mainContent.show(
                new Solidarity.Views.Story({
                    model: new Solidarity.Models.Story({id: id}),
                }), '#read');
        },
    });

})();
