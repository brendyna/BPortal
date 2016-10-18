import $ = require("jquery");
import Base = require("./Base");
import Button = require("./Button");
import Config = require("../Config");
import DefaultTemplate = require("../Templates/Controls/Filters.Template");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");
import Select = require("./Select");

export = Main;

module Main {
    Button; // Ambient reference to force require import given Button is unused
    Select;

    export interface IViewModelData extends Base.IViewModelData {
        selectData?: Array<Select.IViewModelData>;
        applyFilterCallback?: (value: IDictionary<string>) => void;
        resetFilterCallback?: (value: IDictionary<string>) => void;
        hideButtons?: boolean;
    }

    export interface IViewModel extends Base.IViewModel {
        selectData: KnockoutObservableArray<Select.IViewModelData>;
        applyFilterCallback: KnockoutObservable<(value: IDictionary<string>) => void>;
        resetFilterCallback: KnockoutObservable<(value: IDictionary<string>) => void>;
        value: KnockoutObservable<IDictionary<string>>;
        hideButtons: KnockoutObservable<boolean>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        viewModel: IViewModel;
        applyButtonVM: Button.IViewModel;
        resetButtonVM: Button.IViewModel;
        selectWidgets: Array<Select.IWidget>;
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _selectData: KnockoutObservableArray<Select.IViewModelData>;
        private _applyFilterCallback: KnockoutObservable<(value: IDictionary<string>) => void>;
        private _resetFilterCallback: KnockoutObservable<(value: IDictionary<string>) => void>;
        private _value: KnockoutObservable<IDictionary<string>>;
        private _hideButtons: KnockoutObservable<boolean>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._selectData = ko.observableArray((<IViewModelData>this.data).selectData || []);
            this._applyFilterCallback = ko.observable((<IViewModelData>this.data).applyFilterCallback || $.noop);
            this._resetFilterCallback = ko.observable((<IViewModelData>this.data).resetFilterCallback || $.noop);
            this._value = ko.observable(<IDictionary<string>>{});
            this._hideButtons = ko.observable((<IViewModelData>this.data).hideButtons || false);
        }

        public get applyFilterCallback(): KnockoutObservable<(value: IDictionary<string>) => void> {
            return this._applyFilterCallback;
        }

        public get selectData(): KnockoutObservableArray<Select.IViewModelData> {
            return this._selectData;
        }

        public get resetFilterCallback(): KnockoutObservable<(value: IDictionary<string>) => void> {
            return this._resetFilterCallback;
        }

        public get value(): KnockoutObservable<IDictionary<string>> {
            return this._value;
        }

        public get hideButtons(): KnockoutObservable<boolean> {
            return this._hideButtons;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "filters";

        _applyButtonDefaults: Button.IWidgetDefaults;
        _resetButtonDefaults: Button.IWidgetDefaults;

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            this._template = this.defaults.template || DefaultTemplate;

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
        }

        public get applyButtonVM(): Button.IViewModel {
            return Base.getViewModelFromElement<Button.IViewModel>(this.element.find(".filters__apply"));
        }

        public get resetButtonVM(): Button.IViewModel {
            return Base.getViewModelFromElement<Button.IViewModel>(this.element.find(".filters__reset"));
        }

        public get selectWidgets(): Select.IWidget[] {
            let widgets = [];

            this._childWidgets.forEach((widget: Base.IWidget) => {
                if (widget instanceof Select.Widget) {
                    widgets.push(widget);
                }
            });

            return widgets;
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
            this._setupChildWidgetDefaults();

            super._applyBindings();

            this._initializeSubscriptions();
            super._initializeEvents();
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();

            this._subscriptions.push(this.viewModel.selectData.subscribe((newSelectData: Select.IViewModelData[]) => {
                this._initializeSelectSubscriptions();
            }));

            this._subscriptions.push(this.viewModel.disabled.subscribe((disabled: boolean) => {
                this._updateDisabledState(disabled);
            }));

            this._initializeSelectSubscriptions();
        }

        public _initializeSelectSubscriptions(): void {
            // Subscribe to the values so when they change we update the view model value
            this.selectWidgets.forEach((widget: Select.IWidget) => {
                this._subscriptions.push(widget.viewModel.value.subscribe((newValue: string) => {
                    this._updateViewModelValue();
                }));
            });

            this._updateViewModelValue();
        }

        public _setupChildWidgetDefaults(): void {
            this._applyButtonDefaults = {
                viewModelData: {
                    classes: "filters__apply",
                    text: Config.Strings.ApplyButtonText,
                    clickCallback: () => {
                        this.viewModel.applyFilterCallback()(this.viewModel.value());
                    },
                    disabled: this.viewModel.disabled()
                }
            };

            this._resetButtonDefaults = {
                viewModelData: {
                    classes: "filters__reset",
                    text: Config.Strings.ResetButtonText,
                    clickCallback: () => {
                        this.viewModel.resetFilterCallback()(this.viewModel.value());
                    },
                    disabled: this.viewModel.disabled()
                }
            };
        }

        public _updateDisabledState(disabled: boolean): void {
            this.applyButtonVM.disabled(disabled);
            this.resetButtonVM.disabled(disabled);

            this.selectWidgets.forEach((widget: Select.IWidget) => {
                widget.viewModel.disabled(disabled);
            });
        }

        public _destroyChildSelectWidgets(): void {
            this.selectWidgets.forEach((widget: Select.IWidget) => {
                widget.destroy();
            });
        }

        public _updateViewModelValue(): void {
            let currentValue = this.viewModel.value();
            let newValue: IDictionary<string> = {};

            this.selectWidgets.forEach((widget: Select.IWidget) => {
                newValue[widget.viewModel.name()] = widget.viewModel.value();
            });

            if (JSON.stringify(newValue) !== JSON.stringify(currentValue)) {
                // Use extend to fill in values for selects that may have been 
                // omitted in the passed in newValue object
                this.viewModel.value(newValue);
            }
        }
    }



    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsFilters = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}