import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

import DefaultTemplate = require("../Templates/Controls/Tabs.Template");

export = Main;

module Main {
    export interface ITabDefaults {
        id?: string;
        text?: string;
        icon?: string;
    }

    export interface ITab {
        id: KnockoutObservable<string>;
        text: KnockoutObservable<string>;
        icon: KnockoutObservable<string>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        name?: string;
        tabs?: Array<ITabDefaults>;
        value?: string;
    }

    export interface IViewModel extends Base.IViewModel {
        name: KnockoutObservable<string>;
        tabs: KnockoutObservableArray<ITab>;
        value: KnockoutObservable<string>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class Tab implements ITab {
        private _id: KnockoutObservable<string>;
        private _text: KnockoutObservable<string>;
        private _icon: KnockoutObservable<string>;

        constructor(defaults: ITabDefaults = {}) {
            defaults = defaults || {};
            this._id = ko.observable(defaults.id || "");
            this._text = ko.observable(defaults.text || "");
            this._icon = ko.observable(defaults.icon || "");
        }

        public get id(): KnockoutObservable<string> {
            return this._id;
        }

        public get text(): KnockoutObservable<string> {
            return this._text;
        }

        public get icon(): KnockoutObservable<string> {
            return this._icon;
        }
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _name: KnockoutObservable<string>;
        private _tabs: KnockoutObservableArray<Tab>;
        private _value: KnockoutObservable<any>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._name = ko.observable((<IViewModelData>this.data).name || "");
            this._tabs = ko.observableArray<Tab>(Base.createFromDefaults((<IViewModelData>this.data).tabs, Tab));
            this._value = ko.observable((<IViewModelData>this.data).value || "");

            if (this._value() === "" && this._tabs().length) {
                this._value(this._tabs()[0].id());
            }
        }

        public get value(): KnockoutObservable<string> {
            return this._value;
        }

        public get name(): KnockoutObservable<string> {
            return this._name;
        }

        public get tabs(): KnockoutObservableArray<ITab> {
            return this._tabs;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "control__tabs";

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            this._template = this.defaults.template || DefaultTemplate;

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

            this._initializeSubscriptions();
            super._initializeEvents();
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();

            this._subscriptions.push(this.viewModel.tabs.subscribe((newTabs: Array<ITab>) => {
                if (newTabs.length) {
                    this.viewModel.value(newTabs[0].id());
                }
            }));
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsTabs = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}