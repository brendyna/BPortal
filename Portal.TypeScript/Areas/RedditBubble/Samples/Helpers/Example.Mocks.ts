import "jquery.mockjax";
import BaseConfig = require("Areas/Shared/Config");
import Config = require("../../Config");
import ExampleRepo = require("../../Data/Repositories/Example.Repository");

export = Main;

module Main {
    export let example = Config.Params.Example;

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
    export function setupExampleMock(): void {
        $.mockjax({
            url: [Config.Urls.ExampleApi, Config.Endpoints.Example].join("/"),
            responseText: getMockExampleData(),
            responseTime: 1000
        });
    }

    export function getMockExampleData(): ExampleRepo.DataTransferObject {
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