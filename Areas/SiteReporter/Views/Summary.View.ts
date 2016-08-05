import $ = require("jquery");
import ko = require("knockout");
(<any>window).ko = ko;
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Filters = require("Areas/Shared/Controls/Filters");
import Header = require("Areas/Shared/Controls/Header");
import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");

import BugsForTagRepository = require("../Data/Repositories/BugsForTag.Repository");
import BugsForTagBlobUrlRepository = require("../Data/Repositories/BugsForTagBlobUrl.Repository");
import FiltersRepository = require("../Data/Repositories/Filters.Repository");
import ScanTimeRepository = require("../Data/Repositories/ScanTime.Repository");
import TrendsForTagRepository = require("../Data/Repositories/TrendsForTag.Repository");

import SummaryProvider = require("../Data/Providers/Summary.Provider");

import DefaultTemplate = require("../Templates/Views/Summary.Template");

export = Main;

module Main {
    Header;
    Section;

    export type Params = {
        tag: string;
        platform: string;
        release: string;
    }

    export interface Control<VM, W> {
        vm: VM;
        widget: W;
    }

    export interface IViewModelData {
        header?: Header.IViewModelData;
        sidebar?: Section.IViewModelData;
        bugs?: Section.IViewModelData;
        trends?: Section.IViewModelData;
    }

    export interface IViewContext {
        params: Params;
    }

    export interface IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
        template?: string;
        disableAutoRender?: boolean;
    }

    export interface IWidget {
        element: JQuery;
        defaults: IWidgetDefaults;
        header: Control<Header.IViewModel, Header.IWidget>;
        sidebar: Control<Section.IViewModel, Section.IWidget>;
        bugs: Control<Section.IViewModel, Section.IWidget>;
        trends: Control<Section.IViewModel, Section.IWidget>;
    }

    export class Widget implements IWidget {
        public static controlIds = {
            header: "summary-header",
            sidebar: "summary-sidebar",
            bugs: "summary-bugs",
            trends: "summary-trends"
        };

        public static controlClasses = {
        };

        private _element: JQuery;
        private _defaults: IWidgetDefaults;
        private _loadDeferred: JQueryDeferred<void>;
        private _subscriptions: Array<KnockoutSubscription>;

        private _bugsForTagBlobUrlRepo: BugsForTagBlobUrlRepository.IRepository;
        private _bugsForTagRepo: BugsForTagRepository.IRepository;
        private _bugsForTagProvider: SummaryProvider.BugsProvider;
        private _filtersRepo: FiltersRepository.IRepository;
        private _filtersProvider: SummaryProvider.FiltersProvider;
        private _trendsForTagRepo: TrendsForTagRepository.IRepository;
        private _trendsForTagProvider: SummaryProvider.TrendsProvider;
        private _scantimeRepo: ScanTimeRepository.IRepository;
        private _scantimeProvider: SummaryProvider.ScanTimeProvider;
        private _staticProvider: SummaryProvider.StaticProvider;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            this._element = element;
            this._defaults = <IWidgetDefaults>defaults;
            this._loadDeferred = $.Deferred<void>();
            this._subscriptions = [];

            this._defaults.template = this._defaults.template || DefaultTemplate;

            this.element.html(this._defaults.template);

            if (!defaults.disableAutoRender) {
                this.render();
                this.loadData();
            }
        }

        public render(): void {
            ko.applyBindings({ vm: this.getStaticViewModelData(), widget: this }, this._element[0]);
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public get defaults(): IWidgetDefaults {
            return this._defaults;
        }

        public get element(): JQuery {
            return this._element;
        }

        public get header(): Control<Header.IViewModel, Header.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.header)[0]);
        }

        public get sidebar(): Control<Section.IViewModel, Section.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.sidebar)[0]);
        }

        public get bugs(): Control<Section.IViewModel, Section.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.bugs)[0]);
        }

        public get trends(): Control<Section.IViewModel, Section.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.trends)[0]);
        }

        public get bugsFilters(): Control<Filters.ViewModel, Filters.Widget> {
            return <Control<Filters.ViewModel, Filters.Widget>>
                ko.dataFor(this.element.find(".bugs__filters")[0]);
        }

        public get bugsSnapshots(): Control<DescriptionList.ViewModel, DescriptionList.Widget> {
            let control = <Control<DescriptionList.ViewModel, DescriptionList.Widget>>
                ko.dataFor(this.element.find(".sidebar__bug-snapshot")[0]);
            return control;
        }

        public get bugsTable(): Control<Table.ViewModel, Table.Widget> {
            return <Control<Table.ViewModel, Table.Widget>>
                ko.dataFor(this.element.find(".bugs__site-list")[0]);
        }

        public get trendsFilters(): Control<Filters.ViewModel, Filters.Widget> {
            return <Control<Filters.ViewModel, Filters.Widget>>
                ko.dataFor(this.element.find(".trends__filters")[0]);
        }

        public get trendsSnapshots(): Control<DescriptionList.ViewModel, DescriptionList.Widget> {
            let control = <Control<DescriptionList.ViewModel, DescriptionList.Widget>>
                ko.dataFor(this.element.find(".sidebar__trend-snapshot")[0]);
            return control;
        }

        public get trendsTable(): Control<Table.ViewModel, Table.Widget> {
            return <Control<Table.ViewModel, Table.Widget>>
                ko.dataFor(this.element.find(".trends__site-list")[0]);
        }

        private initializeSubscriptions(): void {
            this._subscriptions.push(this.bugsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
                $.extend(this._bugsForTagBlobUrlRepo.settings.request.data, newValue);

                this.initializeBugsLoading();
                this.loadBugsRepo();
            }));

            this._subscriptions.push(this.trendsFilters.vm.value.subscribe((newValue: IDictionary<string>) => {
                $.extend(this._trendsForTagRepo.settings.request.data, newValue);

                this.initializeTrendsLoading();
                this.loadTrendsRepo();
            }));
        }

        private initializeRepos(): void {
            let repoSettings = {
                request: {
                    data: this.defaults.viewContext.params
                }
            };
            this._bugsForTagBlobUrlRepo = new BugsForTagBlobUrlRepository.Repository($.extend({}, repoSettings));
            this._bugsForTagRepo = new BugsForTagRepository.Repository();
            this._filtersRepo = new FiltersRepository.Repository($.extend({}, repoSettings));
            this._trendsForTagRepo = new TrendsForTagRepository.Repository($.extend({}, repoSettings));
            this._scantimeRepo = new ScanTimeRepository.Repository();
        }

        private loadRepos(): void {
            // Setup load state changes for when promises resolve
            // There's a random bug here (remove the <any> and see the compiler error)
            (<any>$).when(
                this._bugsForTagBlobUrlRepo.getPromise(),
                this._bugsForTagRepo.getPromise(),
                this._filtersRepo.getPromise(),
                this._trendsForTagRepo.getPromise(),
                this._scantimeRepo.getPromise())
                .done(() => {
                    this._loadDeferred.resolve();
                    this.initializeSubscriptions();
                });

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

        private initializeLoading(): void {
            this.bugsFilters.vm.loading(true);
            this.trendsFilters.vm.loading(true);

            this.initializeBugsLoading();
            this.initializeTrendsLoading();
        }

        private initializeBugsLoading(): void {
            this.bugsSnapshots.vm.loading(true);
            this.bugsTable.vm.loading(true);
        }

        private initializeTrendsLoading(): void {
            this.trendsSnapshots.vm.loading(true);
            this.trendsTable.vm.loading(true);
        }

        private applyBugsData(): void {
            this._bugsForTagProvider = new SummaryProvider.BugsProvider(this._bugsForTagRepo);

            this.bugsSnapshots.vm.loading(false);
            this.bugsTable.vm.loading(false);
            this.bugsSnapshots.vm.descriptionPairs(this._bugsForTagProvider.getBugSnapshotData());
            this.bugsTable.widget.data(this._bugsForTagProvider.getBugTableData());
        }

        private applyFiltersData(): void {
            this._filtersProvider = new SummaryProvider.FiltersProvider(this._filtersRepo);

            this.bugsFilters.vm.loading(false);
            this.bugsFilters.vm.selectData(this._filtersProvider.getFilterSelectDataByType("bugs"));
            this.trendsFilters.vm.loading(false);
            this.trendsFilters.vm.selectData(this._filtersProvider.getFilterSelectDataByType("trends"));
        }

        private applyTrendsData(): void {
            this._trendsForTagProvider = new SummaryProvider.TrendsProvider(this._trendsForTagRepo);

            this.trendsSnapshots.vm.loading(false);
            this.trendsTable.vm.loading(false);
            this.trendsSnapshots.vm.descriptionPairs(this._trendsForTagProvider.getTrendsSnapshotData());
            this.trendsTable.widget.data(this._trendsForTagProvider.getTrendsTableData());
        }

        private applyScantimeData(): void {
            this._scantimeProvider = new SummaryProvider.ScanTimeProvider(this._scantimeRepo);

            this.bugsTable.vm.metadata("Updated " + this._scantimeProvider.getLastScannedTime());
        }

        private getStaticViewModelData(): IViewModelData {
            this._staticProvider = new SummaryProvider.StaticProvider();

            return {
                header: this._staticProvider.getHeaderViewModelData(),
                sidebar: this._staticProvider.getSidebarViewModelData(),
                bugs: this._staticProvider.getBugsViewModelData(),
                trends: this._staticProvider.getTrendsViewModelData()
            }
        }
    }
}