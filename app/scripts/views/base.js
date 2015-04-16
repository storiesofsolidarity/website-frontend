/*global Solidarity, Backbone */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.BaseView = Backbone.View.extend({
        assign: function (view, selector) {
            view.setElement(this.$(selector)).render();
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    Solidarity.Views.FormView = Solidarity.Views.BaseView.extend({
        events: {
            'submit': 'submit',
            'keyup input.has-error': 'clearFieldErrors'
        },
        templateError: JST['app/scripts/templates/formError.ejs'],

        render: function () {
            this.$el.html(this.template());
            this.$form = $(this.form);
            // save $form jq object

            return this;
        },

        clearFieldErrors: function(e) {
            var self = this;
            var field = $(e.target).attr('name');
            $(self.form + ' label[for="'+field+'"]').removeClass('has-error');
            $(self.form + ' input[name="'+field+'"]').removeClass('has-error');
            $(self.form + ' input[name="'+field+'"] + .help-block').html('');
        },

        clearAlerts: function() {
            $(this.form + ' .alert').remove();
        },

        submit: function(e) {
            var self = this;
            e.preventDefault();

            $.ajax({
                type: self.$form.attr('method'),
                url: self.$form.attr('action'),
                data: self.$form.serializeArray(),
                success: function(resp) {
                    $(self.form + ' .alert').remove();

                    if (self.onSuccess !== undefined) {
                        console.log('success, returning onSuccess');
                        return self.onSuccess(resp);
                    } else {
                        return true;
                    }
                },
                error: function(resp) {
                    // remove previous alerts
                    self.clearAlerts();

                    self.$form.addClass('error');
                    var errs = resp.responseJSON;
                    if (errs === undefined) {
                        // probaby server 500, show response text to user
                        // TODO, email link or error tracking
                        self.$form.append(self.templateError({'non_field_errors': resp.statusText}));
                        return true;
                    }

                    _.map(errs, function(message, field) {
                        $(self.form + ' label[for="'+field+'"]').addClass('has-error');
                        $(self.form + ' input[name="'+field+'"]').addClass('has-error');
                        $(self.form + ' input[name="'+field+'"] + .help-block').html(message);
                    });
                    if (errs.non_field_errors !== undefined) {
                        self.$form.append(self.templateError(errs));
                    }
                }
            });
        },

        redirect: function() {
            if (window.urlParam('redirect')) {
                Backbone.history.navigate(window.urlParam('success'), {trigger: true});
            } else {
                // no urlParam, go back to home
                Backbone.history.navigate('', {trigger: true});
            }
        }
    });

})();
