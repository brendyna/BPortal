import $ = require("jquery");
import ko = require("knockout");
import Header = require("Areas/Shared/Controls/Header");

export = Main;

module Main {
    $((): void => {
        // All header parts shown
        let defaults: Header.IWidgetDefaults = {
            viewModelData: {
                title: "Test title",
                subtitle: "Test subtitle"
            }
        };
        let widget = new Header.Widget($("#sample"), defaults);

        // No subtitle
        let noSubtitleDefaults: Header.IWidgetDefaults = {
            viewModelData: {
                title: "Test title"
            }
        };
        let widgetNoSubtitle = new Header.Widget($("#sample-no-subtitle"), noSubtitleDefaults);

        // Rendered via custom binding handler (e.g. wpsHeader: defaults)
        let defaultsCustomBinding: Header.IWidgetDefaults = {
            viewModelData: {
                title: "Test title",
                subtitle: "Test subtitle"
            }
        };
        ko.applyBindings({ defaults: defaultsCustomBinding }, $("#sample-custom-binding")[0]);
    });
}