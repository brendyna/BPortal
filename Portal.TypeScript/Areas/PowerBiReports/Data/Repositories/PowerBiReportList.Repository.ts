import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type PowerBiReport = {
        Id: string;
        Name: string;
        EmbedUrl: string;
        WebUrl: string;
    }

    export type PowerBiReportList = {
        ReportList: Array<PowerBiReport>;
    }

    export type DataTransferObject = PowerBiReportList;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}) {
            settings.baseUrl = Config.Urls.ReportsBaseUrl;
            settings.endpoint = Config.Endpoints.ReportsList;
            settings.authorize = false;
            settings.plainGet = true;
            settings.request = settings.request || {};
            settings.request.dataType = "json";

            super(settings);
        }
    }
}