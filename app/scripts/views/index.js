/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Index = Solidarity.Views.BaseView.extend({

        template: JST['app/templates/index.html'],
        el: '#content',
        events: {},

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
