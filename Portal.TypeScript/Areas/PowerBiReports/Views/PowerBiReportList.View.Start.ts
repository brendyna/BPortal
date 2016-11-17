import $ = require("jquery");
import Config = require("../Config");
import View = require("./PowerBiReportList.View");

export = Main;

module Main {
    $((): void => {
        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: {}
            }
        };

        let summary = new View.Widget($("#reports"), defaults);
    });
}