/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.AuthLogin = Backbone.View.extend({

        template: JST['app/scripts/templates/authLogin.ejs'],

        tagName: 'div',

        id: '#login',

        className: '',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
