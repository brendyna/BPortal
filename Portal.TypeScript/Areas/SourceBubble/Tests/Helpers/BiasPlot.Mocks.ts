import "jquery.mockjax";
import BaseConfig = require("Areas/Shared/Config");
import Config = require("../../Config");
import BiasPlotRepo = require("../../Data/Repositories/BiasPlot.Repository");

export = Main;

module Main {
    export let BiasPlot = {};

    // When mockjax requests are being invoked in a command line setting,
    // hide debug information like object dumps (as they're non-interactive)
    if (BaseConfig.isTestRunnerMode()) {
        $.mockjaxSettings.logging = false;
    }

    // Each mock is a URL and a response to requests for that URL.
    // Mockjax extends jQuery to intercept AJAX calls when enabled.
    // Given mockjax is disabled in production, the requests will go to
    // their production endpoints and not mockjax. This enables the same
    // configuration to be used in testing and production.
    export function setupBiasPlotMock(): void {
        $.mockjax({
            url: [Config.Urls.ExampleApi, Config.Endpoints.Example].join("/"),
            responseText: getMockBiasPlotData(),
            responseTime: 1000
        });
    }

    export function getMockBiasPlotData(): BiasPlotRepo.DataTransferObject {
        return [
            {
                baz: "Flibble",
                biz: "Flarble"
            },
            {
                baz: "Habble",
                biz: "Hibble"
            }
        ];
    }
}