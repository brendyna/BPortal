import "jquery";
import "qunit";

import Base = require("Areas/Shared/Controls/Base");
import Button = require("Areas/Shared/Controls/Button");

export = Main;

module Main {
    function getMockButton(): Button.IWidgetDefaults {
        return {};
    }

    QUnit.start();
    QUnit.module("Button");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Button, "Button loaded");
        assert.equal(typeof (Button.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Button.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Button.IWidgetDefaults = {
            viewModelData: {
                text: "My button"
            }
        };
        let widget = new Button.Widget($("#qunit-fixture"), defaults);

        // Act

        // Assert
        assert.ok(widget.element.hasClass(Button.Widget.widgetClass), "Widget class is present");
        assert.equal(widget.element.text(), defaults.viewModelData.text, "Button text rendered correctly");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: Button.IWidgetDefaults = {
            viewModelData: {
                text: "My button"
            }
        };
        let widget = new Button.Widget($("#qunit-fixture"), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Button.Widget.widgetClass), "Widget class is present");
        assert.equal(widget.element.text(), "", "Button text destroys correctly");
    });

    QUnit.test("Click callback works correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Button.IWidgetDefaults = {
            viewModelData: {
                text: "My button",
                clickCallback: () => {
                    callbackHit = true;
                }
            }
        };
        let widget = new Button.Widget($("#qunit-fixture"), defaults);
        let callbackHit = false;

        // Act
        widget.element.click();

        // Assert
        assert.ok(callbackHit, "The callback is correctly invassert.oked");

        widget.destroy();
    });

    QUnit.test("Button class computeds works correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Button.IWidgetDefaults = {
            viewModelData: {
                text: "My button"
            }
        };
        let widget = new Button.Widget($("#qunit-fixture"), defaults);
        let buttonClasses = ["button--primary", "button--page-primary", "button--warning", "button--textual"];
        let noTypeClassesInitially = false;
        let primaryClassPresentAfterVMUpdate = false;
        let pagePrimaryClassPresentAfterVMUpdate = false;
        let warningClassPresentAfterVMUpdate = false;
        let textualClassPresentAfterVMUpdate = false;

        // Act
        noTypeClassesInitially = !widget.element.hasClass(buttonClasses.join(" "));

        widget.viewModel.type(Button.Type.Primary);
        primaryClassPresentAfterVMUpdate = widget.element.hasClass(buttonClasses[0]);

        widget.viewModel.type(Button.Type.PagePrimary);
        pagePrimaryClassPresentAfterVMUpdate = widget.element.hasClass(buttonClasses[1]);

        widget.viewModel.type(Button.Type.Warning);
        warningClassPresentAfterVMUpdate = widget.element.hasClass(buttonClasses[2]);

        widget.viewModel.type(Button.Type.Textual);
        textualClassPresentAfterVMUpdate = widget.element.hasClass(buttonClasses[3]);

        // Assert
        assert.ok(noTypeClassesInitially, "No button classes present initially");
        assert.ok(primaryClassPresentAfterVMUpdate, "Primary button class renders correctly");
        assert.ok(pagePrimaryClassPresentAfterVMUpdate, "Page Primary button class renders correctly");
        assert.ok(warningClassPresentAfterVMUpdate, "Warning button class renders correctly");
        assert.ok(textualClassPresentAfterVMUpdate, "Textual button class renders correctly");

        widget.destroy();
    });
}