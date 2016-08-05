import $ = require("jquery");
import Chart = require("Areas/Shared/Controls/Chart");

export = Main;

module Main {
    $((): void => {
        QUnit.module("Chart");
        test("Control exists", 3, () => {
            // Assert
            ok(Chart, "Chart loaded");
            equal(typeof (Chart.ViewModel), "function", "ViewModel defined");
            equal(typeof (Chart.Widget), "function", "Widget defined");
        });

        //test("Control renders correctly", 1, () => {
        //    // Setup
        //    let fixture = $("#qunit-fixture");
        //    let defaults: Chart.IWidgetDefaults = {
        //    };
        //    let widget = new Chart.Widget(fixture, defaults);

        //    // Act


        //    // Assert
        //    ok(widget.element.hasClass(Chart.Widget.widgetClass), "Fixture has the widget class applied after render");

        //    widget.destroy();
        //});

        //test("Control destroys correctly", 1, () => {
        //    // Setup
        //    let widget = new Chart.Widget($("#qunit-fixture"));
        //    let childrenPresentBeforeDestroy: boolean;
        //    let noChildrenAfterDestroy: boolean;
        //    let widgetClassRemoved: boolean;

        //    // Act
        //    widget.destroy();

        //    // Assert
        //    ok(!widget.element.hasClass(Chart.Widget.widgetClass), "Fixture does not have the widget class after destroy");
        //});
    });
}