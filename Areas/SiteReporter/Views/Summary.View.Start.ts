import $ = require("jquery");
import Config = require("../Config");
import SummaryView = require("./Summary.View");

export = Main;

module Main {
    $((): void => {
        let summary = new SummaryView.Widget($("#summary"), {
            viewContext: {
                params: $.extend({}, Config.Params.SummaryDefaults)
            }
        });
    });
}