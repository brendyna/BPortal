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
        constructor(settings: BaseRepository.IRepositorySettings = new Object(), params?: BaseRepository.RepositoryParams) {
            settings.baseUrl = Config.Urls.SiteReporterApi;
            settings.endpoint = Config.Endpoints.Filters;
            settings.authorize = true;
            settings.request = settings.request || {};

            // Set to Summary defaults because filters are the same regardless of params
            // (Perhaps we should remove params from the JSON API)
            settings.request.data = $.extend({}, Config.Params.SummaryDefaults);

            super(settings);
        }
    }
}