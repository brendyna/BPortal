import "jquery";
import "qunit";
import "humanize";

import Config = require("Areas/SiteReporter/Config");
import View = require("Areas/SiteReporter/Views/Details.View");

import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Header = require("Areas/Shared/Controls/Header");
import Input = require("Areas/Shared/Controls/Input");
import List = require("Areas/Shared/Controls/List");
import Navigation = require("Areas/Shared/Controls/Navigation");

import DetailsMocks = require("Areas/SiteReporter/Samples/Helpers/Details.Mocks");
import DetailsForDomainRepo = require("../../Data/Repositories/DetailsForDomain.Repository");
import BugsForDomainRepo = require("../../Data/Repositories/BugsForDomain.Repository");

export = Main;

module Main {
    setupMockjax();

    QUnit.start();

    // ### Exists ###
    QUnit.module("Details View: Exists", (hooks) => {
        QUnit.test("Control exists", (assert) => {
            // Assert
            assert.ok(View, "View loaded");
            assert.equal(typeof (View.Widget), "function", "Widget defined");
        });
    });

    QUnit.module("Details View: Basics", (hooks) => {
        let widget: View.IWidget;
            
        hooks.before((assert) => {
            widget = beforeModule(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            afterModule(widget);
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

    QUnit.module("Details View: Static", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = beforeModule(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            afterModule(widget);
        });

        QUnit.test("Breadcrumb renders correctly", (assert) => {
            let nav = $(classify(Navigation.Widget.widgetClass));
            let navVM: Navigation.IViewModel = ko.dataFor(nav[0]).vm;
            let breadcrumbs = nav.find("li");

            // Act

            // Assert
            assert.equal(breadcrumbs.length, navVM.breadcrumb().length, "The correct number of crumbs are present");
            for (let i = 0; i < breadcrumbs.length; i++) {
                assert.equal($(breadcrumbs.get(i)).text(), navVM.breadcrumb()[i].text(), "Crumb " + i + " has correct text");
            }
        });

        QUnit.test("Header renders correctly", (assert) => {
            let header = $(classify(Header.Widget.widgetClass));
            let headerVM: Header.IViewModel = ko.dataFor(header[0]).vm;

            // Assert
            assert.equal(header.find("h1").text(), headerVM.title(), "The header title is correct");
        });

        QUnit.test("Site search box renders correctly", (assert) => {
            let input = widget.sidebar.widget.element.find("input[type=text]");
            let inputVM: Input.IViewModel = ko.dataFor(input[0]).vm;

            // Assert
            assert.equal(input.length, 1, "There's on input present");
            assert.equal(input.attr("placeholder"), inputVM.placeholder(), "Input placeholder is correct");
        });

        QUnit.test("Table of contents renders correctly", (assert) => {
            let tocSubsection = widget.sidebar.vm.subsections()[0];
            let tocSection = widget.sidebar.widget.element.find(classify(tocSubsection.classes()));
            let tocSectionItems = tocSection.find("li");
            let tocSectionVMItems: Array<List.IItemData> = (<List.IViewModelData>tocSubsection.bodyViewModel().sections).items;

            // Assert
            assert.equal(tocSectionItems.length, tocSectionVMItems.length, "Correct number of TOC items");
            for (let i = 0; i < tocSectionItems.length; i++) {
                let itemAnchor = $(tocSectionItems.get(i)).find("a");
                let tocListItem = $(tocSectionVMItems[i].content);

                itemAnchor.click();

                assert.equal(itemAnchor.text(), tocListItem.text(), "TOC item " + i + " text matches VM item");
                assert.equal(itemAnchor.attr("href"), tocListItem.attr("href"), "TOC item " + i + " href matches VM item");
            }
        });

        QUnit.test("Snapshot description list renders correctly", (assert) => {
            let snapshotSubsection = widget.sidebar.vm.subsections()[1];
            let snapshotSection = widget.sidebar.widget.element.find(classify(snapshotSubsection.classes()));
            let snapshotList = snapshotSection.find("dl");
            let snapshotDts = snapshotList.find("dt");
            let snapshotDds = snapshotList.find("dd");

            // Assert
            assert.equal(snapshotDts.length, 1, "There's one DT initially");
            assert.equal($(snapshotDts.get(0)).text(), "", "The DT text is empty");
            assert.equal(snapshotDds.length, 1, "There's one DD initially");
            assert.equal($(snapshotDds.get(0)).text(), "", "The DD text is empty");
        });

        QUnit.test("Learn more links content renders correctly", (assert) => {
            let learnMoreSubsection = widget.sidebar.vm.subsections()[2];
            let learnMoreSection = widget.sidebar.widget.element.find(classify(learnMoreSubsection.classes()));
            let learnMoreDL = learnMoreSection.find("dl");
            let learnMoreDLVM: DescriptionList.IViewModel = ko.dataFor(learnMoreDL[0]).vm;
            let learnMoreDLDds = learnMoreDL.find("dd");

            // Assert
            for (let i = 0; i < learnMoreDLDds.length; i++) {
                let ddAnchor = $(learnMoreDLDds.get(i)).find("a");
                let ddAnchorVM: { text: string; url: string } = learnMoreDLVM.descriptionPairs()[0].descriptions()[i].contentViewModel();

                assert.equal(ddAnchor.text(), ddAnchorVM.text, "Learn more link " + i + " text matches VM text");
                assert.equal(ddAnchor.attr("href"), ddAnchorVM.url, "Learn more link " + i + " href matches VM href");
            }
        });

        QUnit.test("Sections render correctly", (assert) => {
            let bugSection = $(classify(widget.bugs.vm.classes()));
            let bugSectionTable = bugSection.find(classify(Config.Classes.DetailsBugsTable));
            let bugSectionTrendsChart = bugSection.find(classify(Config.Classes.DetailsBugsTrendsChart));
            let techSection = $(classify(widget.tech.vm.classes()));
            let trendsSection = $(classify(widget.trends.vm.classes()));
            let trendsSectionFrowniesChart = trendsSection.find(classify(Config.Classes.DetailsTrendsFrowniesChart));
            let trendsSectionNavigationsChart = trendsSection.find(classify(Config.Classes.DetailsTrendsNavigationsChart));
            let trendsSectionFocusTimeChart = trendsSection.find(classify(Config.Classes.DetailsTrendsFocusTimeChart));
            let highchartsTitleClass = classify(Config.Classes.HighchartsTitle);

            // Assert
            assert.equal(bugSection.find("h2").text(), widget.bugs.vm.title(), "Bugs section title is correct");
            assert.equal(bugSection.find(classify(Config.Classes.DataTablesMetadata)).text(),
                Config.Strings.DetailsBugsTableScanTimePlaceholder, "Bugs section table scan time placeholder is correct");
            assert.equal(bugSectionTable.find(classify(Config.Classes.DataTablesEmpty)).text(),
                Config.Strings.DetailsBugsTableNoDataMessage, "Bugs section empty table placeholder is shown");
            assert.equal(bugSectionTrendsChart.find(highchartsTitleClass).text(),
                Config.Strings.DetailsBugsTrendsTitle, "Bugs section trends chart title is correct");
            assert.equal(techSection.find("h2").text(), widget.tech.vm.title(), "Technologies section title is correct");
            assert.equal(trendsSection.find("h2").text(), widget.trends.vm.title(), "Trends section title is correct");
            assert.equal(trendsSectionFrowniesChart.find(highchartsTitleClass).text(),
                Config.Strings.DetailsTrendsFrowniesTitle, "Bugs section frownies trends chart title is correct");
            assert.equal(trendsSectionNavigationsChart.find(highchartsTitleClass).text(),
                Config.Strings.DetailsTrendsNavigationsTitle, "Bugs section navigations trends chart title is correct");
            assert.equal(trendsSectionFocusTimeChart.find(highchartsTitleClass).text(),
                Config.Strings.DetailsTrendsFocusTimeTitle, "Bugs section focus time trends chart title is correct");
        });
    });

    QUnit.module("Details View: Load started", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = beforeModule(getDisableLoadWidgetDefaults());
            widget.initializeRepos();
            widget.initializeLoading();
        });

        hooks.after((assert) => {
            afterModule(widget);
        });

        QUnit.test("Indicators appear for dynamic elements", (assert) => {
            let loadingElements = {
                "snapshot": widget.snapshot.widget.element,
                "bugs filters": widget.bugsFilters.widget.element,
                "bugs table": widget.bugsTable.widget.element,
                "bugs trends chart": widget.bugTrendsChart.widget.element,
                "technologies": widget.tech.widget.element,
                "frownies chart": widget.frowniesChart.widget.element,
                "navigations chart": widget.navigationsChart.widget.element,
                "focus time chart": widget.focusTimeChart.widget.element
            };

            for (var elemName in loadingElements) {
                assert.equal(loadingElements[elemName].find(classify(Config.Classes.LoadingOverlay)).length,
                    1, "The loading overlay is present for " + elemName);
            }
        });
    });

    QUnit.module("Details View: Load done", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = beforeModule(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            afterModule(widget);
        });

        QUnit.test("Data promise is resolved when load completes", (assert) => {
            let loadPromise = widget.loadData();
            let done1 = assert.async();
            
            loadPromise.done(() => {
                assert.ok(true, "Data load promise resolves correctly");
                done1();
            });
        });
    });

    QUnit.module("Details View: Dynamic common", (hooks) => {
        let widget: View.IWidget;
        let loadPromise: JQueryPromise<void>;

        hooks.before((assert) => {
            widget = beforeModule(getDisableLoadWidgetDefaults());
            loadPromise = widget.loadData();
        });

        hooks.after((assert) => {
            afterModule(widget);
        });

        QUnit.test("Sidebar section renders correctly", (assert) => {
            let done = assert.async();
            let domainDetailsMockData = DetailsMocks.getMockDetailsForDomain();
            let bugsForDomainMockData = DetailsMocks.getMockBugsForDomain();

            loadPromise.done(() => {
                testDynamicSidebarContent(assert, widget, domainDetailsMockData, bugsForDomainMockData);
                done();
            });
        });

        //QUnit.test("Bugs section renders correctly", (assert) => {
        //    let done = assert.async();

        //    loadPromise.done(() => {
        //        // Verify the select filter for different bug types renders correctly
        //        // Verify the last scan time is rendered correctly
        //        // Verify entering text in the filter input filters the table to the expected items/ count
        //        // - Verify the nothing found placeholder is shown when the filter isn't found in the table contents
        //        // Verify the table renders correctly
        //        // - Verify the correct columns are present
        //        // - Verify first bug matches data
        //        // - Verify bug numbers are links
        //        // - Verify if there's one page, no navigation is shown
        //        // - Verify previous/ next / pages are shown when there are multiple pages
        //        // Verify the chart shows the multiseries when there are trends (verify first and last data points for each series)
        //        // - Verify the title is correct
        //        // - Verify the legend is present

        //        done();
        //    });
        //});
    });

    QUnit.module("Details View: Dynamic edge", (hooks) => {
        let widget: View.IWidget;
        let loadPromise: JQueryPromise<void>;

        hooks.before((assert) => {
            widget = beforeModule(getEdgeWidgetDefaults());
            loadPromise = widget.loadData();
        });

        hooks.after((assert) => {
            afterModule(widget);
        });

        QUnit.test("Sidebar section renders correctly", (assert) => {
            let done = assert.async();
            let domainDetailsMockData = DetailsMocks.getMockDetailsForDomainEdge();
            let bugsForDomainMockData = DetailsMocks.getMockBugsForDomainEdge();

            loadPromise.done(() => {
                testDynamicSidebarContent(assert, widget, domainDetailsMockData, bugsForDomainMockData);
                done();
            });
        });

        //QUnit.test("Bugs section renders correctly", (assert) => {
        //    let done = assert.async();

        //    loadPromise.done(() => {
        //        // Verify bodyPlaceholder is shown when there are no bugs to show
        //        // Verify the table renders correctly
        //        // - Verify if there's one page, no navigation is shown
        //        // Verify the trends charts show empty placeholders when there are no bug trends

        //        done();
        //    });
        //});
    });

    function testDynamicSidebarContent(
        assert: QUnitAssert,
        widget: View.IWidget,
        domainDetailsMockData: DetailsForDomainRepo.DataTransferObject,
        bugsForDomainMockData: BugsForDomainRepo.DataTransferObject): void {
        let sidebarElem = widget.sidebar.widget.element;
        let expectedSwitchRiskCount = bugsForDomainMockData.IsSwitchRisk ? 1 : 0;
        let expectedOffensiveCount = domainDetailsMockData.isOffensive ? 1 : 0;
        let expectedAlexaRank = domainDetailsMockData.alexaRank === 0 ? Config.Strings.AlexaOutOfBounds
            : "#" + Humanize.intComma(domainDetailsMockData.alexaRank);
        let expectedBingdexRank = domainDetailsMockData.bingdexRank === 0 ? Config.Strings.BingdexOutOfBounds
            : "#" + Humanize.intComma(domainDetailsMockData.bingdexRank);

        assert.equal(sidebarElem.find(classify(Config.Classes.SiteFavIcon)).length,
            1, "The site favicon renders");
        assert.equal(sidebarElem.find(classify(Config.Classes.DetailsSwitchRiskIcon)).length,
            expectedSwitchRiskCount, "The switch risk indicator is present");
        assert.equal(sidebarElem.find(classify(Config.Classes.DetailsPotentiallyOffensive)).length,
            expectedOffensiveCount, "The potentially offensive indicator is present");
        assert.equal(sidebarElem.find(classify(Config.Classes.SiteBingdexRank)).text(),
            expectedBingdexRank, "Bingdex rank renders correctly");
        assert.equal(sidebarElem.find(classify(Config.Classes.SiteAlexaRank)).text(),
            expectedAlexaRank, "Alexa rank renders correctly");
        assert.equal(sidebarElem.find(classify(Config.Classes.SiteTag)).length,
            domainDetailsMockData.tags.length, "Correct number of tags rendered");
    }

    function setupMockjax(): void {
        DetailsMocks.setupDetailsForDomainMock();
        DetailsMocks.setupDetailsForDomainEdgeMock();
        DetailsMocks.setupFiltersMock();
        DetailsMocks.setupFiltersEdgeMock();
        DetailsMocks.setupBugsForDomainBlobUrlMock();
        DetailsMocks.setupBugsForDomainBlobUrlEdgeMock();
        DetailsMocks.setupBugsForDomainMock();
        DetailsMocks.setupBugsForDomainEdgeMock();
        DetailsMocks.setupScanTimeMock();
        DetailsMocks.setupScanTimeEdgeMock();
        DetailsMocks.setupBuildWithDataForDomainMock();
        DetailsMocks.setupBuildWithDataForDomainEdgeMock();
        DetailsMocks.setupBugTrendsBlobUrlMock();
        DetailsMocks.setupBugTrendsBlobUrlEdgeMock();
        DetailsMocks.setupBugTrendsMock();
        DetailsMocks.setupBugTrendsEdgeMock();
        DetailsMocks.setupTrendsForDomainMock();
        DetailsMocks.setupTrendsForDomainEdgeMock();
        DetailsMocks.setupTrendsForDomainTh2Mock();
    }

    function classify(selector: string): string {
        return "." + selector.replace(" ", ".");
    }

    function beforeModule(customDefaults?: View.IWidgetDefaults): View.IWidget {
        // Create a random fixture so we can parallelize tests
        let fixtures = $("#qunit-fixtures");
        let randFixtureId = Math.round(Math.random() * 1000);
        let randFixture = $('<div class="qunit-fixture" id="fixture-' + randFixtureId + '"></div>');
        fixtures.append(randFixture);

        return new View.Widget(randFixture, customDefaults || getWidgetDefaults());
    }

    function afterModule(widget: View.IWidget): void {
        // Act
        widget.destroy();
    }

    function getWidgetDefaults(): View.IWidgetDefaults {
        return {
            viewContext: {
                params: $.extend({}, Config.Params.DetailsDefaults)
            }
        };
    }

    function getDisableLoadWidgetDefaults(): View.IWidgetDefaults {
        let defaults = getWidgetDefaults();
        defaults.disableAutoLoad = true;

        return defaults;
    }

    function getEdgeWidgetDefaults(): View.IWidgetDefaults {
        return {
            disableAutoLoad: true,
            viewContext: {
                params: $.extend({}, Config.Params.DetailsDefaultsEdge)
            }
        };
    }
}