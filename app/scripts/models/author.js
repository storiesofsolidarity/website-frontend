/*global Solidarity, Backbone*/

Solidarity.Models = Solidarity.Models || {};

(function () {
    'use strict';

    Solidarity.Models.Author = Solidarity.Models.BaseModel.extend({
        url: Solidarity.apiRoot + 'author/',
        idAttributemodel: 'username'
    });

})();
