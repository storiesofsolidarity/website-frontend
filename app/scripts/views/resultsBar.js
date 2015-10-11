/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.ResultsBar = Solidarity.Views.BaseView.extend({
        el: '#bottomBar',
        template: JST['app/templates/storyResults.html'],

        render: function(results) {
            this.$el.html(this.template(results));
            return this;
        },

        updateGeom: function(geom) {
            // convert map geom to results hash
            return this.render({
                count: geom.properties.story_count || 0,
                geography: geom.properties.name || geom.id
            });
        },

        clear: function() {
            this.$el.html();
        }

    });

})();
