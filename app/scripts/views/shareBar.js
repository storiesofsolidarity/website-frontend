/*global Solidarity, Backbone, JST, Modernizr*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.ShareBar = Solidarity.Views.FormView.extend({

        template: JST['app/templates/storyPost.html'],
        el: '#shareBar',
        form: 'form#storyPost',
        events: {
            'click textarea[name="content"]': 'show',
            'keyup textarea[name="content"].closed': 'show',
            'click button#geolocate': 'geolocate',
            'click button#cancel': 'hide',
        },
        beenRendered: false,
        isOpen: false,
        
        initialize: function() {
            _.extend(this.events, Solidarity.Views.FormView.prototype.events);
        },

        render: function() {
            Solidarity.log('shareBar.render');
            this.$el.hide().html(this.template()).slideDown(1000);
            this.$form = $(this.form);
            this.beenRendered = true;
            return this;
        },

        show: function() {
            Solidarity.log('shareBar.show');
            if (!this.isOpen) {
                Solidarity.mainContent.showOverlay(true);
                // delay activate until open animation starts
                $('#overlay').delay(500).addClass('active');

                if (!this.beenRendered) {
                    this.render();
                } else {
                    this.$el.animate({'height': '100%'}, 500);
                    $('textarea', this.$el).delay(500).removeClass('closed').addClass('open');
                }
                this.$el.removeClass('closed');
                this.isOpen = true;
                this.onShow();
            } else {
            }
        },

        hide: function(event) {
            event.preventDefault(); // stop form submit

            // hide without replacing content
            this.$el.animate({'height': '30px'}, 500).delay(500).addClass('closed');
            $('textarea', this.$el).removeClass('open').addClass('closed');
            this.isOpen = false;
            
            Solidarity.mainContent.hideOverlay();
        },

        onShow: function() {
            this.$form = $(this.form);

            // init bootstrap form plugins
            $('.selectpicker').selectpicker();          
        },

        onSuccess: function(resp) {
            Solidarity.log('storyPosted',resp);
            var newStoryUrl = 'read/story/'+resp.id+'?posted=true';
            Backbone.history.navigate(newStoryUrl, {trigger: true});
        },

        geolocate: function() {
            if (Modernizr.geolocation) {
                Solidarity.log('geolocate!');
                navigator.geolocation.getCurrentPosition(this.locationToCityState, this.geoError.bind(this));
            } else {
                return this.geoError({code: 0, message: 'Your browser does not support geolocation.'});
            }
        },

        geoError: function(error) {
            this.clearAlerts();

            var message = 'Geolocation error';
            if (error.code === 1) { message = 'Please allow the browser to access your location.'; }
            if (error.code === 2) { message = 'Geolocation position unavailable.'; }
            if (error.code === 3) { message = 'Geolocation position timeout.'; }

            this.$form.append(this.templateError({'non_field_errors': message}));
        },

        locationToCityState: function(position) {
            var self = this;
            $.ajax('https://search.mapzen.com/v1/reverse', {
                type: 'GET',
                data: {
                    'point.lat': position.coords.latitude,
                    'point.lon': position.coords.longitude,
                    'layers': 'address',
                    'size': 1,
                    'api_key': Solidarity.mapzenKey
                },
                success: function(data) {
                    var match = data.features[0];
                    $('input#city').val(match.properties.locality.toUpperCase());
                    $('#state.selectpicker').selectpicker('val', match.properties.region_a);
                    $('button#geolocate').attr('disabled','disabled');
                },
                error: function(resp, status, err) {
                    return self.geoError({code: 4, message: err});
                }
            });
        }

    });

})();
