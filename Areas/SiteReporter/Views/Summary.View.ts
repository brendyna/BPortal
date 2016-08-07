import $ = require("jquery");
import ko = require("knockout");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Filters = require("Areas/Shared/Controls/Filters");
import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");

import BugsForTagRepository = require("../Data/Repositories/BugsForTag.Repository");
import BugsForTagBlobUrlRepository = require("../Data/Repositories/BugsForTagBlobUrl.Repository");
import FiltersRepository = require("../Data/Repositories/Filters.Repository");
import ScanTimeRepository = require("../Data/Repositories/ScanTime.Repository");
import TrendsForTagRepository = require("../Data/Repositories/TrendsForTag.Repository");

import SharedProvider = require("../Data/Providers/Shared.Provider");
import SummaryProvider = require("../Data/Providers/Summary.Provider");

import DefaultTemplate = require("../Templates/Views/Summary.Template");

export = Main;

module Main {
    DescriptionList;
    Filters;
    Section;
    Table;

    export interface IParams extends Base.IParams {
        tag: string;
        platform: string;
        release: string;
    }

    export interface IViewModelData extends Base.IViewModelData {
        sidebar?: Section.IViewModelData;
        bugs?: Section.IViewModelData;
        trends?: Section.IViewModelData;
    }

    export interface IViewContext extends Base.IViewContext {
        params: IParams;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        bugs: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        trends: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        private _bugsForTagBlobUrlRepo: BugsForTagBlobUrlRepository.IRepository;
        private _bugsForTagRepo: BugsForTagRepository.IRepository;
        private _bugsForTagProvider: SummaryProvider.BugsProvider;
        private _filtersRepo: FiltersRepository.IRepository;
        // TODO: Convery this to SharedProvider.FiltersProvider
        // (When I do, TSC throws a random exception with very little context
        // so keeping it as SummaryProvider.TrendsProvider for now)
        private _filtersProvider: SummaryProvider.FiltersProvider;
        private _trendsForTagRepo: TrendsForTagRepository.IRepository;
        private _trendsForTagProvider: SummaryProvider.TrendsProvider;
        private _scantimeRepo: ScanTimeRepository.IRepository;
        private _scantimeProvider: SharedProvider.ScanTimeProvider;
        private _staticProvider: SummaryProvider.StaticProvider;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || DefaultTemplate;

            super(element, defaults, viewModelData);

            this._controlIds = $.extend({
                sidebar: "summary-sidebar",
                bugs: "summary-bugs",
                trends: "summary-trends"
            }, this._controlIds);

            this._controlClasses = $.extend({
                bugFilters: "bugs__filters",
                bugSnapshot: "sidebar__bug-snapshot",
                bugList: "bugs__site-list",
                trendFilters: "trends__filters",
                trendSnapshot: "sidebar__trend-snapshot",
                trendList: "trends__site-list"
            }, this._controlClasses);

            this.setStaticViewModelData();

            if (!this._defaults.disableAutoRender) {
                super.render();
                this.loadData();
            }
        }

        public get sidebar(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["sidebar"]));
        }

        public get bugs(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["bugs"]));
        }

        public get trends(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["trends"]));
        }

        public get bugsFilters(): BaseControl.IControl<Filters.ViewModel, Filters.Widget> {
            return <BaseControl.IControl<Filters.ViewModel, Filters.Widget>>
                (super.getDataFor("." + this.controlClasses["bugFilters"]));
        }

        public get bugsSnapshots(): BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget> {
            return <BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget>>
                (super.getDataFor("." + this.controlClasses["bugSnapshot"]));
        }

        public get bugsTable(): BaseControl.IControl<Table.ViewModel, Table.Widget> {
            return <BaseControl.IControl<Table.ViewModel, Table.Widget>>
                (super.getDataFor("." + this.controlClasses["bugList"]));
        }

        public get trendsFilters(): BaseControl.IControl<Filters.ViewModel, Filters.Widget> {
            return <BaseControl.IControl<Filters.ViewModel, Filters.Widget>>
                (super.getDataFor("." + this.controlClasses["trendFilters"]));
        }

        public get trendsSnapshots(): BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget> {
            return <BaseControl.IControl<DescriptionList.ViewModel, DescriptionList.Widget>>
                (super.getDataFor("." + this.controlClasses["trendSnapshot"]));
        }

        public get trendsTable(): BaseControl.IControl<Table.ViewModel, Table.Widget> {
            return <BaseControl.IControl<Table.ViewModel, Table.Widget>>
                (super.getDataFor("." + this.controlClasses["trendList"]));
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public initializeRepos(): void {
            this._bugsForTagBlobUrlRepo = new BugsForTagBlobUrlRepository.Repository(this.getRepoSettings());
            this._bugsForTagRepo = new BugsForTagRepository.Repository();
            this._filtersRepo = new FiltersRepository.Repository(this.getRepoSettings());
            this._trendsForTagRepo = new TrendsForTagRepository.Repository(this.getRepoSettings());
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
            this.bugsFilters.vm.loading(true);
            this.trendsFilters.vm.loading(true);

            this.initializeBugsLoading();
            this.initializeTrendsLoading();
        }

        public loadRepos(): void {
            // Setup load state changes for when promises resolve
            this.initializeRepoLoadActions();

            // Begin loading the data
            this.loadBugsRepo();
            this.loadTrendsRepo();

            this._filtersRepo.load().done(() => {
                this.applyFiltersData();
            });

            this._scantimeRepo.load().done(() => {
                this.applyScantimeData();
            });
        }

        public initializeSubscriptions(): void {
            // No-op (subscription initialization is split up based on repo loads)
        }

        public setStaticViewModelData(): void {
            this._staticProvider = new SummaryProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._staticProvider.getNavigationViewModelData(),
                header: this._staticProvider.getHeaderViewModelData(),
                sidebar: this._staticProvider.getSidebarViewModelData(),
                bugs: this._staticProvider.getBugsViewModelData(),
                trends: this._staticProvider.getTrendsViewModelData()
            }
        }

        private initializeRepoLoadActions(): void {
            // There's a random bug here (remove the <any> and see the compiler error)
            $.when<any>(
                this._bugsForTagRepo.getPromise(),
                this._filtersRepo.getPromise(),
                this._trendsForTagRepo.getPromise(),
                this._scantimeRepo.getPromise())
            .done(() => {
                this._loadDeferred.resolve();
            });

            $.when<any>(
                this._bugsForTagRepo.getPromise(),
                this._filtersRepo.getPromise())
            .done(() => {
                this.initializeBugSubscriptions();
            });

            $.when<any>(
                this._trendsForTagRepo.getPromise(),
                this._filtersRepo.getPromise())
            .done(() => {
                this.initializeTrendsSubscriptions();
            });
        }

        private initializeBugSubscriptions(): void {
            this._subscriptions.push(this.bugsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
                $.extend(this._bugsForTagBlobUrlRepo.settings.request.data, newValue);

                this.initializeBugsLoading();
                this.loadBugsRepo();
            }));
        }

        private initializeTrendsSubscriptions(): void {
            this._subscriptions.push(this.trendsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
                $.extend(this._trendsForTagRepo.settings.request.data, newValue);

                this.initializeTrendsLoading();
                this.loadTrendsRepo();
            }));
        }

        private initializeBugsLoading(): void {
            this.bugsSnapshots.vm.loading(true);
            this.bugsTable.vm.loading(true);
        }

        private initializeTrendsLoading(): void {
            this.trendsSnapshots.vm.loading(true);
            this.trendsTable.vm.loading(true);
        }

        private loadBugsRepo(): void {
            // Load Bugs data
            this._bugsForTagBlobUrlRepo.load().done((blobUrl: string) => {
                this._bugsForTagRepo.settings.baseUrl = blobUrl;
                this._bugsForTagRepo.load().done(() => {
                    this.applyBugsData();
                });
            });
        }

        private loadTrendsRepo(): void {
            // Load Trends data
            this._trendsForTagRepo.load().done(() => {
                this.applyTrendsData();
            });
        }

        private applyBugsData(): void {
            this._bugsForTagProvider = new SummaryProvider.BugsProvider(this._bugsForTagRepo);

            this.bugsSnapshots.vm.loading(false);
            this.bugsTable.vm.loading(false);
            this.bugsSnapshots.vm.descriptionPairs(this._bugsForTagProvider.getBugSnapshotData());
            this.bugsTable.widget.data(this._bugsForTagProvider.getBugTableData());
        }

        private applyTrendsData(): void {
            this._trendsForTagProvider = new SummaryProvider.TrendsProvider(this._trendsForTagRepo);

            this.trendsSnapshots.vm.loading(false);
            this.trendsTable.vm.loading(false);
            this.trendsSnapshots.vm.descriptionPairs(this._trendsForTagProvider.getTrendsSnapshotData());
            this.trendsTable.widget.data(this._trendsForTagProvider.getTrendsTableData());
        }

        private applyFiltersData(): void {
            this._filtersProvider = new SummaryProvider.FiltersProvider(this._filtersRepo);

            this.bugsFilters.vm.loading(false);
            this.bugsFilters.vm.selectData(this._filtersProvider.getFilterSelectDataByType(SummaryProvider.FiltersType.Bugs, {
                tag: (<IParams>this.defaults.viewContext.params).tag
            }));

            this.trendsFilters.vm.loading(false);
            this.trendsFilters.vm.selectData(this._filtersProvider.getFilterSelectDataByType(SummaryProvider.FiltersType.Trends, {
                tag: (<IParams>this.defaults.viewContext.params).tag,
                platform: (<IParams>this.defaults.viewContext.params).platform,
                release: (<IParams>this.defaults.viewContext.params).release
            }));
        }

        private applyScantimeData(): void {
            this._scantimeProvider = new SharedProvider.ScanTimeProvider(this._scantimeRepo);

            this.bugsTable.vm.metadata("Updated " + this._scantimeProvider.getLastScannedTime());
        }
    }
}