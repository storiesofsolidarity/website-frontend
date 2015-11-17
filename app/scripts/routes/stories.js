/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Stories = Solidarity.Routers.Base.extend({
        routes: {
            'map': 'storyMap',
            'read': 'storyList',
            'read/story/:id': 'storyView',
            'view/:state_name': 'storyListLocation',
            'view/:state_name/:location': 'storyListLocation',
        },

        cached: {
            storyListLocation: {}
        },

        storyMap: function() {
            if (this.cached.storyMap === undefined) { this.cached.storyMap = new Solidarity.Views.StoryMap(); }
            Solidarity.mainContent.show(this.cached.storyMap, '#map');
        },
        storyList: function() {
            if (this.cached.storyList === undefined) { this.cached.storyList = new Solidarity.Views.StoryList(); }
            Solidarity.mainContent.show(this.cached.storyList, '#read');
        },
        storyListLocation: function(state_name, location) {
            // cache view with key state_name:county:zip
            var key = state_name + ':' + (location || '');

            if (this.cached.storyListLocation[key] === undefined) {
                this.cached.storyListLocation[key] = new Solidarity.Views.StoryListLocation(
                    {state_name: state_name, location: location});
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
