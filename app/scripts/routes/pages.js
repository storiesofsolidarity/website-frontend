/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Pages = Solidarity.Routers.Base.extend({
        routes: {
            '': 'index',
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
                Solidarity.mainContent.show(new Solidarity.Views.Index({}));
            }
        },
        splash: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Splash({}));
        },
        about: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/scripts/templates/about.ejs'));
        },
        privacy: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/scripts/templates/privacy.ejs'));
        },
        copyright: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/scripts/templates/copyright.ejs'));
        },
        adminRedirect: function() {
            window.location.href = 'https://stories-of-solidarity.herokuapp.com/admin/';
        }
    });

})();
