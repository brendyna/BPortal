import Config = require("../../Config");
import View = require("../../Views/Summary.View");

import SummaryMocks = require("../Helpers/Summary.Mocks");

import SiteDisabledTemplate = require("../../Templates/SiteDisabled.Template");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: $.extend({}, SummaryMocks.bingdexParams)
            }
        };

        if (Config.Window.SiteReporterDisabled) {
            defaults.disabledPlaceholder = SiteDisabledTemplate;
        }

        let summary = new View.Widget($("#sample"), defaults);
    });

    export function setupMockjax(): void {
        SummaryMocks.setupFiltersMock();
        SummaryMocks.setupScanTimeMock();
        SummaryMocks.setupTokenDataMock();
        SummaryMocks.setupBugsForTagBlobUrlBingdexTop100Mock();
        SummaryMocks.setupBugsForTagBlobUrlMindtreeNotoriousMock();
        SummaryMocks.setupBugsForTagBingdexTop100Mock();
        SummaryMocks.setupBugsForTagMindtreeNotoriousMock();
        SummaryMocks.setupTrendsForTagBingdexTop100Mock();
        SummaryMocks.setupTrendsForTagMindtreeNotoriousMock();
    }
}