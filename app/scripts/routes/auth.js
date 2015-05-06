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
            this.mainContent.show(new Solidarity.Views.AuthRegister({el: '#content'}));
        },
        login: function() {
            this.mainContent.show(new Solidarity.Views.AuthLogin({el: '#content'}));
        },
        logout: function() {
            this.mainContent.show(new Solidarity.Views.AuthLogout({el: '#content'}));
        },
        passwordChange: function() {
            this.mainContent.show(new Solidarity.Views.AuthPasswordChange({el: '#content'}));
        },
        passwordReset: function() {
            this.mainContent.show(new Solidarity.Views.AuthPasswordReset({el: '#content'}));
        },
        passwordResetConfirm: function() {
            this.mainContent.show(new Solidarity.Views.AuthPasswordResetConfirm({el: '#content'}));
        },
        userDetails: function() {
            this.mainContent.show(new Solidarity.Views.AuthUserDetails({el: '#content'}));
        },
    });

})();
