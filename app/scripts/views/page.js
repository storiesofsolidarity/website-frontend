/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Page = Backbone.View.extend({
        /* simple view for a non-interactive page
         * just renders the templateName and that's it
         */

        el: '#content',

        initialize: function (templateName) {
            this.template = JST[templateName];
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

})();
