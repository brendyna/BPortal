import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type SiteBugSummary = {
        DomainId: number,
        DomainName: string,
        ActiveBugCount: number,
        OutreachBugCount: number,
        CurrentReleaseBugCount: number,
        IsSwitchRisk: boolean,
        BingdexRank: number,
        IsOffensive: boolean
    }

    export type DataTransferObject = Array<SiteBugSummary>;

    export interface IRepositorySettings extends BaseRepository.IRepositorySettings {
    }

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }

    export class Repository extends BaseRepository.Repository<DataTransferObject> implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = {}) {
            super(settings);
        }
    }
}