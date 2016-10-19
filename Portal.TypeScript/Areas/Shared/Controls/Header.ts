import $ = require("jquery");
import Base = require("./Base");
import Config = require("../Config");
import DefaultTemplate = require("../Templates/Controls/Header.Template");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export interface IViewModelData extends Base.IViewModelData {
        title?: string;
        subtitle?: string;
    }

    export interface IViewModel extends Base.IViewModel {
        title: KnockoutObservable<string>;
        subtitle: KnockoutObservable<string>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }
    
    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _title: KnockoutObservable<string>;
        private _subtitle: KnockoutObservable<string>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._title = ko.observable((<IViewModelData>this.data).title);
            this._subtitle = ko.observable((<IViewModelData>this.data).subtitle || "");
        }
        
        public get subtitle(): KnockoutObservable<string> {
            return this._subtitle;
        }

        public get title(): KnockoutObservable<string> {
            return this._title;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "header";

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            super(element, ViewModel, defaults);

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._setupElement();

            super._addClass(Widget.widgetClass);

            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();

            super._initializeSubscriptions();
            super._initializeEvents();
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsHeader = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}