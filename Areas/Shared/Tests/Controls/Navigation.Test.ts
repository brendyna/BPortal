import $ = require("jquery");
import Navigation = require("Areas/Shared/Controls/Navigation");

export = Main;

module Main {
    function getMockBreadcrumb(): Array<Navigation.ICrumbData> {
        return [
            { text: "Foo", url: "javascript:;" },
            { text: "Bar", url: "javascript:;" },
            { text: "Baz", url: "javascript:;" }
        ];
    }

    $((): void => {
        QUnit.module("Navigation");
        test("Control exists", 3, () => {
            // Assert
            ok(Navigation, "Navigation loaded");
            equal(typeof (Navigation.ViewModel), "function", "ViewModel defined");
            equal(typeof (Navigation.Widget), "function", "Widget defined");
        });

        test("Control initializes correctly", 3, () => {
            // Setup
            let fixture = $("qunit-fixture");
            let defaults: Navigation.IWidgetDefaults = {
                viewModelData: {
                    breadcrumb: getMockBreadcrumb()
                }
            };
            let widget: Navigation.Widget;
            let noChildrenInitially: boolean;
            let childrenPresentAfterRender: boolean;
            let widgetClassExists: boolean;

            // Act
            noChildrenInitially = fixture.children().length === 0;
            widget = new Navigation.Widget($("#qunit-fixture"), defaults);
            childrenPresentAfterRender = widget.element.children().length > 0;
            widgetClassExists = widget.element.hasClass(Navigation.Widget.widgetClass);

            // Assert
            ok(noChildrenInitially, "Fixture has no children before render");
            ok(childrenPresentAfterRender, "Fixture has children after render");
            ok(widgetClassExists, "Fixture has the widget class applied after render");

            widget.destroy();
        });

        test("Control renders breadcrumb correctly", 8, () => {
            // Setup
            let defaults: Navigation.IWidgetDefaults = {
                viewModelData: {
                    breadcrumb: getMockBreadcrumb()
                }
            };
            let widget = new Navigation.Widget($("#qunit-fixture"), defaults);
            let crumbs = widget.element.find("ul li");

            // Act

            // Assert
            equal(crumbs.length, defaults.viewModelData.breadcrumb.length, "Number of rendered crumbs matches data");
            equal(widget.element.attr("aria-label"), "breadcrumbs", "The aria-label is applied correctly");
            equal($(crumbs.get(0)).text(), defaults.viewModelData.breadcrumb[0].text, "Text for first crumb matches data");
            equal($(crumbs.get(0)).find("a").attr("href"), defaults.viewModelData.breadcrumb[0].url, "URL for first crumb matches data");
            equal($(crumbs.get(0)).attr("aria-current"), undefined, "aria-current is undefined for first crumb");
            equal($(crumbs.get(2)).text(), defaults.viewModelData.breadcrumb[2].text, "Text for second crumb matches data");
            equal($(crumbs.get(2)).find("a").length, 0, "The second/last crumb is not a link");
            equal($(crumbs.get(2)).attr("aria-current"), "page", "aria-current is set to 'page' for the second/last crumb");

            widget.destroy();
        });

        test("Control destroys correctly", 3, () => {
            // Setup
            let defaults: Navigation.IWidgetDefaults = {
                viewModelData: {
                    breadcrumb: getMockBreadcrumb()
                }
            };
            let widget = new Navigation.Widget($("#qunit-fixture"), defaults);
            let childrenPresentBeforeDestroy: boolean;
            let noChildrenAfterDestroy: boolean;
            let widgetClassRemoved: boolean;

            // Act
            childrenPresentBeforeDestroy = widget.element.children().length > 0;
            widget.destroy();
            noChildrenAfterDestroy = widget.element.children().length === 0;
            widgetClassRemoved = !widget.element.hasClass(Navigation.Widget.widgetClass);

            // Assert
            ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
            ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
            ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
        });
    });
}