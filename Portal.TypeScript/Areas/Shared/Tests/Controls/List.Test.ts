import $ = require("jquery");
import ControlsTestHelper = require("Areas/Shared/Tests/Helpers/Controls.Helper");
import List = require("Areas/Shared/Controls/List");

export = Main;

module Main {
    $((): void => {
        QUnit.module("List");

        function beforeEach(options: ControlsTestHelper.SetupObjectOptions<List.IViewModelData> = {}) {
            return ControlsTestHelper.beforeEach(List.Widget, options);
        }

        function afterEach(setup: ControlsTestHelper.SetupObject<List.IWidgetDefaults, List.Widget, List.IViewModelData>) {
            ControlsTestHelper.afterEach(setup);
        }

        QUnit.test("Control exists", 3, () => {
            // Assert
            ok(List, "List loaded");
            equal(typeof (List.ViewModel), "function", "ViewModel defined");
            equal(typeof (List.Widget), "function", "Widget defined");
        });

        QUnit.test("Control renders correctly", 1, () => {
            let setup = beforeEach();

            // Assert
            ok(setup.widget.element.hasClass(List.Widget.widgetClass), "Widget class is present");

            afterEach(setup);
        });

        QUnit.test("Control destroys correctly", 1, () => {
            let setup = beforeEach();

            // Act
            setup.widget.destroy();

            // Assert
            ok(!setup.widget.element.hasClass(List.Widget.widgetClass), "Widget class is present");
        });

        QUnit.test("Type results in the correct class being applied to root element", 7, () => {
            // Setup
            let setup = beforeEach();
            let initialType: List.Type;
            let noModifierClassesInitially = false;
            let hasAvatarsClassWhenVMTrue = false;
            let hasBiosClassWhenVMTrue = false;
            let hasIconsClassWhenVMTrue = false;
            let hasLinksClassWhenVMTrue = false;
            let hasSiteSectionLinksClassWhenVMTrue = false;

            // Act
            initialType = setup.widget.viewModel.type();
            noModifierClassesInitially =
                !setup.fixture.hasClass(List.Widget.widgetAvatarsListClass)
                && !setup.fixture.hasClass(List.Widget.widgetBiosListClass)
                && !setup.fixture.hasClass(List.Widget.widgetIconsListClass)
                && !setup.fixture.hasClass(List.Widget.widgetLinksListClass)
                && !setup.fixture.hasClass(List.Widget.widgetSiteSectionLinksListClass);

            setup.widget.viewModel.type(List.Type.Avatars);
            hasAvatarsClassWhenVMTrue = setup.fixture.hasClass(List.Widget.widgetAvatarsListClass);

            setup.widget.viewModel.type(List.Type.Bios);
            hasBiosClassWhenVMTrue = setup.fixture.hasClass(List.Widget.widgetBiosListClass);

            setup.widget.viewModel.type(List.Type.Icons);
            hasIconsClassWhenVMTrue = setup.fixture.hasClass(List.Widget.widgetIconsListClass);

            setup.widget.viewModel.type(List.Type.Links);
            hasLinksClassWhenVMTrue = setup.fixture.hasClass(List.Widget.widgetLinksListClass);

            setup.widget.viewModel.type(List.Type.SiteSectionLinks);
            hasSiteSectionLinksClassWhenVMTrue = setup.fixture.hasClass(List.Widget.widgetSiteSectionLinksListClass);

            // Assert
            equal(initialType, List.Type.Basic, "Initial type is basic");
            ok(noModifierClassesInitially, "Only basic classes present with default view model");
            ok(hasAvatarsClassWhenVMTrue, "Avatars class is present when type set to Avatars");
            ok(hasBiosClassWhenVMTrue, "Bios class is present when type set to Bios");
            ok(hasIconsClassWhenVMTrue, "Icons class is present when type set to Icons");
            ok(hasLinksClassWhenVMTrue, "Links class is present when type set to Links");
            ok(hasSiteSectionLinksClassWhenVMTrue, "Site section links class is present when type set to SiteSectionLinks");

            afterEach(setup);
        });

        QUnit.test("Items collection renders correctly in list", 4, () => {
            // Setup
            let setup = beforeEach();
            let items = [
                new List.Item({
                    content: "Foo"
                }),
                new List.Item({
                    classes: "link--disabled",
                    content: "Bar"
                })
            ];
            let $items: JQuery;

            // Act
            setup.widget.viewModel.items(items);
            $items = setup.fixture.find("li");

            // Assert
            equal($items.length, 2, "The correct number of items renders");
            equal($($items[0]).text(), items[0].content(), "First item matches view model item");
            equal($($items[1]).text(), items[1].content(), "Second item matches view model item");
            ok($($items[1]).hasClass("link--disabled"), "Item class is applied correctly");

            afterEach(setup);
        });

        QUnit.test("Custom binding handler renders correctly", 1, () => {
            // Setup
            let options = {
                skipWidget: true
            };
            let setup = beforeEach(options);

            // Act
            setup.fixture.attr("data-bind", "wpsList: data");
            ko.applyBindings({ data: setup.defaults }, setup.fixture[0]);

            // Assert
            ok(setup.fixture.hasClass(List.Widget.widgetClass), "Widget class is present");

            afterEach(setup);
        });
    });
}