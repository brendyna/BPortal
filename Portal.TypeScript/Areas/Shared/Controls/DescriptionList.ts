import $ = require("jquery");
import Base = require("./Base");
import DefaultTemplate = require("../Templates/Controls/DescriptionList.Template");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export interface IDescriptionData {
        content?: string;
        contentViewModel?: any;
    }

    export interface IDescription {
        content: KnockoutObservable<string>;
        contentViewModel: KnockoutObservable<any>;
    }

    export interface IDescriptionPairData {
        term?: string;
        descriptions?: Array<IDescriptionData>;
    }

    export interface IDescriptionPair {
        term: KnockoutObservable<string>;
        descriptions: KnockoutObservableArray<IDescription>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        descriptionPairs?: Array<IDescriptionPairData>;
    }

    export interface IViewModel extends Base.IViewModel {
        descriptionPairs: KnockoutObservableArray<IDescriptionPair>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class Description implements IDescription {
        private _content: KnockoutObservable<string>;
        private _contentViewModel: KnockoutObservable<any>;

        constructor(data: IDescriptionData = {}) {
            this._content = ko.observable(data.content || "");
            this._contentViewModel = ko.observable(data.contentViewModel || "");
        }

        public get content(): KnockoutObservable<string> {
            return this._content;
        }

        public get contentViewModel(): KnockoutObservable<any> {
            return this._contentViewModel;
        }
    }

    export class DescriptionPair implements IDescriptionPair {
        private _term: KnockoutObservable<string>;
        private _descriptions: KnockoutObservableArray<IDescription>;

        constructor(data: IDescriptionPairData = {}) {
            this._term = ko.observable(data.term || "");
            this._descriptions = ko.observableArray<Description>(
                Base.createFromDefaults(data.descriptions, Description));
        }

        public get term(): KnockoutObservable<string> {
            return this._term;
        }

        public get descriptions(): KnockoutObservableArray<IDescription> {
            return this._descriptions;
        }
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _descriptionPairs: KnockoutObservableArray<IDescriptionPair>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._descriptionPairs = ko.observableArray<DescriptionPair>(
                Base.createFromDefaults(data.descriptionPairs, DescriptionPair));
        }

        public get descriptionPairs(): KnockoutObservableArray<IDescriptionPair> {
            return this._descriptionPairs;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "description-list";

        constructor(element: JQuery, defaults: IWidgetDefaults | IViewModelData = {}) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

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
    ko.bindingHandlers.wpsDescriptionList = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}