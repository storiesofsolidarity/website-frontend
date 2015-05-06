/*global Solidarity, $, _*/

'use strict';

window.Solidarity = _.extend(window.Solidarity, {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        console.log('Stories of Solidarity');

        // initialize routers
        new Solidarity.Routers.Auth({});
        new Solidarity.Routers.Pages({});
        new Solidarity.Routers.Stories({});

        // initialize UI elements
        // this.searchView = new Solidarity.Views.Search({});
        // this.filterView = new Solidarity.Views.Filter({});
        // this.loginView = new Solidarity.Views.Login({});

        // start history, redirect to about page if invalid route
        if (!Backbone.history.start()) {
            var msg = '404 for /'+window.location.hash+' redirecting to /#about';
            console.error(msg);
            Backbone.history.navigate('about', {trigger: true});
        }

        // set XHR headers even for cross-domain requests
        $.ajaxSetup({
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        });

        // remove sms: link functionalty for desktop users
        $('a[href^="sms:"]').click(function() {
            // unfortunately can't do Modernizr detection for sms input types
            // just do it if window width > $grid-float-breakpoint
            if (window.innerWidth > 768) { return false; }
        });
    },

    log: function(msg) {
        if (Solidarity.DEBUG) { console.log(msg); }
    }
});

window.urlParam = function(name) {
    // get a named parameter from the location hash
    // have to use regex b/c it's not in window.location.search
    var hashMatch = window.location.href.match(/^[^#]+#([^?]*)\??(.*)/);
    var hashPath = hashMatch[1];
    var hashQuery = hashMatch[2];

    // simplest solution using splits, but may not handle multiple param names
    var half = hashQuery.split(name + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
};

$(document).ready(function () {
    Solidarity.init();

    if (window.location.hash) {
        Solidarity.log('starting at'+window.location.hash);
        // starting off the splash page,
        // show nav & footer
        $('nav.navbar-default').removeClass('hidden');
        $('footer.footer').removeClass('hidden');
    }
});
