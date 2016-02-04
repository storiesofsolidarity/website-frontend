/*global Solidarity, Backbone, JST*/

Solidarity.Views = Solidarity.Views || {};

(function () {
    'use strict';

    Solidarity.Views.SearchBar = Solidarity.Views.BaseView.extend({
        el: '#searchBar',
        template: JST['app/templates/storySearch.html'],
        events: {
            'keyup input[name="search"]': 'search',
            'click .result a': 'close',
            'click .close': 'close'
        },

        render: function (results) {
            this.$el.html(this.template(results));
            return this;
        },

        search: _.debounce(function() {
            var search = $('input[name="search"]').val().trim();
            if (search === '') {
                return;
            }
            var self = this;
            $.ajax({
                url: Solidarity.apiRoot+'search/',
                data: {'content': search },
                success: function(data) {
                    self.render({
                        'search': search,
                        'count': data.count,
                        'results': data.results
                    });
                    $('input[name="search"]').click();
                } 
            });
        }, 500),

        close: function() {
            return this.render({});
        }

    });

})();
