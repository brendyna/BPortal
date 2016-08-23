import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");
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

    $((): void => {
        QUnit.module("Filters");
        test("Control exists", 3, () => {
            // Assert
            ok(Filters, "Filters loaded");
            equal(typeof (Filters.ViewModel), "function", "ViewModel defined");
            equal(typeof (Filters.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 3, () => {
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
            ok(noChildrenInitially, "Fixture has no children before render");
            ok(childrenPresentAfterRender, "Fixture has children after render");
            ok(widgetClassExists, "Fixture has the widget class applied after render");

            widget.destroy();
        });

        test("Control destroys correctly", 3, () => {
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
            ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
            ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
            ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
        });

        test("Button click callbacks are triggered", 2, () => {
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
            ok(applyCallbackReached, "The apply callback is invoked when the apply button is clicked");
            ok(resetCallbackReached, "The reset callback is invoked when the reset button is clicked");

            // Cleanup
            widget.destroy();
        });

        test("Selects and buttons disable when control is disabled", 3, () => {
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
            equal(widget.element.find("select").attr("disabled"), "disabled", "The filter select is disabled");
            equal(widget.element.find(".filters__apply").attr("disabled"), "disabled", "The apply button is disabled");
            equal(widget.element.find(".filters__reset").attr("disabled"), "disabled", "The reset button is disabled");

            // Cleanup
            widget.destroy();
        });

        test("UX change triggers view model value changes", 2, () => {
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
            notDeepEqual(initialViewModelValue, expectedViewModelValue, "Initial and updated view model values are different");
            deepEqual(viewModelValueAfterUpdate, expectedViewModelValue, "View model value updated correctly");

            // Cleanup
            widget.destroy();
        });

        test("Value property on view model matches select values", 3, () => {
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
            deepEqual(initialValue, expectedInitialValue, "Widget/view model value default is correct");
            deepEqual(valueAfterUpdate, expectedValueAfterUpdate, "Widget/view model value correct after view model update");
            deepEqual(initialValueViaDefaults, expectedInitialValueViaDefaults, "Widget/view model value correct when view model defaults set");

            // Cleanup
            widget.destroy();
        });
    });
}