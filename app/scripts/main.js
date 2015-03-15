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
    }
};

$(document).ready(function () {
    'use strict';
    Solidarity.init();
});
