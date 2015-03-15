/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Intro = Backbone.View.extend({

        template: JST['app/scripts/templates/intro.ejs'],
        events: {},

        initialize: function () {
            this.render();
            
            // show intro modal only on first load
            if($.cookie('hideModal') === 'true') {
                $('#introModal').modal('hide');
            } else {
                $('#introModal').modal('show');
            }

            $('#introModal').on('hidden.bs.modal', function () {
                $.cookie('hideModal', 'true');
            });
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
