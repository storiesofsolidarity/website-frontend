/*global Solidarity, Backbone*/

Solidarity.Routers = Solidarity.Routers || {};

(function () {
    'use strict';

    Solidarity.Routers.Auth = Solidarity.Routers.Base.extend({
        routes: {
            'auth/register': 'register',
            'auth/login': 'login',
            'auth/logout': 'logout',
            'auth/password/change': 'passwordChange',
            'auth/password/reset': 'passwordReset',
            'auth/password/reset/confirm': 'passwordResetConfirm',
            'auth/user': 'userDetails',
        },

        register: function() {
            Solidarity.mainContent.show(new Solidarity.Views.AuthRegister({el: '#content'}));
        },
        login: function() {
            Solidarity.mainContent.show(new Solidarity.Views.AuthLogin({el: '#content'}));
        },
        logout: function() {
            Solidarity.mainContent.show(new Solidarity.Views.AuthLogout({el: '#content'}));
        },
        passwordChange: function() {
            Solidarity.mainContent.show(new Solidarity.Views.AuthPasswordChange({el: '#content'}));
        },
        passwordReset: function() {
            Solidarity.mainContent.show(new Solidarity.Views.AuthPasswordReset({el: '#content'}));
        },
        passwordResetConfirm: function() {
            Solidarity.mainContent.show(new Solidarity.Views.AuthPasswordResetConfirm({el: '#content'}));
        },
        userDetails: function() {
            Solidarity.mainContent.show(new Solidarity.Views.AuthUserDetails({el: '#content'}));
        },
    });

})();
