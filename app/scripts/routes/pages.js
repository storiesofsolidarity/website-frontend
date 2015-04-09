/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Pages = Backbone.Router.extend({
        routes: {
            '': 'index',
            'about': 'about',
            'privacy': 'privacy',
            'copyright': 'copyright',
            'admin': 'adminRedirect'
        },

        index: function() {
            new Solidarity.Views.Index({});
        },
        about: function() {
            new Solidarity.Views.Page('app/scripts/templates/about.ejs');
        },
        privacy: function() {
            new Solidarity.Views.Page('app/scripts/templates/privacy.ejs');
        },
        copyright: function() {
            new Solidarity.Views.Page('app/scripts/templates/copyright.ejs');
        },
        adminRedirect: function() {
            window.location.href = 'https://stories-of-solidarity.herokuapp.com/admin/';
        }
    });

})();
