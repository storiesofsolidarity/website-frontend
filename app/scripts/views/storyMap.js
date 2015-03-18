/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryMap = Backbone.View.extend({

        template: JST['app/scripts/templates/storyMap.ejs'],
        collection: Solidarity.Collections.Stories,

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.collection.fetch();
        },

        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
        }

    });

})();
