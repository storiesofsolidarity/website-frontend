/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Stories = Solidarity.Routers.Base.extend({
        routes: {
            'map': 'storyMap',
            'read': 'storyList',
            'read/story/:id': 'storyView',
            'list/:state/:city': 'storyListLocation',
        },

        cached: {},

        storyMap: function() {
            if (this.cached.storyMap === undefined) { this.cached.storyMap = new Solidarity.Views.StoryMap(); }
            Solidarity.mainContent.show(this.cached.storyMap, '#map');
        },
        storyList: function() {
            if (this.cached.storyList === undefined) { this.cached.storyList = new Solidarity.Views.StoryList(); }
            Solidarity.mainContent.show(this.cached.storyList, '#read');
        },
        storyListLocation: function(state, city) {
            Solidarity.mainContent.show(
                new Solidarity.Views.StoryListLocation(
                    {state: state, city: city}
                ), '#read');
        },
        storyView: function(id) {
            Solidarity.mainContent.show(
                new Solidarity.Views.Story({
                    model: new Solidarity.Models.Story({id: id}),
                }), '#read');
        },
    });

})();
