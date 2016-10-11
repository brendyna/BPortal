import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type PowerBiWorkspace = {
        WorkspaceCollectionName: string;
        WorkspaceId: string;
    }

    export type PowerBiWorkspaceList = {
        WorkspaceList: Array<PowerBiWorkspace>;
    }

    export type DataTransferObject = PowerBiWorkspaceList;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}) {
            settings.baseUrl = Config.Urls.PowerBiAdminBaseUrl;
            settings.endpoint = Config.Endpoints.WorkspaceList;
            settings.authorize = false;
            settings.plainGet = true;
            settings.request = settings.request || {};
            settings.request.dataType = "json";

            super(settings);
        }
    }
}