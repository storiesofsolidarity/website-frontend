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

        initialize: function (options) {
            this.render(options);

            this.collection = new Solidarity.Collections.Stories({mode: 'infinite'});
            this.listenTo(this.collection, 'add', this.addStory);
            this.filterData(options);
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

        filterData: function(options) {
            // no-op in base class
            // override below
        },

        getFirstPage: function() {
            var self = this;
            self.isLoading = true; // disable scroll reload
            this.collection.getFirstPage({
                success: function(results) {
                    if (results.length === 0) {
                        $(self.templateNoResults({})).appendTo(self.storyEl);
                    } else {
                        $('span#storyCount').text(results.state.totalRecords);
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
            if (data === undefined) { data = {}; }
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
            numCols = Math.max(numCols, 1);

            $('.stories').css('width', numCols * (itemWidth+itemMarginRight));
        },

        layout: function(skipAnimation) {
            var duration = 100,
                delay = 0;

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
                fluid: false, // do our own window.resize listener
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
            if (el.length === 0) { return; }

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

            var pxFromTop = -1 * el.offset().top;
            if ( !this.isLoading && pxFromTop < triggerPoint ){
                // trigger layout to fix packing weirdness
                this.layout(true);
            }
        }
    });

    Solidarity.Views.StoryListLocation = Solidarity.Views.StoryList.extend({
        filterData: function (options) {
            var geography;

            // send location filters to api as query params
            this.collection.queryParams = _.extend(this.collection.queryParams,
                                {'state_name': options.state_name,
                                'limit': options.limit}
                            );
            if (options.zipcode) {
                this.collection.queryParams.zipcode = options.zipcode;
            }
            if (options.county) { 
                this.collection.queryParams.county = options.county;
            }
        },

        render: function (data) {
            var geography, location;

            // determine location string in view, not template because logic is easier here
            if (data && data.county && data.state_name) {
                location = data.county + ', ' + data.state_name;
            } else if (data && data.city && data.zipcode && data.state_name) {
                location = data.city + ', ' + data.state_name + ', ' + data.zipcode;
            }
            else if (data && data.zipcode && data.state_name) {
                location = data.zipcode + ', ' + data.state_name;
            }
            else if (data && data.state_name) {
                location = data.state_name;
            } else {
                location = null;
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
