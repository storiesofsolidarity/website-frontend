/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.AuthLogin = Solidarity.Views.FormView.extend({
        form: 'form#login',
        template: JST['app/templates/authLogin.html'],

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
        template: JST['app/templates/authRegister.html'],
    });

    Solidarity.Views.AuthPasswordChange = Solidarity.Views.FormView.extend({
        form: 'form#passwordChange',
        template: JST['app/templates/authPasswordChange.html'],
    });

    Solidarity.Views.AuthPasswordReset = Solidarity.Views.FormView.extend({
        form: 'form#passwordReset',
        template: JST['app/templates/authPasswordReset.html'],
    });

    Solidarity.Views.AuthPasswordResetConfirm = Solidarity.Views.FormView.extend({
        form: 'form#passwordResetConfirm',
        template: JST['app/templates/authPasswordResetConfirm.html'],
    });

    Solidarity.Views.AuthUserDetails = Solidarity.Views.FormView.extend({
        form: 'form#userDetails',
        template: JST['app/templates/authUserDetails.html'],
    });

})();
