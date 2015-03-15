/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.Authors = Backbone.Collection.extend({

        model: Solidarity.Models.Author

    });

})();
