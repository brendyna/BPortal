import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type PowerBiDataset = {
        workspaceCollectionName: string;
        workspaceId: string;
        datasetName: string;
        datasetId: string;
    }

    export type DataTransferObject = Array<PowerBiDataset>;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}) {
            settings.baseUrl = Config.Urls.PowerBiAdminBaseUrl;
            settings.endpoint = Config.Endpoints.DatasetsList;
            settings.authorize = false;
            
            super(settings);
        }
    }
}