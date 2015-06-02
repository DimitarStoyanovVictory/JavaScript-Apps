var app = app || {};

$(document).ready(function() {
    (function() {
        function notify(typeNoty, layout, text, timeout, typeClose) {
            var notification = noty({
                text: text,
                layout: layout,
                type: typeNoty,
                timeout: timeout,
                closeWith: ['click']
            });
        }

        app.successNoty = function(layout, text) {
            notify('success', layout, text, 2000);
        };

        app.errorNoty = function(layout, text) {
            notify('error', layout, text, 4000);
        };
    })();
});
