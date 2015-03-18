/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryList = Backbone.View.extend({

        template: JST['app/scripts/templates/storyList.ejs'],
        templateItem: JST['app/scripts/templates/storyListItem.ejs'],
        el: '#content',

        events: {'click a.loadMore': 'loadMore'},

        initialize: function () {
            var self = this;
            this.render();

            this.collection = new Solidarity.Collections.Stories({mode: 'infinite'});
            this.listenTo(this.collection, 'add', this.addStory);
            this.collection.getFirstPage({
                success: function() {
                    $('.item.more').show();
                    if (window.location.href.indexOf('?story=') > 0) {
                        self.scrollTo(Solidarity.urlParam('story'));

                        //TODO, check to see if story param is greater than the first page
                    }
                }
            });
        },


        addStory: function(story) {
            $(this.templateItem(story.attributes)).insertBefore('.storyList .item.more');
            if(!this.collection.hasNextPage()) {
                $('.item.more').hide();
            }
        },

        render: function () {
            this.$el.html(this.template());
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

})();
