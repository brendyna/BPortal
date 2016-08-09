import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

export = Main;

module Main {
    export enum Type {
        Default,
        Warning,
        Error,
        Primary
    }

    export interface IViewModelData extends Base.IViewModelData {
        text?: string;
        type?: Type;
    }

    export interface IViewModel extends Base.IViewModel {
        text: KnockoutObservable<string>;
        type: KnockoutObservable<Type>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _text: KnockoutObservable<string>;
        private _type: KnockoutObservable<Type>;

        constructor(data: IViewModelData = {}) {
            super(data);
            this._text = ko.observable(data.text || "");
            this._type = ko.observable(data.type || Type.Default);
        }

        public get text(): KnockoutObservable<string> {
            return this._text;
        }

        public get type(): KnockoutObservable<Type> {
            return this._type;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "badge";

        _default: KnockoutComputed<boolean>;
        _warning: KnockoutComputed<boolean>;
        _error: KnockoutComputed<boolean>;
        _primary: KnockoutComputed<boolean>;

        constructor(element: JQuery, defaults?: IWidgetDefaults) {
            super(element, ViewModel, defaults);

            this._template = "";

            this._default = ko.computed(() => {
                return this.viewModel.type() === Type.Default;
            });

            this._warning = ko.computed(() => {
                return this.viewModel.type() === Type.Warning;
            });

            this._error = ko.computed(() => {
                return this.viewModel.type() === Type.Error;
            });

            this._primary = ko.computed(() => {
                return this.viewModel.type() === Type.Primary;
            });

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
            this._default.dispose();
            this._warning.dispose();
            this._error.dispose();
            this._primary.dispose();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addBinding("text", "vm.text");
            super._addBinding("css", "'badge--warning': widget._warning");
            super._addBinding("css", "'badge--error': widget._error");
            super._addBinding("css", "'badge--primary': widget._primary");

            super._setupElement();

            super._addClass(Widget.widgetClass);
            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();

            this._initializeEvents();
            this._initializeSubscriptions();
        }

        public _initializeEvents(): void {
            super._initializeEvents();
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsBadge = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}