import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");
import Icon = require("Areas/Shared/Controls/Icon");

export = Main;

module Main {
    function getMockDefaults(): Icon.IWidgetDefaults {
        return {
            viewModelData: {
                type: Icon.Type.QuickNote
            }
        };
    }

    function setupAndGetFixture(): JQuery {
        return $("#qunit-fixture");
    }

    $((): void => {
        QUnit.module("Icon");
        test("Control exists", 3, () => {
            // Assert
            ok(Icon, "Icon loaded");
            equal(typeof (Icon.ViewModel), "function", "ViewModel defined");
            equal(typeof (Icon.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 3, () => {
            // Setup
            let fixture = setupAndGetFixture();
            let defaults = getMockDefaults();
            let widget = new Icon.Widget(fixture, defaults);

            // Act

            // Assert
            ok(widget.element.hasClass(Icon.Widget.widgetClass), "Widget class is present");
            notEqual(widget.element.attr("data-bind"), undefined, "Data-bind attribute is set");
            ok(widget.element.hasClass(defaults.viewModelData.type), "The correct icon class is applied");

            widget.destroy();
        });

        test("Control destroys correctly", 3, () => {
            // Setup
            let defaults = getMockDefaults();
            let widget = new Icon.Widget(setupAndGetFixture(), defaults);

            // Act
            widget.destroy();

            // Assert
            ok(!widget.element.hasClass(Icon.Widget.widgetClass), "Widget class is removed");
            equal(widget.element.attr("data-bind"), undefined, "Data-bind attribute is removed");
            ok(!widget.element.hasClass(defaults.viewModelData.type), "The icon class is removed");
        });
    });
}