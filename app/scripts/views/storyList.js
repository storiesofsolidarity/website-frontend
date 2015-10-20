/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryList = Solidarity.Views.BaseView.extend({

        template: JST['app/templates/storyList.html'],
        templateItem: JST['app/templates/storyListItem.html'],
        templateNoResults: JST['app/templates/storyListNoResults.html'],
        el: '#content',

        events: {'click a.loadMore': 'loadMore'},

        initialize: function (options) {
            this.options = options;

            this.render();
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

                    self.layout();
                }
            });
        },

        addStory: function(story) {
            if (story.attributes.content) {
                $(this.templateItem(story.attributes)).appendTo('.storyList');
            }
            if(!this.collection.hasNextPage()) {
                $('.item.more').hide();
            }
        },

        render: function() {
            this.$el.html(this.template({}));
            return this;
        },

        layout: function() {
            $('.storyList.grid').stalactite({
                duration: 150,
                delay: 500,
                easing: 'swing',
                cssPrefix: '.stalactite',
                cssPrep: true,
                fluid: true,
                loader: '<img />',
            });
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
            // send city, state filter to api as query params
            this.collection.queryParams = _.extend(this.collection.queryParams,
                                {'city': this.options.city, 'state': this.options.state});
        },

        render: function () {
            this.$el.html(this.template({'filtered': true, 'city': this.options.city, 'state': this.options.state}));
            return this;
        },
    });

})();
