import $ = require("jquery");
import ko = require("knockout");
import Header = require("Areas/Shared/Controls/Header");

export = Main;

module Main {
    $((): void => {
        let breadcrumb = [
            { text: "Foo", url: "javascript:;" },
            { text: "Bar", url: "javascript:;" },
            { text: "Baz", url: "javascript:;" }
        ];

        // All header parts shown
        let defaults: Header.IWidgetDefaults = {
            viewModelData: {
                breadcrumb: breadcrumb,
                title: "Test title",
                subtitle: "Test subtitle"
            }
        };
        let widget = new Header.Widget($("#sample"), defaults);

        // Show breadcrumb only
        let breadcrumbOnlyDefaults: Header.IWidgetDefaults = {
            viewModelData: {
                breadcrumb: breadcrumb
            }
        };
        let widgetBreadcrumbOnly = new Header.Widget($("#sample-breadcrumb"), breadcrumbOnlyDefaults);

        // No subtitle
        let noSubtitleDefaults: Header.IWidgetDefaults = {
            viewModelData: {
                breadcrumb: breadcrumb,
                title: "Test title"
            }
        };
        let widgetNoSubtitle = new Header.Widget($("#sample-no-subtitle"), noSubtitleDefaults);

        // Rendered via custom binding handler (e.g. wpsHeader: defaults)
        let defaultsCustomBinding: Header.IWidgetDefaults = {
            viewModelData: {
                breadcrumb: breadcrumb,
                title: "Test title",
                subtitle: "Test subtitle"
            }
        };
        ko.applyBindings({ defaults: defaultsCustomBinding }, $("#sample-custom-binding")[0]);
    });
}