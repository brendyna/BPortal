import $ = require("jquery");
import ko = require("knockout");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import Config = require("../Config");

import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");

import WorkspacesRepository = require("../Data/Repositories/PowerBiWorkspaces.Repository");


import WorkspacesSummaryProvider = require("../Data/Providers/PowerBiAdminSummary.Provider");

import DefaultTemplate = require("../Templates/Views/PowerBiAdminSummary.Template");

export = Main;

module Main {
    Section;
    Table;

    export interface IViewModelData extends Base.IViewModelData {
        workspaces?: Section.IViewModelData;
    }

    export interface IViewContext extends Base.IViewContext {
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        workspaces: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        workspacesTable: BaseControl.IControl<Table.ViewModel, Table.Widget>;
    }

    export class Widget extends Base.Widget implements IWidget {

        public static widgetClass = "view--summary";

        private _workspacesStaticProvider: WorkspacesSummaryProvider.StaticProvider;
        private _workspacesRepo: WorkspacesRepository.IRepository;
        private _workspacesProvider: WorkspacesSummaryProvider.WorkspacesProvider;


        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || DefaultTemplate;

            super(element, defaults, viewModelData);

            this._controlClasses = $.extend({
                workspacestable: "workspaces__section__table",
                workspaces: "workspaces__section"
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

        public get workspacesTable(): BaseControl.IControl<Table.ViewModel, Table.Widget> {
            return <BaseControl.IControl<Table.ViewModel, Table.Widget>>
                (super.getDataFor("." + this.controlClasses["workspacestable"]));
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public initializeRepos(): void {
            this._workspacesRepo = new WorkspacesRepository.Repository({});

        }

        //private getRepoSettings(): {} {
        //    return {
        //        request: {
        //            data: $.extend({}, this.defaults.viewContext.params)
        //        }
        //    };
        //}

        public initializeLoading(): void {
            this.workspacesTable.vm.loading(true);

            //this.initializeWorkspacesLoading();
        }

        public loadRepos(): void {

            this._workspacesRepo.load().done(() => {
                this.applyWorkspacesData();
            });

            // Setup load state changes for when promises resolve
            this.initializeRepoLoadActions();
        }

        public initializeSubscriptions(): void {
            // No-op (subscription initialization is split up based on repo loads)
        }

        public setStaticViewModelData(): void {
            this._workspacesStaticProvider = new WorkspacesSummaryProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._workspacesStaticProvider.getNavigationViewModelData(),
                header: this._workspacesStaticProvider.getHeaderViewModelData(),
                workspaces: this._workspacesStaticProvider.getWorkspacesViewModelData()
            }
        }

        private initializeRepoLoadActions(): void {
            // There's a random bug here (remove the <any> and see the compiler error)
            $.when<any>(
                this._workspacesRepo.getPromise())
                .done(() => {
                    this._loadDeferred.resolve()
                });
        }

        private applyWorkspacesData(): void {
            this._workspacesProvider = new WorkspacesSummaryProvider.WorkspacesProvider(this._workspacesRepo);

            this.workspacesTable.widget.data(this._workspacesProvider.repository.resultData);

            this.workspacesTable.vm.loading(false);
        }
    }
}