/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.StoryPost = Backbone.View.extend({

        template: JST['app/scripts/templates/storyPost.ejs'],
        el: '#content',
        
        render: function () {
            this.$el.html(this.template());
            $('.filestyle').filestyle({
                input: false,
                buttonText: 'Upload',
                size: 'sm',
                iconName: 'glyphicon-cloud-upload',
            }); // custom file button style
            return this;
        }

    });

})();
