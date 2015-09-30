/*global Solidarity, Backbone, JST, jquery*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Splash = Solidarity.Views.BaseView.extend({

        template: JST['app/templates/splash.html'],
        el: '#content',
        events: {
            'click button.enter': 'enter',
            'click button.lang': 'clickLanguage',
        },
        languages: ['zh', 'en', 'es', 'tl'], // defined in display order
        langIndex: 0,
        rotateLanguageTimer: undefined,

        render: function () {
            this.$el.html(this.template());

            // start timers bound to view
            this.rotateLanguageTimer = setInterval(this.rotateLanguage.bind(this), 2.5*1000);
            
            // set up background image switcher
            $('.splash').bgswitcher({
                images: ['/images/splash/temp-1.jpg',
                         '/images/splash/temp-2.jpg',
                         '/images/splash/temp-3.jpg'],
                interval: 10*1000,
                effect: 'fade',
            }).bgswitcher('start');

            return this;
        },

        rotateLanguage: function() {
            this.langIndex += 1;
            if (this.langIndex === this.languages.length) { this.langIndex = 0; }

            var nextLanguage = this.languages[this.langIndex];
            var btn = $('ul.languages .btn[data-lang='+nextLanguage+']');
            return this.changeLanguage(btn);
        },

        changeLanguage: function(btn) {
            var lang = btn.data('lang');
            $('ul.languages .btn.active').removeClass('active');
            $('ul.statement li').hide();
            $('ul.statement li#'+lang).show();
            btn.addClass('active');
        },

        clickLanguage: function(event) {
            var target = $(event.target);
            var btn = target;
            if (btn.is('span')) {
                btn = target.parents('button');
            }
            // stop rotation timer
            clearInterval(this.rotateLanguageTimer);

            return this.changeLanguage(btn);
        },

        rotateImage: function() {
            this.imageIndex += 1;
            if (this.imageIndex === this.images.length) { this.imageIndex = 0; }
            $('div.splash').css('background-image', 'url('+this.images[this.imageIndex]+')');
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
