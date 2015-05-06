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
            'share': 'storyPost',
        },

        cached: {},

        storyMap: function() {
            this.cached.storyMap = this.cached.storyMap || new Solidarity.Views.StoryMap();
            this.cached.storyMap.render();
            this.cached.storyMap.getData();
        },
        storyList: function() {
            this.mainContent.show(new Solidarity.Views.StoryList());
        },
        storyListLocation: function(state, city) {
            this.mainContent.show(new Solidarity.Views.StoryListLocation({state: state, city: city}));
        },
        storyView: function(id) {
            this.mainContent.show(new Solidarity.Views.Story({
                model: new Solidarity.Models.Story({id: id}),
            }));
        },
        storyPost: function() {
            this.mainContent.show(new Solidarity.Views.StoryPost());
        },
    });

})();
