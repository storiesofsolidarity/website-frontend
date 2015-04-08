/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Story = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/story.ejs'],
        el: '#content',
        events: {},

        initialize: function () {
            var self = this;
            this.listenTo(this.model, 'add', this.render);

            this.model.fetch({
                success: $.proxy(self.render, self)
            });
        },

        render: function () {
            if(this.model && this.model.attributes) {
                this.$el.html(this.template(this.model.toJSON()));
            }
        }

    });

})();
