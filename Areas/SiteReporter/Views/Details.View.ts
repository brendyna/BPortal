import $ = require("jquery");
import ko = require("knockout");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import Chart = require("Areas/Shared/Controls/Chart");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Filters = require("Areas/Shared/Controls/Filters");
import Header = require("Areas/Shared/Controls/Header");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");
import Badge = require("Areas/Shared/Controls/Badge");

import BugsForDomainRepository = require("../Data/Repositories/BugsForDomain.Repository");
import BugsForDomainBlobUrlRepository = require("../Data/Repositories/BugsForDomainBlobUrl.Repository");
import BugTrendsRepository = require("../Data/Repositories/BugTrends.Repository");
import BugTrendsBlobUrlRepository = require("../Data/Repositories/BugTrendsBlobUrl.Repository");
import DetailsForDomainRepository = require("../Data/Repositories/DetailsForDomain.Repository");
import FiltersRepository = require("../Data/Repositories/Filters.Repository");
import GetBuiltWithDataRepository = require("../Data/Repositories/GetBuiltWithData.Repository");
import ScanTimeRepository = require("../Data/Repositories/ScanTime.Repository");
import TrendsForDomainRepository = require("../Data/Repositories/TrendsForDomain.Repository");

import DetailsProvider = require("../Data/Providers/Details.Provider");
import SharedProvider = require("../Data/Providers/Shared.Provider");

import DefaultTemplate = require("../Templates/Views/Details.Template");

export = Main;

module Main {
    Chart;
    DescriptionList;
    Filters;
    Section;
    Table;
    Badge;

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
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        bugs: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        trends: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        tech: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        private _bugsForDomainRepo: BugsForDomainRepository.IRepository;
        private _bugsForDomainBlobUrlRepo: BugsForDomainBlobUrlRepository.IRepository;
        private _bugsForDomainProvider: DetailsProvider.BugsProvider;
        private _bugTrendsRepo: BugTrendsRepository.IRepository;
        private _bugTrendsBlobUrlRepo: BugTrendsBlobUrlRepository.IRepository;
        private _bugTrendsProvider: DetailsProvider.BugTrendsProvider;
        private _builtWithRepo: GetBuiltWithDataRepository.IRepository;
        private _builtWithProvider: DetailsProvider.BuiltWithProvider;
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
                sidebar: "details-sidebar",
                bugs: "details-bugs",
                trends: "details-trends",
                tech: "details-tech"
            }, this._controlIds);

            this._controlClasses = $.extend({
                bugFilters: "bug__filters",
                bugList: "bug__list",
                bugTrends: "bug__trends",
                domainSnapshot: "domain__snapshot",
                trendFilters: "trends__filters",
                trendsFocusTime: "trends__focustime",
                trendsNavigations: "trends__navigations",
                trendsFrownies: "trends__frownies"
            }, this._controlClasses);

            this.setStaticViewModelData();

            if (!this._defaults.disableAutoRender) {
                super.render();
                this.loadData();
            }
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

        public get frowniesChart(): BaseControl.IControl<Chart.IViewModel, Chart.IWidget> {
            return <BaseControl.IControl<Chart.IViewModel, Chart.IWidget>>
                (super.getDataFor("." + this.controlClasses["trendsFrownies"]));
        }

        public get snapshot(): BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget> {
            return <BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget>>
                (super.getDataFor("." + this.controlClasses["domainSnapshot"]));
        }

        public get navigationsChart(): BaseControl.IControl<Chart.IViewModel, Chart.IWidget> {
            return <BaseControl.IControl<Chart.IViewModel, Chart.IWidget>>
                (super.getDataFor("." + this.controlClasses["trendsNavigations"]));
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

        public initializeRepos(): void {
            this._bugsForDomainBlobUrlRepo = new BugsForDomainBlobUrlRepository.Repository(this.getRepoSettings());
            this._bugsForDomainRepo = new BugsForDomainRepository.Repository();
            this._bugTrendsBlobUrlRepo = new BugTrendsBlobUrlRepository.Repository(this.getRepoSettings());
            this._bugTrendsRepo = new BugTrendsRepository.Repository();
            this._detailsForDomainRepo = new DetailsForDomainRepository.Repository(this.getRepoSettings());
            this._filtersRepo = new FiltersRepository.Repository(this.getRepoSettings());
            this._trendsForDomainRepo = new TrendsForDomainRepository.Repository(this.getRepoSettings());
            this._builtWithRepo = new GetBuiltWithDataRepository.Repository(this.getRepoSettings());
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
            this.trendsFilters.vm.loading(true);
            this.tech.vm.loading(true);
            this.snapshot.vm.loading(true);
            this.bugTrendsChart.vm.loading(true);

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

            this._builtWithRepo.load().done(() => {
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
                this._builtWithRepo.getPromise(),
                this._filtersRepo.getPromise(),
                this._scantimeRepo.getPromise(),
                this._trendsForDomainRepo.getPromise())
            .done(() => {
                this._loadDeferred.resolve();
            });

            // When the complete set of data is ready, render the sidebar
            $.when<any>(
                this._bugsForDomainRepo.getPromise(),
                this._detailsForDomainRepo.getPromise())
            .done(() => {
                this.applySidebarData();
            });

            $.when<any>(
                this._filtersRepo.getPromise(),
                this._bugsForDomainRepo.getPromise(),
                this._bugTrendsRepo.getPromise())
            .done(() => {
                this.initializeBugSubscriptions();
            });

            $.when<any>(
                this._filtersRepo.getPromise(),
                this._trendsForDomainRepo.getPromise())
            .done(() => {
                this.initializeTrendsSubscriptions();
            });
        }

        private initializeBugSubscriptions(): void {
            this._subscriptions.push(this.bugsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
                this.bugsTable.widget.data(this._bugsForDomainProvider.getBugTableDataByType(newValue[DetailsProvider.BugsProvider.SelectName]));
                this.updateBugTrendsChart(newValue[DetailsProvider.BugsProvider.SelectName]);
            }));
        }

        private initializeTrendsSubscriptions(): void {
            this._subscriptions.push(this.trendsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
                $.extend(this._trendsForDomainRepo.settings.request.data, newValue);

                this.initializeTrendsLoading();
                this.loadTrendsRepo();
            }));
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
            this.bugsTable.vm.loading(true);
            this.bugsFilters.vm.loading(true);
        }

        private initializeTrendsLoading(): void {
            this.frowniesChart.vm.loading(true);
            this.navigationsChart.vm.loading(true);
            this.focusTimeChart.vm.loading(true);
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
            descriptionPairs.push(this._detailsForDomainProvider.getTagsDescriptionPair());

            this.snapshot.vm.loading(false);
            this.snapshot.vm.descriptionPairs(descriptionPairs);
        }

        private applyBugsData(): void {
            if (!this._bugsForDomainProvider) {
                this._bugsForDomainProvider = new DetailsProvider.BugsProvider(this._bugsForDomainRepo);
            }

            this.bugsFilters.vm.loading(false);
            this.bugsFilters.vm.selectData(this._bugsForDomainProvider.getFilterSelectData());

            this.bugsTable.vm.loading(false);
            this.bugsTable.widget.data(this._bugsForDomainProvider.getBugTableData());
        }

        private applyBugTrendsData(): void {
            this._bugTrendsProvider = new DetailsProvider.BugTrendsProvider(this._bugTrendsRepo);

            this.bugTrendsChart.vm.loading(false);
            this.bugTrendsChart.widget.data(this._bugTrendsProvider.getChartSeriesData());
        }

        private applyTrendsData(): void {
            this._trendsForDomainProvider = new DetailsProvider.TrendsProvider(this._trendsForDomainRepo);

            this.focusTimeChart.vm.loading(false);
            this.focusTimeChart.widget.data(
                this._trendsForDomainProvider.getChartDataByType(DetailsProvider.ChartType.FocusTime));

            this.frowniesChart.vm.loading(false);
            this.frowniesChart.widget.data(
                this._trendsForDomainProvider.getChartDataByType(DetailsProvider.ChartType.Frownies));

            this.navigationsChart.vm.loading(false);
            this.navigationsChart.widget.data(
                this._trendsForDomainProvider.getChartDataByType(DetailsProvider.ChartType.Navigations));
        }

        private applyFiltersData(): void {
            this._filtersProvider = new SharedProvider.FiltersProvider(this._filtersRepo);
            
            this.trendsFilters.vm.loading(false);
            this.trendsFilters.vm.selectData(this._filtersProvider.getFilterSelectDataByType(SharedProvider.FiltersType.TrendsDetails, {
                platform: (<IParams>this.defaults.viewContext.params).platform,
                release: (<IParams>this.defaults.viewContext.params).release
            }));
        }

        private applyBuiltWithData(): void {
            this._builtWithProvider = new DetailsProvider.BuiltWithProvider(this._builtWithRepo);

            this.tech.vm.loading(false);
            this.tech.vm.bodyViewModel().builtwith(this._builtWithProvider.getTechnologies());
        }

        private applyScantimeData(): void {
            this._scantimeProvider = new SharedProvider.ScanTimeProvider(this._scantimeRepo);

            this.bugsTable.vm.metadata("Updated " + this._scantimeProvider.getLastScannedTime());
        }

        private updateBugTrendsChart(visibleSeriesName: string): void {
            let chart = $(this.bugTrendsChart.widget.element).highcharts();

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