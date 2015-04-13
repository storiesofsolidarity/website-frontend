/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Index = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/index.ejs'],
        el: '#content',
        events: {},

        initialize: function () {
            // render first, so sub-views have their elements
            this.render();

            this.splashView = new Solidarity.Views.Splash({el: '#splash'});
            this.introView = new Solidarity.Views.Intro({el: '#intro'});
            // search, filter, login
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
