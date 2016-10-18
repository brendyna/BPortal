import $ = require("jquery");
import Base = require("./Base");
import Editable = require("./Editable");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export interface IOptionData {
        text?: string;
        value?: string;
        disabled?: boolean;
    }

    export interface IOption {
        text: KnockoutObservable<string>;
        value: KnockoutObservable<string>;
        disabled: KnockoutObservable<boolean>;
    }

    export interface IViewModelData extends Editable.IViewModelData {
        options?: Array<IOptionData>;
    }

    export interface IViewModel extends Editable.IViewModel {
        options: KnockoutObservableArray<IOption>;
    }

    export interface IWidgetDefaults extends Editable.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Editable.IWidget {
        viewModel: IViewModel;
    }

    export class Option implements IOption {
        private _text: KnockoutObservable<string>;
        private _value: KnockoutObservable<string>;
        private _disabled: KnockoutObservable<boolean>;

        constructor(data: IOptionData = {}) {
            this._text = ko.observable(data.text || "");
            this._value = ko.observable(data.value || "");
            this._disabled = ko.observable(data.disabled || false);
        }

        public get disabled(): KnockoutObservable<boolean> {
            return this._disabled;
        }

        public get text(): KnockoutObservable<string> {
            return this._text;
        }

        public get value(): KnockoutObservable<string> {
            return this._value;
        }
    }

    export class ViewModel extends Editable.ViewModel implements IViewModel {
        private _options: KnockoutObservableArray<IOption>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._options = ko.observableArray<Option>(Base.createFromDefaults(data.options, Option));
        }

        public get options(): KnockoutObservableArray<IOption> {
            return this._options;
        }
    }

    export class Widget extends Editable.Widget implements IWidget {
        public static widgetClass = "select";

        constructor(element: JQuery, defaults?: IWidgetDefaults) {
            super(element, ViewModel, defaults);

            // Select is an inline element which uses the element its bound to
            // as the template
            this._template = "";

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addBinding("options", "vm.options");
            super._addBinding("optionsText", "'text'");
            super._addBinding("optionsValue", "'value'");
            super._addBinding("optionsAfterRender", "widget._setOptionDisable");

            super._setupElement();

            super._addClass(Widget.widgetClass);

            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();
            super._initializeSubscriptions();
            super._initializeEvents();
        }

        public _setOptionDisable(option: HTMLElement, item: IOption): void {
            // item will be undefined if it's the caption option, so check first
            if (item) {
                ko.applyBindingsToNode(option, { disable: item.disabled }, item);
            }
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsSelect = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}