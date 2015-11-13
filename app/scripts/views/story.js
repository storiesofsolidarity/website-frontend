/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Story = Solidarity.Views.BaseView.extend({

        template: JST['app/templates/story.html'],
        el: '#content',
        events: {},

        initialize: function () {
            this.listenTo(this.model, 'add', this.render);

            this.model.fetch({
                success: $.proxy(this.render, this)
            });
        },

        render: function () {
            if(this.model && this.model.attributes) {
                this.$el.html(this.template(this.model.toJSON()));
            }
            return this;
        }

    });

})();
