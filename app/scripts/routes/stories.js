/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Stories = Backbone.Router.extend({
        routes: {
            'map': 'storyMap',
            'read': 'storyList',
            'read/story/:id': 'storyView',
            'list/:state/:city': 'storyListLocation',
            'share': 'storyPost',
        },

        cached: {
            'storyMap': undefined
        },

        storyMap: function() {
            this.cached.storyMap = this.cached.storyMap || new Solidarity.Views.StoryMap();
            this.cached.storyMap.render();
            this.cached.storyMap.getData();
        },
        storyList: function() {
            new Solidarity.Views.StoryList();
        },
        storyListLocation: function(state, city) {
            new Solidarity.Views.StoryListLocation({state: state, city: city});
        },
        storyView: function(id) {
            new Solidarity.Views.Story({
                model: new Solidarity.Models.Story({id: id}),
            });
        },
        storyPost: function() {
            new Solidarity.Views.StoryPost();
        },
    });

})();
