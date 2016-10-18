import $ = require("jquery");
import Config = require("../Config");
import SiteDisabledTemplate = require("../Templates/SiteDisabled.Template");
import View = require("./Summary.View");

export = Main;

module Main {
    $((): void => {
        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: $.extend({}, Config.Params.SummaryDefaults)
            }
        };

        if (Config.Window.SiteReporterDisabled) {
            defaults.disabledPlaceholder = SiteDisabledTemplate;
        }

        let summary = new View.Widget($("#summary"), defaults);
    });
}