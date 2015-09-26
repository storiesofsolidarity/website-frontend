/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Splash = Solidarity.Views.BaseView.extend({

        template: JST['app/templates/splash.html'],
        el: '#content',
        events: {
            'click button.enter': 'enter',
            'mouseover button.lang': 'language',
        },
        languages: ['zh', 'en', 'es', 'tl'], // defined in display order

        initialize: function() {
            // start rotate timer
        },

        rotate: function() {

        },

        language: function(event) {
            var lang = $(event.target).data('lang');
            $('ul.statement li').hide();
            $('ul.statement li#'+lang).show();
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
