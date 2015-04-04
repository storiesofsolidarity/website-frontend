/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.AuthLogin = Solidarity.Views.FormView.extend({
        form: 'form#login',
        template: JST['app/scripts/templates/authLogin.ejs'],
        templateError: JST['app/scripts/templates/authError.ejs'],
    });

    Solidarity.Views.AuthRegister = Solidarity.Views.FormView.extend({
        form: 'form#register',
        template: JST['app/scripts/templates/authRegister.ejs'],
        templateError: JST['app/scripts/templates/authError.ejs'],
    });

})();
