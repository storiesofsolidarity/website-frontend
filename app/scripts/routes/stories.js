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

        storyMap: function() {
            new Solidarity.Views.StoryMap();
        },
        storyList: function() {
            new Solidarity.Views.StoryList();
        },
        storyListLocation: function(state, city) {
            console.log('route city',city);
            console.log('route state', state);
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
