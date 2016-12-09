import $ = require("jquery");
import ko = require("knockout");
import LoadingOverlayTemplate = require("../Templates/Controls/Base.Loading.Template");

export = Main;

window.ko = ko;

module Main {
    /**
     * This function is used to translate ViewModel Data into ViewModels. It does so by using
     * ViewModel constructors which take the raw data values and convert them to observable values.
     * The returned observable structures are then used for Knockout data binding and provide APIs
     * via Views for accessing and manipulating UI data.
     * 
     * @param defaults The data defaults to use when newing up the ViewModel
     * @param type The type/class to new up
     * @return Array<C> Returns an array of the created objects, defined by type parameter C
     */
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

    /**
     * Returns the ViewModel (with observable values) for a given element using
     * the Knockout ko.dataFor helper (see: http://knockoutjs.com/documentation/unobtrusive-event-handling.html)
     * 
     * @param elem The JQuery element whose DOM node will be passed into ko.dataFor
     * @return T A ViewModel of type T
     */
    export function getViewModelFromElement<T extends IViewModel>(elem: JQuery): T {
        return <T>(ko.dataFor(elem[0]).viewModel);
    }

    /**
     * Represents a data-bound Control, with access to the ViewModel and Widget properties.
     */
    export interface IControl<VM extends IViewModel, W extends IWidget> {
        /**
         * The ViewModel for a control, providing access to observable properties.
         */
        viewModel: VM;

        /**
         * The Widget for a control, providing access to public members and other properties
         * the Widget exposes to support manipulating the Control UI.
         */
        widget: W;
    }

    /**
     * A base class defining essential properties for all Controls
     * Note: ViewModel Data is used to initialize a Control's observable values. To
     * manipulate the observable values after initialization, use the ViewModel.
     */
    export interface IViewModelData {
        /**
         * The space-separated list of classes to render into the DOM element's
         * class property.
         */
        classes?: string;

        /**
         * A property indicating the disabled state of the control.
         * Each control determines what to do with its UI when disabled.
         */
        disabled?: boolean;

        /**
         * The ID for a control to render into its ID property.
         */
        id?: string;

        /**
         * A label which is prepended to the Control element when set.
         */
        label?: string;

        /**
         * A property indicating the loading state of the control.
         * When set to true, it invokes a loading UI for the control.
         * When set to false, it hides/removes the loading UI.
         */
        loading?: boolean;
    }

    /**
     * A base class defining the observable versions of essential properties for all Controls.
     * Properties are mapped 1:1 to IViewModelData, with an additional property to contain the
     * original, unobservable IViewModelData values.
     */
    export interface IViewModel {
        /**
         * The observable version of the IViewModelData classes property.
         */
        classes: KnockoutObservable<string>;

        /**
         * The original, unobservable ViewModel values for which observable will be created.
         */
        data: IViewModelData;

        /**
         * The observable version of the IViewModelData disabled property.
         */
        disabled: KnockoutObservable<boolean>;

        /**
         * The observable version of the IViewModelData id property.
         */
        id: KnockoutObservable<string>;

        /**
         * The observable version of the IViewModelData label property.
         */
        label: KnockoutObservable<string>;

        /**
         * The observable version of the IViewModelData loading property.
         */
        loading: KnockoutObservable<boolean>;

        /**
         * A method to serialize the current observable values into an object with unobservable,
         * IViewModelData properties.
         */
        toJS: () => IViewModelData;

        /**
         * A method to serialize the current observable values into a JSON string representation of
         * an object with unobservable, IViewModelData properties.
         */
        toJSON: () => string;
    }

    /**
     * Defaults passed into a Control Widget's constructor and used to setup the control.
     * Note: Defaults are used to initialize a Widget. Use the observable values exposed publicly on the Widget
     * that map to default properties to manipulate the values/UI after initialization.
     */
    export interface IWidgetDefaults {
        /**
         * A boolean property which hides the Control if set to true.
         * Note: this can be useful when 
         */
        hidden?: boolean;

        /**
         * The template used as the Control's UI.
         * Note: Each Control typically defines its own template in its constructor, but
         * this is a useful option if the default template needs to be overridden for some reason.
         */
        template?: string;

        /**
         * The raw ViewModel Data used to create observable ViewModels.
         */
        viewModelData?: IViewModelData;
    }

    export interface IWidget {
        /**
         * The original defaults passed into the Widget.
         */
        defaults: IWidgetDefaults;

        /**
         * A method to clean-up the Control, remove its bindings, and return the element
         * to the state it was in before it was data bound.
         */
        destroy: () => void;

        /**
         * The element to which the Control is bound.
         */
        element: JQuery;

        /**
         * The observable value that controls whether the Control is hidden or not.
         */
        hidden: KnockoutObservable<boolean>;

        /**
         * The ViewModel created from the ViewModel Data passed in as
         * part of the Widget defaults.
         */
        viewModel: IViewModel;

        _template: string;
        _setupElement: () => void;
        _applyBindings: () => void;
        _initializeSubscriptions: () => void;
        _initializeEvents: () => void;
    }

    /**
     * A base ViewModel class which defines accessors for base IViewModelData
     * properties.
     *
     * The ViewModel is used programmatically to manipulate the template/UI, and by the
     * template UI to access and update data values (it is a two-way binding).
     */
    export class ViewModel implements IViewModel {
        private _classes: KnockoutObservable<string>;
        private _data: IViewModelData;
        private _disabled: KnockoutObservable<boolean>;
        private _id: KnockoutObservable<string>;
        private _label: KnockoutObservable<string>;
        private _loading: KnockoutObservable<boolean>;

        constructor(data: IViewModelData) {
            this._data = data || {};
            this._classes = ko.observable(this._data.classes || "");
            this._disabled = ko.observable(this._data.disabled || false);
            this._id = ko.observable(this._data.id || "");
            this._label = ko.observable(this._data.label || "");
            this._loading = ko.observable(this._data.loading || false);
        }

        /**
         * Accessor for the observable classes property.
         * @returns KnockoutObservable<string> 
         */
        public get classes(): KnockoutObservable<string> {
            return this._classes;
        }

        /**
         * Accessor for the unobservable, original IViewModelData data property.
         * This will return original values, not those updated via UI or programmatically.
         * Note: this can be useful for determining deltas/data changes.
         * @returns IViewModelData
         */
        public get data(): IViewModelData {
            return this._data;
        }

        /**
         * Accessor for the observable disabled property.
         * @returns KnockoutObservable<boolean> 
         */
        public get disabled(): KnockoutObservable<boolean> {
            return this._disabled;
        }

        /**
         * Accessor for the observable id property.
         * @returns KnockoutObservable<string> 
         */
        public get id(): KnockoutObservable<string> {
            return this._id;
        }

        /**
         * Accessor for the observable label property.
         * @returns KnockoutObservable<string> 
         */
        public get label(): KnockoutObservable<string> {
            return this._label;
        }

        /**
         * Accessor for the observable loading property.
         * @returns KnockoutObservable<boolean> 
         */
        public get loading(): KnockoutObservable<boolean> {
            return this._loading;
        }

        /**
         * Accessor for the JSON version of current ViewModel properties.
         * @returns IViewModelData 
         */
        public toJS(): IViewModelData {
            return ko.toJS(this);
        }

        /**
         * Accessor for the JSON string version of current ViewModel properties.
         * @returns string
         */
        public toJSON(): string {
            return ko.toJSON(this);
        }
    }

    /**
     * A base Widget class which handles setting up the DOM template and binding the ViewModel to it.
     * It also handles subscribing to changes to observable values and reacting to them (via Knockout subscriptions) to
     * ensure internal state consistency.
     * Finally, this class exposes a number of useful public observables and functions used to manipulate the Control.
     */
    export class Widget implements IWidget {
        public static disabledWidgetClass = "control--disabled";
        public static hiddenWidgetClass = "hidden";
        public static widgetClass = "control";

        /**
         * To support newing up a Widget in the most common scenario (via ViewModel Data alone, as most Widget defaults
         * can be ignored), this function disambiguates default objects from standalone ViewModel Data objects, and normalizes
         * into an IWidgetDefaults object for internal consistency.
         * 
         * @param defaults Either IWidgetDefaults or IViewModelData
         * @param template The template to assign to or override the template property on the Widget defaults
         * @return IWidgetDefaults The normalized IWidgetDefaults object
         */
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
        _bindings: IDictionary<Array<string>>;
        _childWidgets: Array<IWidget>;
        _previousBinding: string;
        _previousId: string;
        _subscriptions: Array<KnockoutSubscription> = [];
        _template: string;
        _viewModel: IViewModel;

        private _defaults: IWidgetDefaults;
        private _element: JQuery;
        private _hidden: KnockoutObservable<boolean>;
        private _labelElement: JQuery;
        private _loadingElement: JQuery;

        constructor(element: JQuery, viewModelType: { new (data: IViewModelData): IViewModel }, defaults?: IWidgetDefaults) {
            this._bindings = {};
            this._childWidgets = [];
            this._defaults = defaults || {};
            this._element = element;
            this._hidden = ko.observable(this._defaults.hidden || false);
            this._loadingElement = $(LoadingOverlayTemplate);
            this._template = this._defaults.template || "";
            this._viewModel = createFromDefaults<IViewModelData, IViewModel>(<IViewModelData>this._defaults.viewModelData, viewModelType)[0];

            if (this.viewModel.classes() !== "") {
                this._addClass(this.viewModel.classes(), false);
            }
        }

        /**
         * Accessor for the collection of child widgets rendered by this Control.
         * @returns Array<IWidget> 
         */
        public get childWidgets(): Array<IWidget> {
            return this._childWidgets;
        }

        /**
         * Accessor for the original Widget defaults object.
         * @returns IWidgetDefaults
         */
        public get defaults(): IWidgetDefaults {
            return this._defaults;
        }

        /**
         * Accessor for the Widget element to which data is bound.
         * @returns JQuery
         */
        public get element(): JQuery {
            return this._element;
        }

        /**
         * Accessor for the hidden observable for the Widget.
         * @returns JQuery
         */
        public get hidden(): KnockoutObservable<boolean> {
            return this._hidden;
        }

        /**
         * Accessor for the observable ViewModel created by the Widget.
         * @returns IViewModel
         */
        public get viewModel(): IViewModel {
            return this._viewModel;
        }

        /**
         * Get the child widgets of this Widget based on the type of widget.
         * @returns Array<T> A collection of widgets of type T
         */
        public getChildWidgetsByType<T extends IWidget>(type: { new(): T }): Array<T> {
            let widgets = [];

            this._childWidgets.forEach((widget: IWidget) => {
                if (widget instanceof type) {
                    widgets.push(widget);
                }
            });

            return widgets;
        }

        /**
         * Destroys the Control by cleaning up bindings, disposing subscriptions,
         * and restoring the element to its pre-data-bound state.
         */
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

        /**
         * Invoked by child class
         */
        public _applyBindings(): void {
            this.element.attr("data-bind", this._getBindings());

            ko.applyBindings({ viewModel: this.viewModel, widget: this }, this.element[0]);

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

        private _destroyLabel(): void {
            if (this._labelElement) {
                ko.cleanNode(this._labelElement[0]);
                this._labelElement.remove();
                this._labelElement = null;
            }
        }

        public _disposeSubscriptions(): void {
            this._subscriptions.forEach((value: KnockoutSubscription, index: number) => {
                value.dispose();
                value = null;
            });
        }

        public _initializeEvents(): void {
            // noop
        }

        /**
         * Invoked by child class
         */
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

        /**
         * Invoked by child class
         */
        public _setupElement(): void {
            this._addBinding("disable", "viewModel.disabled");
            this._addBinding("css", "'" + Widget.disabledWidgetClass + "': viewModel.disabled");

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

        public _updateLoadingState(loading: boolean): void {
            if (loading) {
                this.element.prepend(this._loadingElement);
            } else {
                this.element.find("." + this._loadingElement.attr("class")).remove();
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
    }

    /**
     * This custom binding handler is useful in situations where you want to bind an arbitrarily-shaped
     * ViewModel Data object to an element. It's used commonly in layout-style controls like Section.
     */
    ko.bindingHandlers.customViewModel = {
        init: function (element: Element, valueAccessor: () => IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            let widget = bindingContext.$root.widget;
            let html = $(element).html();
            viewModel = ko.unwrap(valueAccessor());

            // Clean the current data-binding on the element
            // so we can rebind w/the custom view model
            element = ko.cleanNode(element);
            $(element).html(html);
            $(element).attr("data-bind", null);

            ko.applyBindings({ viewModel: viewModel, widget: widget }, element);
        }
    };
}