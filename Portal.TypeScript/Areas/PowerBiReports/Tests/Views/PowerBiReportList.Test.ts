import "jquery";
import "qunit";
import BaseConfig = require("Areas/Shared/Config");
import BaseControl = require("Areas/Shared/Controls/Base");
import Config = require("Areas/PowerBiReports/Config");
import DomUtil = require("Areas/Shared/Util/Dom");
import Header = require("Areas/Shared/Controls/Header");
import Navigation = require("Areas/Shared/Controls/Navigation");
import PowerBiReportListMocks = require("Areas/PowerBiReports/Samples/Helpers/PowerBiReportList.Mocks");
import ReportListRepo = require("Areas/PowerBiReports/Data/Repositories/PowerBiReportList.Repository");
import Section = require("Areas/Shared/Controls/Section");
import View = require("Areas/PowerBiReports/Views/PowerBiReportList.View");


export = Main;

module Main {
    setupMockjax();

    QUnit.start();

    QUnit.module("PowerBiReportList View: Exists", (hooks) => {
        QUnit.test("Control exists", (assert) => {
            // Assert
            assert.ok(View, "View loaded");
            assert.equal(typeof (View.Widget), "function", "Widget defined");
        });
    });

    QUnit.module("PowerBiReportList View: Basics", (hooks) => {
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

    QUnit.module("PowerBiReportList View: Static", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Breadcrumb renders correctly", (assert) => {
            let nav = widget.element.find(DomUtil.classify(Navigation.Widget.widgetClass));
            let navVM: Navigation.IViewModel = ko.dataFor(nav[0]).viewModel;
            let breadcrumbs = nav.find("li");

            // Assert
            assert.equal(breadcrumbs.length, navVM.breadcrumb().length, "The correct number of crumbs are present");
            for (let i = 0; i < breadcrumbs.length; i++) {
                assert.equal($(breadcrumbs.get(i)).text(), Config.Window.PowerBiReportListBreadcrumb[i].text, "Crumb " + i + " has correct text");
            }
        });

        QUnit.test("Header renders correctly", (assert) => {
            let header = $(DomUtil.classify(Header.Widget.widgetClass));
            let headerVM: Header.IViewModel = ko.dataFor(header[0]).viewModel;

            // Assert
            assert.equal(header.find("h1").text(), Config.Strings.ReportListTitle, "The header title is correct");
        });

        QUnit.test("Section renders correctly", (assert) => {
            let reportlistSection = $(widget.element.find(DomUtil.classify(Config.Classes.ReportListSectionClass)));
            let importButton = reportlistSection.find(DomUtil.classify(Config.Classes.ImportPbixButtonClass));
            let reportCards = reportlistSection.find(DomUtil.classify(Config.Classes.ReportCardClass));

            // Assert ImportButton is Loaded
            assert.equal(importButton.text(), Config.Strings.ImportPbixFileButton, "Import Button is loaded");

            //Assert ReportCards are not shown
            assert.equal(reportCards.length, 0, "Report Cards should not be loaded");

        });
    });

    QUnit.module("PowerBiReportList View: Load started", (hooks) => {
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
                "ReportCards": widget.element
            };

            for (var elemName in loadingElements) {
                assert.equal(loadingElements[elemName].find(DomUtil.classify(BaseConfig.Classes.LoadingOverlay)).length,
                    1, "The loading overlay is present for " + elemName);
            }
        });
    });

    QUnit.module("PowerBiReportList View: Load done", (hooks) => {
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

    QUnit.module("PowerBiReportList View: Dynamic common", (hooks) => {
        hooks.beforeEach(function(assert) {
            this.widget = <View.IWidget>create(getDisableLoadWidgetDefaults());
            this.loadPromise = this.widget.loadData();
        });

        hooks.afterEach(function(assert) {
            destroy(this.widget);
        });

        QUnit.test("ReportList section renders correctly", function (assert) {
            let widget = <View.IWidget>this.widget;
            let done = assert.async();

            let reportlistSection = $(widget.element.find(DomUtil.classify(Config.Classes.ReportListSectionClass)));
            let reportlistMockData = PowerBiReportListMocks.getMockReportListData();
            let reportGroupsMock: Array<string> = reportlistMockData.map((item: ReportListRepo.PowerBiReport) => item.group);
            reportGroupsMock = reportGroupsMock.filter(
                (item, index) => {
                    return reportGroupsMock.indexOf(item) === index;
                }
            );

            this.loadPromise.done(() => {
                let reportCards = reportlistSection.find(DomUtil.classify(Config.Classes.ReportCardClass));
                let accordionGroups = reportlistSection.find("details");

                //Assert the no of groups shown is correct
                assert.equal(accordionGroups.length, reportGroupsMock.length, "Report number of groups is correct");
                //Assert the no of cards shown is correct
                assert.equal(reportCards.length, reportlistMockData.length, "Report number of cards is correct");
                
                if (reportlistMockData.length > 0) {
                    //check first group title
                    let firstGroup = $(accordionGroups[0]).find("summary");
                    assert.equal(
                        firstGroup.text(),
                        ((reportGroupsMock[0] === "null") ? Config.Strings.ReportGroupOthers : reportGroupsMock[0]),
                        "First Group title is correct"
                    );
                    
                    //check the first card content.
                    let firstCard = $(reportCards[0]);
                    let firstExpectedCardData = reportlistMockData[0];

                    //the first anchor is the title of the card
                    let firstCardTitle = firstCard.find("a")[0];
                    let firstCardContact = firstCard.find(DomUtil.classify(Config.Classes.ReportCardContactClass));
                
                    assert.equal(
                        firstCardTitle.getAttribute("href"),
                        Config.Urls.PowerBiReportsReportUrl + firstExpectedCardData.id,
                        "ReportCard Url is correct");

                    assert.equal(
                        $(firstCardTitle).find("span").text(),
                        firstExpectedCardData.name,
                        "ReportCard Title is correct");

                    assert.equal(
                        firstCardContact.text(),
                        firstExpectedCardData.contact,
                        "ReportCard Contact is correct");
                }
                done();
            });
        });
    });

    function setupMockjax(): void {
        PowerBiReportListMocks.setupReportListMock();
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