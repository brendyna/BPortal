import $ = require("jquery");
import ko = require("knockout");
import Navigation = require("Areas/Shared/Controls/Navigation");

export = Main;

module Main {
    $((): void => {
        let breadcrumb = [
            { text: "Foo", url: "javascript:;" },
            { text: "Bar", url: "javascript:;" },
            { text: "Baz", url: "javascript:;" }
        ];

        // All header parts shown
        let defaults: Navigation.IWidgetDefaults = {
            viewModelData: {
                breadcrumb: breadcrumb
            }
        };
        let widget = new Navigation.Widget($("#sample"), defaults);

        // Rendered via custom binding handler (e.g. wpsNavigation: defaults)
        let defaultsCustomBinding: Navigation.IWidgetDefaults = {
            viewModelData: {
                breadcrumb: breadcrumb
            }
        };
        ko.applyBindings({ defaults: defaultsCustomBinding }, $("#sample-custom-binding")[0]);
    });
}