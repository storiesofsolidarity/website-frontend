/*global Solidarity, Backbone, $ */

// RegionManager from https://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
Solidarity.RegionManager = (function (Backbone, $) {
    'use strict';

    var freshView = true; // reset to false on first view open
                          // used for #splash redirect
    var currentView;
    var el = '#mainRegion';
    var navbar = 'ul.navbar-nav';
    var region = {};

    var closeView = function (view) {
        if (view && view.close) {
            view.close();
        }
    };
 
    var openView = function (view) {
        freshView = false;
        var content = view.render();
        if (content && content.$el) {
            content.$el.appendTo(el);
            content.delegateEvents();
        }

        if (view.onShow) {
            view.onShow();
        }
    };
 
    region.show = function (view, button) {
        closeView(currentView);
        currentView = view;
        openView(currentView);

        if (button !== undefined) {
            $(navbar + ' li.button.active').removeClass('active');
            $(navbar + ' li.button a[href='+button+']')
                .parent('li.button').addClass('active');
        } else {
            $(navbar + ' li.button.active').removeClass('active');
        }
    };
    region.currentView = function() {
        return currentView;
    };
    region.freshView = function() {
        return freshView;
    };

    return region;
})(Backbone, jQuery);