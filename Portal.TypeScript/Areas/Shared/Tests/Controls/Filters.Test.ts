﻿import "jquery";
import "qunit";
import Filters = require("Areas/Shared/Controls/Filters");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    function getMockSelectData(): Array<Select.IViewModelData> {
        return [
            {
                name: "foo",
                options: [
                    { text: "a", value: "a-value" },
                    { text: "b", value: "b-value" }
                ]
            }
        ];
    }

    QUnit.start();
    QUnit.module("Filters");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Filters, "Filters loaded");
        assert.equal(typeof (Filters.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Filters.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Filters.IWidgetDefaults = {
        };
        let widget: Filters.Widget;
        let noChildrenInitially: boolean;
        let childrenPresentAfterRender: boolean;
        let widgetClassExists: boolean;

        // Act
        noChildrenInitially = fixture.children().length === 0;
        widget = new Filters.Widget($("#qunit-fixture"), defaults);
        childrenPresentAfterRender = widget.element.children().length > 0;
        widgetClassExists = widget.element.hasClass(Filters.Widget.widgetClass);

        // Assert
        assert.ok(noChildrenInitially, "Fixture has no children before render");
        assert.ok(childrenPresentAfterRender, "Fixture has children after render");
        assert.ok(widgetClassExists, "Fixture has the widget class applied after render");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: Filters.IWidgetDefaults = {
        };
        let widget = new Filters.Widget($("#qunit-fixture"), defaults);
        let childrenPresentBeforeDestroy: boolean;
        let noChildrenAfterDestroy: boolean;
        let widgetClassRemoved: boolean;

        // Act
        childrenPresentBeforeDestroy = widget.element.children().length > 0;
        widget.destroy();
        noChildrenAfterDestroy = widget.element.children().length === 0;
        widgetClassRemoved = !widget.element.hasClass(Filters.Widget.widgetClass);

        // Assert
        assert.ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
        assert.ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
        assert.ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
    });

    QUnit.test("Button click callbacks are triggered", (assert) => {
        // Setup
        let defaults: Filters.IWidgetDefaults = {
            viewModelData: {
                selectData: getMockSelectData(),
                applyFilterCallback: () => {
                    applyCallbackReached = true;
                },
                resetFilterCallback: () => {
                    resetCallbackReached = true;
                }
            }
        };
        let widget = new Filters.Widget($("#qunit-fixture"), defaults);
        let applyCallbackReached = false;
        let resetCallbackReached = false;

        // Act
        widget.element.find(".filters__apply").click();
        widget.element.find(".filters__reset").click();

        // Assert
        assert.ok(applyCallbackReached, "The apply callback is invassert.oked when the apply button is clicked");
        assert.ok(resetCallbackReached, "The reset callback is invassert.oked when the reset button is clicked");

        // Cleanup
        widget.destroy();
    });

    QUnit.test("Selects and buttons disable when control is disabled", (assert) => {
        // Setup
        let defaults: Filters.IWidgetDefaults = {
            viewModelData: {
                selectData: getMockSelectData()
            }
        };
        let widget = new Filters.Widget($("#qunit-fixture"), defaults);
        let select: JQuery;
        let applyButton: JQuery;
        let resetButton: JQuery;

        // Act
        widget.viewModel.disabled(true);
        select = widget.element.find("select");
        applyButton = widget.element.find(".filters__apply");
        resetButton = widget.element.find(".filters__reset");

        // Assert
        assert.equal(widget.element.find("select").attr("disabled"), "disabled", "The filter select is disabled");
        assert.equal(widget.element.find(".filters__apply").attr("disabled"), "disabled", "The apply button is disabled");
        assert.equal(widget.element.find(".filters__reset").attr("disabled"), "disabled", "The reset button is disabled");

        // Cleanup
        widget.destroy();
    });

    QUnit.test("UX change triggers view model value changes", (assert) => {
        // Setup
        let selectData = getMockSelectData();
        let filterSelect: JQuery;
        let defaults: Filters.IWidgetDefaults = {
            viewModelData: {
                selectData: selectData
            }
        };
        let widget = new Filters.Widget($("#qunit-fixture"), defaults);
        let initialViewModelValue: IDictionary<string>;
        let viewModelValueAfterUpdate: IDictionary<string>;
        let expectedViewModelValue = { "foo": selectData[0].options[1].value };

        // Act
        initialViewModelValue = widget.viewModel.value();

        filterSelect = widget.element.find("select:first-of-type");
        filterSelect.val(selectData[0].options[1].value).change();
        viewModelValueAfterUpdate = widget.viewModel.value();

        // Assert
        assert.notDeepEqual(initialViewModelValue, expectedViewModelValue, "Initial and updated view model values are different");
        assert.deepEqual(viewModelValueAfterUpdate, expectedViewModelValue, "View model value updated correctly");

        // Cleanup
        widget.destroy();
    });

    QUnit.test("Value property on view model matches select values", (assert) => {
        // Setup
        let selectData = getMockSelectData();
        let filterSelect: JQuery;
        let filterOption: JQuery;
        let defaults: Filters.IWidgetDefaults = {
            viewModelData: {
                selectData: selectData
            }
        };
        let widget = new Filters.Widget($("#qunit-fixture"), defaults);
        let initialValue: IDictionary<string>;
        let expectedInitialValue = {
            "foo": "a-value"
        };
        let valueAfterUpdate: IDictionary<string>;
        let expectedValueAfterUpdate = {
            "foo": "b-value"
        };
        let initialValueViaDefaults: IDictionary<string>;
        let expectedInitialValueViaDefaults = {
            "foo": "b-value"
        };

        // Act
        initialValue = widget.viewModel.value();

        widget.selectWidgets[0].viewModel.value(selectData[0].options[1].value);
        valueAfterUpdate = widget.viewModel.value();

        widget.destroy();
        selectData[0].value = selectData[0].options[1].value;
        widget = new Filters.Widget($("#qunit-fixture"), defaults);
        initialValueViaDefaults = widget.viewModel.value();

        // Assert
        assert.deepEqual(initialValue, expectedInitialValue, "Widget/view model value default is correct");
        assert.deepEqual(valueAfterUpdate, expectedValueAfterUpdate, "Widget/view model value correct after view model update");
        assert.deepEqual(initialValueViaDefaults, expectedInitialValueViaDefaults, "Widget/view model value correct when view model defaults set");

        // Cleanup
        widget.destroy();
    });
}