import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type Name = {
        name: string;
        type: number;
    }

    export type Metadata = {
        topLevelDomain: string;
        social: string;
        companyName: string;
        telephones: Array<any>;
        emails: Array<any>;
        city: string;
        state: string;
        postcode: string;
        country: string;
        names: Array<Name>;
        aRank: number;
        qRank: number;
    }

    export type Technology = {
        categories: Array<string>;
        name: string;
        tag: string;
        firstDetected: number;
        lastDetected: number;
    }

    export type DataTransferObject = {
        identifier: string;
        metadata: Metadata;
        technologies: Array<Technology>;
    }

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}, params?: BaseRepository.RepositoryParams) {
            settings.baseUrl = Config.Urls.SiteReporterApi;
            settings.endpoint = Config.Endpoints.BuiltWithDataForDomain;
            settings.authorize = true;
            settings.request = settings.request || {};
            settings.request.data = settings.request.data || params || {};

            super(settings);
        }
    }
}