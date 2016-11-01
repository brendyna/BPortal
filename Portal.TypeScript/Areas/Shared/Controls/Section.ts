import $ = require("jquery");
import Base = require("./Base");
import DefaultTemplate = require("../Templates/Controls/Section.Template");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export interface ISubSectionData {
        altHeader?: boolean;
        anchor?: string;
        body?: string;
        bodyPlaceholder?: string;
        bodyViewModel?: any;
        classes?: string;
        header?: string;
    }

    export interface ISubSection {
        altHeader: KnockoutObservable<boolean>;
        anchor: KnockoutObservable<string>;
        body: KnockoutObservable<string>;
        bodyPlaceholder: KnockoutObservable<string>;
        bodyViewModel: KnockoutObservable<any>;
        classes: KnockoutObservable<string>;
        header: KnockoutObservable<string>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        altHeader?: boolean;
        anchor?: string;
        body?: string;
        bodyPlaceholder?: string;
        bodyViewModel?: any;
        subsections?: Array<ISubSectionData>;
        subtitle?: string;
        title?: string;
    }

    export interface IViewModel extends Base.IViewModel {
        altHeader: KnockoutObservable<boolean>;
        anchor: KnockoutObservable<string>;
        body: KnockoutObservable<string>;
        bodyPlaceholder: KnockoutObservable<string>;
        bodyViewModel: KnockoutObservable<any>;
        subsections: KnockoutObservableArray<ISubSection>;
        subtitle: KnockoutObservable<string>;
        title: KnockoutObservable<string>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class SubSection implements ISubSection {
        private _altHeader: KnockoutObservable<boolean>;
        private _anchor: KnockoutObservable<string>;
        private _body: KnockoutObservable<string>;
        private _bodyPlaceholder: KnockoutObservable<string>;
        private _bodyViewModel: KnockoutObservable<any>;
        private _classes: KnockoutObservable<string>;
        private _header: KnockoutObservable<string>;

        constructor(data: ISubSectionData = {}) {
            this._header = ko.observable(data.header || "");
            this._altHeader = ko.observable(data.altHeader || false);
            this._anchor = ko.observable(data.anchor || "");
            this._classes = ko.observable(data.classes || "");
            this._body = ko.observable(data.body || "");
            this._bodyViewModel = ko.observable(data.bodyViewModel || {});
            this._bodyPlaceholder = ko.observable(data.bodyPlaceholder || "");
        }

        public get altHeader(): KnockoutObservable<boolean> {
            return this._altHeader;
        }

        public get anchor(): KnockoutObservable<string> {
            return this._anchor;
        }

        public get classes(): KnockoutObservable<string> {
            return this._classes;
        }

        public get header(): KnockoutObservable<string> {
            return this._header;
        }

        public get body(): KnockoutObservable<string> {
            return this._body;
        }

        public get bodyPlaceholder(): KnockoutObservable<string> {
            return this._bodyPlaceholder;
        }

        public get bodyViewModel(): KnockoutObservable<any> {
            return this._bodyViewModel;
        }

    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _altHeader: KnockoutObservable<boolean>;
        private _anchor: KnockoutObservable<string>;
        private _body: KnockoutObservable<string>;
        private _bodyPlaceholder: KnockoutObservable<string>;
        private _bodyViewModel: KnockoutObservable<any>;
        private _subsections: KnockoutObservableArray<ISubSection>;
        private _subtitle: KnockoutObservable<string>;
        private _title: KnockoutObservable<string>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._title = ko.observable(data.title || "");
            this._subtitle = ko.observable(data.subtitle || "");
            this._altHeader = ko.observable(data.altHeader || false);
            this._anchor = ko.observable(data.anchor || "");
            this._body = ko.observable(data.body || "");
            this._bodyViewModel = ko.observable(data.bodyViewModel || {});
            this._bodyPlaceholder = ko.observable(data.bodyPlaceholder || "");
            this._subsections = ko.observableArray<SubSection>(Base.createFromDefaults(data.subsections, SubSection));
        }

        public get altHeader(): KnockoutObservable<boolean> {
            return this._altHeader;
        }

        public get anchor(): KnockoutObservable<string> {
            return this._anchor;
        }

        public get title(): KnockoutObservable<string> {
            return this._title;
        }

        public get subtitle(): KnockoutObservable<string> {
            return this._subtitle;
        }

        public get body(): KnockoutObservable<string> {
            return this._body;
        }

        public get bodyViewModel(): KnockoutObservable<any> {
            return this._bodyViewModel;
        }

        public get bodyPlaceholder(): KnockoutObservable<string> {
            return this._bodyPlaceholder;
        }

        public get subsections(): KnockoutObservableArray<ISubSection> {
            return this._subsections;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "section";

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
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

            if (!this.element.is("section")) {
                super._addClass(Widget.widgetClass);
            }

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
    ko.bindingHandlers.wpsSection = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}