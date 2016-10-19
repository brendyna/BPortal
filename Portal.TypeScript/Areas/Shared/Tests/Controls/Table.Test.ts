import "jquery";
import "qunit";
import Table = require("Areas/Shared/Controls/Table");

export = Main;

module Main {
    QUnit.start();
    QUnit.module("Table");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Table, "Table loaded");
        assert.equal(typeof (Table.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Table.Widget), "function", "Widget defined");
    });

    // Add test validating that the order observable works as expected

    //QUnit.test("Control renders correctly", (assert) => {
    //    // Setup
    //    let fixture = $("#qunit-fixture");
    //    let defaults: Table.IWidgetDefaults = {
    //    };
    //    let widget = new Table.Widget(fixture, defaults);

    //    // Act


    //    // Assert
    //    assert.ok(widget.element.hasClass(Table.Widget.widgetClass), "Fixture has the widget class applied after render");

    //    widget.destroy();
    //});

    //QUnit.test("Control destroys correctly", (assert) => {
    //    // Setup
    //    let widget = new Table.Widget($("#qunit-fixture"));
    //    let childrenPresentBeforeDestroy: boolean;
    //    let noChildrenAfterDestroy: boolean;
    //    let widgetClassRemoved: boolean;

    //    // Act
    //    widget.destroy();

    //    // Assert
    //    assert.ok(!widget.element.hasClass(Table.Widget.widgetClass), "Fixture does not have the widget class after destroy");
    //});
}