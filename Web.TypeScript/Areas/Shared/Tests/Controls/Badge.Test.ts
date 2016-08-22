import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");
import Badge = require("Areas/Shared/Controls/Badge");

export = Main;

module Main {
    function getMockBadge(): Badge.IWidgetDefaults {
        return {};
    }

    $((): void => {
        QUnit.module("Badge");
        test("Control exists", 3, () => {
            // Assert
            ok(Badge, "Badge loaded");
            equal(typeof (Badge.ViewModel), "function", "ViewModel defined");
            equal(typeof (Badge.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 2, () => {
            // Setup
            let fixture = $("qunit-fixture");
            let defaults: Badge.IWidgetDefaults = {
                viewModelData: {
                    text: "My badge"
                }
            };
            let widget = new Badge.Widget($("#qunit-fixture"), defaults);

            // Act

            // Assert
            ok(widget.element.hasClass(Badge.Widget.widgetClass), "Widget class is present");
            equal(widget.element.text(), defaults.viewModelData.text, "Badge text rendered correctly");

            widget.destroy();
        });

        test("Control destroys correctly", 2, () => {
            // Setup
            let defaults: Badge.IWidgetDefaults = {
                viewModelData: {
                    text: "My badge"
                }
            };
            let widget = new Badge.Widget($("#qunit-fixture"), defaults);

            // Act
            widget.destroy();

            // Assert
            ok(!widget.element.hasClass(Badge.Widget.widgetClass), "Widget class is present");
            equal(widget.element.text(), "", "Badge text destroys correctly");
        });

        test("Badge class computeds works correctly", 5, () => {
            // Setup
            let fixture = $("qunit-fixture");
            let defaults: Badge.IWidgetDefaults = {
                viewModelData: {
                    text: "My badge"
                }
            };
            let widget = new Badge.Widget($("#qunit-fixture"), defaults);
            let badgeClasses = ["badge--warning", "badge--error", "badge--primary"];
            let noTypeClassesInitially = false;
            let defaultClassPresentAfterVMUpdate = false;
            let warningClassPresentAfterVMUpdate = false;
            let errorClassPresentAfterVMUpdate = false;
            let primaryClassPresentAfterVMUpdate = false;

            // Act
            noTypeClassesInitially = !widget.element.hasClass(badgeClasses.join(" "));

            widget.viewModel.type(Badge.Type.Default);
            defaultClassPresentAfterVMUpdate = widget.element.hasClass("badge") && !widget.element.hasClass(badgeClasses.join(" "));

            widget.viewModel.type(Badge.Type.Warning);
            warningClassPresentAfterVMUpdate = widget.element.hasClass(badgeClasses[0]);

            widget.viewModel.type(Badge.Type.Error);
            errorClassPresentAfterVMUpdate = widget.element.hasClass(badgeClasses[1]);

            widget.viewModel.type(Badge.Type.Primary);
            primaryClassPresentAfterVMUpdate = widget.element.hasClass(badgeClasses[2]);

            // Assert
            ok(noTypeClassesInitially, "No badge classes present initially");
            ok(defaultClassPresentAfterVMUpdate, "Default badge class renders correctly");
            ok(warningClassPresentAfterVMUpdate, "Warning Primary badge class renders correctly");
            ok(errorClassPresentAfterVMUpdate, "Error badge class renders correctly");
            ok(primaryClassPresentAfterVMUpdate, "Primary badge class renders correctly");

            widget.destroy();
        });
    });
}