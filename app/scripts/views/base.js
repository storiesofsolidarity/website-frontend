/*global Solidarity, Backbone */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.BaseView = Backbone.View.extend({
        assign: function (view, selector) {
            view.setElement(this.$(selector)).render();
        }
    });

})();
