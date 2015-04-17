/*global Solidarity, Backbone*/

Solidarity.Models = Solidarity.Models || {};

(function () {
    'use strict';

    Solidarity.Models.Story = Solidarity.Models.BaseModel.extend({
        urlRoot: Solidarity.apiRoot+'story/'
    });

})();
