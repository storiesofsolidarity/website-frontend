/*global Solidarity, Backbone */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.BaseView = Backbone.View.extend({
        assign: function (view, selector) {
            view.setElement(this.$(selector)).render();
        },

        initialize: function () {
            Solidarity.log('initalize '+this.cid);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        close: function() {
            if (this.beforeClose) { this.beforeClose(); }
            this.remove();

            if (this.onClose) { this.onClose(); }
            this.trigger('close');
            this.unbind();
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

            return this;
        },

        onShow: function() {
            // save $form jq object
            this.$form = $(this.form);  
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
            e.preventDefault();
            var self = this;
            Solidarity.log('submit '+ self.$form[0].id);
            Solidarity.log(self.$form.serializeArray());
            
            $.ajax({
                type: self.$form.attr('method'),
                url: self.$form.attr('action'),
                data: self.$form.serializeArray(),
                success: function(resp) {
                    $(self.form + ' .alert').remove();

                    if (self.onSuccess !== undefined) {
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
                        Solidarity.log(resp.responseText);
                        return true;
                    } else {
                        Solidarity.log(errs);                 
                    }

                    _.map(errs, function(message, field) {
                        $(self.form + ' label[for="'+field+'"]').addClass('has-error');
                        $(self.form + ' input[name="'+field+'"]').addClass('has-error');
                        $(self.form + ' input[name="'+field+'"] + .help-block').html(message);
                    });
                    if (errs.non_field_errors !== undefined) {
                        self.$form.append(self.templateError(errs));
                    }
                    return false;
                }
            });

            return false;
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
