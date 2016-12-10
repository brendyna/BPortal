import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type BiasPlotItem = {
        baz: string;
        biz: string;
    }

    /**
     * The data transfer object maps to the endpoint response data structure.
     * In this case, the response object will be shaped like this:
     *      [{ baz: "1", biz: "1" }, { baz: "2", biz: "2" }]
     */
    export type DataTransferObject = Array<BiasPlotItem>;

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }
    
    export class Repository extends BaseRepository.Repository<DataTransferObject>
        implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = new Object(), params = {}) {
            settings.baseUrl = Config.Urls.ExampleApi;
            settings.endpoint = Config.Endpoints.Example;

            super(settings);
        }
    }
}