import "jquery";
import "qunit";

import DescriptionList = require("Areas/Shared/Controls/DescriptionList");

export = Main;

module Main {
    QUnit.start();
    QUnit.module("DescriptionList");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(DescriptionList, "DescriptionList loaded");
        assert.equal(typeof (DescriptionList.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (DescriptionList.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: DescriptionList.IWidgetDefaults = {
            viewModelData: {
            }
        };
        let widget = new DescriptionList.Widget($("#qunit-fixture"), defaults);

        // Act

        // Assert
        assert.ok(widget.element.hasClass(DescriptionList.Widget.widgetClass), "Widget class is present");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: DescriptionList.IWidgetDefaults = {
            viewModelData: {
            }
        };
        let widget = new DescriptionList.Widget($("#qunit-fixture"), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(DescriptionList.Widget.widgetClass), "Widget class is present");
    });
}