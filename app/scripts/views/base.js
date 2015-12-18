/*global Solidarity, Backbone */

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.BaseView = Backbone.View.extend({
        assign: function (view, selector) {
            view.setElement(this.$(selector)).render();
        },

        initialize: function () {
            //Solidarity.log('initalize '+this.cid);
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
            'keyup .has-error': 'clearFieldErrors'
        },
        templateError: JST['app/templates/formError.html'],

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
            $(self.form + ' [name="'+field+'"]').removeClass('has-error');
            $(self.form + ' [name="'+field+'"] + .help-block').html('');
        },

        clearAlerts: function() {
            $(this.form + ' .alert').remove();
        },

        submit: function(e) {
            e.preventDefault();
            var self = this;
            Solidarity.log('submit '+ self.$form[0].id);
            
            // add inputs to FormData
            var formData = new FormData();
            var formItems = self.$form.find('input[type!="file"], select, textarea');
            _.each(formItems, function(item) {
                var $item = $(item);
                if ($item.val()) {
                  formData.append($item.attr('name'), $item.val());
                }
            });
            // create file from blob
            var fileItems = self.$form.find('input[type="file"]');
            _.each(fileItems, function(item) {
                var $item = $(item);
                formData.append($item.attr('name'), $item[0].files[0]);
            });

            $.ajax({
                type: self.$form.attr('method'),
                url: self.$form.attr('action'),
                data: formData,
                processData: false,
                contentType: false,
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
                        $(self.form + ' [name="'+field+'"]').addClass('has-error');
                        var helpBlock = $(self.form + ' [name="'+field+'"] + .help-block');
                        helpBlock.children('.header').text('Please');
                        helpBlock.children('.message').text(message);
                        helpBlock.removeClass('hidden');
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
