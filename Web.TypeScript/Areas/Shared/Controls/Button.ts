import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

export = Main;

module Main {
    export enum Type {
        Basic,
        Primary,
        PagePrimary,
        Warning,
        Textual
    }

    export interface IViewModelData extends Base.IViewModelData {
        text?: string;
        type?: Type;
        title?: string;
        clickCallback?: () => void;
    }

    export interface IViewModel extends Base.IViewModel {
        text: KnockoutObservable<string>;
        type: KnockoutObservable<Type>;
        title: KnockoutObservable<string>;
        clickCallback: KnockoutObservable<() => void>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _text: KnockoutObservable<string>;
        private _type: KnockoutObservable<Type>;
        private _title: KnockoutObservable<string>;
        private _clickCallback: KnockoutObservable<() => void>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._clickCallback = ko.observable(data.clickCallback || $.noop);
            this._text = ko.observable(data.text || "");
            this._type = ko.observable(data.type || Type.Basic);
            this._title = ko.observable(data.title || "");
        }

        public get clickCallback(): KnockoutObservable<() => void> {
            return this._clickCallback;
        }

        public get text(): KnockoutObservable<string> {
            return this._text;
        }

        public get type(): KnockoutObservable<Type> {
            return this._type;
        }

        public get title(): KnockoutObservable<string> {
            return this._title;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "button";

        _primary: KnockoutComputed<boolean>;
        _pagePrimary: KnockoutComputed<boolean>;
        _warning: KnockoutComputed<boolean>;
        _textual: KnockoutComputed<boolean>;

        constructor(element: JQuery, defaults?: IWidgetDefaults) {
            super(element, ViewModel, defaults);

            // Button is an inline element which uses the element its bound to
            // as the template
            this._template = "";

            this._primary = ko.computed(() => {
                return this.viewModel.type() === Type.Primary;
            });

            this._pagePrimary = ko.computed(() => {
                return this.viewModel.type() === Type.PagePrimary;
            });

            this._warning = ko.computed(() => {
                return this.viewModel.type() === Type.Warning;
            });

            this._textual = ko.computed(() => {
                return this.viewModel.type() === Type.Textual;
            });

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();

            this._primary.dispose();
            this._pagePrimary.dispose();
            this._warning.dispose();
            this._textual.dispose();

            this.element.off("click");
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addBinding("text", "vm.text");
            super._addBinding("css", "'button--primary': widget._primary");
            super._addBinding("css", "'button--page-primary': widget._pagePrimary");
            super._addBinding("css", "'button--warning': widget._warning");
            super._addBinding("css", "'button--textual': widget._textual");
            super._addBinding("attr", "title: vm.title");

            super._setupElement();

            super._addClass(Widget.widgetClass);

            if (this.element.is("a") && !this.element.hasClass("button")) {
                super._addClass("button");
            }

            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();

            this._initializeEvents();
            this._initializeSubscriptions();
        }

        public _initializeEvents(): void {
            super._initializeEvents();

            this.element.on("click.viewmodel", this.viewModel.clickCallback());
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();

            this._subscriptions.push(this.viewModel.clickCallback.subscribe((newCallback) => {
                this.element.off("click.viewmodel");
                this.element.on("click.viewmodel", newCallback);
            }));
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsButton = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}