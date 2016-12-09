import $ = require("jquery");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export enum Type {
        Cyan = 1,
        Default,
        Error,
        Gold,
        LightGray,
        LightGreen,
        Primary,
        Warning
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

        _cyan: KnockoutComputed<boolean>;
        _default: KnockoutComputed<boolean>;
        _error: KnockoutComputed<boolean>;
        _gold: KnockoutComputed<boolean>;
        _lightGray: KnockoutComputed<boolean>;
        _lightGreen: KnockoutComputed<boolean>;
        _primary: KnockoutComputed<boolean>;
        _warning: KnockoutComputed<boolean>;

        constructor(element: JQuery, defaults?: IWidgetDefaults) {
            super(element, ViewModel, defaults);

            this._template = "";

            this._cyan = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Cyan;
            });

            this._default = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Default;
            });

            this._error = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Error;
            });

            this._gold = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Gold;
            });

            this._lightGray = ko.pureComputed(() => {
                return this.viewModel.type() === Type.LightGray;
            });

            this._lightGreen = ko.pureComputed(() => {
                return this.viewModel.type() === Type.LightGreen;
            });

            this._primary = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Primary;
            });

            this._warning = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Warning;
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
            super._addBinding("text", "viewModel.text");
            super._addBinding("css", "'badge--cyan': widget._cyan");
            super._addBinding("css", "'badge--error': widget._error");
            super._addBinding("css", "'badge--gold': widget._gold");
            super._addBinding("css", "'badge--light-gray': widget._lightGray");
            super._addBinding("css", "'badge--light-green': widget._lightGreen");
            super._addBinding("css", "'badge--primary': widget._primary");
            super._addBinding("css", "'badge--warning': widget._warning");

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