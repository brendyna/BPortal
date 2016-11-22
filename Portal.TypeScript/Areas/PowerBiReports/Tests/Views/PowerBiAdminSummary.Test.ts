import "jquery";
import "qunit";
import BaseConfig = require("Areas/Shared/Config");
import BaseControl = require("Areas/Shared/Controls/Base");
import Config = require("Areas/PowerBiReports/Config");
import DatasetsRepo = require("Areas/PowerBiReports/Data/Repositories/PowerBiDatasets.Repository");
import Header = require("Areas/Shared/Controls/Header");
import Navigation = require("Areas/Shared/Controls/Navigation");
import PowerBiSummaryMocks = require("Areas/PowerBiReports/Samples/Helpers/PowerBiAdminSummary.Mocks");
import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");
import View = require("Areas/PowerBiReports/Views/PowerBiAdminSummary.View");
import WorkspacesRepo = require("Areas/PowerBiReports/Data/Repositories/PowerBiWorkspaces.Repository");

export = Main;

module Main {
    setupMockjax();

    QUnit.start();

    QUnit.module("PowerBiAdmin Summary View: Exists", (hooks) => {
        QUnit.test("Control exists", (assert) => {
            // Assert
            assert.ok(View, "View loaded");
            assert.equal(typeof (View.Widget), "function", "Widget defined");
        });
    });

    QUnit.module("PowerBiAdmin Summary View: Basics", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Control renders correctly", (assert) => {
            // Assert
            assert.equal(widget.element.hasClass(View.Widget.widgetClass), true, "Widget class is present");
            assert.ok(widget.element.children().length > 0, "There are child elements");
        });

        QUnit.test("Control destroys correctly", (assert) => {
            // Act
            widget.destroy();

            // Assert
            assert.equal(widget.element.hasClass(View.Widget.widgetClass), false, "Widget class is not present");
            assert.equal(widget.element.children().length, 0, "There are no child elements");
        });
    });

    QUnit.module("PowerBiAdmin Summary View: Static", (hooks) => {
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

            // Assert
            assert.equal(breadcrumbs.length, navVM.breadcrumb().length, "The correct number of crumbs are present");
            for (let i = 0; i < breadcrumbs.length; i++) {
                assert.equal($(breadcrumbs.get(i)).text(), Config.Window.PowerBiAdminSummaryBreadcrumb[i].text, "Crumb " + i + " has correct text");
            }
        });

        QUnit.test("Header renders correctly", (assert) => {
            let header = $(classify(Header.Widget.widgetClass));
            let headerVM: Header.IViewModel = ko.dataFor(header[0]).viewModel;

            // Assert
            assert.equal(header.find("h1").text(), "", "The header title is empty");
        });

        QUnit.test("Sections render correctly", (assert) => {
            let workspacesSection = $(widget.element.find(classify(widget.workspaces.viewModel.classes())));
            let workspacesSectionTable = workspacesSection.find(classify(Config.Classes.WorkspacesTableClass));

            let datasetsSection = $(widget.element.find(classify(widget.datasets.viewModel.classes())));
            let datasetsSectionTable = datasetsSection.find(classify(Config.Classes.DatasetsTableClass));

            // Assert WorkspacesSection
            assert.equal(workspacesSection.find("h2").text(), widget.workspaces.viewModel.title(), "Workspaces section title is correct");
            assert.equal(workspacesSectionTable.find(classify(BaseConfig.Classes.TableEmpty)).text(),
                Config.Strings.WorkspaceTableNoDataMessage, "Workspaces section empty table placeholder is shown");

            // Assert DatasetsSection
            assert.equal(datasetsSection.find("h2").text(), widget.datasets.viewModel.title(), "Datasets section title is correct");
            assert.equal(datasetsSectionTable.find(classify(BaseConfig.Classes.TableEmpty)).text(),
                Config.Strings.DatasetsTableNoDataMessage, "Datasets section empty table placeholder is shown");
        });
    });

    QUnit.module("PowerBiAdmin Summary View: Load started", (hooks) => {
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
                "Workspaces table": widget.workspacesTable.widget.element,
                "Datasets table": widget.datasetsTable.widget.element
            };

            for (var elemName in loadingElements) {
                assert.equal(loadingElements[elemName].find(classify(BaseConfig.Classes.LoadingOverlay)).length,
                    1, "The loading overlay is present for " + elemName);
            }
        });
    });

    QUnit.module("PowerBiAdmin Summary View: Load done", (hooks) => {
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

    QUnit.module("PowerBiAdmin Summary View: Dynamic common", (hooks) => {
        hooks.beforeEach(function(assert) {
            this.widget = <View.IWidget>create(getDisableLoadWidgetDefaults());
            this.loadPromise = this.widget.loadData();
        });

        hooks.afterEach(function(assert) {
            destroy(this.widget);
        });

        QUnit.test("Workspaces section renders correctly", function (assert) {
            let widget = <View.IWidget>this.widget;
            let done = assert.async();
                        
            let workspacesSectionElem = widget.workspaces.widget.element;
            let workspacesSectionTableElem = widget.workspacesTable.widget.element;

            let workspacesMockData = PowerBiSummaryMocks.getMockWorkspacesData();

            this.loadPromise.done(() => {
                let rows = workspacesSectionTableElem.find("tbody tr");
                let headers = workspacesSectionTableElem.find("thead tr th");

                let firstTableRow = rows.get(0);
                let firstExpectedDataRow = workspacesMockData[0];

                let expectedHeaders = [
                    Config.Strings.WorkspaceCollectionNameColumnHeader,
                    Config.Strings.WorkspaceIdColumnHeader
                ];

                let actualHeaders = [
                    $(headers.get(0)).text(),
                    $(headers.get(1)).text()                        
                ];

                assert.deepEqual(actualHeaders, expectedHeaders, "Workspaces table column headers are correct");
                assert.equal(rows.length, workspacesMockData.length, "Workspaces table number of rows are correct");

                //check the first row content.
                assert.equal(
                    $(firstTableRow).find(classify(Config.Classes.TableColumnWorkspaceCollectionNameClass)).text(),
                    firstExpectedDataRow.workspaceCollectionName,
                    "Workspaces table First Row WorkspaceCollectionName is correct");
                assert.equal(
                    $(firstTableRow).find(classify(Config.Classes.TableColumnWorkspaceIdClass)).text(),
                    firstExpectedDataRow.workspaceId,
                    "Workspaces table First Row WorkspaceId is correct");
                
                done();
            });
        });

        QUnit.test("Datasets section renders correctly", function(assert) {
            let widget = (<View.IWidget>this.widget);
            let done = assert.async();

            let datasetsSectionTableElem = widget.datasetsTable.widget.element;

            let datasetsMock = PowerBiSummaryMocks.getMockDatasetsTableData();

            this.loadPromise.done(() => {
                let rows = datasetsSectionTableElem.find("tbody tr");
                let headers = datasetsSectionTableElem.find("thead tr th");

                let firstTableRow = rows.get(0);
                let firstExpectedDataRow = datasetsMock[0];

                let expectedHeaders = [
                    Config.Strings.WorkspaceCollectionNameColumnHeader,
                    Config.Strings.WorkspaceIdColumnHeader,
                    Config.Strings.DatasetNameColumnHeader,
                    Config.Strings.DatasetIdColumnHeader                    
                ];

                let actualHeaders = [
                    $(headers.get(0)).text(),
                    $(headers.get(1)).text(),
                    $(headers.get(2)).text(),
                    $(headers.get(3)).text()
                ];

                assert.deepEqual(actualHeaders, expectedHeaders, "Dataset table column headers are correct");
                assert.equal(rows.length, datasetsMock.length, "Datasets table number of rows are correct");

                //check the first row content.
                assert.equal(
                    $(firstTableRow).find(classify(Config.Classes.TableColumnWorkspaceCollectionNameClass)).text(),
                    firstExpectedDataRow.workspaceCollectionName,
                    "Dataset table First Row WorkspaceCollectionName is correct");
                assert.equal(
                    $(firstTableRow).find(classify(Config.Classes.TableColumnWorkspaceIdClass)).text(),
                    firstExpectedDataRow.workspaceId,
                    "Dataset table First Row WorkspaceId is correct");
                assert.equal(
                    $(firstTableRow).find(classify(Config.Classes.TableColumnDatasetIdClass)).text(),
                    firstExpectedDataRow.datasetId,
                    "Dataset table First Row DatasetId is correct");
                assert.equal(
                    $(firstTableRow).find(classify(Config.Classes.TableColumnDatasetNameClass)).text(),
                    firstExpectedDataRow.datasetName,
                    "Dataset table First Row DatasetName is correct");

                done();
            });
        });
        
    });

    function setupMockjax(): void {
        PowerBiSummaryMocks.setupWorkspacesMock();
        PowerBiSummaryMocks.setupDatasetsMock();
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

        return new View.Widget(randFixture, customDefaults);
    }

    function destroy(widget: View.IWidget): void {
        // Act
        widget.destroy();
    }

    function getWidgetDefaults(): View.IWidgetDefaults {
        return {
            viewContext: {
                params: {}
            }
        };
    }

    function getDisableLoadWidgetDefaults(): View.IWidgetDefaults {
        let defaults = getWidgetDefaults();
        defaults.disableAutoLoad = true;

        return defaults;
    }
}