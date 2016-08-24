import $ = require("jquery");
import List = require("Areas/Shared/Controls/List");

export = Main;

module Main {
    $((): void => {
        QUnit.module("List");
        test("Control exists", 3, () => {
            // Assert
            ok(List, "List loaded");
            equal(typeof (List.ViewModel), "function", "ViewModel defined");
            equal(typeof (List.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 1, () => {
            // Setup
            let fixture = $("qunit-fixture");
            let defaults: List.IWidgetDefaults = {
                viewModelData: {
                }
            };
            let widget = new List.Widget($("#qunit-fixture"), defaults);

            // Act

            // Assert
            ok(widget.element.hasClass(List.Widget.widgetClass), "Widget class is present");

            widget.destroy();
        });

        test("Control destroys correctly", 1, () => {
            // Setup
            let defaults: List.IWidgetDefaults = {
                viewModelData: {
                }
            };
            let widget = new List.Widget($("#qunit-fixture"), defaults);

            // Act
            widget.destroy();

            // Assert
            ok(!widget.element.hasClass(List.Widget.widgetClass), "Widget class is present");
        });
    });
}