import "jquery.mockjax";
import BaseConfig = require("Areas/Shared/Config");
import Config = require("../../Config");
import CrawlRepo = require("../../Data/Repositories/CrawlScheduler.Repository");

export = Main;

module Main {
    if (BaseConfig.isTestRunnerMode()) {
        $.mockjaxSettings.logging = false;
    }

    export function setupCrawlSubmitMock(): void {
        $.mockjax({
            url: [Config.Urls.Portal, Config.Endpoints.CrawlerLaunch].join("/"),
            type: "post",
            responseText: getMockCrawlSubmitResponse()
        });
    }

    export function getMockCrawlSubmitResponse(): CrawlRepo.DataTransferObject {
        return { status: "success" };
    }
}