import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type SiteTrendSummary = {
        domainId: number,
        domainName: string,
        bingdexRank: number,
        alexaRank: number,
        frowny: number,
        crash: number,
        focusTime: number,
        navigation: number,
        isOffensive: boolean
    }

    export type DataTransferObject = { data: Array<SiteTrendSummary> };

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}, params?: BaseRepository.RepositoryParams) {
            settings.baseUrl = Config.Urls.SiteReporterApi;
            settings.endpoint = Config.Endpoints.TrendsForTag;
            settings.authorize = true;
            settings.request = settings.request || {};
            settings.request.data = settings.request.data || params || {};

            super(settings);
        }
    }
}