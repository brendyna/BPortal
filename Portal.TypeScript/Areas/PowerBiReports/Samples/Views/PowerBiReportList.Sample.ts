import Config = require("../../Config");
import PowerBiReportListMocks = require("../Helpers/PowerBiReportList.Mocks");
import View = require("../../Views/PowerBiReportList.View");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: {}
            }
        };

        let summary = new View.Widget($("#sample"), defaults);
    });

    export function setupMockjax(): void {
        PowerBiReportListMocks.setupReportListMock();
    }
}