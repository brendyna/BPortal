import $ = require("jquery");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");

export = Main;

module Main {
    $((): void => {
        QUnit.module("DescriptionList");
        test("Control exists", 3, () => {
            // Assert
            ok(DescriptionList, "DescriptionList loaded");
            equal(typeof (DescriptionList.ViewModel), "function", "ViewModel defined");
            equal(typeof (DescriptionList.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 1, () => {
            // Setup
            let fixture = $("qunit-fixture");
            let defaults: DescriptionList.IWidgetDefaults = {
                viewModelData: {
                }
            };
            let widget = new DescriptionList.Widget($("#qunit-fixture"), defaults);

            // Act

            // Assert
            ok(widget.element.hasClass(DescriptionList.Widget.widgetClass), "Widget class is present");

            widget.destroy();
        });

        test("Control destroys correctly", 1, () => {
            // Setup
            let defaults: DescriptionList.IWidgetDefaults = {
                viewModelData: {
                }
            };
            let widget = new DescriptionList.Widget($("#qunit-fixture"), defaults);

            // Act
            widget.destroy();

            // Assert
            ok(!widget.element.hasClass(DescriptionList.Widget.widgetClass), "Widget class is present");
        });
    });
}