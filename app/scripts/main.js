/*global Solidarity, $*/


window.Solidarity = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    apiRoot: 'http://localhost:8000/api/',
    init: function () {
        'use strict';
        console.log('Stories of Solidarity');

        // initialize routers
        new Solidarity.Routers.Pages({});
        new Solidarity.Routers.Stories({});

        // initialize UI elements
        // this.searchView = new Solidarity.Views.Search({});
        // this.filterView = new Solidarity.Views.Filter({});
        // this.loginView = new Solidarity.Views.Login({});

        // start history
        Backbone.history.start();
    },

    urlParam: function(name) {
        // get a named parameter from the location hash
        // have to use regex b/c it's not in window.location.search
        var hashMatch = window.location.href.match(/^[^#]+#([^?]*)\??(.*)/);
        var hashPath = hashMatch[1];
        var hashQuery = hashMatch[2];

        // simplest solution using splits, but may not handle multiple param names
        var half = hashQuery.split(name + '=')[1];
        return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
    },
};

$(document).ready(function () {
    'use strict';
    Solidarity.init();
});