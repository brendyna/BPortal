import "highcharts";
import "highcharts.ieportal";
import "highcharts.legend.highlighter";
import "highcharts.more";
import $ = require("jquery");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

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
        getDataUpdatePromise: () => JQueryPromise<void>;
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
        private _dataUpdateDeferred: JQueryDeferred<void>

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults));

            this._data = ko.observable();
            this._dataUpdateDeferred = $.Deferred<void>();

            this.wrapHighchartsCallbacks();

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

        public getDataUpdatePromise(): JQueryPromise<void> {
            if (this._dataUpdateDeferred.state() === "resolved") {
                this._dataUpdateDeferred = $.Deferred<void>();
            }

            return this._dataUpdateDeferred.promise();
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

        public _highchartsDrawComplete(): void {
            this._dataUpdateDeferred.resolve();
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

        private wrapHighchartsCallbacks(): void {
            let options: HighchartsOptions = this.viewModel.options();
            options.chart = options.chart || {};
            options.chart.events = options.chart.events || {};
            let originalDrawCallback = options.chart.events.redraw;

            options.chart.events.redraw = () => {
                if (originalDrawCallback && (typeof originalDrawCallback === "function")) {
                    (<any>originalDrawCallback)();
                }

                this._highchartsDrawComplete();
            };

            this.viewModel.options(options);
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