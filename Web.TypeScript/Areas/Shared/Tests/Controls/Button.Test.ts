import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");
import Button = require("Areas/Shared/Controls/Button");

export = Main;

module Main {
    function getMockButton(): Button.IWidgetDefaults {
        return {};
    }

    $((): void => {
        QUnit.module("Button");
        test("Control exists", 3, () => {
            // Assert
            ok(Button, "Button loaded");
            equal(typeof (Button.ViewModel), "function", "ViewModel defined");
            equal(typeof (Button.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 2, () => {
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
            ok(widget.element.hasClass(Button.Widget.widgetClass), "Widget class is present");
            equal(widget.element.text(), defaults.viewModelData.text, "Button text rendered correctly");

            widget.destroy();
        });

        test("Control destroys correctly", 2, () => {
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
            ok(!widget.element.hasClass(Button.Widget.widgetClass), "Widget class is present");
            equal(widget.element.text(), "", "Button text destroys correctly");
        });

        test("Click callback works correctly", 1, () => {
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
            ok(callbackHit, "The callback is correctly invoked");

            widget.destroy();
        });

        test("Button class computeds works correctly", 5, () => {
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
            ok(noTypeClassesInitially, "No button classes present initially");
            ok(primaryClassPresentAfterVMUpdate, "Primary button class renders correctly");
            ok(pagePrimaryClassPresentAfterVMUpdate, "Page Primary button class renders correctly");
            ok(warningClassPresentAfterVMUpdate, "Warning button class renders correctly");
            ok(textualClassPresentAfterVMUpdate, "Textual button class renders correctly");

            widget.destroy();
        });
    });
}