import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type Option = {
        disabled: boolean;
        group: any;
        selected: boolean;
        text: string;
        value: string;
    }

    export type DataTransferObject = IDictionary<Array<Option>>;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}, params?: BaseRepository.RepositoryParams) {
            settings.baseUrl = Config.Urls.SiteReporterApi;
            settings.endpoint = Config.Endpoints.Filters;
            settings.authorize = true;
            settings.request = settings.request || {};
            settings.request.data = settings.request.data || params || {};

            super(settings);
        }
    }
}