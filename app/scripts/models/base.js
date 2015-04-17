/*global Solidarity, Backbone*/

Solidarity.Models = Solidarity.Models || {};

(function () {
    'use strict';

    Solidarity.Models.BaseModel = Backbone.Model.extend({
        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        url: function () {
            var links = this.get('links'),
            url = links && links.self;
            if (!url) {
                url = Backbone.Model.prototype.url.call(this);
            }
            return url;
        },

        sync: function(method, model, options){
            // Add trailing slash to backbone model views
            var _url = _.isFunction(model.url) ?  model.url() : model.url;
            _url += _url.charAt(_url.length - 1) === '/' ? '' : '/';

            options = _.extend(options, {
                url: _url
            });

            return Backbone.sync(method, model, options);
        }
    });

})();
