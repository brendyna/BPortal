import Config = require("../../Config");
import View = require("../../Views/Details.View");

import DetailsMocks = require("../Helpers/Details.Mocks");

import SiteDisabledTemplate = require("../../Templates/SiteDisabled.Template");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            disableAutoLoad: true,
            viewContext: {
                params: $.extend({}, DetailsMocks.facebookParams)
            }
        };

        if (Config.Window.SiteReporterDisabled) {
            defaults.disabledPlaceholder = SiteDisabledTemplate;
        }

        let details = new View.Widget($("#sample"), defaults);
    });

    export function setupMockjax(): void {
        DetailsMocks.setupDetailsForDomainMock();
        DetailsMocks.setupFiltersMock();
        DetailsMocks.setupBugsForDomainBlobUrlMock();
        DetailsMocks.setupBugsForDomainMock();
        DetailsMocks.setupScanTimeMock();
        DetailsMocks.setupBuildWithDataForDomainMock();
        DetailsMocks.setupBugTrendsBlobUrlMock();
        DetailsMocks.setupBugTrendsMock();
        DetailsMocks.setupTrendsForDomainMock();
        DetailsMocks.setupTrendsForDomainTh2Mock();
    }
}