import "jquery";
import "knockout";
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import BugsForDomainBlobUrlRepository = require("../Data/Repositories/BugsForDomainBlobUrl.Repository");
import BugsForDomainRepository = require("../Data/Repositories/BugsForDomain.Repository");
import BugTrendsBlobUrlRepository = require("../Data/Repositories/BugTrendsBlobUrl.Repository");
import BugTrendsRepository = require("../Data/Repositories/BugTrends.Repository");
import BuiltWithDataForDomainRepository = require("../Data/Repositories/BuiltWithDataForDomain.Repository");
import Chart = require("Areas/Shared/Controls/Chart");
import Config = require("../Config");
import DefaultTemplate = require("../Templates/Views/Details.Template");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import DetailsForDomainRepository = require("../Data/Repositories/DetailsForDomain.Repository");
import DetailsProvider = require("../Data/Providers/Details.Provider");
import Filters = require("Areas/Shared/Controls/Filters");
import FiltersRepository = require("../Data/Repositories/Filters.Repository");
import ScanTimeRepository = require("../Data/Repositories/ScanTime.Repository");
import Section = require("Areas/Shared/Controls/Section");
import SharedProvider = require("../Data/Providers/Shared.Provider");
import Table = require("Areas/Shared/Controls/Table");
import TrendsForDomainRepository = require("../Data/Repositories/TrendsForDomain.Repository");

export = Main;

module Main {
    Chart;
    DescriptionList;
    Filters;
    Section;
    Table;

    export interface IParams extends Base.IParams {
        domain: string;
        platform: string;
        release: string;
    }

    export interface IViewModelData extends Base.IViewModelData {
        sidebar?: Section.IViewModelData;
        bugs?: Section.IViewModelData;
        trends?: Section.IViewModelData;
        tech?: Section.IViewModelData;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
    }

    export interface IWidget extends Base.IWidget {
        bugs: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        bugsFilters: BaseControl.IControl<Filters.ViewModel, Filters.Widget>;
        bugsTable: BaseControl.IControl<Table.ViewModel, Table.Widget>;
        bugTrendsChart: BaseControl.IControl<Chart.IViewModel, Chart.IWidget>;
        focusTimeChart: BaseControl.IControl<Chart.IViewModel, Chart.IWidget>;
        focusTimeSubSection: Section.ISubSection;
        frowniesChart: BaseControl.IControl<Chart.IViewModel, Chart.IWidget>;
        frowniesSubSection: Section.ISubSection;
        getDataLoadPromise: () => JQueryPromise<void>;
        navigationsChart: BaseControl.IControl<Chart.IViewModel, Chart.IWidget>;
        navigationsSubSection: Section.ISubSection;
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        snapshot: BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget>;
        tech: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        trends: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        trendsFilters: BaseControl.IControl<Filters.ViewModel, Filters.Widget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "view--details";

        private _bugsForDomainRepo: BugsForDomainRepository.IRepository;
        private _bugsForDomainBlobUrlRepo: BugsForDomainBlobUrlRepository.IRepository;
        private _bugsForDomainProvider: DetailsProvider.BugsProvider;
        private _bugTrendsRepo: BugTrendsRepository.IRepository;
        private _bugTrendsBlobUrlRepo: BugTrendsBlobUrlRepository.IRepository;
        private _bugTrendsProvider: DetailsProvider.BugTrendsProvider;
        private _buildWithDataForDomainRepo: BuiltWithDataForDomainRepository.IRepository;
        private _buildWithDataForDomainProvider: DetailsProvider.BuiltWithDataForDomainProvider;
        private _detailsForDomainRepo: DetailsForDomainRepository.IRepository;
        private _detailsForDomainProvider: DetailsProvider.DetailsForDomainProvider;
        private _filtersRepo: FiltersRepository.IRepository;
        private _filtersProvider: SharedProvider.FiltersProvider;
        private _scantimeRepo: ScanTimeRepository.IRepository;
        private _scantimeProvider: SharedProvider.ScanTimeProvider;
        private _staticProvider: DetailsProvider.StaticProvider;
        private _trendsForDomainRepo: TrendsForDomainRepository.IRepository;
        private _trendsForDomainProvider: DetailsProvider.TrendsProvider;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || DefaultTemplate;

            super(element, defaults, viewModelData);

            this._controlIds = $.extend({
                sidebar: Config.Ids.DetailsSidebar,
                bugs: Config.Ids.DetailsBugs,
                trends: Config.Ids.DetailsTrends,
                tech: Config.Ids.DetailsTech
            }, this._controlIds);

            this._controlClasses = $.extend({
                bugFilters: Config.Classes.DetailsBugsFilters,
                bugList: Config.Classes.DetailsBugsTable,
                bugTrends: Config.Classes.DetailsBugsTrendsChart,
                domainSnapshot: Config.Classes.DetailsDomainSnapshot,
                trendFilters: Config.Classes.TrendsFilters,
                trendsFocusTimeSection: Config.Classes.DetailsTrendsFocusTimeSubsection,
                trendsFocusTime: Config.Classes.DetailsTrendsFocusTimeChart,
                trendsNavigationsSection: Config.Classes.DetailsTrendsNavigationsSubsection,
                trendsNavigations: Config.Classes.DetailsTrendsNavigationsChart,
                trendsFrowniesSection: Config.Classes.DetailsTrendsFrowniesSubsection,
                trendsFrownies: Config.Classes.DetailsTrendsFrowniesChart
            }, this._controlClasses);

            this.setStaticViewModelData();
            this.element.addClass(Widget.widgetClass);

            if (!this._defaults.disableAutoRender) {
                super.render();

                if (!this._defaults.disableAutoLoad && this.disabledPlaceholder() === "") {
                    this.loadData();
                }
            }
        }

        public destroy(): void {
            super.destroy();

            this.element.removeClass(Widget.widgetClass);
        }

        public get bugs(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["bugs"]));
        }

        public get bugsFilters(): BaseControl.IControl<Filters.ViewModel, Filters.Widget> {
            return <BaseControl.IControl<Filters.ViewModel, Filters.Widget>>
                (super.getDataFor("." + this.controlClasses["bugFilters"]));
        }

        public get bugsTable(): BaseControl.IControl<Table.ViewModel, Table.Widget> {
            return <BaseControl.IControl<Table.ViewModel, Table.Widget>>
                (super.getDataFor("." + this.controlClasses["bugList"]));
        }

        public get bugTrendsChart(): BaseControl.IControl<Chart.IViewModel, Chart.IWidget> {
            return <BaseControl.IControl<Chart.IViewModel, Chart.IWidget>>
                (super.getDataFor("." + this.controlClasses["bugTrends"]));
        }

        public get focusTimeChart(): BaseControl.IControl<Chart.IViewModel, Chart.IWidget> {
            return <BaseControl.IControl<Chart.IViewModel, Chart.IWidget>>
                (super.getDataFor("." + this.controlClasses["trendsFocusTime"]));
        }

        public get focusTimeSubSection(): Section.ISubSection {
            return <Section.ISubSection>(ko.dataFor($("." + this.controlClasses["trendsFocusTimeSection"])[0]));
        }

        public get frowniesChart(): BaseControl.IControl<Chart.IViewModel, Chart.IWidget> {
            return <BaseControl.IControl<Chart.IViewModel, Chart.IWidget>>
                (super.getDataFor("." + this.controlClasses["trendsFrownies"]));
        }

        public get frowniesSubSection(): Section.ISubSection {
            return <Section.ISubSection>(ko.dataFor($("." + this.controlClasses["trendsFrowniesSection"])[0]));
        }

        public get snapshot(): BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget> {
            return <BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget>>
                (super.getDataFor("." + this.controlClasses["domainSnapshot"]));
        }

        public get navigationsChart(): BaseControl.IControl<Chart.IViewModel, Chart.IWidget> {
            return <BaseControl.IControl<Chart.IViewModel, Chart.IWidget>>
                (super.getDataFor("." + this.controlClasses["trendsNavigations"]));
        }

        public get navigationsSubSection(): Section.ISubSection {
            return <Section.ISubSection>(ko.dataFor($("." + this.controlClasses["trendsNavigationsSection"])[0]));
        }

        public get sidebar(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["sidebar"]));
        }

        public get tech(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["tech"]));
        }

        public get trendsFilters(): BaseControl.IControl<Filters.ViewModel, Filters.Widget> {
            return <BaseControl.IControl<Filters.ViewModel, Filters.Widget>>
                (super.getDataFor("." + this.controlClasses["trendFilters"]));
        }

        public get trends(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["trends"]));
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public getDataLoadPromise(): JQueryPromise<void> {
            return this._loadDeferred.promise();
        }

        public initializeRepos(): void {
            this._bugsForDomainBlobUrlRepo = new BugsForDomainBlobUrlRepository.Repository(this.getRepoSettings());
            this._bugsForDomainRepo = new BugsForDomainRepository.Repository();
            this._bugTrendsBlobUrlRepo = new BugTrendsBlobUrlRepository.Repository(this.getRepoSettings());
            this._bugTrendsRepo = new BugTrendsRepository.Repository();
            this._detailsForDomainRepo = new DetailsForDomainRepository.Repository(this.getRepoSettings());
            this._filtersRepo = new FiltersRepository.Repository(this.getRepoSettings());
            this._trendsForDomainRepo = new TrendsForDomainRepository.Repository(this.getRepoSettings());
            this._buildWithDataForDomainRepo = new BuiltWithDataForDomainRepository.Repository(this.getRepoSettings());
            this._scantimeRepo = new ScanTimeRepository.Repository();
        }

        private getRepoSettings(): {} {
            return {
                request: {
                    data: $.extend({}, this.defaults.viewContext.params)
                }
            };
        }

        public initializeLoading(): void {
            this.trendsFilters.viewModel.loading(true);
            this.tech.viewModel.loading(true);
            this.snapshot.viewModel.loading(true);
            this.bugTrendsChart.viewModel.loading(true);

            this.initializeBugsLoading();
            this.initializeTrendsLoading();
        }

        public loadRepos(): void {
            // Setup load state changes for when promises resolve
            this.initializeRepoLoadActions();

            // Load repos
            this._detailsForDomainRepo.load();

            this._filtersRepo.load().done(() => {
                this.applyFiltersData();
            });

            this._scantimeRepo.load().done(() => {
                this.applyScantimeData();
            });

            this.loadBugsRepo();
            
            this._bugTrendsBlobUrlRepo.load().done((blobUrl: string) => {
                this._bugTrendsRepo.settings.baseUrl = blobUrl;
                this._bugTrendsRepo.load().done(() => {
                    this.applyBugTrendsData();
                });
            });

            this._buildWithDataForDomainRepo.load().done(() => {
                this.applyBuiltWithData();
            });

            this.loadTrendsRepo();
        }

        public initializeSubscriptions(): void {
            // No-op (subscription initialization is split up based on repo loads)
        }

        private initializeRepoLoadActions(): void {
            // There's a random bug here (remove the <any> and see the compiler error)
            $.when<any>(
                this._bugsForDomainRepo.getPromise(),
                this._bugTrendsRepo.getPromise(),
                this._buildWithDataForDomainRepo.getPromise(),
                this._filtersRepo.getPromise(),
                this._scantimeRepo.getPromise(),
                this._trendsForDomainRepo.getPromise())
            .done(() => {
                this.initializeBugSubscriptions();
                this.initializeTrendsSubscriptions();
                this._loadDeferred.resolve();
            });

            // When the complete set of data is ready, render the sidebar
            $.when<any>(
                this._bugsForDomainRepo.getPromise(),
                this._detailsForDomainRepo.getPromise())
            .done(() => {
                this.applySidebarData();
            });
        }

        private initializeBugSubscriptions(): void {
            // If the bugs section has loaded with no data (hence the placeholder)
            // don't subscribe as there are no changes to subscribe to
            if (this.bugs.viewModel.bodyPlaceholder() === "") {
                this._subscriptions.push(this.bugsFilters.viewModel.value.subscribe((newValue: IDictionary<string>) => {
                    this.bugsTable.widget.data(this._bugsForDomainProvider.getBugTableDataByType(newValue[DetailsProvider.BugsProvider.SelectName]));
                    this.updateBugTrendsChart(newValue[DetailsProvider.BugsProvider.SelectName]);
                }));
            }
        }

        private initializeTrendsSubscriptions(): void {
            // If the trends section has loaded with no data (hence the placeholder)
            // don't subscribe as there are no changes to subscribe to
            if (this.trends.viewModel.bodyPlaceholder() === "") {
                this._subscriptions.push(this.trendsFilters.viewModel.value.subscribe((newValue: IDictionary<string>) => {
                    $.extend(this._trendsForDomainRepo.settings.request.data, newValue);

                    this.initializeTrendsLoading();
                    this.loadTrendsRepo();
                }));
            }
        }

        public setStaticViewModelData(): void {
            this._staticProvider = new DetailsProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._staticProvider.getNavigationViewModelData(),
                header: this._staticProvider.getHeaderViewModelData((<IParams>this.defaults.viewContext.params).domain),
                sidebar: this._staticProvider.getSidebarViewModelData(),
                bugs: this._staticProvider.getBugsViewModelData(),
                trends: this._staticProvider.getTrendsViewModelData(),
                tech: this._staticProvider.getTechViewModelData()
            }
        }

        private initializeBugsLoading(): void {
            this.bugsTable.viewModel.loading(true);
            this.bugsFilters.viewModel.loading(true);
        }

        private initializeTrendsLoading(): void {
            this.resetTrendsPlaceholders();

            this.frowniesChart.viewModel.loading(true);
            this.navigationsChart.viewModel.loading(true);
            this.focusTimeChart.viewModel.loading(true);
        }

        private resetTrendsPlaceholders(): void {
            this.focusTimeSubSection.bodyPlaceholder("");
            this.frowniesSubSection.bodyPlaceholder("");
            this.navigationsSubSection.bodyPlaceholder("");
        }

        private loadBugsRepo(): void {
            // Load Bugs data
            this._bugsForDomainBlobUrlRepo.load().done((blobUrl: string) => {
                this._bugsForDomainRepo.settings.baseUrl = blobUrl;
                this._bugsForDomainRepo.load().done(() => {
                    this.applyBugsData();
                });
            });
        }

        private loadTrendsRepo(): void {
            // Load Trends data
            this._trendsForDomainRepo.load().done(() => {
                this.applyTrendsData();
            });
        }

        private applySidebarData(): void {
            let descriptionPairs = [];
            this._detailsForDomainProvider = new DetailsProvider.DetailsForDomainProvider(this._detailsForDomainRepo);

            if (!this._bugsForDomainProvider) {
                this._bugsForDomainProvider = new DetailsProvider.BugsProvider(this._bugsForDomainRepo);
            }

            if (this._bugsForDomainProvider.isSwitchRisk) {
                descriptionPairs.push(this._staticProvider.getSwitchRiskDescriptionPair());
            }

            if (this._detailsForDomainProvider.isOffensive) {
                descriptionPairs.push(this._staticProvider.getOffensiveContentDescriptionPair());
            }

            descriptionPairs.push(this._staticProvider.getFavIconDescriptionPair((<IParams>this.defaults.viewContext.params).domain));
            descriptionPairs.push(this._detailsForDomainProvider.getBingdexDescriptionPair());
            descriptionPairs.push(this._detailsForDomainProvider.getAlexaDescriptionPair());

            if (!this._detailsForDomainProvider.isTagsDataEmpty()) {
                descriptionPairs.push(this._detailsForDomainProvider.getTagsDescriptionPair());
            }

            this.snapshot.viewModel.loading(false);
            this.snapshot.viewModel.descriptionPairs(descriptionPairs);
        }

        private applyBugsData(): void {
            if (!this._bugsForDomainProvider) {
                this._bugsForDomainProvider = new DetailsProvider.BugsProvider(this._bugsForDomainRepo);
            }

            this.bugsFilters.viewModel.loading(false);
            this.bugsTable.viewModel.loading(false);

            if (this._bugsForDomainProvider.isBugDataEmpty()) {
                this.bugs.viewModel.bodyPlaceholder(Config.Strings.DetailsBugsTableNoDataMessage);
            } else {
                this.bugsFilters.viewModel.selectData(this._bugsForDomainProvider.getFilterSelectData());
                this.bugsTable.widget.data(this._bugsForDomainProvider.getBugTableData());
            }
        }

        private applyBugTrendsData(): void {
            this._bugTrendsProvider = new DetailsProvider.BugTrendsProvider(this._bugTrendsRepo);

            // If the bugs section has loaded with no data (hence the placeholder)
            // don't subscribe as there are no changes to subscribe to
            if (this.bugs.viewModel.bodyPlaceholder() === "") {
                if (this._bugTrendsProvider.isBugTrendDataEmpty()) {
                    this.bugTrendsChart.widget.hidden(true);
                } else {
                    this.bugTrendsChart.widget.data(this._bugTrendsProvider.getChartSeriesData());
                }

                this.bugTrendsChart.viewModel.loading(false);
            }
        }

        private applyTrendsData(): void {
            this._trendsForDomainProvider = new DetailsProvider.TrendsProvider(this._trendsForDomainRepo);

            // Focus Time
            if (this._trendsForDomainProvider.isDataEmpty(DetailsProvider.ChartType.FocusTime)) {
                this.focusTimeSubSection.bodyPlaceholder(Config.Strings.DetailsTrendsFocusTimeNoDataMessage);
            } else {
                this.focusTimeChart.widget.data(
                    this._trendsForDomainProvider.getChartDataByType(DetailsProvider.ChartType.FocusTime));
                this.focusTimeChart.widget.hidden(false);
                this.focusTimeChart.viewModel.loading(false);
            }

            // Frownies
            if (this._trendsForDomainProvider.isDataEmpty(DetailsProvider.ChartType.Frownies)) {
                this.frowniesSubSection.bodyPlaceholder(Config.Strings.DetailsTrendsFrowniesNoDataMessage);
            } else {
                this.frowniesChart.widget.data(
                    this._trendsForDomainProvider.getChartDataByType(DetailsProvider.ChartType.Frownies));
                this.frowniesChart.widget.hidden(false);
                this.frowniesChart.viewModel.loading(false);
            }

            // Navigations
            if (this._trendsForDomainProvider.isDataEmpty(DetailsProvider.ChartType.Navigations)) {
                this.navigationsSubSection.bodyPlaceholder(Config.Strings.DetailsTrendsNavigationsNoDataMessage);
            } else {
                this.navigationsChart.widget.data(
                    this._trendsForDomainProvider.getChartDataByType(DetailsProvider.ChartType.Navigations));
                this.navigationsChart.widget.hidden(false);
                this.navigationsChart.viewModel.loading(false);
            }
        }

        private applyFiltersData(): void {
            this._filtersProvider = new SharedProvider.FiltersProvider(this._filtersRepo);

            if (this.trends.viewModel.bodyPlaceholder() === "") {
                this.trendsFilters.viewModel.loading(false);
                this.trendsFilters.viewModel.selectData(this._filtersProvider.getFilterSelectDataByType(SharedProvider.FiltersType.TrendsDetails, {
                    platform: (<IParams>this.defaults.viewContext.params).platform,
                    release: (<IParams>this.defaults.viewContext.params).release
                }));
            }
        }

        private applyBuiltWithData(): void {
            this._buildWithDataForDomainProvider = new DetailsProvider.BuiltWithDataForDomainProvider(this._buildWithDataForDomainRepo);

            this.tech.viewModel.loading(false);

            if (this._buildWithDataForDomainProvider.isDataEmpty()) {
                this.tech.viewModel.bodyPlaceholder(Config.Strings.DetailsTechNoDataMessage);
            } else {
                this.tech.viewModel.bodyViewModel().builtwith(this._buildWithDataForDomainProvider.getTechnologies());
            }
        }

        private applyScantimeData(): void {
            this._scantimeProvider = new SharedProvider.ScanTimeProvider(this._scantimeRepo);

            // Only update scantime value if there are bugs present (aka the table isn't hidden
            // because of the section placeholder)
            if (this.bugs.viewModel.bodyPlaceholder() === "") {
                this.bugsTable.viewModel.metadata(`${Config.Strings.BugsTableScanTimePrefix} ${this._scantimeProvider.getLastScannedTime()}`);
            }
        }

        private updateBugTrendsChart(visibleSeriesName: string): void {
            let chart = $(this.bugTrendsChart.widget.element).highcharts();

            if (chart.series.length > 0) {
                chart.series.forEach((series: HighchartsSeriesObject, index: number) => {
                    series.hide();
                });

                switch (visibleSeriesName) {
                    case this._bugsForDomainProvider.bugTypeMap[DetailsProvider.BugType.Release]:
                        chart.series[3].show();
                        break;

                    case this._bugsForDomainProvider.bugTypeMap[DetailsProvider.BugType.Outreach]:
                        chart.series[2].show();
                        break;

                    case this._bugsForDomainProvider.bugTypeMap[DetailsProvider.BugType.SwitchRisk]:
                        chart.series[1].show();
                        break;

                    case this._bugsForDomainProvider.bugTypeMap[DetailsProvider.BugType.All]:
                    default:
                        chart.series[0].show();
                        break;
                }
            }
        }
    }
}