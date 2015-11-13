/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.ResultsBar = Solidarity.Views.StoryListLocation.extend({
        el: '#bottomBar',
        optionsDefaults: {'limit': 4},

        template: JST['app/templates/storyResults.html'],

        events: {'click btn.show-results': 'showResults'},

        initialize: function(options) {
            this.options = _.extend(this.optionsDefaults, options);

            this.collection = new Solidarity.Collections.Stories();
            this.collection.getFirstPage({
                success: _.bind(this.render, this)
            });
        },

        setTotal: function(data) {
            this.total = data;
            this.render(this.total);
        },

        render: function(data) {
            if (data === undefined) {
                data = this.total;
            }

            var displayStories = this.getStoriesSlice(data.geography);
            _.each(displayStories, function(s) {
                console.log(s);
                //template and append to .storyList
            });

            this.$el.html(this.template(data));
            return this;
        },

        getStoriesSlice: function(geography) {
            console.log('getStoriesSlice', geography);
            return this.collection
                .slice(0, this.options.limit);
        },

        updateGeom: function(geom, type) {
            // convert map geom to results hash
            var data = {
                count: geom.properties.story_count || 0,
                geography: geom.properties.name || geom.id
            };

            // extend queryParams to include geography type filter
            var geographyParams = {};
            if (type === 'state') { type = 'state_name'; }
            geographyParams[type] = data.geography;
            this.collection.queryParams= _.extend(this.collection.queryParams, geographyParams);

            // fetch and render new data
            this.collection.fetch();
            this.render(data);
        },

        clear: function() {
            this.$el.html();
        },

        show: function() {
            this.$el.show();
        },

        showResults: function() {
            Backbone.history.navigate('list/', {trigger: true});
        },
        
        hide: function() {
            this.$el.hide();
        }

    });

})();
