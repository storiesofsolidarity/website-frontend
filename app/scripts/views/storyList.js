/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryList = Solidarity.Views.BaseView.extend({
        optionsDefaults: {},

        template: JST['app/templates/storyList.html'],
        templateItem: JST['app/templates/storyListItem.html'],
        templateBreak: JST['app/templates/storyListBreak.html'],
        templateNoResults: JST['app/templates/storyListNoResults.html'],
        el: '#content',
        storyEl: '.grid',

        hasLoaded: false,
        forcedLayout: false,

        initialize: function (options) {
            this.options = _.extend(this.optionsDefaults, options);

            this.render(this.options);

            this.collection = new Solidarity.Collections.Stories({mode: 'infinite'});
            this.listenTo(this.collection, 'add', this.addStory);
            this.filterData();
            this.getFirstPage();
            
            $('body').on('scroll', _.bind(this.watchScroll, this));
            $(window).on('resize', _.debounce(_.bind(function() {
                this.setGridWidth();
                this.layout(true);
            }, this), 100));
        },

        close: function() {
            $('body').off('scroll', this.watchScroll);
            $(window).off('resize', this.setGridWidth);
        },

        filterData: function() {
            // no-op in base class
            // override below
        },

        getFirstPage: function() {
            var self = this;
            self.isLoading = true; // disable scroll reload
            this.collection.getFirstPage({
                success: function(results) {
                    if (results.length === 0) {
                        $(self.templateNoResults({})).appendTo(this.storyEl);
                    }

                    if (window.location.href.indexOf('?story=') > 0) {
                        self.scrollTo(Solidarity.urlParam('story'));

                        //TODO, check to see if story param is greater than the first page
                    }

                    self.layout(self.hasLoaded);
                    self.setGridWidth();
                    self.isLoading = false;
                    self.hasLoaded = true;
                }
            });
        },

        addStory: function(story) {
            if (story.attributes.content) {
                $(this.templateItem(story.attributes)).appendTo(this.storyEl);
            }
        },

        render: function(data) {
            if (data === undefined) { data = this.options; }
            this.$el.html(this.template(data));
            return this;
        },

        setGridWidth: function() {
            // stalactite works best with fixed pixel widths
            // on window.resize, rejigger the width of the .stories div
            // so it re-centers appropriately

            $('.stories').css('width','auto');
            var itemWidth = $('.grid .item').outerWidth();
            var itemMarginRight = 0;
            if ($('.grid .item').length) {
                itemMarginRight = parseInt($('.grid .item').css('margin-right').substr(0,2));
            }
            var gridWidth = $('.grid').width();
            var numCols = Math.floor(gridWidth / (itemWidth + itemMarginRight));

            $('.stories').css('width', numCols * (itemWidth+itemMarginRight));
        },

        layout: function(skipAnimation) {
            var duration = 100,
                delay = 200;

            // on small screens, force skipAnimation
            if (window.innerWidth < 768) { skipAnimation = true; }

            if (skipAnimation) {
                duration = 0;
                delay = 0;
            }
            $(this.storyEl).stalactite({
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
            this.setGridWidth();
        },

        scrollTo: function(storyId) {
            var storyDiv = $('#story-'+storyId);
            if (storyDiv.length > 0) {
                $(this.storyEl).scrollTop(storyDiv.offset().top);
            }
        },

        watchScroll: function(e) {
            var triggerPoint = 100; // px from the bottom
            var el = $(this.storyEl);
            // element scroll height, using offset and window.innerHeight
            // because we have body.overflow-y = scroll
            var pxFromBottom = el.offset().top + el.height() - window.innerHeight;
            
            var self = this;
            if( !this.isLoading && pxFromBottom < triggerPoint ) {
                if (!this.collection.hasNextPage()) { return; }
                self.isLoading = true; // disable scroll reload

                // add page break
                $(this.templateBreak({num: this.collection.state.currentPage}))
                    .appendTo(this.storyEl);

                this.collection.getNextPage({
                    success: function() {
                        self.layout(true);
                        self.isLoading = false;
                        self.hasLoaded = true;
                    }
                });
            }

            // when new page loads, force layout again to avoid drawing errors
            if (!this.forcedLayout && pxFromBottom > window.innerHeight * 2) {
                self.layout(true);
                this.forcedLayout = true;
                console.log('force layout', this.forcedLayout);
            }
        }
    });

    Solidarity.Views.StoryListLocation = Solidarity.Views.StoryList.extend({
        filterData: function () {
            // send location filters to api as query params
            this.collection.queryParams = _.extend(this.collection.queryParams,
                                {'city': this.options.city,
                                'county': this.options.county,
                                'state_name': this.options.state_name,
                                'limit': this.options.limit}
                            );
        },

        render: function (data) {
            var geography, location;

            // determine geom type via regex
            if (data && data.location) {
                if (data.location.match(/^\d+$/)) {
                    geography = 'zip';
                } else {
                    geography = 'county';
                }
            } else {
                geography = 'state';
            }
            
            if (data && data.location && data.state_name) {
                location = data.location + ', ' + data.state_name;
            } else if (data && data.state_name) {
                location = data.state_name;
            }
            this.$el.html(this.template({
                'filtered': true,
                'location': location,
                'geography': geography})
            );
            return this;
        },
    });

})();
