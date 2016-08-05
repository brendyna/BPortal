import $ = require("jquery");
import Config = require("../Config");

export = Main;

module Main {
    export function toSummaryPage(tag: string, platform: string, release: string): void {
        window.location.href = Config.Urls.SummaryPage
            + Config.Params.Tag + '=' + tag
            + '&' + Config.Params.Platform + '=' + platform
            + '&' + Config.Params.Release + '=' + release;
    }

    export function toDetailsPage(domain: string, platform: string, release: string): void {
        window.location.href = Config.Urls.DetailsPage
            + Config.Params.Domain + '=' + domain
            + '&' + Config.Params.Platform + '=' + platform
            + '&' + Config.Params.Release + '=' + release;
    }
}