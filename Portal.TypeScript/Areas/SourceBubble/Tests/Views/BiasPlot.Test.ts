import "jquery";
import "qunit";
import BaseConfig = require("Areas/Shared/Config");
import Config = require("Areas/SourceBubble/Config");
import Header = require("Areas/Shared/Controls/Header");
import Navigation = require("Areas/Shared/Controls/Navigation");
import BiasPlotMocks = require("Areas/SourceBubble/Tests/Helpers/BiasPlot.Mocks");
import View = require("Areas/SourceBubble/Views/BiasPlot.View");

export = Main;

/**
 * These are sample unit tests to show how to write them and suggest those that should be written
 * for your view.
 *
 * Note: this set of unit tests is not exhaustive nor is it thorough. Views that are checked in and will
 * be deployed to WPTPortal will have a higher bar for unit test quality/coverage.
 */
module Main {
    setupMockjax();

    QUnit.start();

    // ### Exists ###
    QUnit.module("BiasPlot View: Exists", (hooks) => {
        QUnit.test("View exists", (assert) => {
            // Assert
            assert.ok(View, "View loaded");
            assert.equal(typeof (View.Widget), "function", "Widget defined");
        });
    });

    QUnit.module("BiasPlot View: Basics", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("View renders correctly", (assert) => {
            // Assert
            assert.equal(widget.element.hasClass(View.Widget.widgetClass), true, "Widget class is present");
            assert.ok(widget.element.children().length > 0, "There are child elements");
        });

        QUnit.test("View destroys correctly", (assert) => {
            // Act
            widget.destroy();

            // Assert
            assert.equal(widget.element.hasClass(View.Widget.widgetClass), false, "Widget class is not present");
            assert.equal(widget.element.children().length, 0, "There are no child elements");
        });
    });

    QUnit.module("BiasPlot View: Static", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Breadcrumb renders correctly", (assert) => {
            let nav = widget.element.find(classify(Navigation.Widget.widgetClass));
            let navVM: Navigation.IViewModel = ko.dataFor(nav[0]).viewModel;
            let breadcrumbs = nav.find("li");

            // Act

            // Assert
            assert.equal(breadcrumbs.length, navVM.breadcrumb().length, "The correct number of crumbs are present");
            for (let i = 0; i < breadcrumbs.length; i++) {
                assert.equal($(breadcrumbs.get(i)).text(), Config.Window.BiasPlotBreadcrumb[i].text, "Crumb " + i + " has correct text");
            }
        });

        QUnit.test("Header renders correctly", (assert) => {
            let header = $(classify(Header.Widget.widgetClass));
            let headerVM: Header.IViewModel = ko.dataFor(header[0]).viewModel;

            // Assert
            assert.equal(header.find("h1").text(), "Getting Started", "The header title is correct");
        });
    });

    QUnit.module("BiasPlot View: Load started", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
            widget.initializeRepos();
            widget.initializeLoading();
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Indicators appear for dynamic elements", (assert) => {
            let loadingElements = {
                "sidebar data section": widget.sidebarSampleData.widget.element,
            };

            for (var elemName in loadingElements) {
                assert.equal(loadingElements[elemName].find(classify(BaseConfig.Classes.LoadingOverlay)).length,
                    1, "The loading overlay is present for " + elemName);
            }
        });
    });

    QUnit.module("BiasPlot View: Load done", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Data promise is resolved when load completes", (assert) => {
            let loadPromise = widget.loadData();
            let done = assert.async();

            loadPromise.done(() => {
                assert.ok(true, "Data load promise resolves correctly");
                done();
            });
        });
    });

    QUnit.module("Summary View: Dynamic common", (hooks) => {
        hooks.beforeEach(function(assert) {
            this.widget = <View.IWidget>create(getDisableLoadWidgetDefaults());
            this.loadPromise = this.widget.loadData();
        });

        hooks.afterEach(function(assert) {
            destroy(this.widget);
        });

        QUnit.test("BiasPlot section renders correctly", function (assert) {
            let widget = (<View.IWidget>this.widget);
            let done = assert.async();
            let initialSubSectionCount = widget.sidebarSampleData.viewModel.subsections().length;

            this.loadPromise.done(() => {
                let postLoadSubSectionCount = widget.sidebarSampleData.viewModel.subsections().length;

                assert.equal(initialSubSectionCount+1, postLoadSubSectionCount, "There is one more subsection after load");
                done();
            });
        });
    });

    function setupMockjax(): void {
        BiasPlotMocks.setupBiasPlotMock();
    }
    

    function classify(selector: string): string {
        return "." + selector.replace(" ", ".");
    }

    function create(customDefaults?: View.IWidgetDefaults): View.IWidget {
        // Create a random fixture so we can parallelize tests
        let fixtures = $("#qunit-fixtures");
        let randFixtureId = Math.round(Math.random() * 1000);
        let randFixture = $('<div class="qunit-fixture" id="fixture-' + randFixtureId + '"></div>');
        fixtures.append(randFixture);

        return new View.Widget(randFixture, customDefaults || getWidgetDefaults());
    }

    function destroy(widget: View.IWidget): void {
        // Act
        widget.destroy();
    }

    function getWidgetDefaults(): View.IWidgetDefaults {
        return {
            viewContext: {
                params: $.extend({}, {})
            }
        };
    }

    function getDisableLoadWidgetDefaults(): View.IWidgetDefaults {
        let defaults = getWidgetDefaults();
        defaults.disableAutoLoad = true;

        return defaults;
    }
}