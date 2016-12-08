import $ = require("jquery");
import Config = require("../Config");
import View = require("./CrawlScheduler.View");

export = Main;

module Main {
    $((): void => {
        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: {}
            }
        };

        let summary = new View.Widget($("#crawler"), defaults);
    });
}