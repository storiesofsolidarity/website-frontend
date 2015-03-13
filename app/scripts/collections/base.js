/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.BaseCollection = Backbone.Collection.extend({
        parse: function (response) {
            this._next = response.next;
            this._previous = response.previous;
            this._count = response.count;
            return response.results || [];
        }
    });

})();
