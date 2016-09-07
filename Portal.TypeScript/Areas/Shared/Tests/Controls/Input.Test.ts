import "jquery";
import "qunit";

import Base = require("Areas/Shared/Controls/Base");
import Input = require("Areas/Shared/Controls/Input");

export = Main;

module Main {
    function setupAndGetFixture(): JQuery {
        let fixture = $("#qunit-fixture");

        fixture.append($("<input />"));

        return fixture;
    }

    function getMockDefaults(): Input.IWidgetDefaults {
        return {
            viewModelData: {
            }
        };
    }

    QUnit.start();
    QUnit.module("Input");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Input, "Input loaded");
        assert.equal(typeof (Input.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Input.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Input.Widget(fixture.find("input"), defaults);

        // Act

        // Assert
        assert.ok(widget.element.hasClass(Input.Widget.widgetClass), "Widget class is present");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults = getMockDefaults();
        let widget = new Input.Widget(setupAndGetFixture().find("input"), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Input.Widget.widgetClass), "Widget class is removed");
    });
}