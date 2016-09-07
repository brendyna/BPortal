import "jquery";
import "qunit";

import Base = require("Areas/Shared/Controls/Base");
import Icon = require("Areas/Shared/Controls/Icon");
import Section = require("Areas/Shared/Controls/Section");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    Select;

    function getMockSection(): Section.IWidgetDefaults {
        return {
            viewModelData: {
                title: "This is the section title",
                subtitle: "This is the optional section subtitle. There are two elements in this section header.",
                body: "<strong>This is the section body.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                subsections: [
                    {
                        header: "Subsection",
                        altHeader: true,
                        body: "<p><strong>This is the subsection body.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"
                    },
                    {
                        body: "<p>This subsection does not have a section header. The <code>.subsection__body</code> wrapper div has been omitted for brevity, but this will loassert.ok the same even if you choose to include it.</p>"
                    }
                ]
            }
        };
    }

    function getMockSectionWithBodyViewModel(): Section.IWidgetDefaults {
        let section = getMockSection();
        section.viewModelData.body = `
            <strong>This is the section body.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            <div><select data-bind="wpsSelect: $vm.select"></select></div>
        `;
        section.viewModelData.bodyViewModel = {
            select: <Select.IViewModelData>{
                name: "Foo",
                label: "Fancy nested control",
                options: [
                    { text: "Apple", value: "apple" },
                    { text: "Banana", value: "banana" }
                ]
            }
        };

        return section;
    }

    QUnit.start();
    QUnit.module("Section");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Section, "Section loaded");
        assert.equal(typeof (Section.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Section.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = $("#qunit-fixture");
        let defaults: Section.IWidgetDefaults = {
        };
        let widget: Section.Widget;
        let noChildrenInitially: boolean;
        let childrenPresentAfterRender: boolean;
        let widgetClassExists: boolean;

        // Act
        noChildrenInitially = fixture.children().length === 0;
        widget = new Section.Widget(fixture, defaults);
        childrenPresentAfterRender = widget.element.children().length > 0;
        widgetClassExists = widget.element.hasClass(Section.Widget.widgetClass);

        // Assert
        assert.ok(noChildrenInitially, "Fixture has no children before render");
        assert.ok(childrenPresentAfterRender, "Fixture has children after render");
        assert.ok(widgetClassExists, "Fixture has the widget class applied after render");

        widget.destroy();
    });

    QUnit.test("Control renders viewmodel correctly", (assert) => {
        // Setup
        let fixture = $("#qunit-fixture");
        let defaults = getMockSection();
        let widget = new Section.Widget(fixture, defaults);
        let subsections = fixture.find(".subsection");

        // Act

        // Assert
        assert.equal(fixture.find("h2").text(), defaults.viewModelData.title, "Section title renders correctly");
        assert.equal(fixture.find(".subtitle").text(), defaults.viewModelData.subtitle, "Section subtitle renders correctly");
        assert.equal(fixture.find(".section__body div").html(), defaults.viewModelData.body, "Section body renders correctly");
        assert.equal(subsections.length, defaults.viewModelData.subsections.length, "Correct number of subsections are rendered");
        assert.equal($(subsections.get(0)).find(".subsection__header").text(),
            defaults.viewModelData.subsections[0].header, "First subsection renders header correctly");
        assert.ok($(subsections.get(0)).find(".subsection__header").hasClass("header--alt"), "Alt header attribute renders correctly");
        assert.equal($(subsections.get(0)).find(".subsection__body").html(),
            defaults.viewModelData.subsections[0].body, "First subsection renders body correctly");
        assert.equal($(subsections.get(1)).find(".subsection__body").html(),
            defaults.viewModelData.subsections[1].body, "Second subsection renders body correctly");
        assert.equal($(subsections.get(1)).find(".subsection__header").length, 0, "Second subsection renders no header");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let widget = new Section.Widget($("#qunit-fixture"));
        let childrenPresentBeforeDestroy: boolean;
        let noChildrenAfterDestroy: boolean;
        let widgetClassRemoved: boolean;

        // Act
        childrenPresentBeforeDestroy = widget.element.children().length > 0;
        widget.destroy();
        noChildrenAfterDestroy = widget.element.children().length === 0;
        widgetClassRemoved = !widget.element.hasClass(Section.Widget.widgetClass);

        // Assert
        assert.ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
        assert.ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
        assert.ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
    });

    QUnit.test("Custom view model renders correctly", (assert) => {
        // Setup
        let fixture = $("#qunit-fixture");
        let defaults = getMockSectionWithBodyViewModel();
        let widget = new Section.Widget(fixture, defaults);
        let select = fixture.find("select.select");
        let selectData = <Select.IViewModelData>defaults.viewModelData.bodyViewModel.select;
        let initialValue: string;

        // Act
        initialValue = select.val();
        (<Select.Widget>widget.childWidgets[0]).viewModel.value(selectData.options[1].value);

        // Assert
        assert.equal(select.length, 1, "The select rendered correctly");
        assert.equal(initialValue, selectData.options[0].value, "Rendered control data matches view model data");
        assert.ok(widget.childWidgets[0] instanceof Select.Widget, "Rendered widget is in the childWidgets array");
        assert.equal(select.val(), selectData.options[1].value, "View model changes through child widget render correctly");

        widget.destroy();
    });
}