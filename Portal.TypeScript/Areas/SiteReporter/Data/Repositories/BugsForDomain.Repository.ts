import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type Bug = {
        Domain: string;
        Title: string;
        Id: number;
        Keywords: string;
        Tags: string;
        AssignedTo: string;
        Triage: string;
        State: string;
        Release: string;
        ResolvedReason: string;
        Priority: number;
        Severity: number;
        AreaPath: string;
        Product: string;
        Iteration: string;
    }

    export type BugData = {
        IsSwitchRisk: boolean;
        Bugs: Array<Bug>;
        CurrentReleaseBugs: Array<Bug>;
        OutreachBugs: Array<Bug>;
        SwitchRiskBugs: Array<Bug>;
    }

    export type DataTransferObject = BugData;

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