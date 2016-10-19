import "jquery";
import "qunit";
import Header = require("Areas/Shared/Controls/Header");

export = Main;

module Main {
    QUnit.start();
    QUnit.module("Header");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Header, "Header loaded");
        assert.equal(typeof (Header.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Header.Widget), "function", "Widget defined");
    });

    QUnit.test("Control initializes correctly", (assert) => {
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
        assert.ok(noChildrenInitially, "Fixture has no children before render");
        assert.ok(childrenPresentAfterRender, "Fixture has children after render");
        assert.ok(widgetClassExists, "Fixture has the widget class applied after render");

        widget.destroy();
    });

    QUnit.test("Control renders title correctly", (assert) => {
        // Setup
        let defaults: Header.IWidgetDefaults = {
            viewModelData: {
                title: "Site Reporter"
            }
        };
        let widget = new Header.Widget($("#qunit-fixture"), defaults);

        // Assert
        assert.equal(widget.element.find("h1").text(), widget.viewModel.title(), "DOM title matches ViewModel title");

        widget.destroy();
    });

    QUnit.test("Control renders subtitle correctly", (assert) => {
        // Setup
        let defaults: Header.IWidgetDefaults = {
            viewModelData: {
                title: "Site Reporter",
                subtitle: "faceboassert.ok.com"
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
        assert.ok(subtitleMatchesViewModel, "DOM subtitle matches ViewModel subtitle");
        assert.ok(domUpdatesWhenViewModelChanges, "Emptying subtitle in viewmodel hides DOM element");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
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
        assert.ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
        assert.ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
        assert.ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
    });
}