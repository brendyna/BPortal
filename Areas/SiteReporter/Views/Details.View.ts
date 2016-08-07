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

import FiltersRepository = require("../Data/Repositories/Filters.Repository");
import GetBuiltWithDataRepository = require("../Data/Repositories/GetBuiltWithData.Repository");
import ScanTimeRepository = require("../Data/Repositories/ScanTime.Repository");

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
        private _builtWithRepo: GetBuiltWithDataRepository.IRepository;
        private _builtWithProvider: DetailsProvider.BuiltWithProvider;
        private _filtersRepo: FiltersRepository.IRepository;
        private _filtersProvider: SharedProvider.FiltersProvider;
        private _scantimeRepo: ScanTimeRepository.IRepository;
        private _scantimeProvider: SharedProvider.ScanTimeProvider;
        private _staticProvider: DetailsProvider.StaticProvider;

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
                trendFilters: "trends__filters"
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
            let repoSettings = {
                request: {
                    data: this.defaults.viewContext.params
                }
            };
            //this._bugsForTagBlobUrlRepo = new BugsForTagBlobUrlRepository.Repository($.extend({}, repoSettings));
            //this._bugsForTagRepo = new BugsForTagRepository.Repository();
            this._filtersRepo = new FiltersRepository.Repository($.extend({}, repoSettings));
            //this._trendsForTagRepo = new TrendsForTagRepository.Repository($.extend({}, repoSettings));
            this._builtWithRepo = new GetBuiltWithDataRepository.Repository($.extend({}, repoSettings));
            //this._scantimeRepo = new ScanTimeRepository.Repository();
        }

        public initializeLoading(): void {
            //this.bugsFilters.vm.loading(true);
            this.trendsFilters.vm.loading(true);
            this.tech.vm.loading(true);

            //this.initializeBugsLoading();
            //this.initializeTrendsLoading();
        }

        public loadRepos(): void {
            // Setup load state changes for when promises resolve
            // There's a random bug here (remove the <any> and see the compiler error)
            $.when<any>(
                this._builtWithRepo.getPromise())
            .done(() => {
                this._loadDeferred.resolve();
                this.initializeSubscriptions();
            });

            //// Begin loading the data
            //this.loadBugsRepo();
            //this.loadTrendsRepo();

            this._filtersRepo.load().done(() => {
                this.applyFiltersData();
            });

            this._builtWithRepo.load().done(() => {
                this.applyBuiltWithData();
            });

            //this._scantimeRepo.load().done(() => {
            //    this.applyScantimeData();
            //});
        }

        public initializeSubscriptions(): void {
            //this._subscriptions.push(this.bugsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
            //    $.extend(this._bugsForTagBlobUrlRepo.settings.request.data, newValue);

            //    this.initializeBugsLoading();
            //    this.loadBugsRepo();
            //}));

            this._subscriptions.push(this.trendsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
                //$.extend(this._trendsForTagRepo.settings.request.data, newValue);

                //this.initializeTrendsLoading();
                //this.loadTrendsRepo();
            }));
        }

        public setStaticViewModelData(): void {
            this._staticProvider = new DetailsProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._staticProvider.getNavigationViewModelData(),
                header: this._staticProvider.getHeaderViewModelData(),
                sidebar: this._staticProvider.getSidebarViewModelData(),
                bugs: this._staticProvider.getBugsViewModelData(),
                trends: this._staticProvider.getTrendsViewModelData(),
                tech: this._staticProvider.getTechViewModelData()
            }
        }

        private initializeBugsLoading(): void {
            //this.bugsSnapshots.vm.loading(true);
            //this.bugsTable.vm.loading(true);
        }

        private initializeTrendsLoading(): void {
            //this.trendsSnapshots.vm.loading(true);
            //this.trendsTable.vm.loading(true);
        }

        private loadBugsRepo(): void {
            // Load Bugs data
            //this._bugsForTagBlobUrlRepo.load().done((blobUrl: string) => {
            //    this._bugsForTagRepo.settings.baseUrl = blobUrl;
            //    this._bugsForTagRepo.load().done(() => {
            //        this.applyBugsData();
            //    });
            //});
        }

        private loadTrendsRepo(): void {
            // Load Trends data
            //this._trendsForTagRepo.load().done(() => {
            //    this.applyTrendsData();
            //});
        }

        private applyBugsData(): void {
            //this._bugsForTagProvider = new SummaryProvider.BugsProvider(this._bugsForTagRepo);

            //this.bugsSnapshots.vm.loading(false);
            //this.bugsTable.vm.loading(false);
            //this.bugsSnapshots.vm.descriptionPairs(this._bugsForTagProvider.getBugSnapshotData());
            //this.bugsTable.widget.data(this._bugsForTagProvider.getBugTableData());
        }

        private applyTrendsData(): void {
            //this._trendsForTagProvider = new SummaryProvider.TrendsProvider(this._trendsForTagRepo);

            //this.trendsSnapshots.vm.loading(false);
            //this.trendsTable.vm.loading(false);
            //this.trendsSnapshots.vm.descriptionPairs(this._trendsForTagProvider.getTrendsSnapshotData());
            //this.trendsTable.widget.data(this._trendsForTagProvider.getTrendsTableData());
        }

        private applyFiltersData(): void {
            this._filtersProvider = new SharedProvider.FiltersProvider(this._filtersRepo);
            
            this.trendsFilters.vm.loading(false);
            this.trendsFilters.vm.selectData(this._filtersProvider.getFilterSelectDataByType(SharedProvider.FiltersType.TrendsDetails));
        }

        private applyBuiltWithData(): void {
            this._builtWithProvider = new DetailsProvider.BuiltWithProvider(this._builtWithRepo);

            this.tech.vm.loading(false);
            this.tech.vm.bodyViewModel().builtwith(this._builtWithProvider.getTechnologies());
        }

        private applyScantimeData(): void {
            //this._scantimeProvider = new SummaryProvider.ScanTimeProvider(this._scantimeRepo);

            //this.bugsTable.vm.metadata("Updated " + this._scantimeProvider.getLastScannedTime());
        }
    }
}