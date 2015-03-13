/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryMap = Backbone.View.extend({

        template: JST['app/scripts/templates/storyMap.ejs'],
        events: {},

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            // this.$el.html(this.template(this.model.toJSON()));
            this.$el.html(this.template());
            return this;
        }

    });

})();
