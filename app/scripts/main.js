/*global Solidarity, $*/


window.Solidarity = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Stories of Solidarity');

        // new this.Views.storyMap({ });

        // show demo modal
        $('#loadModal').modal('show');
    }
};

$(document).ready(function () {
    'use strict';
    Solidarity.init();
});
