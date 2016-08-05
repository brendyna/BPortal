import $ = require("jquery");
import Header = require("Areas/Shared/Controls/Header");

export = Main;

module Main {
    $((): void => {
        QUnit.module("Header");
        test("Control exists", 3, () => {
            // Assert
            ok(Header, "Header loaded");
            equal(typeof (Header.ViewModel), "function", "ViewModel defined");
            equal(typeof (Header.Widget), "function", "Widget defined");
        });

        test("Control initializes correctly", 3, () => {
            // Setup
            let fixture = $("qunit-fixture");
            let defaults: Header.IWidgetDefaults = {
                viewModelData: {
                    title: "Site Reporter"
                }
            };
            let widget: Header.Widget;
            let noChildrenInitially: boolean;
            let childrenPresentAfterRender: boolean;
            let widgetClassExists: boolean;

            // Act
            noChildrenInitially = fixture.children().length === 0;
            widget = new Header.Widget($("#qunit-fixture"), defaults);
            childrenPresentAfterRender = widget.element.children().length > 0;
            widgetClassExists = widget.element.hasClass(Header.Widget.widgetClass);

            // Assert
            ok(noChildrenInitially, "Fixture has no children before render");
            ok(childrenPresentAfterRender, "Fixture has children after render");
            ok(widgetClassExists, "Fixture has the widget class applied after render");

            widget.destroy();
        });

        test("Control renders title correctly", 1, () => {
            // Setup
            let defaults: Header.IWidgetDefaults = {
                viewModelData: {
                    title: "Site Reporter"
                }
            };
            let widget = new Header.Widget($("#qunit-fixture"), defaults);

            // Assert
            equal(widget.element.find("h1").text(), widget.viewModel.title(), "DOM title matches ViewModel title");

            widget.destroy();
        });

        test("Control renders subtitle correctly", 2, () => {
            // Setup
            let defaults: Header.IWidgetDefaults = {
                viewModelData: {
                    title: "Site Reporter",
                    subtitle: "facebook.com"
                }
            };
            let widget = new Header.Widget($("#qunit-fixture"), defaults);
            let subtitleMatchesViewModel: boolean;
            let domUpdatesWhenViewModelChanges: boolean;

            // Act
            subtitleMatchesViewModel = widget.element.find("p").text().indexOf(widget.viewModel.subtitle()) !== -1;
            widget.viewModel.subtitle("");
            domUpdatesWhenViewModelChanges = widget.element.find("p").length === 0;

            // Assert
            ok(subtitleMatchesViewModel, "DOM subtitle matches ViewModel subtitle");
            ok(domUpdatesWhenViewModelChanges, "Emptying subtitle in viewmodel hides DOM element");

            widget.destroy();
        });

        test("Control destroys correctly", 3, () => {
            // Setup
            let defaults: Header.IWidgetDefaults = {
                viewModelData: {
                    title: "Site Reporter"
                }
            };
            let widget = new Header.Widget($("#qunit-fixture"), defaults);
            let childrenPresentBeforeDestroy: boolean;
            let noChildrenAfterDestroy: boolean;
            let widgetClassRemoved: boolean;

            // Act
            childrenPresentBeforeDestroy = widget.element.children().length > 0;
            widget.destroy();
            noChildrenAfterDestroy = widget.element.children().length === 0;
            widgetClassRemoved = !widget.element.hasClass(Header.Widget.widgetClass);

            // Assert
            ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
            ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
            ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
        });
    });
}