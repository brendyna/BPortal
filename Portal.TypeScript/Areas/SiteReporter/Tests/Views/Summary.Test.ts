import "humanize";
import "jquery";
import "moment";
import "qunit";

import moment = require("moment");
import BaseConfig = require("Areas/Shared/Config");
import BaseControl = require("Areas/Shared/Controls/Base");
import BugsForTagRepo = require("Areas/SiteReporter/Data/Repositories/BugsForTag.Repository");
import FiltersRepo = require("Areas/SiteReporter/Data/Repositories/Filters.Repository");
import TrendsForTagRepo = require("Areas/SiteReporter/Data/Repositories/TrendsForTag.Repository");
import Config = require("Areas/SiteReporter/Config");
import View = require("Areas/SiteReporter/Views/Summary.View");

import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Filters = require("Areas/Shared/Controls/Filters");
import Header = require("Areas/Shared/Controls/Header");
import Icon = require("Areas/Shared/Controls/Icon");
import Input = require("Areas/Shared/Controls/Input");
import List = require("Areas/Shared/Controls/List");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");
import SummaryMocks = require("Areas/SiteReporter/Samples/Helpers/Summary.Mocks");
import Table = require("Areas/Shared/Controls/Table");

export = Main;

module Main {
    setupMockjax();

    QUnit.start();

    // ### Exists ###
    QUnit.module("Summary View: Exists", (hooks) => {
        QUnit.test("Control exists", (assert) => {
            // Assert
            assert.ok(View, "View loaded");
            assert.equal(typeof (View.Widget), "function", "Widget defined");
        });
    });

    QUnit.module("Summary View: Basics", (hooks) => {
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

    QUnit.module("Summary View: Static", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Breadcrumb renders correctly", (assert) => {
            let nav = widget.element.find(classify(Navigation.Widget.widgetClass));
            let navVM: Navigation.IViewModel = ko.dataFor(nav[0]).vm;
            let breadcrumbs = nav.find("li");

            // Act

            // Assert
            assert.equal(breadcrumbs.length, navVM.breadcrumb().length, "The correct number of crumbs are present");
            for (let i = 0; i < breadcrumbs.length; i++) {
                assert.equal($(breadcrumbs.get(i)).text(), Config.Window.SummaryBreadcrumb[i].text, "Crumb " + i + " has correct text");
            }
        });

        QUnit.test("Header renders correctly", (assert) => {
            let header = $(classify(Header.Widget.widgetClass));
            let headerVM: Header.IViewModel = ko.dataFor(header[0]).vm;

            // Assert
            assert.equal(header.find("h1").text(), "", "The header title is empty");
        });

        QUnit.test("Site search box renders correctly", (assert) => {
            let input = widget.sidebar.widget.element.find("input[type=text]");
            let inputVM: Input.IViewModel = ko.dataFor(input[0]).vm;

            // Assert
            assert.equal(input.length, 1, "There's one input present");
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

                assert.equal(itemAnchor.text(), tocListItem.text(), "TOC item " + i + " text matches VM item");
                assert.equal(itemAnchor.attr("href"), tocListItem.attr("href"), "TOC item " + i + " href matches VM item");
            }
        });

        QUnit.test("Snapshot description list renders correctly", (assert) => {
            for (let i = 1; i <= 2; i++) {
                let snapshotSubsection = widget.sidebar.vm.subsections()[i];
                let snapshotSection = widget.sidebar.widget.element.find(classify(snapshotSubsection.classes()));
                let snapshotList = snapshotSection.find("dl");
                let snapshotDts = snapshotList.find("dt");
                let snapshotDds = snapshotList.find("dd");

                // Assert
                assert.equal(snapshotDts.length, 1, `${snapshotSubsection.header()} has one DT initially`);
                assert.equal($(snapshotDts.get(0)).text(), "", `${snapshotSubsection.header()} DT text is empty`);
                assert.equal(snapshotDds.length, 1, `${snapshotSubsection.header()} has one DD initially`);
                assert.equal($(snapshotDds.get(0)).text(), "", `${snapshotSubsection.header()} DD text is empty`);
            }
        });

        QUnit.test("External links content renders correctly", (assert) => {
            let externalLinkSubsection = widget.sidebar.vm.subsections()[3];
            let externalLinkSection = widget.sidebar.widget.element.find(classify(externalLinkSubsection.classes()));
            let externalLinkDL = externalLinkSection.find("dl");
            let externalLinkDLVM: DescriptionList.IViewModel = ko.dataFor(externalLinkDL[0]).vm;
            let externalLinkDLDds = externalLinkDL.find("dd");

            // Assert
            for (let i = 0; i < externalLinkDLDds.length; i++) {
                let ddAnchor = $(externalLinkDLDds.get(i)).find("a");
                let ddAnchorVM: { text: string; url: string } = externalLinkDLVM.descriptionPairs()[0].descriptions()[i].contentViewModel();

                assert.equal(ddAnchor.text(), ddAnchorVM.text, `External link "${ddAnchor.text()}" text matches VM text`);
                assert.equal(ddAnchor.attr("href"), ddAnchorVM.url, `External link "${ddAnchor.attr("href")}" href matches VM href`);
            }
        });

        QUnit.test("Sections render correctly", (assert) => {
            let bugSection = $(widget.element.find(classify(widget.bugs.vm.classes())));
            let bugSectionTable = bugSection.find(classify(Config.Classes.SummaryBugsTable));
            let trendsSection = $(widget.element.find(classify(widget.trends.vm.classes())));
            let trendsSectionTable = trendsSection.find(classify(Config.Classes.SummaryTrendsTable));

            // Assert
            assert.equal(bugSection.find("h2").text(), widget.bugs.vm.title(), "Bugs section title is correct");
            assert.equal(bugSection.find(classify(BaseConfig.Classes.TableMetadata)).text(),
                Config.Strings.BugsTableScanTimePlaceholder, "Bugs section table scan time placeholder is correct");
            assert.equal(bugSection.find(`${classify(BaseConfig.Classes.TableFilter)} input`).attr("placeholder"),
                Config.Strings.TableFilterPlaceholder, "Bugs section table filter placeholder is correct");
            assert.equal(bugSectionTable.find(classify(BaseConfig.Classes.TableEmpty)).text(),
                Config.Strings.SummaryTableNoDataMessage, "Bugs section empty table placeholder is shown");

            assert.equal(trendsSection.find("h2").text(), widget.trends.vm.title(), "Trends section title is correct");
            assert.equal(trendsSection.find(`${classify(BaseConfig.Classes.TableFilter)} input`).attr("placeholder"),
                Config.Strings.TableFilterPlaceholder, "Trends section table filter placeholder is correct");
            assert.equal(bugSectionTable.find(classify(BaseConfig.Classes.TableEmpty)).text(),
                Config.Strings.SummaryTableNoDataMessage, "Trends section empty table placeholder is shown");
        });
    });

    QUnit.module("Summary View: Load started", (hooks) => {
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
                "bug snapshot": widget.bugsSnapshots.widget.element,
                "trend snapshot": widget.trendsSnapshots.widget.element,
                "bugs filters": widget.bugsFilters.widget.element,
                "bugs table": widget.bugsTable.widget.element,
                "trends filters": widget.trendsFilters.widget.element,
                "trends table": widget.trendsTable.widget.element
            };

            for (var elemName in loadingElements) {
                assert.equal(loadingElements[elemName].find(classify(BaseConfig.Classes.LoadingOverlay)).length,
                    1, "The loading overlay is present for " + elemName);
            }
        });
    });

    QUnit.module("Summary View: Load done", (hooks) => {
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

        QUnit.test("Bug snapshot sidebar section renders correctly", function (assert) {
            let widget = (<View.IWidget>this.widget);
            let done = assert.async();
            let mockBugsForTagData = SummaryMocks.getMockBugsForTagBingdexTop100();

            this.loadPromise.done(() => {
                // There's a race condition here, so checking for both states
                // of loading to determine when to execute the tests
                if (this.widget.bugsSnapshots.vm.loading()) {
                    let loadingSub = this.widget.bugsSnapshots.vm.loading.subscribe((loading: boolean) => {
                        if (!loading) {
                            testSidebarBugsSnapshot(widget.sidebar, mockBugsForTagData, assert);
                            loadingSub.dispose();
                            done();
                        }
                    });
                } else {
                    testSidebarBugsSnapshot(widget.sidebar, mockBugsForTagData, assert);
                    done();
                }
            });
        });

        QUnit.test("Trend snapshot sidebar section renders correctly", function (assert) {
            let widget = (<View.IWidget>this.widget);
            let done = assert.async();
            let mockTrendsForTagData = SummaryMocks.getMockTrendsForTagBingdexTop100();

            this.loadPromise.done(() => {
                // There's a race condition here, so checking for both states
                // of loading to determine when to execute the tests
                if (this.widget.trendsSnapshots.vm.loading()) {
                    let loadingSub = this.widget.trendsSnapshots.vm.loading.subscribe((loading: boolean) => {
                        if (!loading) {
                            testSidebarTrendsSnapshot(widget.sidebar, mockTrendsForTagData, assert);
                            loadingSub.dispose();
                            done();
                        }
                    });
                } else {
                    testSidebarTrendsSnapshot(widget.sidebar, mockTrendsForTagData, assert);
                    done();
                }
            });
        });

        QUnit.test("Bugs section renders correctly", function (assert) {
            let widget = <View.IWidget>this.widget;
            let done = assert.async();
            let tableFilterUpdateDone = assert.async();
            let tableSearchUpdateDone = assert.async();
            let tableSearchNoResultUpdateDone = assert.async();
            let bugSectionElem = widget.bugs.widget.element;
            let bugSectionFiltersElem = widget.bugsFilters.widget.element;
            let bugSectionTableElem = widget.bugsTable.widget.element;
            let bugsForTagMindtreeMockData = SummaryMocks.getMockBugsForTagMindtreeNotorious();
            let expectedPostFilterChangeCellValue = bugsForTagMindtreeMockData[0].DomainName;
            let filterOptionListFromData = [];
            let filterOptionListFromDom = [];
            
            let loadingSub1 = widget.bugsTable.vm.loading.subscribe((loading: boolean) => {
                if (!loading) {
                    loadingSub1.dispose();

                    // Using the 3rd row as the first couple rows stay the same when data sets change
                    let rows = bugSectionTableElem.find("tbody tr");
                    let headers = bugSectionTableElem.find("thead tr th");
                    let initialCellValue = $($(rows.get(2)).find("td").get(1)).text();
                    let expectedHeaders = [
                        Config.Strings.SummaryTableSiteColumnHeader,
                        Config.Strings.SummaryTableBingdexColumnHeader,
                        Config.Strings.SummaryTableAlexaColumnHeader,
                        Config.Strings.SummaryBugsTableOutreachColumnHeader,
                        Config.Strings.SummaryBugsTableCurrentColumnHeader,
                        Config.Strings.SummaryBugsTableTotalColumnHeader
                    ];
                    let expectedScanTime = `${Config.Strings.BugsTableScanTimePrefix} ${moment(SummaryMocks.getMockScanTime()).fromNow()}`;
                    let actualHeaders = [
                        $(headers.get(1)).text(),
                        $(headers.get(2)).text(),
                        $(headers.get(3)).text(),
                        $(headers.get(4)).text(),
                        $(headers.get(5)).text(),
                        $(headers.get(6)).text()
                    ];
                    let actualSwitchRiskIconCount = $(rows.get(0)).find(`td:nth-of-type(1) ${classify(Config.Classes.SwitchRiskIcon)}`).length;
                    let actualNonSwitchRiskIconCount = $(rows.get(4)).find(`td:nth-of-type(1) ${classify(Config.Classes.SwitchRiskIcon)}`).length;
                    let actualFavIconCount = $(rows.get(0)).find(`td:nth-of-type(2) img`).length;
                    let actualDetailsButtonCount = $(rows.get(0)).find(`td:nth-of-type(8) button`).length;

                    SummaryMocks.getMockFiltersData()["tag"].forEach((option: FiltersRepo.Option) => {
                        filterOptionListFromData.push(option.text);
                    });

                    bugSectionFiltersElem.find("select[name=tag] option").each((i: number, elem: Element) => {
                        filterOptionListFromDom.push($(elem).text());
                    });

                    assert.deepEqual(filterOptionListFromDom, filterOptionListFromData, "Filter options render correctly");
                    assert.deepEqual(actualHeaders, expectedHeaders, "Table column headers are correct");
                    assert.equal(bugSectionElem.find(classify(BaseConfig.Classes.TableMetadata)).text(),
                        expectedScanTime, "Scan time renders correctly");
                    assert.equal(actualSwitchRiskIconCount, 1, "Switch risk icon is present for switch risk site");
                    assert.equal(actualNonSwitchRiskIconCount, 0, "Switch risk icon is not present for non-switch risk site");
                    assert.equal(actualFavIconCount, 1, "Favicon is present for site");
                    assert.equal(actualDetailsButtonCount, 1, "Details button is present for site");

                    let filterChangePromise = testSectionTableSelectFilterChange(widget.bugsTable, widget.sidebar, widget.bugsSnapshots,
                        2, 1, initialCellValue, expectedPostFilterChangeCellValue, widget.bugsFilters, { "tag": "MindTreeNotoriousSites" },
                        testSidebarBugsSnapshot, bugsForTagMindtreeMockData, assert);

                    filterChangePromise.done(() => {
                        tableFilterUpdateDone();

                        let searchFilterChangePromise = testSectionTableSearchFilterChange(widget.bugs, widget.bugsTable, "bing.com", 0, 1,
                            1, "bing.com", "asdfasdfasdf", 0, 0, 1, Config.Strings.SummaryTableNoResultsMessage, assert);

                        searchFilterChangePromise.done(() => {
                            tableSearchUpdateDone();
                            tableSearchNoResultUpdateDone();
                        });
                    });

                    done();
                }
            });
        });

        QUnit.test("Trends section renders correctly", function(assert) {
            let widget = (<View.IWidget>this.widget);
            let done = assert.async();
            let tableFilterUpdateDone = assert.async();
            let tableSearchUpdateDone = assert.async();
            let tableSearchNoResultUpdateDone = assert.async();
            let trendSectionElem = widget.trends.widget.element;
            let trendSectionFiltersElem = widget.trendsFilters.widget.element;
            let trendSectionTableElem = widget.trendsTable.widget.element;
            let trendSearchFilter = trendSectionElem.find(classify(BaseConfig.Classes.TableFilter));
            let trendsForTagMindtreeMockData = SummaryMocks.getMockTrendsForTagMindtreeNotorious();
            let tagFilterOptionListFromData = [];
            let tagFilterOptionListFromDom = [];
            let releaseFilterOptionListFromData = [];
            let releaseFilterOptionListFromDom = [];

            this.loadPromise.done(() => {
                let rows = trendSectionTableElem.find("tbody tr");
                let headers = trendSectionTableElem.find("thead tr th");
                let initialCellValue = $($(rows.get(2)).find("td").get(0)).text();
                let expectedHeaders = [
                    Config.Strings.SummaryTableSiteColumnHeader,
                    Config.Strings.SummaryTableBingdexColumnHeader,
                    Config.Strings.SummaryTableAlexaColumnHeader,
                    Config.Strings.SummaryTrendTableFrowniesColumnHeader,
                    Config.Strings.SummaryTrendTableNavigationsColumnHeader,
                    Config.Strings.SummaryTrendTableFocusTimeColumnHeader
                ];
                let actualHeaders = [
                    $(headers.get(0)).text(),
                    $(headers.get(1)).text(),
                    $(headers.get(2)).text(),
                    $(headers.get(3)).text(),
                    $(headers.get(4)).text(),
                    $(headers.get(5)).text()
                ];
                let actualFrowniesDeltaIconCount = $(rows.get(0)).find(`td:nth-of-type(4) ${classify(Config.Classes.SummaryTileDelta)}`).length;
                let actualNavigationsDeltaIconCount = $(rows.get(0)).find(`td:nth-of-type(5) ${classify(Config.Classes.SummaryTileDelta)}`).length;
                let actualFocusTimeDeltaIconCount = $(rows.get(0)).find(`td:nth-of-type(6) ${classify(Config.Classes.SummaryTileDelta)}`).length;
                let actualFavIconCount = $(rows.get(0)).find(`td:nth-of-type(1) img`).length;
                let actualDetailsButtonCount = $(rows.get(0)).find(`td:nth-of-type(7) button`).length;
                
                let filtersMockData = SummaryMocks.getMockFiltersData();
                let trendSectionFilterSelects = trendSectionFiltersElem.find("select");

                filtersMockData["tag"].forEach((option: FiltersRepo.Option) => {
                    tagFilterOptionListFromData.push(option.text);
                });

                filtersMockData["release"].forEach((option: FiltersRepo.Option) => {
                    releaseFilterOptionListFromData.push(option.text);
                });

                $(trendSectionFilterSelects.get(0)).find("option").each((i: number, elem: Element) => {
                    tagFilterOptionListFromDom.push($(elem).text());
                });

                $(trendSectionFilterSelects.get(1)).find("option").each((i: number, elem: Element) => {
                    releaseFilterOptionListFromDom.push($(elem).text());
                });

                assert.deepEqual(tagFilterOptionListFromDom, tagFilterOptionListFromData, "Tag filter options render correctly");
                assert.deepEqual(releaseFilterOptionListFromDom, releaseFilterOptionListFromData, "Release filter options render correctly");
                assert.deepEqual(actualHeaders, expectedHeaders, "Table column headers are correct");
                assert.equal(actualFavIconCount, 1, "Favicon is present for site");
                assert.equal(actualDetailsButtonCount, 1, "Details button is present for site");
                assert.equal(actualFrowniesDeltaIconCount, 1, "Frownies delta icon is present for site");
                assert.equal(actualNavigationsDeltaIconCount, 1, "Navigations delta icon is present for site");
                assert.equal(actualFocusTimeDeltaIconCount, 1, "Focus Time delta icon is present for site");

                let filterChangePromise = testSectionTableSelectFilterChange(widget.trendsTable, widget.sidebar, widget.trendsSnapshots, 2, 0, initialCellValue,
                    trendsForTagMindtreeMockData.data[0].domainName, widget.trendsFilters, { "tag": "MindTreeNotoriousSites", "release": "RS1" },
                    testSidebarTrendsSnapshot, trendsForTagMindtreeMockData, assert);

                filterChangePromise.done(() => {
                    tableFilterUpdateDone();

                    let searchFilterChangePromise = testSectionTableSearchFilterChange(widget.trends, widget.trendsTable, "bing.com", 0, 0,
                        1, "bing.com", "asdfasdfasdf", 0, 0, 1, Config.Strings.SummaryTableNoResultsMessage, assert);

                    searchFilterChangePromise.done(() => {
                        tableSearchUpdateDone();
                        tableSearchNoResultUpdateDone();
                    });
                });

                done();
            });
        });
    });

    QUnit.module("Summary View: Dynamic edge", (hooks) => {
        let widget: View.IWidget;
        let loadPromise: JQueryPromise<void>;

        hooks.before((assert) => {
            widget = create(getEdgeWidgetDefaults());
            loadPromise = widget.loadData();
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Sidebar section renders correctly when no data is present", (assert) => {
            let done = assert.async();
            let mockBugsForTagData = SummaryMocks.getMockBugsForTagFakeTagEdge();
            let mockTrendsForTagData = SummaryMocks.getMockTrendsForTagFakeTagEdge();

            let loadingSub = widget.bugsSnapshots.vm.loading.subscribe((loading: boolean) => {
                if (!loading) {
                    loadingSub.dispose();

                    testSidebarBugsSnapshot(widget.sidebar, mockBugsForTagData, assert);
                    testSidebarTrendsSnapshot(widget.sidebar, mockTrendsForTagData, assert);

                    done();
                }
            });
        });

        QUnit.test("Bugs section renders correctly", (assert) => {
            let done = assert.async();

            testEmptyTable(widget.bugsTable, assert).done(() => {
                done();
            });
        });

        QUnit.test("Trends section renders correctly", (assert) => {
            let done = assert.async();

            testEmptyTable(widget.trendsTable, assert).done(() => {
                done();
            });
        });
    });

    function setupMockjax(): void {
        SummaryMocks.setupFiltersMock();
        SummaryMocks.setupScanTimeMock();
        SummaryMocks.setupTokenDataMock();
        SummaryMocks.setupBugsForTagBlobUrlBingdexTop100Mock();
        SummaryMocks.setupBugsForTagBlobUrlMindtreeNotoriousMock();
        SummaryMocks.setupBugsForTagBlobUrlFakeTagMock();
        SummaryMocks.setupBugsForTagBingdexTop100Mock();
        SummaryMocks.setupBugsForTagMindtreeNotoriousMock();
        SummaryMocks.setupBugsForTagFakeTagEdgeMock();
        SummaryMocks.setupTrendsForTagBingdexTop100Mock();
        SummaryMocks.setupTrendsForTagMindtreeNotoriousMock();
        SummaryMocks.setupTrendsForTagFakeTagMock();
    }

    function testSidebarBugsSnapshot(
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>,
        mockBugsForTagData: BugsForTagRepo.DataTransferObject,
        assert: QUnitAssert
    ): void {
        let snapshotSubsection = sidebar.vm.subsections()[1];
        let snapshotSection = sidebar.widget.element.find(classify(snapshotSubsection.classes()));
        let snapshotList = snapshotSection.find("dl");
        let snapshotDts = snapshotList.find("dt");
        let snapshotDds = snapshotList.find("dd");
        let outreachBugCount = 0;
        let releaseBugCount = 0;
        let totalBugCount = 0;
        let switchRiskCount = 0;
        let switchRiskPercent = 0;

        mockBugsForTagData.forEach((summary: BugsForTagRepo.SiteBugSummary) => {
            outreachBugCount += summary.OutreachBugCount;
            releaseBugCount += summary.CurrentReleaseBugCount;
            totalBugCount += summary.ActiveBugCount;

            if (summary.IsSwitchRisk) {
                switchRiskCount++;
            }
        });
        switchRiskPercent = (switchRiskCount / mockBugsForTagData.length) * 100;

        [
            {
                expectedTitle: Config.Strings.SummaryBugSnapshotSwitchRiskTitle,
                expectedValue: (switchRiskCount > 0) ? Humanize.compactInteger(switchRiskPercent, 1) + "%"
                    : Config.Strings.SummarySnapshotNoDataMessage,
                expectedIcon: (switchRiskCount > 0) ? Icon.Type.Flag : Icon.Type.Error
            },
            {
                expectedTitle: Config.Strings.SummaryBugSnapshotOutreachTitle,
                expectedValue: (outreachBugCount > 0) ? Humanize.compactInteger(outreachBugCount, 1)
                    : Config.Strings.SummarySnapshotNoDataMessage,
                expectedIcon: (outreachBugCount > 0) ? Icon.Type.Bug : Icon.Type.Error
            },
            {
                expectedTitle: Config.Strings.SummaryBugSnapshotReleaseTitle,
                expectedValue: (releaseBugCount > 0) ? Humanize.compactInteger(releaseBugCount, 1)
                    : Config.Strings.SummarySnapshotNoDataMessage,
                expectedIcon: (releaseBugCount > 0) ? Icon.Type.Bug : Icon.Type.Error
            },
            {
                expectedTitle: Config.Strings.SummaryBugSnapshotTotalTitle,
                expectedValue: (totalBugCount > 0) ? Humanize.compactInteger(totalBugCount, 1)
                    : Config.Strings.SummarySnapshotNoDataMessage,
                expectedIcon: (totalBugCount > 0) ? Icon.Type.Bug : Icon.Type.Error
            }
        ].forEach((item, i: number) => {
            assert.equal($.trim($(snapshotDts[i]).text()), item.expectedTitle, `Snapshot ${item.expectedTitle} title is correct`);
            assert.equal($(snapshotDds[i]).find(classify(item.expectedIcon)).length, 1, `Snapshot ${item.expectedTitle} icon is correct`);
            assert.equal($.trim($(snapshotDds[i]).text()), item.expectedValue, `Snapshot ${item.expectedTitle} value is correct`);
        });
    }

    function testSidebarTrendsSnapshot(
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>,
        mockTrendsForTagData: TrendsForTagRepo.DataTransferObject,
        assert: QUnitAssert
    ): void {
        let snapshotSubsection = sidebar.vm.subsections()[2];
        let snapshotSection = sidebar.widget.element.find(classify(snapshotSubsection.classes()));
        let snapshotList = snapshotSection.find("dl");
        let snapshotDts = snapshotList.find("dt");
        let snapshotDds = snapshotList.find("dd");
        let frowniesCount = 0;
        let navigationsCount = 0;
        let focusTimeCount = 0;

        mockTrendsForTagData.data.forEach((summary: TrendsForTagRepo.SiteTrendSummary) => {
            frowniesCount += summary.frowny;
            navigationsCount += summary.navigation;
            focusTimeCount += summary.focusTime;
        });

        [
            {
                expectedTitle: Config.Strings.SummaryTrendSnapshotFrowniesTitle,
                expectedValue: (frowniesCount !== 0) ? Humanize.compactInteger(Math.abs(frowniesCount), 1)
                    : Config.Strings.SummarySnapshotNoDataMessage,
                expectedIcon: (frowniesCount > 0) ? Icon.Type.Up : ((frowniesCount < 0) ? Icon.Type.Down : Icon.Type.Error)
            },
            {
                expectedTitle: Config.Strings.SummaryTrendSnapshotNavigationsTitle,
                expectedValue: (navigationsCount !== 0) ? Humanize.compactInteger(Math.abs(navigationsCount), 1)
                    : Config.Strings.SummarySnapshotNoDataMessage,
                expectedIcon: (navigationsCount > 0) ? Icon.Type.Up : ((navigationsCount < 0) ? Icon.Type.Down : Icon.Type.Error)
            },
            {
                expectedTitle: Config.Strings.SummaryTrendSnapshotFocusTimeTitle,
                expectedValue: (focusTimeCount !== 0) ? Humanize.compactInteger(Math.abs(focusTimeCount), 1)
                    : Config.Strings.SummarySnapshotNoDataMessage,
                expectedIcon: (focusTimeCount > 0) ? Icon.Type.Up : ((focusTimeCount < 0) ? Icon.Type.Down : Icon.Type.Error)
            }
        ].forEach((item, i: number) => {
            assert.equal($.trim($(snapshotDts[i]).text()), item.expectedTitle, `Snapshot ${item.expectedTitle} title is correct`);
            assert.equal($(snapshotDds[i]).find(classify(item.expectedIcon)).length, 1, `Snapshot ${item.expectedTitle} icon is correct`);
            assert.equal($.trim($(snapshotDds[i]).text()), item.expectedValue, `Snapshot ${item.expectedTitle} value is correct`);
        });
    }

    function testSectionTableSelectFilterChange(
        table: BaseControl.IControl<Table.IViewModel, Table.IWidget>,
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>,
        snapshot: BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget>,
        row: number,
        cell: number,
        initialValue: string,
        expectedValue: string,
        filters: BaseControl.IControl<Filters.IViewModel, Filters.IWidget>,
        newFilterValue: IDictionary<string>,
        testSnapshot: (
            sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>,
            mockBugsForTagData: BugsForTagRepo.DataTransferObject | TrendsForTagRepo.DataTransferObject,
            assert: QUnitAssert
        ) => void,
        testSnapshotData: any,
        assert: QUnitAssert
    ): JQueryPromise<void> {
        let deferred = $.Deferred<void>();
        let tableDeferred = $.Deferred<void>();
        let snapshotDeferred = $.Deferred<void>();

        let tableLoadingSub = table.vm.loading.subscribe((loading: boolean) => {
            if (!loading) {
                tableLoadingSub.dispose();

                let actualValue = $($(table.widget.element.find("tbody tr").get(row)).find("td").get(cell)).text();
                assert.notEqual(initialValue, actualValue, "Cell values have changed when filter changed");
                assert.equal(actualValue, expectedValue, "Expected value present after filter change");

                tableDeferred.resolve();
            }
        });

        let snapshotLoadingSub = snapshot.vm.loading.subscribe((loading: boolean) => {
            if (!loading) {
                snapshotLoadingSub.dispose();
                testSnapshot(sidebar, testSnapshotData, assert);
                snapshotDeferred.resolve();
            }
        });

        filters.vm.value(newFilterValue);

        $.when<any>(
            tableDeferred.promise(),
            snapshotDeferred.promise()
        ).done(() => {
            deferred.resolve();
        });

        return deferred.promise();
    }

    function testSectionTableSearchFilterChange(
        section: BaseControl.IControl<Section.IViewModel, Section.IWidget>,
        table: BaseControl.IControl<Table.IViewModel, Table.IWidget>,
        successResultSearchString: string,
        successResultRow: number,
        successResultCell: number,
        successResultExpectedCount: number,
        successResultExpectedValue: string,
        emptyResultSearchString: string,
        emptyResultRow: number,
        emptyResultCell: number,
        emptyResultExpectedCount: number,
        emptyResultExpectedValue: string,
        assert: QUnitAssert
    ): JQueryPromise<void> {
        let deferred = $.Deferred<void>();
        let bugSectionElem = section.widget.element;
        let bugSearchFilter = bugSectionElem.find(classify(BaseConfig.Classes.TableFilter));

        // Verify correct results are returned for given query
        table.widget.getDataUpdatePromise().done(() => {
            let rows = bugSectionElem.find("tbody tr");

            assert.equal(rows.length, successResultExpectedCount,
                "Search filter returned the expected number of rows");
            assert.equal($($(rows.get(successResultRow)).find("td").get(successResultCell)).text(),
                successResultExpectedValue, "Search filter returned the expected result");

            // Verify empty message is shown correctly when no results available
            table.widget.getDataUpdatePromise().done(() => {
                let rows = bugSectionElem.find("tbody tr");

                assert.equal(rows.length, emptyResultExpectedCount,
                    "Search filter shows expected number of rows when search string not found");
                assert.equal($($(rows.get(emptyResultRow)).find("td").get(emptyResultCell)).text(),
                    emptyResultExpectedValue, "Search filter shows empty message when search string not found");

                deferred.resolve();
            });
            bugSearchFilter.find("input").val(emptyResultSearchString).trigger("keyup");
        });
        bugSearchFilter.find("input").val(successResultSearchString).trigger("keyup");

        return deferred.promise();
    }

    function testEmptyTable(
        table: BaseControl.IControl<Table.IViewModel, Table.IWidget>,
        assert: QUnitAssert
    ): JQueryPromise<void> {
        let deferred = $.Deferred<void>();

        if (table.vm.loading()) {
            let loadingSub = table.vm.loading.subscribe((loading: boolean) => {
                if (!loading) {
                    loadingSub.dispose();
                    runEmptyTableTests(table, assert);
                    deferred.resolve();
                }
            });
        } else {
            runEmptyTableTests(table, assert);
            deferred.resolve();
        }

        return deferred.promise();
    }

    function runEmptyTableTests(
        table: BaseControl.IControl<Table.IViewModel, Table.IWidget>,
        assert: QUnitAssert
    ): void {
        let tableElem = table.widget.element;
        let rows = tableElem.find("tbody tr");

        assert.equal(rows.length, 1, "Only one row is present when no data loads");
        assert.equal($($(rows.get(0)).find("td").get(0)).text(),
            Config.Strings.SummaryTableNoDataMessage, "Empty table placeholder shown");
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
                params: $.extend({}, Config.Params.SummaryDefaults)
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
                params: $.extend({}, Config.Params.SummaryDefaultsEdge)
            }
        };
    }
}