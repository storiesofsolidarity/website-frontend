/*global Solidarity, Backbone, JST, Modernizr*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryPost = Solidarity.Views.FormView.extend({

        template: JST['app/scripts/templates/storyPost.ejs'],
        el: '#content',
        form: 'form#storyPost',
        events: {'click button#geolocate': 'geolocate'},
        
        initialize: function() {
            _.extend(this.events, Solidarity.Views.FormView.prototype.events);
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.$form = $(this.form);

            // init bootstrap form plugins
            $('.filestyle').filestyle({
                input: false,
                buttonText: 'Upload',
                size: 'sm',
                iconName: 'glyphicon-cloud-upload',
            }); 
            $('.selectpicker').selectpicker();
            return this;
        },

        onSuccess: function(resp) {
            console.log('storyPosted',resp);
            var newStoryUrl = 'read/story/'+resp.id+'?posted=true';
            Backbone.history.navigate(newStoryUrl, {trigger: true});
        },

        geolocate: function() {
            if (Modernizr.geolocation) {
                console.log('geolocate!');
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
