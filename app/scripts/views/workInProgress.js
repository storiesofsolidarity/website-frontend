/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.WorkInProgress = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/workInProgress.ejs'],
        events: {'hidden.bs.modal': 'setCookie'},

        setCookie: function () {
            // show intro modal only on first load
            $.cookie('hideModal', 'true');
        },

        onShow: function() {
            if($.cookie('hideModal') === 'true') {
                $('#introModal').modal('hide');
            } else {
                $('#introModal').modal('show');
            }
        }

    });

})();
