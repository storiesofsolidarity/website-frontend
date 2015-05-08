/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryList = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/storyList.ejs'],
        templateItem: JST['app/scripts/templates/storyListItem.ejs'],
        templateNoResults: JST['app/scripts/templates/storyListNoResults.ejs'],
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
                        $(self.templateNoResults({})).insertBefore('.storyList .item.more');
                    }
                    if (self.collection.hasNextPage()) {
                        $('.item.more').show();
                    }
                    if (window.location.href.indexOf('?story=') > 0) {
                        self.scrollTo(Solidarity.urlParam('story'));

                        //TODO, check to see if story param is greater than the first page
                    }
                    
                }
            });
        },

        addStory: function(story) {
            if (story.attributes.content) {
                $(this.templateItem(story.attributes)).insertBefore('.storyList .item.more');
            }
            if(!this.collection.hasNextPage()) {
                $('.item.more').hide();
            }
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
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
