/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.SearchBar = Solidarity.Views.BaseView.extend({
        el: '#searchBar',
        template: JST['app/templates/storySearch.html'],

        render: function (results) {
            this.$el.html(this.template(results));
            return this;
        }

    });

})();
