import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");
import CrawlProvider = require("../Providers/CrawlScheduler.Provider");

export = Main;

module Main {
    export type CrawlSubmitParameters = CrawlProvider.IBrowserSelectViewModelData 
        | CrawlProvider.IRunParametersViewModelData;

    export type PostResponse = {
        status: string;
        exception?: string;
    }

    export type DataTransferObject = PostResponse;

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }
    
    export class Repository extends BaseRepository.Repository<DataTransferObject>
        implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = new Object(), params = {}) {
            settings.baseUrl = Config.Urls.Portal;
            settings.endpoint = Config.Endpoints.CrawlerLaunch;

            settings.request = settings.request || {};
            settings.request.data = settings.request.data || {};

            super(settings);
        }
    }
}