/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.Authors = Solidarity.Collections.BaseCollection.extend({

        model: Solidarity.Models.Author

    });

})();
