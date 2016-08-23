﻿import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type DataTransferObject = string;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}, params?: BaseRepository.RepositoryParams) {
            settings.baseUrl = Config.Urls.SiteReporterApi;
            settings.endpoint = Config.Endpoints.BugsForDomain;
            settings.authorize = true;
            settings.plainGet = true;
            settings.request = settings.request || {};
            settings.request.data = settings.request.data || params || {};

            super(settings);
        }
    }
}