import "jquery";
import "qunit";
import Button = require("Areas/Shared/Controls/Button");
import Accordion = require("Areas/Shared/Controls/Accordion");

export = Main;

module Main {
    Button;

    function setupAndGetFixture(): JQuery {
        let fixture = $("#qunit-fixture");

        fixture.append($("<div class='accordion-fixture'></div>"));

        return fixture;
    }

    function getMockDefaults(): Accordion.IWidgetDefaults {
        return {
            viewModelData: {
                groups: [
                    {
                        title: "Group 1",
                        body: `There is some body text here`,
                        expanded: true
                    },
                    {
                        title: "Group 2",
                        body: `There is some body text here too!`
                    },
                    {
                        title: "Group 3",
                        body: `
                            There is some body text here lastly! And:
                            <button data-bind="wpsButton: viewModel.button"></button>
                        `,
                        bodyViewModel: {
                            button: <Button.IViewModelData>{
                                text: "A button!",
                                clickCallback: () => {
                                    window.alert("I've been clicked!");
                                }
                            }
                        }
                    }
                ]
            }
        };
    }

    QUnit.start();
    QUnit.module("Accordion");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Accordion, "Accordion loaded");
        assert.equal(typeof (Accordion.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Accordion.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = $("#qunit-fixture");
        let defaults = getMockDefaults();
        let widget = new Accordion.Widget(fixture, defaults);
        let groups = widget.element.find("details");
        let group1Summary = $(groups[0]).find("summary");
        let group2Summary = $(groups[1]).find("summary");
        let group3Content = $(groups[2]).find("div.details__content");

        // Act

        // Assert
        assert.ok(widget.element.hasClass(Accordion.Widget.widgetClass), "Widget class is present");
        assert.notEqual(widget.element.attr("data-bind"), undefined, "Data-bind attribute is set");
        assert.equal(groups.length, defaults.viewModelData.groups.length, "The correct number of groups renders");
        assert.equal($(groups[0]).attr("role"), "group", "The role property for the group is 'group'");
        assert.equal($(group1Summary).text(), defaults.viewModelData.groups[0].title, "Group summary title is set correctly");
        assert.equal($(group2Summary).attr("tabindex"), 0, "Group summary has tabindex set to 0");
        assert.equal($(group2Summary).attr("role"), "button", "Group summary has role set to 'button'");

        testElementProperties($(groups[0]), true, assert);
        testElementProperties($(groups[1]), false, assert);

        assert.equal($(group3Content).find("button").text(), defaults.viewModelData.groups[2].bodyViewModel.button.text,
            "Nested controls render in body correctly");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: Accordion.IWidgetDefaults = {
        };
        let widget = new Accordion.Widget($("#qunit-fixture"), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Accordion.Widget.widgetClass), "Widget class is removed");
        assert.equal(widget.element.attr("data-bind"), undefined, "Data-bind attribute is removed");
    });

    QUnit.test("Group expands and collapses correctly on click", (assert) => {
        // Setup
        let fixture = $("#qunit-fixture");
        let defaults = getMockDefaults();
        let widget = new Accordion.Widget(fixture, defaults);
        let group1 = $(widget.element.find("details")[0]);
        let group1Summary = group1.find("summary");

        // Act/assert

        // Group 1 is open by default, so ensure it's closed on click
        group1Summary.click();
        testElementProperties(group1, false, assert, "click on expanded group");

        // Click again and ensure it expands when closed
        group1Summary.click();
        testElementProperties(group1, true, assert, "click on collapsed group");

        widget.destroy();
    });

    QUnit.test("Group expands and collapses correctly on enter/spacebar", (assert) => {
        // Setup
        let fixture = $("#qunit-fixture");
        let defaults = getMockDefaults();
        let widget = new Accordion.Widget(fixture, defaults);
        let group1 = $(widget.element.find("details")[0]);
        let group1Summary = group1.find("summary");
        let event = $.Event("keydown");
        let keys = {
            enter: 13,
            spacebar: 32
        };

        for (let key in keys) {
            if (keys.hasOwnProperty((key))) {
                // Act/assert
                event.which = keys[key]; // Enter

                // Group 1 is open by default, so ensure it's closed on enter
                group1Summary.focus();
                group1Summary.trigger(event);
                testElementProperties(group1, false, assert, `${key} pressed on expanded group`);

                // Hit enter again and ensure it expands when closed
                group1Summary.trigger(event);
                testElementProperties(group1, true, assert, `${key} pressed on collapsed group`);
            }
        }

        widget.destroy();
    });

    function testElementProperties(group: JQuery, expanded: boolean, assert: QUnitAssert, context = "default"): void {
        let groupSummary = $(group.find("summary"));

        if (expanded) {
            assert.equal(group.attr("open"), "open", `Open attribute is set to 'open' for expanded group (context: ${context})`);
            assert.equal(groupSummary.attr("aria-expanded"), "true",
                `Group summary aria-expanded attribute set to 'true' when group is expanded (context: ${context})`);
        } else {
            assert.equal(group.attr("open"), undefined, `Open attribute is set to undefined for collapsed group (context: ${context})`);
            assert.equal(groupSummary.attr("aria-expanded"), undefined,
                `Group summary aria-expanded attribute set to undefined when group is collapsed (context: ${context})`);
        }
    }
}