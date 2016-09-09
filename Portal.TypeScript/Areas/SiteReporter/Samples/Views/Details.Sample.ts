import Config = require("../../Config");
import View = require("../../Views/Details.View");

import DetailsMocks = require("../Helpers/Details.Mocks");

import SiteDisabledTemplate = require("../../Templates/SiteDisabled.Template");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
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
        DetailsMocks.setupDetailsForDomainEdgeMock();
        DetailsMocks.setupFiltersMock();
        DetailsMocks.setupFiltersEdgeMock();
        DetailsMocks.setupBugsForDomainBlobUrlMock();
        DetailsMocks.setupBugsForDomainBlobUrlEdgeMock();
        DetailsMocks.setupBugsForDomainMock();
        DetailsMocks.setupBugsForDomainEdgeMock();
        DetailsMocks.setupScanTimeMock();
        DetailsMocks.setupScanTimeEdgeMock();
        DetailsMocks.setupBuildWithDataForDomainMock();
        DetailsMocks.setupBuildWithDataForDomainEdgeMock();
        DetailsMocks.setupBugTrendsBlobUrlMock();
        DetailsMocks.setupBugTrendsBlobUrlEdgeMock();
        DetailsMocks.setupBugTrendsMock();
        DetailsMocks.setupBugTrendsEdgeMock();
        DetailsMocks.setupTrendsForDomainMock();
        DetailsMocks.setupTrendsForDomainEdgeMock();
        DetailsMocks.setupTrendsForDomainTh2Mock();
    }
}