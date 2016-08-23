import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");
import Tabs = require("Areas/Shared/Controls/Tabs");

export = Main;

module Main {
    function assertViewModelInitializationChecks(fixture: JQuery, defaults: Tabs.IWidgetDefaults): void {
        let $tabs = fixture.find(".control__tabs__tab");
        let $tab1 = $($tabs.get(0));

        // Assert
        equal($tabs.length, defaults.viewModelData.tabs.length, "The number of specified tabs rendered");
        equal($tabs.find("input").attr("name"), defaults.viewModelData.name, "The correct name was rendered for the tab set");
        equal($tab1.find("i").attr("class").replace("fa ", ""), defaults.viewModelData.tabs[0].icon, "The correct icon rendered for the first tab");
        equal($tab1.find("span").text(), defaults.viewModelData.tabs[0].text, "The correct text rendered for the first tab");
        equal($tab1.find("input").attr("id"), defaults.viewModelData.tabs[0].id, "The correct id rendered for the first tab");
        equal($tabs.find(":checked").val(), defaults.viewModelData.tabs[0].id, "The first tab is active");
    }

    function getMockTabs(): Array<Tabs.ITabDefaults> {
        return [
            {
                id: "a",
                text: "A tab",
                icon: "fa-bug"
            },
            {
                id: "b",
                text: "B tab",
                icon: "fa-star"
            },
            {
                id: "c",
                text: "C tab",
                icon: "fa-tags"
            }
        ];
    }

    $((): void => {
        QUnit.module("Tabs");
        test("Control exists", 3, () => {
            // Assert
            ok(Tabs, "Tabs loaded");
            equal(typeof (Tabs.ViewModel), "function", "ViewModel defined");
            equal(typeof (Tabs.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 3, () => {
            // Setup
            let fixture = $("qunit-fixture");
            let defaults: Tabs.IWidgetDefaults = {
            };
            let widget: Tabs.Widget;
            let noChildrenInitially: boolean;
            let childrenPresentAfterRender: boolean;
            let widgetClassExists: boolean;

            // Act
            noChildrenInitially = fixture.children().length === 0;
            widget = new Tabs.Widget($("#qunit-fixture"), defaults);
            childrenPresentAfterRender = widget.element.children().length > 0;
            widgetClassExists = widget.element.hasClass(Tabs.Widget.widgetClass);

            // Assert
            ok(noChildrenInitially, "Fixture has no children before render");
            ok(childrenPresentAfterRender, "Fixture has children after render");
            ok(widgetClassExists, "Fixture has the widget class applied after render");

            widget.destroy();
        });

        test("Tabs render correctly when specified via defaults", 6, () => {
            // Setup
            let tabs = getMockTabs();
            let defaults: Tabs.IWidgetDefaults = {
                viewModelData: {
                    name: "foo",
                    tabs: tabs
                }
            };
            let widget = new Tabs.Widget($("#qunit-fixture"), defaults);

            // Act

            // Assert
            assertViewModelInitializationChecks(widget.element, defaults);

            widget.destroy();
        });

        test("Tabs render correctly when specified via view model", 6, () => {
            // Setup
            let tabs = getMockTabs();
            let defaults: Tabs.IWidgetDefaults = {
                viewModelData: {
                    name: "foo",
                    tabs: tabs
                }
            };
            let widget = new Tabs.Widget($("#qunit-fixture"));

            // Act
            widget.viewModel.name(defaults.viewModelData.name);
            widget.viewModel.tabs(Base.createFromDefaults(defaults.viewModelData.tabs, Tabs.Tab));

            // Assert
            assertViewModelInitializationChecks(widget.element, defaults);

            widget.destroy();
        });

        test("Clicking a tab makes it the active tab", 2, () => {
            // Setup
            let tabs = getMockTabs();
            let defaults: Tabs.IWidgetDefaults = {
                viewModelData: {
                    name: "foo",
                    tabs: tabs
                }
            };
            let widget = new Tabs.Widget($("#qunit-fixture"), defaults);
            let initialValue: string;

            // Act
            initialValue = widget.element.find(":checked").val();
            widget.element.find(".control__tabs__tab:nth-of-type(2) input").click();

            // Assert
            equal(initialValue, tabs[0].id, "The first tab is selected initially");
            equal(widget.element.find(":checked").val(), tabs[1].id, "The second tab is selected after click ");

            widget.destroy();
        });

        test("Active tab changes based on setting the value property", 2, () => {
            // Setup
            let tabs = getMockTabs();
            let defaults: Tabs.IWidgetDefaults = {
                viewModelData: {
                    name: "foo",
                    tabs: tabs,
                    value: tabs[1].id,
                }
            };
            let widget = new Tabs.Widget($("#qunit-fixture"), defaults);
            let initialCheckedValue: string;

            // Act
            initialCheckedValue = widget.element.find(":checked").val();
            widget.viewModel.value(tabs[2].id);

            // Assert
            equal(initialCheckedValue, tabs[1].id, "The second tab is selected initially");
            equal(widget.element.find(":checked").val(), tabs[2].id, "The third tab is selected after click");

            widget.destroy();
        });

        // Not sure how to trigger a CSS media query via JS so will uncomment this once
        // I figure that out
        // http://stackoverflow.com/questions/37513795/trigger-a-media-query-with-javascript
        //test("The tab label is hidden when window size shrinks below threshold", 2, () => {
        //    // Setup
        //    let widget.element = getFixture();
        //    let tabs = getMockTabs();
        //    let defaults: Tabs.IWidgetDefaults = {
        //        name: "foo",
        //        tabs: tabs
        //    };
        //    let widget = new Tabs.Widget($("#qunit-fixture"), defaults);
        //    let initialLabelDisplay: string;

        //    // Act
        //    initialLabelDisplay = widget.element.find(".control__tabs__tab label span").css("display");
        //    window.resizeTo(500, 500);


        //    // Assert
        //    notEqual(initialLabelDisplay, "none", "The tab label is visible initially");
        //    equal(widget.element.find(".control__tabs__tab label span").css("display"), "none", "The label is hidden after the widget.element shrinks");

        //    widget.destroy();
        //});

        test("Control destroys correctly", 3, () => {
            // Setup
            let widget = new Tabs.Widget($("#qunit-fixture"));
            let childrenPresentBeforeDestroy: boolean;
            let noChildrenAfterDestroy: boolean;
            let widgetClassRemoved: boolean;

            // Act
            childrenPresentBeforeDestroy = widget.element.children().length > 0;
            widget.destroy();
            noChildrenAfterDestroy = widget.element.children().length === 0;
            widgetClassRemoved = !widget.element.hasClass(Tabs.Widget.widgetClass);

            // Assert
            ok(childrenPresentBeforeDestroy, "Fixture has children before destroy");
            ok(noChildrenAfterDestroy, "Fixture has no children after destroy");
            ok(widgetClassRemoved, "Fixture does not have the widget class after destroy");
        });
    });
}