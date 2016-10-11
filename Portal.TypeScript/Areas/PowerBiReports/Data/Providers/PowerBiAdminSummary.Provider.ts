
import Base = require("Areas/Shared/Controls/Base");
import Config = require("../../Config");
import Header = require("Areas/Shared/Controls/Header");
import KnockoutUtil = require("Areas/Shared/Util/Knockout");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");

import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import WorkspacesRepository = require("../Repositories/PowerBiWorkspaces.Repository");
import DatasetsRepository = require("../Repositories/PowerBiDatasets.Repository");

export = Main;

module Main {
    Header;
    KnockoutUtil;
    Section;
    Table;

    export interface IStaticProvider {
        getNavigationViewModelData: () => Navigation.IViewModelData;
        getHeaderViewModelData: () => Header.IViewModelData;
        getWorkspacesViewModelData: () => Section.IViewModelData;
        getDatasetsViewModelData: () => Section.IViewModelData;
    }

    export interface IDynamicProvider extends BaseProvider.IDynamicProvider {
    }

    export class StaticProvider implements IStaticProvider {
        constructor() {
        }

        public getNavigationViewModelData(): Navigation.IViewModelData {
            let navViewModelData: Navigation.IViewModelData = {
                breadcrumb: <Array<Navigation.ICrumbData>>Config.Window.SummaryBreadcrumb
            };

            return navViewModelData;
        }

        public getHeaderViewModelData(): Header.IViewModelData {
            let headerViewModelData: Header.IViewModelData = {
            };

            return headerViewModelData;
        }

        public getWorkspacesViewModelData(): Section.IViewModelData {
            return {
                title: Config.Strings.WorkspacesListTitle,
                altHeader: true,
                classes: "summary--workspacestable workspaces__section",
                body: `
                    <table data-bind="wpsTable: $vm.table"></table>
                `,
                bodyViewModel: {
                    table: this.getWorkspacesTableData()
                }
            };
        }

        public getDatasetsViewModelData(): Section.IViewModelData {
            return {
                title: Config.Strings.DatasetListTitle,
                altHeader: true,
                classes: "summary--datasetstable datasets__section",
                body: `
                    <table data-bind="wpsTable: $vm.table"></table>
                `,
                bodyViewModel: {
                    table: this.getDatasetsTableData()
                }
            };
        }

        private getWorkspacesTableData(): Table.IViewModelData {
            return {
                classes: "workspaces__section__table",
                headers: [
                    { text: Config.Strings.WorkspaceCollectionNameColumnHeader },
                    { text: Config.Strings.WorkspaceIdColumnHeader }
                ],

                settings: <DataTables.Settings>{
                    lengthChange: false,
                    autoWidth: false,
                    info: false,
                    ordering: false,
                    searching: false,
                    paging: false,

                    columns: [
                        { data: 'workspaceCollectionName', className: "table__column__workspacecollectionname" },
                        { data: 'workspaceId', className: "table__column__workspaceid" }
                    ],
                    columnDefs: [
                        {
                            targets: 'table__column__workspacecollectionname'
                        },
                        {
                            targets: 'table__column__workspaceid'
                        }                        
                    ]                    
                }
            };
        }

        private getDatasetsTableData(): Table.IViewModelData {
            return {
                classes: "datasets__section__table",
                headers: [
                    { text: Config.Strings.WorkspaceCollectionNameColumnHeader },
                    { text: Config.Strings.WorkspaceIdColumnHeader },
                    { text: Config.Strings.DatasetIdColumnHeader },
                    { text: Config.Strings.DatasetNameColumnHeader }
                ],

                settings: <DataTables.Settings>{
                    lengthChange: false,
                    autoWidth: false,
                    info: false,
                    ordering: false,
                    searching: false,
                    paging: false,

                    columns: [
                        { data: 'workspaceCollectionName', className: "table__column__workspacecollectionname" },
                        { data: 'workspaceId', className: "table__column__workspaceid" },
                        { data: 'datasetName', className: "table__column__datasetname" },
                        { data: 'datasetId', className: "table__column__datasetid" }
                    ],
                    columnDefs: [
                        {
                            targets: 'table__column__workspacecollectionname'
                        },
                        {
                            targets: 'table__column__workspaceid'
                        },
                        {
                            targets: 'table__column__datasetname'
                        },
                        {
                            targets: 'table__column__datasetid'
                        }
                    ]
                }
            };
        }
    }

    export class WorkspacesProvider extends BaseProvider.DynamicProvider<WorkspacesRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: WorkspacesRepository.IRepository) {
            super(repository);
        }
    }

    export class DatasetsProvider extends BaseProvider.DynamicProvider<WorkspacesRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: DatasetsRepository.IRepository) {
            super(repository);
        }
    }
}