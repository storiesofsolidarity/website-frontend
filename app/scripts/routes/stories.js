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
            Solidarity.mainContent.show(new Solidarity.Views.StoryMap());
        },
        storyList: function() {
            Solidarity.mainContent.show(new Solidarity.Views.StoryList());
        },
        storyListLocation: function(state, city) {
            Solidarity.mainContent.show(new Solidarity.Views.StoryListLocation({state: state, city: city}));
        },
        storyView: function(id) {
            Solidarity.mainContent.show(new Solidarity.Views.Story({
                model: new Solidarity.Models.Story({id: id}),
            }));
        },
        storyPost: function() {
            Solidarity.mainContent.show(new Solidarity.Views.StoryPost());
        },
    });

})();
