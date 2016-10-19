import "humanize";
import "jquery";
import "moment";
import "qunit";
import BaseConfig = require("Areas/Shared/Config");
import BugsForDomainRepo = require("../../Data/Repositories/BugsForDomain.Repository");
import BuiltWithDataForDomainRepo = require("../../Data/Repositories/BuiltWithDataForDomain.Repository");
import Chart = require("Areas/Shared/Controls/Chart");
import Config = require("Areas/SiteReporter/Config");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import DetailsForDomainRepo = require("../../Data/Repositories/DetailsForDomain.Repository");
import DetailsMocks = require("Areas/SiteReporter/Samples/Helpers/Details.Mocks");
import FiltersRepo = require("../../Data/Repositories/Filters.Repository");
import Header = require("Areas/Shared/Controls/Header");
import Input = require("Areas/Shared/Controls/Input");
import List = require("Areas/Shared/Controls/List");
import moment = require("moment");
import Navigation = require("Areas/Shared/Controls/Navigation");
import View = require("Areas/SiteReporter/Views/Details.View");

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
            let nav = widget.element.find(classify(Navigation.Widget.widgetClass));
            let navVM: Navigation.IViewModel = ko.dataFor(nav[0]).vm;
            let breadcrumbs = nav.find("li");

            // Act

            // Assert
            assert.equal(breadcrumbs.length, navVM.breadcrumb().length, "The correct number of crumbs are present");
            for (let i = 0; i < breadcrumbs.length; i++) {
                assert.equal($(breadcrumbs.get(i)).text(), Config.Window.DetailsBreadcrumb[i].text, "Crumb " + i + " has correct text");
            }
        });

        QUnit.test("Header renders correctly", (assert) => {
            let header = $(widget.element.find(classify(Header.Widget.widgetClass)));
            let headerVM: Header.IViewModel = ko.dataFor(header[0]).vm;

            // Assert
            assert.equal(header.find("h1").text(), headerVM.title(), "The header title is correct");
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

        QUnit.test("External links content renders correctly", (assert) => {
            let externalLinkSubsection = widget.sidebar.vm.subsections()[2];
            let externalLinkSection = widget.sidebar.widget.element.find(classify(externalLinkSubsection.classes()));
            let externalLinkDL = externalLinkSection.find("dl");
            let externalLinkDLVM: DescriptionList.IViewModel = ko.dataFor(externalLinkDL[0]).vm;
            let externalLinkDLDds = externalLinkDL.find("dd");

            // Assert
            for (let i = 0; i < externalLinkDLDds.length; i++) {
                let ddAnchor = $(externalLinkDLDds.get(i)).find("a");
                let ddAnchorVM: { text: string; url: string } = externalLinkDLVM.descriptionPairs()[0].descriptions()[i].contentViewModel();

                assert.equal(ddAnchor.text(), ddAnchorVM.text, "External link " + i + " text matches VM text");
                assert.equal(ddAnchor.attr("href"), ddAnchorVM.url, "External link " + i + " href matches VM href");
            }
        });

        QUnit.test("Sections render correctly", (assert) => {
            let bugSection = $(widget.element.find(classify(widget.bugs.vm.classes())));
            let bugSectionTable = bugSection.find(classify(Config.Classes.DetailsBugsTable));
            let bugSectionTrendsChart = bugSection.find(classify(Config.Classes.DetailsBugsTrendsChart));
            let techSection = $(widget.element.find(classify(widget.tech.vm.classes())));
            let trendsSection = $(widget.element.find(classify(widget.trends.vm.classes())));
            let trendsSectionFrowniesChart = trendsSection.find(classify(Config.Classes.DetailsTrendsFrowniesChart));
            let trendsSectionNavigationsChart = trendsSection.find(classify(Config.Classes.DetailsTrendsNavigationsChart));
            let trendsSectionFocusTimeChart = trendsSection.find(classify(Config.Classes.DetailsTrendsFocusTimeChart));
            let highchartsTitleClass = classify(BaseConfig.Classes.ChartTitle);

            // Assert
            assert.equal(bugSection.find("h2").text(), widget.bugs.vm.title(), "Bugs section title is correct");
            assert.equal(bugSection.find(classify(BaseConfig.Classes.TableMetadata)).text(),
                Config.Strings.BugsTableScanTimePlaceholder, "Bugs section table scan time placeholder is correct");
            assert.equal(bugSection.find(`${classify(BaseConfig.Classes.TableFilter)} input`).attr("placeholder"),
                Config.Strings.TableFilterPlaceholder, "Bugs section table filter placeholder is correct");
            assert.equal(bugSectionTable.find(classify(BaseConfig.Classes.TableEmpty)).text(),
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
                assert.equal(loadingElements[elemName].find(classify(BaseConfig.Classes.LoadingOverlay)).length,
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

        QUnit.test("Bugs section renders correctly", (assert) => {
            let done = assert.async();
            let tableFilterUpdateDone = assert.async();
            let tableSearchUpdateDone = assert.async();
            let tableSearchNoResultUpdateDone = assert.async();
            let trendChartDone = assert.async();
            let bugSectionElem = widget.bugs.widget.element;
            let bugSectionFiltersElem = widget.bugsFilters.widget.element;
            let bugSectionTableElem = widget.bugsTable.widget.element;
            let bugSectionChartElem = widget.bugTrendsChart.widget.element;
            let bugsForDomainMockData = DetailsMocks.getMockBugsForDomain();

            // Verify chart data loads as expected
            // (This test needs to stay outside the general loadPromise.done() as chart rendering happens
            // quickly enough that we'd get the promise after it's been resolved already)
            widget.bugTrendsChart.widget.getDataUpdatePromise().done(() => {
                assert.equal(bugSectionChartElem.find(classify(BaseConfig.Classes.ChartSeries)).length,
                    bugSectionFiltersElem.find("option").length, "The number of chart series matches the table filter option count");

                trendChartDone();
            });

            loadPromise.done(() => {
                let filterSelects = bugSectionElem.find(classify(Config.Classes.DetailsBugsFilters)).find("select");
                let bugsFilter = $(filterSelects.get(0));
                let bugsFilterOptions = bugsFilter.find("option");
                let bugSearchFilter = bugSectionElem.find(classify(BaseConfig.Classes.TableFilter));
                let expectedAllBugs = `${Config.Strings.DetailsFiltersAllBugs} (${bugsForDomainMockData.Bugs.length})`;
                let expectedSwitchRiskBugs = `${Config.Strings.DetailsFiltersSwitchRiskBugs} (${bugsForDomainMockData.SwitchRiskBugs.length})`;
                let expectedOutreachBugs = `${Config.Strings.DetailsFiltersOutreachBugs} (${bugsForDomainMockData.OutreachBugs.length})`;
                let expectedReleaseBugs = `${bugsForDomainMockData.CurrentReleaseBugs[0].Release} bugs (${bugsForDomainMockData.CurrentReleaseBugs.length})`;
                let expectedScanTime = `${Config.Strings.BugsTableScanTimePrefix} ${moment(DetailsMocks.getMockScanTime()).fromNow()}`;
                let initialFirstCellValue = $($(bugSectionTableElem.find("tbody tr").get(0)).find("td").get(0)).text();
                let postFilterChangeFirstCellValue: string;
                let expectedPostFilterChangeFirstCellValue = bugsForDomainMockData.SwitchRiskBugs[0].Id;
                
                assert.equal(filterSelects.length, 1, "The correct number of filters are present");
                assert.equal($(bugsFilterOptions.get(0)).text(), expectedAllBugs, "All bugs filter option is correct");
                assert.equal($(bugsFilterOptions.get(1)).text(), expectedSwitchRiskBugs, "Switch risk bugs filter option is correct");
                assert.equal($(bugsFilterOptions.get(2)).text(), expectedOutreachBugs, "Outreach bugs filter option is correct");
                assert.equal($(bugsFilterOptions.get(3)).text(), expectedReleaseBugs, "Release bugs filter option is correct");
                assert.equal(bugSectionElem.find(classify(BaseConfig.Classes.TableMetadata)).text(),
                    expectedScanTime, "The scan time value is correct");
                assert.equal($(bugSectionTableElem.find("tbody tr td").get(0)).find("a").length, 1, "Bug numbers are links");

                // Change dropdown and validate table bug list updates
                widget.bugsTable.widget.getDataUpdatePromise().done(() => {
                    postFilterChangeFirstCellValue = $($(bugSectionTableElem.find("tbody tr").get(0)).find("td").get(0)).text();
                    assert.notEqual(initialFirstCellValue, postFilterChangeFirstCellValue, "Cell values have changed when filter changed");
                    assert.equal(postFilterChangeFirstCellValue, expectedPostFilterChangeFirstCellValue, "Expected value present after filter change");

                    tableFilterUpdateDone();
                });
                widget.bugsFilters.vm.value({ "bug": "SwitchRisk" });

                // Verify table search filter works as expected
                widget.bugsTable.widget.getDataUpdatePromise().done(() => {
                    let rows = bugSectionElem.find("tbody tr");
                    assert.equal(rows.length, 1, "Search filter returned one result");
                    assert.equal($($(rows.get(0)).find("td").get(0)).text(), "5736611", "Search filter returned the expected result");

                    // Verify empty message is shown correctly when no results available
                    widget.bugsTable.widget.getDataUpdatePromise().done(() => {
                        let rows = bugSectionElem.find("tbody tr");
                        assert.equal(rows.length, 1, "Search filter shows one row when search string not found");
                        assert.equal($($(rows.get(0)).find("td").get(0)).text(),
                            Config.Strings.DetailsBugsTableNoResultsMessage, "Search filter shows empty message when search string not found");

                        tableSearchNoResultUpdateDone();
                    });
                    bugSearchFilter.find("input").val("asdfasdfasdf").trigger("keyup");
                        
                    tableSearchUpdateDone();
                });
                bugSearchFilter.find("input").val("Edge F12").trigger("keyup");

                done();
            });
        });

        QUnit.test("Technologies section renders correctly", (assert) => {
            let done = assert.async();
            let domainTechMockData = DetailsMocks.getMockBuiltWithDataForDomain();
            let domainTechElem = widget.tech.widget.element;

            loadPromise.done(() => {
                let technologies = [];
                domainTechMockData.technologies.forEach((tech: BuiltWithDataForDomainRepo.Technology) => {
                    technologies.push(tech.name);
                });

                assert.equal($.trim(domainTechElem.find(classify(BaseConfig.Classes.SectionBody)).text()),
                    technologies.join(", "), "The set of rendered technologies is correct");

                done();
            });
        });

        QUnit.test("Trends section renders correctly", (assert) => {
            let done = assert.async();
            let chartFilterUpdateDone = assert.async();
            let domainTrendsMockDataRs1 = DetailsMocks.getMockTrendsForDomainDataRs1();
            let domainTrendsMockDataTh2 = DetailsMocks.getMockTrendsForDomainDataTh2();
            let filtersMockData = DetailsMocks.getMockFiltersData();
            let trendsSectionElem = widget.trends.widget.element;
            let trendsSectionFirstChartElem = $(trendsSectionElem.find(classify(Chart.Widget.widgetClass)).get(0));
            let trendsSectionFilterElem = widget.trendsFilters.widget.element;

            loadPromise.done(() => {
                let trendFilterDataValues = [];
                let trendFilterValues = [];
                let firstPointDataValue = domainTrendsMockDataRs1["charts"][0].dataPoints[0].count;
                let frowniesChart: HighchartsChartObject = trendsSectionFirstChartElem.highcharts();
                let firstPointValue = frowniesChart.series[0].data[0].y;

                filtersMockData["release"].forEach((filter: FiltersRepo.Option) => {
                    trendFilterDataValues.push(filter.value);
                });

                trendsSectionFilterElem.find("option").each((i: number, elem: Element) => {
                    trendFilterValues.push($(elem).val());
                });
                
                assert.deepEqual(trendFilterValues, trendFilterDataValues, "Rendered filter values match data");
                assert.equal(trendsSectionElem.find(classify(Chart.Widget.widgetClass)).length,
                    3, "All charts render correctly");
                assert.equal(firstPointValue, firstPointDataValue, "The first data point for the first chart matches the data");

                widget.frowniesChart.widget.getDataUpdatePromise().done(() => {
                    let firstPointDataValueAfterFilterChange = domainTrendsMockDataTh2["charts"][0].dataPoints[0].count
                    let frowniesChartAfterFilterChange: HighchartsChartObject = trendsSectionFirstChartElem.highcharts();
                    let firstPointValueAfterFilterChange = frowniesChartAfterFilterChange.series[0].data[0].y;

                    assert.equal(firstPointValueAfterFilterChange, firstPointDataValueAfterFilterChange,
                        "The first data point for the first chart matches the data after the chart filter changes");

                    chartFilterUpdateDone();
                });
                widget.trendsFilters.vm.value({ "release": "TH2" });

                done();
            });
        });
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

        QUnit.test("Bugs section renders correctly", (assert) => {
            let done = assert.async();

            loadPromise.done(() => {
                assert.equal(widget.bugs.widget.element.find(classify(BaseConfig.Classes.SectionBodyPlaceholder)).text(),
                    Config.Strings.DetailsBugsTableNoDataMessage, "Section placeholder is shown when no bug data is available");

                done();
            });
        });

        QUnit.test("Technologies section renders correctly", (assert) => {
            let done = assert.async();

            loadPromise.done(() => {
                assert.equal(widget.tech.widget.element.find(classify(BaseConfig.Classes.SectionBodyPlaceholder)).text(),
                    Config.Strings.DetailsTechNoDataMessage, "Section placeholder is shown when no bug data is available");

                done();
            });
        });

        QUnit.test("Trends section renders correctly", (assert) => {
            let done = assert.async();

            loadPromise.done(() => {
                assert.equal($.trim(widget.trends.widget.element.find(classify(Config.Classes.DetailsTrendsFrowniesSubsection)).text()),
                    Config.Strings.DetailsTrendsFrowniesNoDataMessage, "Frownies chart placeholder is shown when no frownies data is available");
                assert.equal($.trim(widget.trends.widget.element.find(classify(Config.Classes.DetailsTrendsFocusTimeSubsection)).text()),
                    Config.Strings.DetailsTrendsFocusTimeNoDataMessage, "Focus Time chart placeholder is shown when no frownies data is available");
                assert.equal($.trim(widget.trends.widget.element.find(classify(Config.Classes.DetailsTrendsNavigationsSubsection)).text()),
                    Config.Strings.DetailsTrendsNavigationsNoDataMessage, "Navigations chart placeholder is shown when no frownies data is available");

                done();
            });
        });
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