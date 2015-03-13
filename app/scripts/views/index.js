/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.Index = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/index.ejs'],
        el: '#content',
        events: {},

        initialize: function () {
            // render first, so sub-views have their elements
            this.render();

            // create sub-views
            // this.assign(new Solidarity.Views.Intro(), '#intro');

            this.introView = new Solidarity.Views.Intro({el: '#intro'});
            this.mapView = new Solidarity.Views.StoryMap({el: '#map'});

            // this.searchView = new Solidarity.Views.Search({});
            // this.filterView = new Solidarity.Views.Filter({});
            // this.loginView = new Solidarity.Views.Login({});
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
