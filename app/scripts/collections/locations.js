/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.States = Solidarity.Collections.BaseCollection.extend({
        model: Solidarity.Models.State,
        url: Solidarity.apiRoot + 'state/',
    });

    Solidarity.Collections.Counties = Solidarity.Collections.BaseCollection.extend({
        model: Solidarity.Models.State,
        url: Solidarity.apiRoot + 'county/',
    });

    Solidarity.Collections.Locations = Solidarity.Collections.BaseCollection.extend({
        model: Solidarity.Models.Location,
        url: Solidarity.apiRoot + 'location/',
    });


})();
