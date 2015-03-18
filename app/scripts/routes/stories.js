/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Stories = Backbone.Router.extend({
        routes: {
            'map': 'storyMap',
            'read': 'storyList',
            'read/story/:id': 'storyView',
            'share': 'storyPost',
        },

        storyMap: function() {
            new Solidarity.Views.StoryMap({el: '#content'});
        },
        storyList: function() {
            new Solidarity.Views.StoryList({el: '#content'});
        },
        storyView: function(id) {
            new Solidarity.Views.Story({
                model: new Solidarity.Models.Story({id: id}),
            });
        },
        storyPost: function() {
            new Solidarity.Views.StoryPost({el: '#content'});
        },
    });

})();
