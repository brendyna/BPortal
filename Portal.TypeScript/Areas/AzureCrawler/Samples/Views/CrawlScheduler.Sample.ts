import Config = require("../../Config");
import CrawlMocks = require("../Helpers/CrawlScheduler.Mocks");
import View = require("../../Views/CrawlScheduler.View");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: $.extend({}, {}) 
            }
        };

        let example = new View.Widget($("#crawler"), defaults);
    });

    export function setupMockjax(): void {
        CrawlMocks.setupCrawlSubmitMock();
    }
}