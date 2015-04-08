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
            'map': undefined,
        },

        storyMap: function() {
            this.cached.map = this.cached.map || new Solidarity.Views.StoryMap();
            this.cached.map.getData();
            this.cached.map.render();
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
