/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryList = Solidarity.Views.BaseView.extend({
        optionsDefaults: {},

        template: JST['app/templates/storyList.html'],
        templateItem: JST['app/templates/storyListItem.html'],
        templateNoResults: JST['app/templates/storyListNoResults.html'],
        el: '#content',

        events: {'click a.loadMore': 'loadMore'},
        hasLoaded: false,

        initialize: function (options) {
            this.options = _.extend(this.optionsDefaults, options);

            this.render({});
            this.collection = new Solidarity.Collections.Stories({mode: 'infinite'});
            this.listenTo(this.collection, 'add', this.addStory);
            this.filterData();
            this.getFirstPage();
        },

        filterData: function() {
            // no-op in base class
            // override below
        },

        getFirstPage: function() {
            var self = this;
            this.collection.getFirstPage({
                success: function(results) {
                    if (results.length === 0) {
                        $(self.templateNoResults({})).appendTo('.storyList');
                    }
                    if (self.collection.hasNextPage()) {
                        $('.item.more').show();
                    }
                    if (window.location.href.indexOf('?story=') > 0) {
                        self.scrollTo(Solidarity.urlParam('story'));

                        //TODO, check to see if story param is greater than the first page
                    }

                    self.layout(self.hasLoaded);
                    self.hasLoaded = true;
                }
            });
        },

        addStory: function(story) {
            if (story.attributes.content) {
                $(this.templateItem(story.attributes)).appendTo('.storyList');
            }
        },

        render: function(data) {
            if (data === undefined) { data = {}; }
            this.$el.html(this.template(data));
            return this;
        },

        layout: function(skipAnimation) {
            var duration = 150,
                delay = 500;

            if (skipAnimation) {
                duration = 0;
                delay = 0;
            }
            $('.storyList.grid').stalactite({
                duration: duration,
                delay: delay,
                easing: 'swing',
                cssPrefix: '.stalactite',
                cssPrep: true,
                fluid: true,
                loader: '<img />',
            });
        },

        onShow: function() {
            _.each(this.collection.models, _.bind(this.addStory, this));
            this.layout(this.hasLoaded);
        },

        loadMore: function() {
            this.collection.getNextPage();
        },

        scrollTo: function(storyId) {
            var storyDiv = $('#story-'+storyId);
            if (storyDiv.length > 0) {
                $('html, body').scrollTop(storyDiv.offset().top);
            }
        }

    });

    Solidarity.Views.StoryListLocation = Solidarity.Views.StoryList.extend({
        filterData: function () {
            // send location filters to api as query params
            this.collection.queryParams = _.extend(this.collection.queryParams,
                                {'city': this.options.city,
                                'county': this.options.county,
                                'state': this.options.state,
                                'limit': this.options.limit}
                            );
        },

        render: function (data) {
            var geography = '';
            if (this.options.city && this.options.state) {
                geography = this.options.city + ',' + this.options.state;
            } else if (this.options.county && this.options.state) {
                geography = this.options.county + ',' + this.options.state;
            } else if (this.options.state) {
                geography = this.options.state;
            }
            this.$el.html(this.template({
                'filtered': true,
                'geography': geography})
            );
            return this;
        },
    });

})();
