import $ = require("jquery");
import Config = require("../Config");
import SummaryView = require("./Summary.View");

export = Main;

module Main {
    let bingdexParams = {
        tag: "BingdexTop100",
        platform: "Desktop",
        release: "Rs1"
    };

    $((): void => {
        let summary = new SummaryView.Widget($("#summary"), {
            viewContext: {
                params: $.extend({}, bingdexParams)
            }
        });
    });
}