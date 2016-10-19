import "moment";
import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import Config = require("../../Config");
import Filters = require("Areas/Shared/Controls/Filters");
import FiltersRepository = require("../Repositories/Filters.Repository");
import moment = require("moment");
import ScanTimeRepository = require("../Repositories/ScanTime.Repository");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    Filters;
    Select;

    export enum FiltersType {
        Bugs,
        TrendsDetails,
        TrendsSummary
    }
    
    export interface IDynamicProvider extends BaseProvider.IDynamicProvider {
    }

    export class FiltersProvider extends BaseProvider.DynamicProvider<FiltersRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: FiltersRepository.IRepository) {
            super(repository);
        }

        public getFilterSelectDataByType(type: FiltersType, defaults?: IDictionary<string>): Array<Select.IViewModelData> {
            let data: Array<Select.IViewModelData> = [];
            let typeFilterNames: Array<string>;

            switch (type) {
                case FiltersType.Bugs:
                    typeFilterNames = Config.Filters.Bugs;
                    break;

                case FiltersType.TrendsDetails:
                    typeFilterNames = Config.Filters.TrendsDetails;
                    break;

                case FiltersType.TrendsSummary:
                    typeFilterNames = Config.Filters.Trends;
                    break;
            }

            typeFilterNames.forEach((name: string) => {
                let optionsDTO = this.getResultFilterOptionsByName(name);
                data.push({
                    name: name,
                    options: this.transformDTOOptionsToVMOptionsData(optionsDTO),
                    intialValue: defaults[name],
                    value: defaults[name]
                });
            });

            return data;
        }

        private transformDTOOptionsToVMOptionsData(dtoOptions: Array<FiltersRepository.Option>): Array<Select.IOptionData> {
            let optionsData: Array<Select.IOptionData> = [];

            dtoOptions.forEach((dtoOption: FiltersRepository.Option) => {
                optionsData.push({
                    text: dtoOption.text,
                    value: dtoOption.value,
                    disabled: dtoOption.disabled
                });
            });

            return optionsData;
        }

        private getResultFilterOptionsByName(name: string): Array<FiltersRepository.Option> {
            return this.repository.resultData[name];
        }
    }

    export class ScanTimeProvider extends BaseProvider.DynamicProvider<ScanTimeRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: ScanTimeRepository.IRepository) {
            super(repository);
        }

        public getLastScannedTime(): string {
            return moment(this.repository.resultData).fromNow();
        }
    }
}