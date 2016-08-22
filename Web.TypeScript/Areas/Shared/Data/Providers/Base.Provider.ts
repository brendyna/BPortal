import BaseRepository = require("../Repositories/Base.Repository");

export = Main;

module Main {
    export interface IDynamicProvider {
        repository: BaseRepository.IRepository<any>;
    }

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