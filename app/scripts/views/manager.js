/*global Solidarity, Backbone, $ */

// RegionManager from https://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
Solidarity.RegionManager = (function (Backbone, $) {
    'use strict';

    var freshView = true; // reset to false on first view open
                          // used for #splash redirect
    var currentView;
    var el = '#mainRegion';
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
 
    region.show = function (view) {
        closeView(currentView);
        currentView = view;
        openView(currentView);
    };
    region.currentView = function() {
        return currentView;
    };
    region.freshView = function() {
        return freshView;
    };

    return region;
})(Backbone, jQuery);