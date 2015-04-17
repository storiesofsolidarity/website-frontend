/*global Solidarity, Backbone*/

Solidarity.Models = Solidarity.Models || {};

(function () {
    'use strict';

    Solidarity.Models.Location = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'location/'
    });

})();
