import $ = require("jquery");
import Base = require("./Base");
import Config = require("../Config");
import DefaultTemplate = require("../Templates/Controls/Navigation.Template");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export interface ICrumbData {
        url?: string;
        text?: string;
    }

    export interface ICrumb {
        url: KnockoutObservable<string>;
        text: KnockoutObservable<string>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        breadcrumb?: Array<ICrumbData>;
    }

    export interface IViewModel extends Base.IViewModel {
        breadcrumb: KnockoutObservableArray<Crumb>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class Crumb implements ICrumb {
        private _url: KnockoutObservable<string>;
        private _text: KnockoutObservable<string>;

        constructor(data: ICrumbData = {}) {
            this._url = ko.observable(data.url || "");
            this._text = ko.observable(data.text || "");
        }

        public get url(): KnockoutObservable<string> {
            return this._url;
        }

        public get text(): KnockoutObservable<string> {
            return this._text;
        }
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _breadcrumb: KnockoutObservableArray<Crumb>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._breadcrumb = ko.observableArray<Crumb>(Base.createFromDefaults((<IViewModelData>this.data).breadcrumb, Crumb));
        }

        public get breadcrumb(): KnockoutObservableArray<Crumb> {
            return this._breadcrumb;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "navigation breadcrumb";

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
            super._addBinding("attr", "'aria-label': 'breadcrumbs'");
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
    ko.bindingHandlers.wpsNavigation = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}