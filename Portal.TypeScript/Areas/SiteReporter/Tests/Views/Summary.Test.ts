import "humanize";
import "jquery";
import "qunit";

import BaseConfig = require("Areas/Shared/Config");
import BugsForTagRepo = require("Areas/SiteReporter/Data/Repositories/BugsForTag.Repository");
import TrendsForTagRepo = require("Areas/SiteReporter/Data/Repositories/TrendsForTag.Repository");
import Config = require("Areas/SiteReporter/Config");
import View = require("Areas/SiteReporter/Views/Summary.View");

import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Header = require("Areas/Shared/Controls/Header");
import Input = require("Areas/Shared/Controls/Input");
import List = require("Areas/Shared/Controls/List");
import Navigation = require("Areas/Shared/Controls/Navigation");
import SummaryMocks = require("Areas/SiteReporter/Samples/Helpers/Summary.Mocks");

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

    QUnit.module("Summary View: Static", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = beforeModule(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            afterModule(widget);
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
            widget = beforeModule(getDisableLoadWidgetDefaults());
            widget.initializeRepos();
            widget.initializeLoading();
        });

        hooks.after((assert) => {
            afterModule(widget);
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
            widget = beforeModule(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            afterModule(widget);
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
        let widget: View.IWidget;
        let loadPromise: JQueryPromise<void>;

        hooks.before((assert) => {
            widget = beforeModule(getDisableLoadWidgetDefaults());
            loadPromise = widget.loadData();
        });

        hooks.after((assert) => {
            afterModule(widget);
        });

        QUnit.test("Bug snapshot sidebar section renders correctly", (assert) => {
            let done = assert.async();
            let mockBugsForTagData = SummaryMocks.getMockBugsForTagBingdexTop100();
            let outreachBugCount = 0;
            let releaseBugCount = 0;
            let totalBugCount = 0;
            let switchRiskCount = 0;
            let switchRiskPercent = 0;

            loadPromise.done(() => {
                widget.bugsSnapshots.vm.loading.subscribe((loading: boolean) => {
                    if (!loading) {
                        let snapshotSubsection = widget.sidebar.vm.subsections()[1];
                        let snapshotSection = widget.sidebar.widget.element.find(classify(snapshotSubsection.classes()));
                        let snapshotList = snapshotSection.find("dl");
                        let snapshotDts = snapshotList.find("dt");
                        let snapshotDds = snapshotList.find("dd");

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
                                expectedValue: Humanize.compactInteger(switchRiskPercent, 1) + "%"
                            },
                            {
                                expectedTitle: Config.Strings.SummaryBugSnapshotOutreachTitle,
                                expectedValue: Humanize.compactInteger(outreachBugCount, 1)
                            },
                            {
                                expectedTitle: Config.Strings.SummaryBugSnapshotReleaseTitle,
                                expectedValue: Humanize.compactInteger(releaseBugCount, 1)
                            },
                            {
                                expectedTitle: Config.Strings.SummaryBugSnapshotTotalTitle,
                                expectedValue: Humanize.compactInteger(totalBugCount, 1)
                            }
                        ].forEach((item, i: number) => {
                            assert.equal($.trim($(snapshotDts[i]).text()), item.expectedTitle, `${item.expectedTitle} title is correct`);
                            assert.equal($.trim($(snapshotDds[i]).text()), item.expectedValue, `${item.expectedTitle} value is correct`);
                        });

                        done();
                    }
                });
            });
        });

        QUnit.test("Trend snapshot sidebar section renders correctly", (assert) => {
            let done = assert.async();

            loadPromise.done(() => {
                // There's a race condition here, so checking for both states
                // of loading to determine when to execute the tests
                if (widget.trendsSnapshots.vm.loading()) {
                    widget.trendsSnapshots.vm.loading.subscribe((loading: boolean) => {
                        if (!loading) {
                            testSidebarTrendsSnapshot(widget, assert);
                            done();
                        }
                    });
                } else {
                    testSidebarTrendsSnapshot(widget, assert);
                    done();
                }
            });
        });

        //QUnit.test("Bugs section renders correctly", (assert) => {
        //    let done = assert.async();

        //    loadPromise.done(() => {

        //        done();
        //    });
        //});

        //QUnit.test("Trends section renders correctly", (assert) => {
        //    let done = assert.async();

        //    loadPromise.done(() => {

        //        done();
        //    });
        //});
    });

    ////QUnit.module("Summary View: Dynamic edge", (hooks) => {
    ////    let widget: View.IWidget;
    ////    let loadPromise: JQueryPromise<void>;

    ////    hooks.before((assert) => {
    ////        widget = beforeModule(getEdgeWidgetDefaults());
    ////        loadPromise = widget.loadData();
    ////    });

    ////    hooks.after((assert) => {
    ////        afterModule(widget);
    ////    });

    ////    //QUnit.test("Sidebar section renders correctly", (assert) => {
    ////    //    let done = assert.async();

    ////    //    loadPromise.done(() => {
    ////    //        // If no bug/trend data is present, handle that in sidebar snapshot (TBD for how to do that)
    ////    //    });
    ////    //});

    ////    //QUnit.test("Bugs section renders correctly", (assert) => {
    ////    //    let done = assert.async();

    ////    //    loadPromise.done(() => {
    ////    //        // If no data is present, show empty placeholder string

    ////    //        done();
    ////    //    });
    ////    //});

    ////    //QUnit.test("Trends section renders correctly", (assert) => {
    ////    //    let done = assert.async();

    ////    //    loadPromise.done(() => {
    ////    //        // If no data is present, show empty placeholder string
    ////    //        done();
    ////    //    });
    ////    //});
    ////});

    function testSidebarTrendsSnapshot(widget: View.IWidget, assert: QUnitAssert): void {
        let mockTrendsForTagData = SummaryMocks.getMockTrendsForTagBingdexTop100();
        let frowniesCount = 0;
        let navigationsCount = 0;
        let focusTimeCount = 0;
        let snapshotSubsection = widget.sidebar.vm.subsections()[2];
        let snapshotSection = widget.sidebar.widget.element.find(classify(snapshotSubsection.classes()));
        let snapshotList = snapshotSection.find("dl");
        let snapshotDts = snapshotList.find("dt");
        let snapshotDds = snapshotList.find("dd");

        mockTrendsForTagData.data.forEach((summary: TrendsForTagRepo.SiteTrendSummary) => {
            frowniesCount += summary.frowny;
            navigationsCount += summary.navigation;
            focusTimeCount += summary.focusTime;
        });

        [
            {
                expectedTitle: Config.Strings.SummaryTrendSnapshotFrowniesTitle,
                expectedValue: Humanize.compactInteger(Math.abs(frowniesCount), 1)
            },
            {
                expectedTitle: Config.Strings.SummaryTrendSnapshotNavigationsTitle,
                expectedValue: Humanize.compactInteger(Math.abs(navigationsCount), 1)
            },
            {
                expectedTitle: Config.Strings.SummaryTrendSnapshotFocusTimeTitle,
                expectedValue: Humanize.compactInteger(Math.abs(focusTimeCount), 1)
            }
        ].forEach((item, i: number) => {
            assert.equal($.trim($(snapshotDts[i]).text()), item.expectedTitle, `${item.expectedTitle} title is correct`);
            assert.equal($.trim($(snapshotDds[i]).text()), item.expectedValue, `${item.expectedTitle} value is correct`);
        });
    }

    function setupMockjax(): void {
        SummaryMocks.setupFiltersMock();
        SummaryMocks.setupScanTimeMock();
        SummaryMocks.setupTokenDataMock();
        SummaryMocks.setupBugsForTagBlobUrlBingdexTop100Mock();
        SummaryMocks.setupBugsForTagBlobUrlMindtreeNotoriousMock();
        SummaryMocks.setupBugsForTagBingdexTop100Mock();
        SummaryMocks.setupBugsForTagMindtreeNotoriousMock();
        SummaryMocks.setupTrendsForTagBingdexTop100Mock();
        SummaryMocks.setupTrendsForTagMindtreeNotoriousMock();
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