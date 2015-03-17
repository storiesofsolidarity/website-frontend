/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryList = Backbone.View.extend({

        template: JST['app/scripts/templates/storyList.ejs'],
        templateItem: JST['app/scripts/templates/storyListItem.ejs'],
        el: '#content',

        events: {'click a.more': 'more'},

        initialize: function () {
            this.render();

            this.collection = new Solidarity.Collections.Stories({mode: 'infinite'});
            this.listenTo(this.collection, 'add', this.addStory);
            this.collection.getFirstPage();
            $('.story.more').show();
        },

        addStory: function(story) {
            $(this.templateItem(story)).insertBefore('.storyList .story.more');
            if(!this.collection.hasNextPage()) {
                $('.story.more').hide();
            }
        },

        render: function () {
            this.$el.html(this.template());
        },

        more: function(e) {
            this.collection.getNextPage();
        }

    });

})();
