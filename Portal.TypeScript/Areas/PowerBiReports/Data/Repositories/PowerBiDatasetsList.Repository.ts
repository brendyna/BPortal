import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type PowerBiDataset = {
        WorkspaceCollectionName: string;
        WorkspaceId: string;
        DatasetName: string;
        DatasetId: string;
    }

    export type PowerBiDatasetList = {
        DatasetList: Array<PowerBiDataset>;
    }

    export type DataTransferObject = PowerBiDatasetList;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}) {
            settings.baseUrl = Config.Urls.PowerBiAdminBaseUrl;
            settings.endpoint = Config.Endpoints.DatasetsList;
            settings.authorize = false;
            settings.plainGet = true;
            settings.request = settings.request || {};
            settings.request.dataType = "json";

            super(settings);
        }
    }
}