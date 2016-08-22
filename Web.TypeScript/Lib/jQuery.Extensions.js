(function ($) {
    'use strict';
    $.extend({
        getUrlVar: function (name) {
            var queryString = window.location.search;
            if (queryString) {
                var queryParameters = queryString.substring(1);
                var vars = queryParameters.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0].localeCompare(name, [], { sensitivity: 'base' }) === 0) { return pair[1]; }
                }
            }

            return undefined;
        },
        isNullOrUndefined: function (val) {
            return val === null || val === undefined;
        }
    });
}(jQuery));

jQuery.cachedScript = function (url, options) {

    // Allow user to set any option except for dataType, cache, and url
    options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });

    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax(options);
};
