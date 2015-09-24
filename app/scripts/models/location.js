/*global Solidarity, Backbone*/

Solidarity.Models = Solidarity.Models || {};

(function () {
    'use strict';

    Solidarity.Models.State = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'state/'
    });

    Solidarity.Models.County = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'county/'
    });

    Solidarity.Models.Location = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'location/'
    });

})();