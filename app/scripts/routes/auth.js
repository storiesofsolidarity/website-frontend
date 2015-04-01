/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Auth = Backbone.Router.extend({
        routes: {
            'auth/register': 'register',
            'auth/login': 'login',
            'auth/logout': 'logout',
            'auth/password/change': 'passwordChange',
            'auth/password/reset': 'passwordReset',
            'auth/password/reset/confirm': 'passwordResetConfirm',
        },

        register: function() {
            new Solidarity.Views.AuthRegister({el: '#content'});
        },
        login: function() {
            new Solidarity.Views.AuthLogin({el: '#content'});
        },
        logout: function() {
            new Solidarity.Views.AuthLogout({el: '#content'});
        },
        passwordChange: function() {
            new Solidarity.Views.AuthPasswordChange({el: '#content'});
        },
        passwordReset: function() {
            new Solidarity.Views.AuthPasswordReset({el: '#content'});
        },
        passwordResetConfirm: function() {
            new Solidarity.Views.AuthPasswordResetConfirm({el: '#content'});
        },
    });

})();
