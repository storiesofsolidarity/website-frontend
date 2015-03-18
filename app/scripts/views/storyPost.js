/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryPost = Backbone.View.extend({

        template: JST['app/scripts/templates/storyPost.ejs'],
        el: '#content',

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template({'apiRoot': Solidarity.apiRoot}));
            return this;
        }

    });

})();
