/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryPost = Solidarity.Views.BaseView.extend({

        template: JST['app/scripts/templates/storyPost.ejs'],
        el: '#content',
        
        render: function () {
            this.$el.html(this.template());

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
