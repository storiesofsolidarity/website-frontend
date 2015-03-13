/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Pages = Backbone.Router.extend({
        routes: {
            'about': 'about',
        },

        about: function() {
            console.log('about!');
        }
    });

})();
