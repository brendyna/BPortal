import Config = require("../../Config");
import SiteDisabledTemplate = require("../../Templates/SiteDisabled.Template");
import SummaryMocks = require("../Helpers/Summary.Mocks");
import View = require("../../Views/Summary.View");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            disableAutoLoad: true,
            viewContext: {
                // Switch to SummaryMocks.edgeParams to see empty data/edge case UI
                params: $.extend({}, SummaryMocks.bingdexParams) 
            }
        };

        if (Config.Window.SiteReporterDisabled) {
            defaults.disabledPlaceholder = SiteDisabledTemplate;
        }

        let summary = new View.Widget($("#sample"), defaults);
        summary.loadData();
    });

    export function setupMockjax(): void {
        SummaryMocks.setupFiltersMock();
        SummaryMocks.setupScanTimeMock();
        SummaryMocks.setupTokenDataMock();
        SummaryMocks.setupBugsForTagBlobUrlBingdexTop100Mock();
        SummaryMocks.setupBugsForTagBlobUrlAlexaTop100Mock();
        SummaryMocks.setupBugsForTagBlobUrlMindtreeNotoriousMock();
        SummaryMocks.setupBugsForTagBlobUrlFakeTagMock();
        SummaryMocks.setupBugsForTagBingdexTop100Mock();
        SummaryMocks.setupBugsForTagAlexaTop100Mock();
        SummaryMocks.setupBugsForTagMindtreeNotoriousMock();
        SummaryMocks.setupBugsForTagFakeTagEdgeMock();
        SummaryMocks.setupTrendsForTagBingdexTop100Mock();
        SummaryMocks.setupTrendsForTagAlexaTop100Mock();
        SummaryMocks.setupTrendsForTagMindtreeNotoriousMock();
        SummaryMocks.setupTrendsForTagFakeTagMock();
    }
}