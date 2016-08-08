import $ = require("jquery");
import Config = require("../Config");
import View = require("./Details.View");

export = Main;

module Main {
    $((): void => {
        let details = new View.Widget($("#details"), {
            viewContext: {
                params: $.extend({}, $.extend({}, Config.Params.DetailsDefaults))
            }
        });
    });
}