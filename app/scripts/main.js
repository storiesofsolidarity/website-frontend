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

        // show intro modal only on first load
        if($.cookie('hideModal') === 'true') {
            // already saw modal, don't show again
            $('#introModal').modal('hide');
        } else {
            $('#introModal').modal('show');

        }

        $('#introModal').on('hidden.bs.modal', function () {
            console.log('hide modal');
            $.cookie('hideModal', 'true');
        });
        
    }
};

$(document).ready(function () {
    'use strict';
    Solidarity.init();
});
