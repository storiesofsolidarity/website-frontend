/*global Solidarity, Backbone, JST, $, Transifex */

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
        changeLanguageDelay: 5*1000, // seconds

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        onShow: function() {
            var self = this;

            // set up background image switcher
            $('.splash').bgswitcher({
                images: [Solidarity.siteRoot+'images/splash/splash-1.jpg',
                         Solidarity.siteRoot+'images/splash/splash-2.jpg',
                         Solidarity.siteRoot+'images/splash/splash-3.jpg',
                         Solidarity.siteRoot+'images/splash/splash-4.jpg',
                         Solidarity.siteRoot+'images/splash/splash-5.jpg',
                         Solidarity.siteRoot+'images/splash/splash-6.jpg',
                         Solidarity.siteRoot+'images/splash/splash-7.jpg'],
                shuffle: true,
                loop: true,
                start: false,
                interval: this.languages.length*this.changeLanguageDelay,
                effect: 'fade'
            });

            // animate entrance
            $.when(
              $('ul.statement').animate({'top': 0}, 1000).promise(),
              $('ul.languages li').eq(0).delay( 500).animate({'top': '0px', 'opacity': 1}, 1000).promise(),
              $('ul.languages li').eq(1).delay(1000).animate({'top': '0px', 'opacity': 1}, 1000).promise(),
              $('ul.languages li').eq(2).delay(1500).animate({'top': '0px', 'opacity': 1}, 1000).promise(),
              $('ul.languages li').eq(3).delay(2000).animate({'top': '0px', 'opacity': 1}, 1000).promise()
            ).done( function(){
                Solidarity.log('Splash load complete.');

                // start language rotation, bound to backbone view
                self.rotateLanguageTimer = setInterval(self.rotateLanguage.bind(self), self.changeLanguageDelay);
                $('.splash').bgswitcher('start');
            });

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
            $('ul.statement li').fadeOut(500);
            $('ul.statement li#'+lang).fadeIn(500);
            btn.addClass('active');

            Transifex.live.translateTo(lang, true);
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

        enter: function(btn) {
            // show header and footer
            $('nav.navbar-default').removeClass('hidden');
            $('footer.footer').removeClass('hidden');

            // set current language from button
            var lang = $(btn).data('lang');
            Transifex.live.translateTo(lang, true);
            Solidarity.log('transifex translateTo: '+lang);

            Backbone.history.navigate('#/map', {trigger: true});
        }

    });

})();
