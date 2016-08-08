import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

export = Main;

module Main {
    export enum Type {
        Basic
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
            this._type = ko.observable(data.type || Type.Basic);
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

        _basic: KnockoutComputed<boolean>;

        constructor(element: JQuery, defaults?: IWidgetDefaults) {
            super(element, ViewModel, defaults);

            this._template = "";

            this._basic = ko.computed(() => {
                return this.viewModel.type() === Type.Basic;
            });

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
            this._basic.dispose();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addBinding("text", "vm.text");
            super._addBinding("css", "'badge': widget._basic");

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