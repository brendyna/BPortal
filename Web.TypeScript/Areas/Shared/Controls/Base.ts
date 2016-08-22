import $ = require("jquery");
import ko = require("knockout");

import LoadingOverlayTemplate = require("../Templates/Controls/Base.Loading.Template");

export = Main;

module Main {
    export function createFromDefaults<D, C>(defaults: D, type: { new(d: any): C });
    export function createFromDefaults<D, C>(defaults: Array<D>, type: { new(d: any): C });
    export function createFromDefaults<D, C>(defaults: any, type: { new(d: any): C }): Array<C> {
        let original: Array<D> = [].concat(defaults);
        let created: Array<C> = [];

        if (original.length) {
            original.forEach((defaults: D) => {
                created.push(new type(defaults));
            });
        }

        return created;
    }

    export function getViewModelFromElement<T extends IViewModel>(elem: JQuery): T {
        return <T>(ko.dataFor(elem[0]).vm);
    }

    export interface IControl<VM extends IViewModel, W extends IWidget> {
        vm: VM;
        widget: W;
    }

    export interface IViewModelData {
        loading?: boolean;
        disabled?: boolean;
        label?: string;
        id?: string;
        classes?: string;
    }

    export interface IViewModel {
        data: IViewModelData;
        loading: KnockoutObservable<boolean>;
        disabled: KnockoutObservable<boolean>;
        label: KnockoutObservable<string>;
        id: KnockoutObservable<string>;
        classes: KnockoutObservable<string>;
        toJS: () => IViewModelData;
        toJSON: () => string;
    }

    export interface IWidgetDefaults {
        viewModelData?: IViewModelData;
        template?: string;
        strings?: {};
        hidden?: boolean;
    }

    export interface IWidget {
        _template: string;
        element: JQuery;
        defaults: IWidgetDefaults;
        viewModel: IViewModel;
        hidden: KnockoutObservable<boolean>;
        destroy: () => void;
        _setupElement: () => void;
        _applyBindings: () => void;
        _initializeSubscriptions: () => void;
        _initializeEvents: () => void;
    }

    export class ViewModel implements IViewModel {
        private _data: IViewModelData;
        private _loading: KnockoutObservable<boolean>;
        private _disabled: KnockoutObservable<boolean>;
        private _id: KnockoutObservable<string>;
        private _classes: KnockoutObservable<string>;
        private _label: KnockoutObservable<string>;

        constructor(data: IViewModelData) {
            this._data = data || {};
            this._loading = ko.observable(this._data.loading || false);
            this._disabled = ko.observable(this._data.disabled || false);
            this._id = ko.observable(this._data.id || "");
            this._classes = ko.observable(this._data.classes || "");
            this._label = ko.observable(this._data.label || "");
        }

        public get disabled(): KnockoutObservable<boolean> {
            return this._disabled;
        }

        public get data(): IViewModelData {
            return this._data;
        }

        public get loading(): KnockoutObservable<boolean> {
            return this._loading;
        }

        public get id(): KnockoutObservable<string> {
            return this._id;
        }

        public get classes(): KnockoutObservable<string> {
            return this._classes;
        }

        public get label(): KnockoutObservable<string> {
            return this._label;
        }

        public toJS(): IViewModelData {
            return ko.toJS(this);
        }

        public toJSON(): string {
            return ko.toJSON(this);
        }
    }

    export class Widget implements IWidget {
        public static widgetClass = "control";
        public static disabledWidgetClass = "control--disabled";
        public static hiddenWidgetClass = "hidden";

        public static resolveDefaults(defaults: IWidgetDefaults | IViewModelData, template?: string): IWidgetDefaults {
            if (!defaults) {
                defaults = {};
            }

            // We want to support plain viewmodel data and the widget defaults
            // formats for newing this up (recognizing the viewmodel data is
            // often all that's needed to get things going)
            if (!(<IWidgetDefaults>defaults).viewModelData) {
                defaults = <IWidgetDefaults>{ viewModelData: defaults };
            }

            (<IWidgetDefaults>defaults).template = (<IWidgetDefaults>defaults).template || template;

            return defaults;
        }

        // No protected in TS, so _ denotes protected sans private modifier
        _subscriptions: Array<KnockoutSubscription> = [];
        _template: string;
        _viewModel: IViewModel;
        _childWidgets: Array<IWidget>;
        _previousBinding: string;
        _previousId: string;
        _bindings: IDictionary<Array<string>>;

        private _element: JQuery;
        private _loadingElement: JQuery;
        private _labelElement: JQuery;
        private _defaults: IWidgetDefaults;
        private _hidden: KnockoutObservable<boolean>;

        constructor(element: JQuery, viewModelType: { new (data: IViewModelData): IViewModel }, defaults?: IWidgetDefaults) {
            this._element = element;
            this._loadingElement = $(LoadingOverlayTemplate);
            this._defaults = defaults || {};
            this._template = this._defaults.template || "";
            this._viewModel = createFromDefaults<IViewModelData, IViewModel>(<IViewModelData>this._defaults.viewModelData, viewModelType)[0];
            this._childWidgets = [];
            this._bindings = {};
            this._hidden = ko.observable(this._defaults.hidden || false);

            this._addClass(this.viewModel.classes(), true);
        }

        public destroy(): void {
            this._childWidgets.forEach((childWidget: IWidget) => {
                childWidget.destroy();
            });

            this.element
                .empty()
                .removeClass(this.viewModel.classes())
                .attr("data-bind", this._previousBinding || null);

            if (this._previousId && this._previousId !== "") {
                this.element.attr("id", this._previousId);
            }

            ko.cleanNode(this.element[0]);

            this._destroyLabel();
            this._disposeSubscriptions();
        }

        public get childWidgets(): Array<IWidget> {
            return this._childWidgets;
        }

        public get element(): JQuery {
            return this._element;
        }

        public get defaults(): IWidgetDefaults {
            return this._defaults;
        }

        public get hidden(): KnockoutObservable<boolean> {
            return this._hidden;
        }

        public get viewModel(): IViewModel {
            return this._viewModel;
        }

        public getChildWidgetsByType<T extends IWidget>(type: { new(): T }): Array<T> {
            let widgets = [];

            this._childWidgets.forEach((widget: IWidget) => {
                if (widget instanceof type) {
                    widgets.push(widget);
                }
            });

            return widgets;
        }

        // Invoked by child class
        public _setupElement(): void {
            this._addBinding("disable", "vm.disabled");
            this._addBinding("css", "'" + Widget.disabledWidgetClass + "': vm.disabled");

            this._previousId = this.element.attr("id");

            this._addClass(Widget.widgetClass);

            this.element.html(this._template);

            if (this.viewModel.label() != "") {
                this._setupLabelElement();
            }
        }

        public _setupLabelElement(): void {
            this._labelElement = $('<label data-bind="text: labelText, attr: { for: labelFor }"></label>');
            this.element.before(this._labelElement);
        }

        // Invoked by child class
        public _applyBindings(): void {
            this.element.attr("data-bind", this._getBindings());

            ko.applyBindings({ vm: this.viewModel, widget: this }, this.element[0]);

            if (this._labelElement) {
                this._applyLabelBindings();
            }

            if (this.viewModel.loading()) {
                this._updateLoadingState(true);
            }
        }

        public _applyLabelBindings(): void {
            ko.applyBindings({
                labelFor: this.viewModel.id,
                labelText: this.viewModel.label
            }, this._labelElement[0]);
        }

        public _initializeSubscriptions(): void {
            this._subscriptions.push(this.viewModel.loading.subscribe((loading: boolean) => {
                this._updateLoadingState(loading);
            }));

            this._subscriptions.push(this.viewModel.label.subscribe((label: string) => {
                if (label === "") {
                    this._destroyLabel();
                } else {
                    this._setupLabelElement();
                    this._applyLabelBindings();
                }
            }));

            this._subscriptions.push(this.hidden.subscribe((hidden: boolean) => {
                this.element.toggleClass(Widget.hiddenWidgetClass, hidden); 
            }));
        }

        public _initializeEvents(): void {
            // noop
        }

        public _addBinding(name: string, value: string): void {
            if (!$.isArray(this._bindings[name])) {
                this._bindings[name] = [];
            }

            this._bindings[name].push(value);
        }

        public _addClass(classStr: string, updateViewModel = true): void {
            this._addBinding("css", "'" + classStr + "': true");

            if (updateViewModel) {
                this._viewModel.classes(this.viewModel.classes() + " " + classStr);
            }
        }

        private _getBindings(): string {
            let bindings = [];

            for (let binding in this._bindings) {
                let values = this._bindings[binding];

                switch (binding) {
                    case "attr":
                        bindings.push(binding + ": { " + values.join(", ") + " }");
                        break;

                    case "css":
                        if (values.length === 1 && values[0].indexOf(":") === -1) {
                            bindings.push(binding + ": " + values[0]);
                        } else {
                            bindings.push(binding + ": { " + values.join(", ") + " }");
                        }
                        break;

                    default:
                        if (values.length === 1) {
                            bindings.push(binding + ": " + values[0]);
                        } else if (values.length > 1) {
                            bindings.push(binding + ": { " + values.join(", ") + " }");
                        }
                        break;
                }
            }

            return bindings.join(", ");
        }

        private _isAlwaysObjectBinding(binding: string): boolean {
            let alwaysObjectBound = ["attr"];

            return $.inArray(binding, alwaysObjectBound) !== -1;
        }

        public _updateLoadingState(loading: boolean): void {
            if (loading) {
                this.element.prepend(this._loadingElement);
            } else {
                this.element.find("." + this._loadingElement.attr("class")).remove();
            }
        }

        public _disposeSubscriptions(): void {
            this._subscriptions.forEach((value: KnockoutSubscription, index: number) => {
                value.dispose();
                value = null;
            });
        }

        private _destroyLabel(): void {
            if (this._labelElement) {
                ko.cleanNode(this._labelElement[0]);
                this._labelElement.remove();
                this._labelElement = null;
            }
        }
    }

    ko.bindingHandlers.customViewModel = {
        init: function (element: Element, valueAccessor: () => IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            let vm = ko.unwrap(valueAccessor());
            let widget = bindingContext.$root.widget;
            let html = $(element).html();

            // Clean the current data-binding on the element
            // so we can rebind w/the custom view model
            element = ko.cleanNode(element);
            $(element).html(html);
            $(element).attr("data-bind", null);

            ko.applyBindings({ $vm: vm, widget: widget }, element);
        }
    };
}