import $ = require("jquery");
import Config = require("../Config");
import Mocks = require("../Tests/Helpers/BiasPlot.Mocks");
import View = require("./BiasPlot.View");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: $.extend({}, {})
            }
        };

        let summary = new View.Widget($("#BiasPlot"), defaults);
    });

    function setupMockjax(): void {
        Mocks.setupBiasPlotMock();
    }
}