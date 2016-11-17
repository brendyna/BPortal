﻿import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type PowerBiReport = {
        id: string;
        name: string;
        embedUrl: string;
        webUrl: string;
    }

    export type DataTransferObject = PowerBiReport;

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}, params = {}) {
            settings.baseUrl = Config.Urls.PowerBiReportsBaseUrl;
            settings.endpoint = Config.Endpoints.ReportDetail;
            settings.authorize = false;
            settings.request = settings.request || {};
            settings.request.data = settings.request.data || params || {};

            super(settings);
        }
    }
}