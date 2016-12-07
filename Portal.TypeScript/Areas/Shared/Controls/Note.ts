import $ = require("jquery");
import Base = require("./Base");
import Config = require("../Config");
import DefaultTemplate = require("../Templates/Controls/Note.Template");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export enum Type {
        Default,
        Error,
        Inline,
        Warning
    }

    export interface IViewModelData extends Base.IViewModelData {
        text?: string;
        title?: string;
        type?: Type;
        visible?: boolean;
    }

    export interface IViewModel extends Base.IViewModel {
        text: KnockoutObservable<string>;
        title: KnockoutObservable<string>;
        type: KnockoutObservable<Type>;
        visible: KnockoutObservable<boolean>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _text: KnockoutObservable<string>;
        private _title: KnockoutObservable<string>;
        private _type: KnockoutObservable<Type>;
        private _visible: KnockoutObservable<boolean>;

        constructor(data: IViewModelData = {}) {
            super(data);
            this._text = ko.observable(data.text || "");
            this._title = ko.observable(data.title || "");
            this._type = ko.observable(data.type || Type.Default);
            this._visible = ko.observable(data.visible || true);
        }

        public get text(): KnockoutObservable<string> {
            return this._text;
        }

        public get title(): KnockoutObservable<string> {
            return this._title;
        }

        public get type(): KnockoutObservable<Type> {
            return this._type;
        }

        public get visible(): KnockoutObservable<boolean> {
            return this._visible;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "note";

        _default: KnockoutComputed<boolean>;
        _warning: KnockoutComputed<boolean>;
        _error: KnockoutComputed<boolean>;
        _inline: KnockoutComputed<boolean>;

        constructor(element: JQuery, defaults?: IWidgetDefaults) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            if (this.viewModel.type() === Type.Inline) {
                this._template = "";
            }

            this._default = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Default;
            });

            this._warning = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Warning;
            });

            this._error = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Error;
            });

            this._inline = ko.pureComputed(() => {
                return this.viewModel.type() === Type.Inline;
            });

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
            this._default.dispose();
            this._warning.dispose();
            this._error.dispose();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            if (this.viewModel.type() === Type.Inline) {
                super._addBinding("text", "viewModel.text");
            }

            super._addBinding("css", `'${Config.Classes.NoteBlock}': widget._default`);
            super._addBinding("css", `'${Config.Classes.NoteBlockWarning}': widget._warning`);
            super._addBinding("css", `'${Config.Classes.NoteBlockError}': widget._error`);
            super._addBinding("css", `'${Config.Classes.NoteInline}': widget._inline`);
            super._addBinding("visible", "viewModel.visible");

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
    ko.bindingHandlers.wpsNote = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}