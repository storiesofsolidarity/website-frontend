/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Splash = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/splash.ejs'],
        el: '#splash',
        events: {'click button#enter': 'enter'},

        languages: ['en', 'es', 'tl', 'zh'], // defined in display order
        currentLanguageID: 0, //currently displayed language (english first)
        buttonText: {
            'en': 'Enter',
            'es': 'Entrar',
            'tl': 'Pumasok',
            'zh': '进入'
        },
        languageInterval: 10*1000,
        fadeInterval: 2*1000,

        initialize: function () {
            this.render();
            var self = this;
            $.ajax('/scripts/splash/featuredStories.json', {
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    self.splashStories = data;
                    self.loadRandomStory();
                },
                error: function(resp, status, err) {
                    console.log('error', status, err);
                }
            });
        },

        loadRandomStory: function() {
            if (this.splashStories === undefined) {
                return this.enter();
            }
            var id = _.random(0, this.splashStories.length-1);
            this.story = this.splashStories[id];
            this.$el.css('background-image','url('+this.story.image+')');
            var $quote = this.$el.find('.quote');
            $quote.find('h1').text(this.story.quote.en);
            $quote.addClass(this.story.align);

            setInterval(this.nextLanguage.bind(this), this.languageInterval);
        },

        nextLanguage: function() {
            var nextID = this.currentLanguageID + 1;
            if (nextID >= this.languages.length) { nextID = 0; }
            var nextLanguage = this.languages[nextID];
            this.currentLanguageID = nextID;

            var $quote = this.$el.find('.quote');
            var $text = this.$el.find('h1, button');
            $text.fadeOut(this.fadeInterval);

            var textFadeIn = function() {
                $quote.find('h1').text(this.story.quote[nextLanguage]);
                $quote.find('button').text(this.buttonText[nextLanguage]);
                $text.fadeIn(this.fadeInterval);
            };
            setTimeout(textFadeIn.bind(this), this.fadeInterval);
        },

        enter: function() {
            // set current language from button text
            Solidarity.language = this.languages[this.currentLanguageID];
            Backbone.history.navigate('#map', {trigger: true});
        }

    });

})();
