/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Pages = Solidarity.Routers.Base.extend({
        routes: {
            '': 'index',
            'learn': 'learn',
            'splash': 'splash',
            'about': 'about',
            'privacy': 'privacy',
            'copyright': 'copyright',
            'admin': 'adminRedirect'
        },

        index: function() {
            // on fresh view, go to splash
            if (Solidarity.mainContent.freshView()) {
                Backbone.history.navigate('splash', {trigger: true});
            } else {
                // show the map
                Backbone.history.navigate('map', {trigger: true});
            }
        },
        splash: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Splash({}));
        },
        learn: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/templates/learn.html'), '#learn');
        },
        about: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/templates/about.html'));
        },
        privacy: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/templates/privacy.html'));
        },
        copyright: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/templates/copyright.html'));
        },
        adminRedirect: function() {
            window.location.href = 'https://stories-of-solidarity.herokuapp.com/admin/';
        }
    });

})();
