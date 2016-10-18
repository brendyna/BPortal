import Config = require("../../Config");
import PowerBiAdminMocks = require("../Helpers/PowerBiAdminSummary.Mocks");
import View = require("../../Views/PowerBiAdminSummary.View");

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
        PowerBiAdminMocks.setupWorkspacesMock();
        PowerBiAdminMocks.setupDatasetsMock();
    }
}