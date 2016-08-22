import $ = require("jquery");
import Config = require("../Config");
import View = require("./Details.View");

import SiteDisabledTemplate = require("../Templates/SiteDisabled.Template");

export = Main;

module Main {
    $((): void => {
        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: $.extend({}, $.extend({}, Config.Params.DetailsDefaults))
            }
        };

        if (Config.Window.SiteReporterDisabled) {
            defaults.disabledPlaceholder = SiteDisabledTemplate;
        }

        let details = new View.Widget($("#details"), defaults);
    });
}