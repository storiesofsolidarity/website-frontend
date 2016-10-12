/*global Solidarity, Backbone, JST, Transifex */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Page = Solidarity.Views.BaseView.extend({
        /* simple view for a non-interactive page
         * just renders the templateName and that's it
         */

        el: '#content',

        initialize: function (templateName) {
            this.template = JST[templateName];
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    Solidarity.Views.Video = Solidarity.Views.Page.extend({
        render: function () {
            this.$el.html(this.template());
            this.setVideoLanguage($('html').attr('lang'));
            if(Transifex) { Transifex.live.onTranslatePage(this.setVideoLanguage); }
            return this;
        },

        setVideoLanguage: function(langCode) {
            $('.videoTranslate iframe', this.$el).hide();
            var lang = langCode || 'en';
            console.log('setVideoLanguage', lang);
            var translatedVideo = $('.videoTranslate iframe[lang='+lang+']', this.$el);
            if (translatedVideo.length === 0) {
                translatedVideo = $('.videoTranslate iframe[lang=en]', this.$el);
            }
            translatedVideo.show();
            // can't access translatedVideo.contents() bc of cross-domain embed
            // translatedVideo.contents().find('button.play').click();
            // hope ?autoplay=1 works after iframe show()
        }
    });

})();
