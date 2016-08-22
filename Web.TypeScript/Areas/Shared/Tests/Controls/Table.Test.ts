import $ = require("jquery");
import Table = require("Areas/Shared/Controls/Table");

export = Main;

module Main {
    $((): void => {
        QUnit.module("Table");
        test("Control exists", 3, () => {
            // Assert
            ok(Table, "Table loaded");
            equal(typeof (Table.ViewModel), "function", "ViewModel defined");
            equal(typeof (Table.Widget), "function", "Widget defined");
        });

        //test("Control renders correctly", 1, () => {
        //    // Setup
        //    let fixture = $("#qunit-fixture");
        //    let defaults: Table.IWidgetDefaults = {
        //    };
        //    let widget = new Table.Widget(fixture, defaults);

        //    // Act


        //    // Assert
        //    ok(widget.element.hasClass(Table.Widget.widgetClass), "Fixture has the widget class applied after render");

        //    widget.destroy();
        //});

        //test("Control destroys correctly", 1, () => {
        //    // Setup
        //    let widget = new Table.Widget($("#qunit-fixture"));
        //    let childrenPresentBeforeDestroy: boolean;
        //    let noChildrenAfterDestroy: boolean;
        //    let widgetClassRemoved: boolean;

        //    // Act
        //    widget.destroy();

        //    // Assert
        //    ok(!widget.element.hasClass(Table.Widget.widgetClass), "Fixture does not have the widget class after destroy");
        //});
    });
}