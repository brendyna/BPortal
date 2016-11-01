import BaseRepository = require("../Repositories/Base.Repository");

export = Main;

module Main {
    export interface IDynamicProvider {
        /**
         * The repository for the data returned by an API endpoint.
         */
        repository: BaseRepository.IRepository<any>;
    }

    /**
     * The dynamic provider encapsulates a repository and acts as
     * an adapter for it by manipulating and returning data expected
     * by a View.
     */
    export class DynamicProvider<DTO> implements IDynamicProvider {
        private _repository: BaseRepository.IRepository<DTO>;

        constructor(repository: BaseRepository.IRepository<DTO>) {
            this._repository = repository;
        }

        public get repository(): BaseRepository.IRepository<DTO> {
            return this._repository;
        }
    }
}