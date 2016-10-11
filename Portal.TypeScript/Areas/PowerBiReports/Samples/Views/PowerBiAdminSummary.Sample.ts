import Config = require("../../Config");
import View = require("../../Views/PowerBiAdminSummary.View");

import PowerBiAdminMocks = require("../Helpers/PowerBiAdminSummary.Mocks");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            disableAutoLoad: true,
            viewContext: {
                params: {}
            }
        };

        let summary = new View.Widget($("#sample"), defaults);
        summary.loadData();
    });

    export function setupMockjax(): void {
        PowerBiAdminMocks.setupWorkspacesMock();
        PowerBiAdminMocks.setupDatasetsMock();
    }
}