import $ = require("jquery");
import Base = require("./Base");
import ko = require("knockout");

export = Main;

module Main {
    export interface IViewModelData extends Base.IViewModelData {
        placeholder?: string;
        value?: string;
        intialValue?: string;
        name?: string;
    }

    export interface IViewModel extends Base.IViewModel {
        placeholder: KnockoutObservable<string>;
        value: KnockoutObservable<string>;
        initialValue: KnockoutObservable<string>;
        name: KnockoutObservable<string>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        viewModel: IViewModel;
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _placeholder: KnockoutObservable<string>;
        private _value: KnockoutObservable<string>;
        private _initialValue: KnockoutObservable<string>;
        private _name: KnockoutObservable<string>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._placeholder = ko.observable(data.placeholder || "");
            this._value = ko.observable(data.value || "");
            this._initialValue = ko.observable(data.intialValue || "");
            this._name = ko.observable(data.name || "");
        }

        public get placeholder(): KnockoutObservable<string> {
            return this._placeholder;
        }

        public get value(): KnockoutObservable<string> {
            return this._value;
        }

        public get initialValue(): KnockoutObservable<string> {
            return this._initialValue;
        }

        public get name(): KnockoutObservable<string> {
            return this._name;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "input";

        constructor(element: JQuery, viewModelType: { new (data: IViewModelData): IViewModel }, defaults: IWidgetDefaults = {}) {
            super(element, viewModelType, defaults);
        }

        public destroy(): void {
            this.element
                .attr("name", null)
                .attr("placeholder", null)
                .attr("value", null);

            super.destroy();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addBinding("attr", "placeholder: vm.placeholder");
            super._addBinding("attr", "name: vm.name");
            super._addBinding("value", "vm.value");
            super._addBinding("valueUpdate", "'keyup'");

            super._setupElement();

            super._addClass(Widget.widgetClass);
        }

        public _applyBindings(): void {
            super._applyBindings();
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();
        }

        public _initializeEvents(): void {
            super._initializeEvents();
        }
    }
}