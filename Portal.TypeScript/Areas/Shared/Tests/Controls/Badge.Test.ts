import "jquery";
import "qunit";
import Badge = require("Areas/Shared/Controls/Badge");

export = Main;

module Main {
    function getMockBadge(): Badge.IWidgetDefaults {
        return {};
    }

    QUnit.start();
    QUnit.module("Badge");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Badge, "Badge loaded");
        assert.equal(typeof (Badge.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Badge.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
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
        assert.ok(widget.element.hasClass(Badge.Widget.widgetClass), "Widget class is present");
        assert.equal(widget.element.text(), defaults.viewModelData.text, "Badge text rendered correctly");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
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
        assert.ok(!widget.element.hasClass(Badge.Widget.widgetClass), "Widget class is present");
        assert.equal(widget.element.text(), "", "Badge text destroys correctly");
    });

    QUnit.test("Badge class computeds works correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Badge.IWidgetDefaults = {
            viewModelData: {
                text: "My badge"
            }
        };
        let widget = new Badge.Widget($("#qunit-fixture"), defaults);
        let badgeClasses = [
            "badge--warning",
            "badge--error",
            "badge--primary",
            "badge--cyan",
            "badge--gold",
            "badge--light-gray",
            "badge--light-green"
        ];
        let noTypeClassesInitially = false;
        let defaultClassPresentAfterVMUpdate = false;
        let warningClassPresentAfterVMUpdate = false;
        let errorClassPresentAfterVMUpdate = false;
        let primaryClassPresentAfterVMUpdate = false;
        let cyanClassPresentAfterVMUpdate = false;
        let goldClassPresentAfterVMUpdate = false;
        let lightGrayClassPresentAfterVMUpdate = false;
        let lightGreenClassPresentAfterVMUpdate = false;

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

        widget.viewModel.type(Badge.Type.Cyan);
        cyanClassPresentAfterVMUpdate = widget.element.hasClass(badgeClasses[3]);

        widget.viewModel.type(Badge.Type.Gold);
        goldClassPresentAfterVMUpdate = widget.element.hasClass(badgeClasses[4]);

        widget.viewModel.type(Badge.Type.LightGray);
        lightGrayClassPresentAfterVMUpdate = widget.element.hasClass(badgeClasses[5]);

        widget.viewModel.type(Badge.Type.LightGreen);
        lightGreenClassPresentAfterVMUpdate = widget.element.hasClass(badgeClasses[6]);

        // Assert
        assert.ok(noTypeClassesInitially, "No badge classes present initially");
        assert.ok(defaultClassPresentAfterVMUpdate, "Default badge class renders correctly");
        assert.ok(warningClassPresentAfterVMUpdate, "Warning Primary badge class renders correctly");
        assert.ok(errorClassPresentAfterVMUpdate, "Error badge class renders correctly");
        assert.ok(primaryClassPresentAfterVMUpdate, "Primary badge class renders correctly");
        assert.ok(cyanClassPresentAfterVMUpdate, "Cyan badge class renders correctly");
        assert.ok(goldClassPresentAfterVMUpdate, "Gold badge class renders correctly");
        assert.ok(lightGrayClassPresentAfterVMUpdate, "Light Gray badge class renders correctly");
        assert.ok(lightGreenClassPresentAfterVMUpdate, "Light Green badge class renders correctly");

        widget.destroy();
    });
}