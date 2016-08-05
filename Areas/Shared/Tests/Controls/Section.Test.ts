import $ = require("jquery");
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
                        body: "<p>This subsection does not have a section header. The <code>.subsection__body</code> wrapper div has been omitted for brevity, but this will look the same even if you choose to include it.</p>"
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

    $((): void => {
        QUnit.module("Section");
        test("Control exists", 3, () => {
            // Assert
            ok(Section, "Section loaded");
            equal(typeof (Section.ViewModel), "function", "ViewModel defined");
            equal(typeof (Section.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 3, () => {
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
            ok(noChildrenInitially, "Fixture has no children before render");
            ok(childrenPresentAfterRender, "Fixture has children after render");
            ok(widgetClassExists, "Fixture has the widget class applied after render");

            widget.destroy();
        });

        test("Control renders viewmodel correctly", 9, () => {
            // Setup
            let fixture = $("#qunit-fixture");
            let defaults = getMockSection();
            let widget = new Section.Widget(fixture, defaults);
            let subsections = fixture.find(".subsection");

            // Act

            // Assert
            equal(fixture.find("h2").text(), defaults.viewModelData.title, "Section title renders correctly");
            equal(fixture.find(".subtitle").text(), defaults.viewModelData.subtitle, "Section subtitle renders correctly");
            equal(fixture.find(".section__body div").html(), defaults.viewModelData.body, "Section body renders correctly");
            equal(subsections.length, defaults.viewModelData.subsections.length, "Correct number of subsections are rendered");
            equal($(subsections.get(0)).find(".subsection__header").text(),
                defaults.viewModelData.subsections[0].header, "First subsection renders header correctly");
            ok($(subsections.get(0)).find(".subsection__header").hasClass("header--alt"), "Alt header attribute renders correctly");
            equal($(subsections.get(0)).find(".subsection__body").html(),
                defaults.viewModelData.subsections[0].body, "First subsection renders body correctly");
            equal($(subsections.get(1)).find(".subsection__body").html(),
                defaults.viewModelData.subsections[1].body, "Second subsection renders body correctly");
            equal($(subsections.get(1)).find(".subsection__header").length, 0, "Second subsection renders no header");

            widget.destroy();
        });

        test("Control destroys correctly", 3, () => {
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
            ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
            ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
            ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
        });

        test("Custom view model renders correctly", 4, () => {
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
            equal(select.length, 1, "The select rendered correctly");
            equal(initialValue, selectData.options[0].value, "Rendered control data matches view model data");
            ok(widget.childWidgets[0] instanceof Select.Widget, "Rendered widget is in the childWidgets array");
            equal(select.val(), selectData.options[1].value, "View model changes through child widget render correctly");

            widget.destroy();
        });
    });
}