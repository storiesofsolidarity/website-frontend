/*global Solidarity, Backbone, _gaq, __gaTracker*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Base = Backbone.Router.extend({
        options: {
            trailingSlashIsSignificant: true,
        },

        _routeToRegExp: function(route) {
            route = Backbone.Router.prototype._routeToRegExp.call(this, route);
            return new RegExp(route.source, 'i'); // added 'i' to make case insensitive
        },

        initialize: function() {
            this.bind('route', this.pageView);
        },
        pageView : function(){  
            var url = Backbone.history.getFragment();
         
            if (!/^\//.test(url) && url !== '') {
                url = '/' + url;
            }
         
            if(typeof window._gaq !== 'undefined') {
                _gaq.push(['_trackPageview', url]);
            }
            if(typeof window['GoogleAnalyticsObject'] !== 'undefined') {
                var ga = window['GoogleAnalyticsObject'];
                window[ga]('send', 'pageview', url);
            }
        }
    });

})();
