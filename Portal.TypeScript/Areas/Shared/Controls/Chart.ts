/// <amd-dependency path="highcharts" />
/// <amd-dependency path="highcharts.more" />
/// <amd-dependency path="highcharts.ieportal" />
/// <amd-dependency path="highcharts.legend.highlighter" />

import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

export = Main;

module Main {
    export interface IViewModelData extends Base.IViewModelData {
        options?: HighchartsOptions;
    }

    export interface IViewModel extends Base.IViewModel {
        options: KnockoutObservable<HighchartsOptions>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        data: KnockoutObservable<any>;
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _options: KnockoutObservable<HighchartsOptions>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._options = ko.observable(data.options || {});
        }

        public get options(): KnockoutObservable<HighchartsOptions> {
            return this._options;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "chart";

        private _data: KnockoutObservable<any>;

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults));

            this._data = ko.observable();

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
        }

        public get data(): KnockoutObservable<any> {
            return this._data;
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addClass(Widget.widgetClass);
            super._setupElement();

            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();

            $(this.element).highcharts(this.viewModel.options() || {});

            this._initializeSubscriptions();
            super._initializeEvents();
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();

            this._subscriptions.push(this.data.subscribe((newData: any) => {
                this.updateChartData(newData);
            }));
        }

        private updateChartData(newData: any): void {
            let chart = $(this.element).highcharts();
            // Check if we're dealing w/a multi-series data set
            if ($.isPlainObject(newData[0])) {
                (<Array<any>>newData).forEach((newSeriesData: any, index: number) => {
                    if (chart.series[index]) {
                        chart.series[index].setData(newSeriesData, true, true);
                    } else {
                        chart.addSeries(newSeriesData, false);
                    }
                });

                chart.redraw(true);
            } else {
                if (chart.series[0]) {
                    chart.series[0].setData(newData, true, true, true);
                } else {
                    chart.addSeries({
                        data: newData
                    }, true, true);
                }
            } 
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsChart = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}