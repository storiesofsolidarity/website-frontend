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

        // include apiRoot in initial render
        render: function () {
            this.$el.html(this.template({'apiRoot': Solidarity.apiRoot}));
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

        submit: function(e) {
            var self = this;
            e.preventDefault();

            $.ajax({
                type: self.$form.attr('method'),
                url: self.$form.attr('action'),
                data: self.$form.serializeArray(),
                success: function(data) {
                    $(self.form + ' .alert').remove();

                    if (self.successCallback !== undefined) {
                        return self.successCallback();
                    } else {
                        if (window.urlParam('success')) {
                            Backbone.history.navigate(window.urlParam('success'), {trigger: true});
                            return true;
                        }
                    }
                },
                error: function(data) {
                    // remove previous alerts
                    $(self.form + ' .alert').remove();

                    self.$form.addClass('error');
                    var errs = data.responseJSON;
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
        }
    });

})();
