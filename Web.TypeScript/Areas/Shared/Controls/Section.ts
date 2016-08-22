import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

import DefaultTemplate = require("../Templates/Controls/Section.Template");

export = Main;

module Main {
    export interface ISubSectionData {
        header?: string;
        altHeader?: boolean;
        classes?: string;
        body?: string;
        bodyViewModel?: any;
    }

    export interface ISubSection {
        header: KnockoutObservable<string>;
        altHeader: KnockoutObservable<boolean>;
        classes: KnockoutObservable<string>;
        body: KnockoutObservable<string>;
        bodyViewModel: KnockoutObservable<any>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        title?: string;
        subtitle?: string;
        altHeader?: boolean;
        body?: string;
        bodyViewModel?: any;
        bodyPlaceholder?: string;
        subsections?: Array<ISubSectionData>;
    }

    export interface IViewModel extends Base.IViewModel {
        title: KnockoutObservable<string>;
        subtitle: KnockoutObservable<string>;
        altHeader: KnockoutObservable<boolean>;
        body: KnockoutObservable<string>;
        bodyViewModel: KnockoutObservable<any>;
        bodyPlaceholder: KnockoutObservable<string>;
        subsections: KnockoutObservableArray<ISubSection>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class SubSection implements ISubSection {
        private _header: KnockoutObservable<string>;
        private _altHeader: KnockoutObservable<boolean>;
        private _classes: KnockoutObservable<string>;
        private _body: KnockoutObservable<string>;
        private _bodyViewModel: KnockoutObservable<any>;

        constructor(data: ISubSectionData = {}) {
            this._header = ko.observable(data.header || "");
            this._altHeader = ko.observable(data.altHeader || false);
            this._classes = ko.observable(data.classes || "");
            this._body = ko.observable(data.body || "");
            this._bodyViewModel = ko.observable(data.bodyViewModel || {});
        }

        public get altHeader(): KnockoutObservable<boolean> {
            return this._altHeader;
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

        public get bodyViewModel(): KnockoutObservable<any> {
            return this._bodyViewModel;
        }

    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _title: KnockoutObservable<string>;
        private _subtitle: KnockoutObservable<string>;
        private _altHeader: KnockoutObservable<boolean>;
        private _body: KnockoutObservable<string>;
        private _bodyViewModel: KnockoutObservable<any>;
        private _bodyPlaceholder: KnockoutObservable<string>;
        private _subsections: KnockoutObservableArray<ISubSection>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._title = ko.observable(data.title || "");
            this._subtitle = ko.observable(data.subtitle || "");
            this._altHeader = ko.observable(data.altHeader || false);
            this._body = ko.observable(data.body || "");
            this._bodyViewModel = ko.observable(data.bodyViewModel || {});
            this._bodyPlaceholder = ko.observable(data.bodyPlaceholder || "");
            this._subsections = ko.observableArray<SubSection>(Base.createFromDefaults(data.subsections, SubSection));
        }

        public get altHeader(): KnockoutObservable<boolean> {
            return this._altHeader;
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