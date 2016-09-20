import "jquery";
import "qunit";

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

    QUnit.start();
    QUnit.module("Icon");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Icon, "Icon loaded");
        assert.equal(typeof (Icon.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Icon.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Icon.Widget(fixture, defaults);

        // Act

        // Assert
        assert.ok(widget.element.hasClass(Icon.Widget.widgetClass), "Widget class is present");
        assert.notEqual(widget.element.attr("data-bind"), undefined, "Data-bind attribute is set");
        assert.ok(widget.element.hasClass(defaults.viewModelData.type), "The correct icon class is applied");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults = getMockDefaults();
        let widget = new Icon.Widget(setupAndGetFixture(), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Icon.Widget.widgetClass), "Widget class is removed");
        assert.equal(widget.element.attr("data-bind"), undefined, "Data-bind attribute is removed");
        assert.ok(!widget.element.hasClass(defaults.viewModelData.type), "The icon class is removed");
    });
}