/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.Stories = Backbone.Collection.extend({

        model: Solidarity.Models.Stories

    });

})();
