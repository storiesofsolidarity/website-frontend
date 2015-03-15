/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryList = Backbone.View.extend({

        template: JST['app/scripts/templates/storyList.ejs'],
        el: '#content',

        events: {'click a.more': 'more'},

        initialize: function () {
            var self = this;
            this.collection = new Solidarity.Collections.Stories();
            this.listenTo(this.collection, 'reset change add', this.render);

            this.collection.fetch({
                success: $.proxy(self.render, self)
            });
        },

        render: function () {
            this.$el.html(this.template(this.collection));
        },

        more: function(e) {
            e.preventDefault();
            console.log('more', this.collection._next);
            this.collection.fetch({
                add: true,
                url: this.collection._next
            });
        }

    });

})();
