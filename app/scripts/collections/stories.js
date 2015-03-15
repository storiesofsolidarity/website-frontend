/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.Stories = Solidarity.Collections.BaseCollection.extend({
        model: Solidarity.Models.Story,
        url: Solidarity.apiRoot + 'story',
    });

})();
