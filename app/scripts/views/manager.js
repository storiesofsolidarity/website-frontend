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
        if (!view){ return; }
        if (view.close) {
            view.close();
        }
        if (view.tip) {
            view.tip.destroy();
        }
    };
 
    var openView = function (view) {
        freshView = false;

        var renderView = function() {
            var content = view.render(view.options);
            if (content && content.$el) {
                content.$el.appendTo(el);
                content.delegateEvents();
            }
        };
        $.when( renderView() ).done(function() {
            if (view.onShow) {
                view.onShow();
            }
        });
    };
 
    region.show = function (view, navButton, footerLink) {
        closeView(currentView);
        currentView = view;
        openView(currentView);

        if (navButton) {
            $(navbar + ' li.button.active').removeClass('active');
            $(navbar + ' li.button a[href="'+navButton+'"]')
                .parent('li.button').addClass('active');
        } else {
            $(navbar + ' li.button.active').removeClass('active');
        }

        if (footerLink) {
            $('.footer ul.links a.active').removeClass('active');
            $('.footer ul.links a[href="'+footerLink+'"]').addClass('active');
        } else {
            $('.footer ul.links a.active').removeClass('active');
        }
    };
    region.currentView = function() {
        return currentView;
    };
    region.freshView = function() {
        return freshView;
    };
    region.showOverlay = function(delayActivate) {
        var overlay = $('<div id="overlay"></div>');
        $('body').append(overlay);
        if (delayActivate !== undefined) {
            $('#overlay').addClass('active');
        }
    };
    region.hideOverlay = function() {
        $('body > #overlay').removeClass('active').remove();
    };

    return region;
})(Backbone, jQuery);