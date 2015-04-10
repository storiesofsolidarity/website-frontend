/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.AuthLogin = Solidarity.Views.FormView.extend({
        form: 'form#login',
        template: JST['app/scripts/templates/authLogin.ejs'],
        templateError: JST['app/scripts/templates/authError.ejs'],

        onSuccess: function(resp) {
            // store token to cookie
            if (resp.key) {
                $.cookie('token', resp.key);
            }

            // store username to app obj

            return this.redirect();
        }
    });

    Solidarity.Views.AuthRegister = Solidarity.Views.FormView.extend({
        form: 'form#register',
        template: JST['app/scripts/templates/authRegister.ejs'],
        templateError: JST['app/scripts/templates/authError.ejs'],
    });

    Solidarity.Views.AuthPasswordChange = Solidarity.Views.FormView.extend({
        form: 'form#passwordChange',
        template: JST['app/scripts/templates/authPasswordChange.ejs'],
        templateError: JST['app/scripts/templates/authError.ejs'],
    });

    Solidarity.Views.AuthPasswordReset = Solidarity.Views.FormView.extend({
        form: 'form#passwordReset',
        template: JST['app/scripts/templates/authPasswordReset.ejs'],
        templateError: JST['app/scripts/templates/authError.ejs'],
    });

    Solidarity.Views.AuthPasswordResetConfirm = Solidarity.Views.FormView.extend({
        form: 'form#passwordResetConfirm',
        template: JST['app/scripts/templates/authPasswordResetConfirm.ejs'],
        templateError: JST['app/scripts/templates/authError.ejs'],
    });

})();
