import $ = require("jquery");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import Config = require("../Config");
import DatasetsRepository = require("../Data/Repositories/PowerBiDatasets.Repository");
import DefaultTemplate = require("../Templates/Views/PowerBiAdminSummary.Template");
import ko = require("knockout");
import PowerBiAdminSummaryProvider = require("../Data/Providers/PowerBiAdminSummary.Provider");
import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");
import WorkspacesRepository = require("../Data/Repositories/PowerBiWorkspaces.Repository");

export = Main;

module Main {
    Section;
    Table;

    export interface IViewModelData extends Base.IViewModelData {
        datasets?: Section.IViewModelData;
        workspaces?: Section.IViewModelData;
    }

    export interface IViewContext extends Base.IViewContext {
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        datasets: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        datasetsTable: BaseControl.IControl<Table.ViewModel, Table.Widget>;
        workspaces: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        workspacesTable: BaseControl.IControl<Table.ViewModel, Table.Widget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "view--summary";

        private _datasetsProvider: PowerBiAdminSummaryProvider.DatasetsProvider;
        private _datasetsRepo: DatasetsRepository.IRepository;
        private _powerBiAdminStaticProvider: PowerBiAdminSummaryProvider.StaticProvider;
        private _workspacesProvider: PowerBiAdminSummaryProvider.WorkspacesProvider;
        private _workspacesRepo: WorkspacesRepository.IRepository;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || DefaultTemplate;

            super(element, defaults, viewModelData);

            this._controlClasses = $.extend({
                datasets: Config.Classes.DatasetsSectionClass,
                datasetstable: Config.Classes.DatasetsTableClass,
                workspaces: Config.Classes.WorkspacesSectionClass,
                workspacestable: Config.Classes.WorkspacesTableClass
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

        public get workspaces(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("." + this.controlClasses["workspaces"]));
        }

        public get datasets(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("." + this.controlClasses["datasets"]));
        }

        public get workspacesTable(): BaseControl.IControl<Table.ViewModel, Table.Widget> {
            return <BaseControl.IControl<Table.ViewModel, Table.Widget>>
                (super.getDataFor("." + this.controlClasses["workspacestable"]));
        }

        public get datasetsTable(): BaseControl.IControl<Table.ViewModel, Table.Widget> {
            return <BaseControl.IControl<Table.ViewModel, Table.Widget>>
                (super.getDataFor("." + this.controlClasses["datasetstable"]));
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public initializeRepos(): void {
            this._workspacesRepo = new WorkspacesRepository.Repository({});
            this._datasetsRepo = new DatasetsRepository.Repository({});
        }

        public initializeLoading(): void {
            this.workspacesTable.viewModel.loading(true);
            this.datasetsTable.viewModel.loading(true);
        }

        public loadRepos(): void {
            this._workspacesRepo.load().done(() => {
                this.applyWorkspacesData();
            });

            this._datasetsRepo.load().done(() => {
                this.applyDatasetsData();
            });

            $.when<any>(
                this._workspacesRepo.getPromise(),
                this._datasetsRepo.getPromise()
            )
            .done(() => {
                this._loadDeferred.resolve()
            });
        }

        public initializeSubscriptions(): void {
            // No-op (subscription initialization is split up based on repo loads)
        }

        public setStaticViewModelData(): void {
            this._powerBiAdminStaticProvider = new PowerBiAdminSummaryProvider.StaticProvider();
            
            this._staticViewModelData = <IViewModelData>{
                navigation: this._powerBiAdminStaticProvider.getNavigationViewModelData(),
                header: this._powerBiAdminStaticProvider.getHeaderViewModelData(),
                workspaces: this._powerBiAdminStaticProvider.getWorkspacesViewModelData(),
                datasets: this._powerBiAdminStaticProvider.getDatasetsViewModelData()
            }
        }

        private applyWorkspacesData(): void {
            this._workspacesProvider = new PowerBiAdminSummaryProvider.WorkspacesProvider(this._workspacesRepo);

            this.workspacesTable.widget.data(this._workspacesProvider.getTableData());

            this.workspacesTable.viewModel.loading(false);
        }

        private applyDatasetsData(): void {
            this._datasetsProvider = new PowerBiAdminSummaryProvider.DatasetsProvider(this._datasetsRepo);

            this.datasetsTable.widget.data(this._datasetsProvider.getTableData());

            this.datasetsTable.viewModel.loading(false);
        }
    }
}