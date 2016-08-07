import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type DataPoint = {
        Date: string;
        Count: string;
    }

    export type BugTrends = {
        AllBugs: Array<DataPoint>;
        SwitchRiskBugs: Array<DataPoint>;
        OutreachBugs: Array<DataPoint>;
        CurrentReleaseBugs: Array<DataPoint>;
    }

    export type DataTransferObject = BugTrends;

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