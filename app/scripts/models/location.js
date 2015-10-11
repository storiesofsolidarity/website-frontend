/*global Solidarity, Backbone*/

Solidarity.Models = Solidarity.Models || {};

(function () {
    'use strict';

    Solidarity.Models.State = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'state/'
    });

    Solidarity.Models.County = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'county/',
        parse: function(response, options)  {
            // replace County, Parish from names
            if (response.name) {
                response.name = response.name
                  .replace(' County', '')
                  .replace(' Parish', '');
            }
            return response;
        },
    });

    Solidarity.Models.Location = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'location/'
    });

})();