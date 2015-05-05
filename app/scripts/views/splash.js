/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Splash = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/splash.ejs'],
        el: '#splash',
        events: {'click button.enter': 'enter'},
        languages: ['en', 'es', 'tl', 'zh'], // defined in display order

        initialize: function () {
            this.render();
            var self = this;
        },

        enter: function() {
            // show header and footer
            $('nav.navbar-default').removeClass('hidden');
            $('footer.footer').removeClass('hidden');

            // set current language from button text
            Solidarity.language = this.languages[this.currentLanguageID];
            Backbone.history.navigate('#map', {trigger: true});
        }

    });

})();
