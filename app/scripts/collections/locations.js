/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.Locations = Solidarity.Collections.BaseCollection.extend({
        model: Solidarity.Models.Location,
        url: Solidarity.apiRoot + 'location/',
    });

})();
