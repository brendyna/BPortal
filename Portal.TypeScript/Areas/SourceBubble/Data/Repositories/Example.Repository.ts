import BaseRepository = require("Areas/Shared/Data/Repositories/Base.Repository");
import Config = require("../../Config");

export = Main;

module Main {
    export type ExampleItem = {
        baz: string;
        biz: string;
    }

    /**
     * The data transfer object maps to the endpoint response data structure.
     * In this case, the response object will be shaped like this:
     *      [{ baz: "1", biz: "1" }, { baz: "2", biz: "2" }]
     */
    export type DataTransferObject = Array<ExampleItem>;

    export interface IRepository extends BaseRepository.IRepository<DataTransferObject> {
    }
    
    export class Repository extends BaseRepository.Repository<DataTransferObject>
        implements IRepository {
        constructor(settings: BaseRepository.IRepositorySettings = new Object(), params = {}) {
            // The repository typically sets the API URL and endpoint, since it's mapped 1:1,
            // but it can also be set externally via the settings parameter
            // (Note: because of our use of mockjax, the API endpoint can remain the same in dev and production
            // environments; mockjax intercepts and mocks calls if it's enabled, or they're treated as normal calls if not)
            settings.baseUrl = Config.Urls.ExampleApi;
            settings.endpoint = Config.Endpoints.Example;

            super(settings);
        }
    }
}