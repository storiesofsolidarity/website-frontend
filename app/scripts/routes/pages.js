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
            Backbone.history.navigate('splash', {trigger: true});
        },
        splash: function() {
            // hide header and footer
            $('nav.navbar-default').addClass('hidden');
            $('footer.footer').addClass('hidden');
            Solidarity.mainContent.show(new Solidarity.Views.Splash({}));
        },
        learn: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Video('app/templates/learn.html'), '#learn');
        },
        about: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/templates/about.html'), null, '#about');
        },
        privacy: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/templates/privacy.html'), null, '#privacy');
        },
        copyright: function() {
            Solidarity.mainContent.show(new Solidarity.Views.Page('app/templates/copyright.html'), null, '#contact');
        },
        adminRedirect: function() {
            window.location.href = 'https://stories-of-solidarity.herokuapp.com/admin/';
        }
    });

})();
