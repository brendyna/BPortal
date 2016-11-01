import $ = require("jquery");
import Config = require("../Config");
import View = require("./Example.View");

export = Main;

/**
 * This file is used by WPTPortal to invoke the view and pass in any necessary parameters
 * to it (typically URL params). The cshtml pages point to this module, which auto-runs, invoking the
 * view and binding it to the element returned from the jQuery selector passed into the Widget.
 *
 * There must be an element on the cshtml page that matches the selector.
 */
module Main {
    $((): void => {
        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: $.extend({}, Config.Params.Example)
            }
        };

        let summary = new View.Widget($("#example"), defaults);
    });
}