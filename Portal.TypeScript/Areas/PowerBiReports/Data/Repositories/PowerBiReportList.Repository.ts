import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type PowerBiReport = {
        id: string;
        name: string;
        embedUrl: string;
        webUrl: string;
        description: string;
        group: string;
        tags: string;
        contact: string;
    }

    export type DataTransferObject = Array<PowerBiReport>;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}) {
            settings.baseUrl = Config.Urls.PowerBiReportsBaseUrl;
            settings.endpoint = Config.Endpoints.ReportsList;
            settings.authorize = false;
                        
            super(settings);
        }
    }
}