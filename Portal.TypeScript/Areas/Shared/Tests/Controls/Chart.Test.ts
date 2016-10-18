import "jquery";
import "qunit";
import Chart = require("Areas/Shared/Controls/Chart");

export = Main;

module Main {
    QUnit.start();
    QUnit.module("Chart");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Chart, "Chart loaded");
        assert.equal(typeof (Chart.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Chart.Widget), "function", "Widget defined");
    });

    //QUnit.test("Control renders correctly", (assert) => {
    //    // Setup
    //    let fixture = $("#qunit-fixture");
    //    let defaults: Chart.IWidgetDefaults = {
    //    };
    //    let widget = new Chart.Widget(fixture, defaults);

    //    // Act


    //    // Assert
    //    assert.ok(widget.element.hasClass(Chart.Widget.widgetClass), "Fixture has the widget class applied after render");

    //    widget.destroy();
    //});

    //QUnit.test("Control destroys correctly", (assert) => {
    //    // Setup
    //    let widget = new Chart.Widget($("#qunit-fixture"));
    //    let childrenPresentBeforeDestroy: boolean;
    //    let noChildrenAfterDestroy: boolean;
    //    let widgetClassRemoved: boolean;

    //    // Act
    //    widget.destroy();

    //    // Assert
    //    assert.ok(!widget.element.hasClass(Chart.Widget.widgetClass), "Fixture does not have the widget class after destroy");
    //});
}