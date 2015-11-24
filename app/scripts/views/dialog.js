/*global Solidarity, Backbone, JST, Clipboard */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryThanks = Solidarity.Views.BaseView.extend({

        template: JST['app/templates/storyThanks.html'],
        el: '#overlay',
        events: {
            'click .copyLink': 'copyLink',
            'click .close': 'close'
        },

        initialize: function () {

        },

        render: function (data) {
            this.$el.html(this.template(data));
        },

        copyLink: function(e) {
            $('.copyLink').selectText();
            // allow user to naviate on second click?
        },

        close: function() {
            Solidarity.mainContent.hideOverlay();
        }

    });

})();
