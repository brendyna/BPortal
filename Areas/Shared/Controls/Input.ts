import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import Editable = require("./Editable");
import KnockoutUtil = require("../Util/Knockout");

export = Main;

module Main {
    export type EnterCallback = (val: string) => void;

    export class Type {
        public static Telephone = "tel";
        public static Text = "text";
        public static Number = "number";
        public static Email = "email";
        public static Url = "url";
    }

    export interface IViewModelData extends Editable.IViewModelData {
        type?: string;
        enterCallback?: EnterCallback;
    }

    export interface IViewModel extends Editable.IViewModel {
        type: KnockoutObservable<string>;
        enterCallback: KnockoutObservable<EnterCallback>;
    }

    export interface IWidgetDefaults extends Editable.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Editable.IWidget {
        viewModel: IViewModel;
    }

    export class ViewModel extends Editable.ViewModel implements IViewModel {
        private _type: KnockoutObservable<string>;
        private _enterCallback: KnockoutObservable<EnterCallback>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._type = ko.observable(data.type || "");
            this._enterCallback = ko.observable(data.enterCallback || $.noop);
        }

        public get enterCallback(): KnockoutObservable<EnterCallback> {
            return this._enterCallback;
        }

        public get type(): KnockoutObservable<string> {
            return this._type;
        }
    }

    export class Widget extends Editable.Widget implements IWidget {
        public static widgetClass = "input";

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults));

            // Select is an inline element which uses the element its bound to
            // as the template
            this._template = "";

            this._setupElement();
        }

        public destroy(): void {
            this.element
                .off("keydown")
                .attr("type", null);

            super.destroy();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addBinding("attr", "type: vm.type");

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

            this.element.on("keydown", (event: JQueryEventObject) => {
                if (event.keyCode === 13) {
                    this._triggerEnterCallback();
                }
            });
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();

            this._subscriptions.push(this.viewModel.enterCallback.subscribe((newCallback: () => void) => {
                this.element.off("keypress");
                this._initializeEvents();
            }));
        }

        public _triggerEnterCallback(): void {
            this.viewModel.enterCallback()(this.viewModel.value());
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsInput = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}