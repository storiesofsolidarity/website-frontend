/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Story = Backbone.View.extend({

        template: JST['app/scripts/templates/story.ejs'],
        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            this.model.fetch ({
                success: function () {
                    console.log('fetch story', this.model);
                }
            });
            
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
