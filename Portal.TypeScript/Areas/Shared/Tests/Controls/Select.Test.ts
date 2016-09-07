import "jquery";
import "qunit";

import Base = require("Areas/Shared/Controls/Base");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    function setupAndGetFixture(): JQuery {
        let fixture = $("#qunit-fixture");

        fixture.append($("<select></select>"));

        return fixture;
    }

    function getMockDefaults(): Select.IWidgetDefaults {
        return {
            viewModelData: {
                id: "foo",
                name: "Foo",
                label: "A great selection",
                options: [
                    { text: "Apple", value: "apple" },
                    { text: "Banana", value: "banana" },
                    { text: "Pear", value: "pear" }
                ]
            }
        };
    }

    QUnit.start();
    QUnit.module("Select");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Select, "Select loaded");
        assert.equal(typeof (Select.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Select.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let label = $("label[for=" + widget.element.attr("id") + "]");

        // Act

        // Assert
        assert.ok(widget.element.hasClass(Select.Widget.widgetClass), "Widget class is present");
        assert.notEqual(widget.element.attr("data-bind"), undefined, "Data-bind attribute is set");
        assert.equal(widget.element.attr("name"), defaults.viewModelData.name, "The name attribute is rendered correctly");

        widget.destroy();
    });

    QUnit.test("Control disables correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let initialDisabledState: string;
        let disabledStateAfterVMChange: string;

        // Act
        initialDisabledState = widget.element.attr("disabled");
        widget.viewModel.disabled(true);
        disabledStateAfterVMChange = widget.element.attr("disabled");

        // Assert
        assert.notEqual(initialDisabledState, "disabled", "Control is not disabled by default");
        assert.equal(disabledStateAfterVMChange, "disabled", "Control is disabled when view model is updated");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: Select.IWidgetDefaults = {
        };
        let widget = new Select.Widget(setupAndGetFixture().find("select"), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Select.Widget.widgetClass), "Widget class is removed");
        assert.equal(widget.element.attr("data-bind"), undefined, "Data-bind attribute is removed");
        assert.equal(widget.element.attr("name"), undefined, "The name attribute is removed");
        assert.equal(widget.element.find("option").length, 0, "All options are removed");
        assert.equal($("#qunit-fixture label").length, 0, "The label element is removed");
    });

    QUnit.test("Label element is rendered correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let label = $("label[for=" + widget.viewModel.id() + "]");

        // Assert
        assert.equal(label.length, 1, "The label element was inserted");
        assert.ok(label.next().hasClass(Select.Widget.widgetClass), "The label was inserted directly before the select");
        assert.equal(label.text(), defaults.viewModelData.label, "The label text matches view model data");

        widget.destroy();
    });

    QUnit.test("Label element updates correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let label = $("label[for=" + widget.viewModel.id() + "]");
        let updatedLabelText = "More great selections";
        let initialLabelText: string;
        let labelTextAfterVMUpdate: string;

        // Act
        initialLabelText = label.text();
        widget.viewModel.label(updatedLabelText);
        labelTextAfterVMUpdate = label.text();

        // Assert
        assert.notEqual(labelTextAfterVMUpdate, initialLabelText, "The updated and original label text don't match");
        assert.equal(labelTextAfterVMUpdate, updatedLabelText, "The label text updates correctly when the viewmodel value changes");

        widget.destroy();
    });

    QUnit.test("Options are rendered correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let label = $("label[for=" + widget.element.attr("id") + "]");
        let options = widget.element.find("option");

        // Act

        // Assert
        assert.equal(options.length, defaults.viewModelData.options.length, "The number of options rendered matches view model data");
        assert.equal($(options[0]).text(), defaults.viewModelData.options[0].text, "First options text matches the view model data");
        assert.equal($(options[0]).val(), defaults.viewModelData.options[0].value, "First options value matches the view model data");
        assert.equal($(options[1]).text(), defaults.viewModelData.options[1].text, "Second options text matches the view model data");
        assert.equal($(options[1]).val(), defaults.viewModelData.options[1].value, "Second options value matches the view model data");
        assert.equal($(options[2]).text(), defaults.viewModelData.options[2].text, "Third options text matches the view model data");
        assert.equal($(options[2]).val(), defaults.viewModelData.options[2].value, "Third options value matches the view model data");

        widget.destroy();
    });

    QUnit.test("Options update correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let newOptionDefaults = [
            { text: "Baz", value: "Biz" }
        ];
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let label = $("label[for=" + widget.element.attr("id") + "]");
        let originalOptions = widget.element.find("option");
        let newOptions: JQuery;

        // Act
        widget.viewModel.options(Base.createFromDefaults(newOptionDefaults, Select.Option));
        newOptions = widget.element.find("option");

        // Assert
        assert.notEqual(newOptions.length, originalOptions.length, "The new and old options lengths don't match");
        assert.equal(newOptions.length, newOptionDefaults.length, "The rendered options match the new view model data length");
        assert.equal($(newOptions[0]).text(), newOptionDefaults[0].text, "First options text matches the new view model data");
        assert.equal($(newOptions[0]).val(), newOptionDefaults[0].value, "First options value matches the new view model data");

        widget.destroy();
    });

    QUnit.test("Option disables correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let initialDisabledState: string;
        let disabledStateAfterVMChange: string;

        // Act
        initialDisabledState = widget.element.find("option:first-of-type").attr("disabled");
        widget.viewModel.options()[0].disabled(true);
        disabledStateAfterVMChange = widget.element.find("option:first-of-type").attr("disabled");

        // Assert
        assert.notEqual(initialDisabledState, "disabled", "Option is not disabled by default");
        assert.equal(disabledStateAfterVMChange, "disabled", "Option is disabled when view model is updated");

        widget.destroy();
    });

    QUnit.test("Option selection works correctly", (assert) => {
        // Setup
        let fixture = setupAndGetFixture();
        let defaults = getMockDefaults();
        let widget = new Select.Widget(fixture.find("select"), defaults);
        let defaultValue: string;
        let defaultSelectedIndex: number;
        let valueAfterViewModelUpdate: string;
        let selectedIndexAfterViewModelUpdate: number;
        let initialValueWhenSetViaDefaults: string;
        let initialSelectedIndexWhenSetViaDefaults: number;

        // Act
        defaultValue = widget.element.val();
        defaultSelectedIndex = widget.element.find("option:selected").index();

        widget.viewModel.value(defaults.viewModelData.options[1].value);
        valueAfterViewModelUpdate = widget.element.val();
        selectedIndexAfterViewModelUpdate = widget.element.find("option:selected").index();

        widget.destroy();
        defaults.viewModelData.value = defaults.viewModelData.options[0].value;
        widget = new Select.Widget(fixture.find("select"), defaults);
        initialValueWhenSetViaDefaults = widget.element.val();
        initialSelectedIndexWhenSetViaDefaults = widget.element.find("option:selected").index();

        // Assert
        assert.equal(defaultValue, defaults.viewModelData.options[0].value, "Initial selection value is the first option's value");
        assert.equal(defaultSelectedIndex, 0, "Initial selectedIndex is 0");
        assert.equal(valueAfterViewModelUpdate, defaults.viewModelData.options[1].value, "Correct option is selected when value is updated");
        assert.equal(selectedIndexAfterViewModelUpdate, 1, "SelectedIndex after view model change is 1");
        assert.equal(initialValueWhenSetViaDefaults, defaults.viewModelData.options[0].value, "Initial selected value matches view model defaults");
        assert.equal(initialSelectedIndexWhenSetViaDefaults, 0, "Initial selectedIndex matches view model defaults");

        // Cleanup
        widget.destroy();
    });
}