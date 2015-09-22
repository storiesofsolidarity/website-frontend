/*global Solidarity, Backbone, JST, Modernizr*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.ShareBar = Solidarity.Views.FormView.extend({

        template: JST['app/scripts/templates/storyPost.ejs'],
        el: '#shareBar',
        form: 'form#storyPost',
        events: {
            'focusin textarea[name="share"]': 'show',
            'click button#geolocate': 'geolocate',
            'click button#cancel': 'hide',
        },
        
        initialize: function() {
            _.extend(this.events, Solidarity.Views.FormView.prototype.events);

            Solidarity.log('init shareBar');
        },

        render: function() {
            Solidarity.log('shareBar.render');
            this.$el.hide().html(this.template()).slideDown();
            this.$form = $(this.form);
            return this;
        },

        show: function() {
            Solidarity.log('shareBar.show');
            this.render();
            this.onShow();
        },

        hide: function() {
            // close but do not delete content
            this.$el.slideUp();
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

            $.ajax('http://nominatim.openstreetmap.org/reverse?format=json', {
                type: 'GET',
                data: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                success: function(data) {
                    $('input#city').val(data.address.city);
                    var stateVal = $('select#state option')
                        .filter(function(i, e) { return $(e).text() === data.address.state; } )
                        .val(); //lookup state val from name
                    $('#state.selectpicker').selectpicker('val', stateVal);
                    $('button#geolocate').attr('disabled','disabled');
                },
                error: function(resp, status, err) {
                    return self.geoError({code: 4, message: err});
                }
            });
        }

    });

})();
