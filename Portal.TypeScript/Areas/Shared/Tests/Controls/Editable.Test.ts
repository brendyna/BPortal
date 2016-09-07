import "jquery";
import "qunit";

import Editable = require("Areas/Shared/Controls/Editable");

export = Main;

module Main {
    function initializeWidget(widget: Editable.IWidget): void {
        //widget._setupElement();
        //widget._applyBindings();
        //widget._initializeSubscriptions();
        //widget._initializeEvents();
    }

    QUnit.start();
    QUnit.module("Editable");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Editable, "Editable loaded");
        assert.equal(typeof (Editable.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Editable.Widget), "function", "Widget defined");
    });

    //QUnit.test("Control renders correctly", (assert) => {
    //    // Setup
    //    let widget = new Editable.Widget($("#qunit-fixture"), Editable.ViewModel);
    //    let widgetClassNotInitiallyPresent: boolean;
    //    let widgetClassPresentAfterSetup: boolean;

    //    // Act
    //    widgetClassNotInitiallyPresent = !widget.element.hasClass(Editable.Widget.widgetClass);
    //    initializeWidget(widget);
    //    widgetClassPresentAfterSetup = widget.element.hasClass(Editable.Widget.widgetClass);

    //    // Assert
    //    assert.ok(widgetClassNotInitiallyPresent, "Fixture did not have widget class applied before render");
    //    assert.ok(widgetClassPresentAfterSetup, "Fixture has the widget class applied after render");

    //    widget.destroy();
    //});

    //QUnit.test("Control destroys correctly", (assert) => {
    //    // Setup
    //    let defaults: Editable.IWidgetDefaults = {
    //    };
    //    let widget = new Editable.Widget($("#qunit-fixture"), Editable.ViewModel, defaults);

    //    // Act
    //    widget.destroy();

    //    // Assert
    //    assert.ok(!widget.element.hasClass(Editable.Widget.widgetClass), "Fixture does not have the widget class after destroy");
    //});
}