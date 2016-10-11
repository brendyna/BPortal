import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type PowerBiWorkspace = {
        workspaceCollectionName: string;
        workspaceId: string;
    }

    export type DataTransferObject = Array<PowerBiWorkspace>;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}) {
            settings.baseUrl = Config.Urls.PowerBiAdminBaseUrl;
            settings.endpoint = Config.Endpoints.WorkspaceList;
            settings.authorize = false;
            
            super(settings);
        }
    }
}