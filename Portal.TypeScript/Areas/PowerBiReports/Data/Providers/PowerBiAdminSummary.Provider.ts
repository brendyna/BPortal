import Base = require("Areas/Shared/Controls/Base");
import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import Config = require("../../Config");
import DatasetsRepository = require("../Repositories/PowerBiDatasets.Repository");
import Header = require("Areas/Shared/Controls/Header");
import KnockoutUtil = require("Areas/Shared/Util/Knockout");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");
import Table = require("Areas/Shared/Controls/Table");
import WorkspacesRepository = require("../Repositories/PowerBiWorkspaces.Repository");

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
                classes: Config.Classes.WorkspacesSectionClass,
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
                classes: Config.Classes.DatasetsSectionClass,
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
                classes: Config.Classes.WorkspacesTableClass,
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
                    language: <any>{
                        emptyTable: Config.Strings.WorkspaceTableNoDataMessage,
                        zeroRecords: Config.Strings.WorkspaceTableNoDataMessage
                    },
                    columns: [
                        { data: 'workspaceCollectionName', className: Config.Classes.TableColumnWorkspaceCollectionNameClass },
                        { data: 'workspaceId', className: Config.Classes.TableColumnWorkspaceIdClass }
                    ]             
                }
            };
        }

        private getDatasetsTableData(): Table.IViewModelData {
            return {
                classes: Config.Classes.DatasetsTableClass,
                headers: [
                    { text: Config.Strings.WorkspaceCollectionNameColumnHeader },
                    { text: Config.Strings.WorkspaceIdColumnHeader },
                    { text: Config.Strings.DatasetNameColumnHeader },
                    { text: Config.Strings.DatasetIdColumnHeader }
                ],
                settings: <DataTables.Settings>{
                    lengthChange: false,
                    autoWidth: false,
                    info: false,
                    ordering: false,
                    searching: false,
                    paging: false,
                    language: <any>{
                        emptyTable: Config.Strings.DatasetsTableNoDataMessage,
                        zeroRecords: Config.Strings.DatasetsTableNoDataMessage
                    },
                    columns: [
                        { data: 'workspaceCollectionName', className: Config.Classes.TableColumnWorkspaceCollectionNameClass },
                        { data: 'workspaceId', className: Config.Classes.TableColumnWorkspaceIdClass },
                        { data: 'datasetName', className: Config.Classes.TableColumnDatasetNameClass },
                        { data: 'datasetId', className: Config.Classes.TableColumnDatasetIdClass }
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

        public getTableData() {
            return this.repository.resultData;
        }
    }

    export class DatasetsProvider extends BaseProvider.DynamicProvider<DatasetsRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: DatasetsRepository.IRepository) {
            super(repository);
        }

        public getTableData() {
            return this.repository.resultData;
        }
    }
}