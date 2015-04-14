/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryPost = Solidarity.Views.FormView.extend({

        template: JST['app/scripts/templates/storyPost.ejs'],
        el: '#content',
        form: 'form#storyPost',
        
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
        }

    });

})();
