/*global Solidarity, Backbone*/

Solidarity.Collections = Solidarity.Collections || {};

(function () {
    'use strict';

    Solidarity.Collections.BaseCollection = Backbone.PageableCollection.extend({
        // adapt Backbone.PageableCollection to Django-Rest-Framework field names
        resultsField: 'results',
        totalRecordsField: 'count',
        nextField: 'next',
        previousField: 'previous',

        //  DRF ignores these query params
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: null,
        },

        // explicit default pageSize
        state: {
            pageSize: 50,
        },

        // modified from https://gist.github.com/burtyish/10006579
        parseRecords: function(resp, options) {
            if (resp && _.has(resp, this.resultsField) && _.isArray(resp[this.resultsField])) {
                return resp[this.resultsField];
            } else {
                Backbone.PageableCollection.prototype.parseRecords.apply(this, arguments);
            }
        },
 
        parseState: function(resp, queryParams, state, options) {
            return {totalRecords: resp[this.totalRecordsField]};
        },
 
        parseLinks: function(resp, options) {
            return {
                prev: resp[this.previousField],
                next: resp[this.nextField],
                first: null
            };
        }
        
    });

})();
