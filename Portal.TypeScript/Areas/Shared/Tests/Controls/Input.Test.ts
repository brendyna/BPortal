import $ = require("jquery");
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

    $((): void => {
        QUnit.module("Input");
        test("Control exists", 3, () => {
            // Assert
            ok(Input, "Input loaded");
            equal(typeof (Input.ViewModel), "function", "ViewModel defined");
            equal(typeof (Input.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 1, () => {
            // Setup
            let fixture = setupAndGetFixture();
            let defaults = getMockDefaults();
            let widget = new Input.Widget(fixture.find("input"), defaults);

            // Act

            // Assert
            ok(widget.element.hasClass(Input.Widget.widgetClass), "Widget class is present");

            widget.destroy();
        });

        test("Control destroys correctly", 1, () => {
            // Setup
            let defaults = getMockDefaults();
            let widget = new Input.Widget(setupAndGetFixture().find("input"), defaults);

            // Act
            widget.destroy();

            // Assert
            ok(!widget.element.hasClass(Input.Widget.widgetClass), "Widget class is removed");
        });
    });
}