import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");
import DefaultTemplate = require("../Templates/Views/Base.View.Template");
import DisabledWrapperTemplate = require("../Templates/Views/Base.View.DisabledWrapper.Template");
import Header = require("Areas/Shared/Controls/Header");
import ko = require("knockout");
import Navigation = require("Areas/Shared/Controls/Navigation");

window.ko = ko; // enables easy debugging w/ko not bound to require

export = Main;

module Main {
    Header;
    Navigation;

    /**
     * This interface represents the expected URL parameters which will
     * be passed into and used by the View and its dependencies.
     */
    export interface IParams {
    }

    /**
     * This interface defines the data required to power the view model.
     * The Base interface and View take care of defining navigation (breadcrumb)
     * and header (page title) as required elements for all views.
     */
    export interface IViewModelData {
        header?: Header.IViewModelData;
        navigation?: Navigation.IViewModelData;
    }

    /**
     * The view context by default includes the params, and can be extended
     * to include all properties that define the context in which the View is
     * operating.
     */
    export interface IViewContext {
        params: IParams;
    }

    /**
     * The base interface defines what options all views should take in and support.
     */
    export interface IWidgetDefaults {
        /**
         * If true, disables automatically calling load on repositories.
         * You can manually call loadData() when ready.
         *
         * Note: this option is useful for testing various states of the View.
         */
        disableAutoLoad?: boolean;

        /**
         * If true, disables automatically calling ko.applyBindings on the View Widget element.
         * You can manually call render() when ready.
         *
         * Note: this option is useful for testing various states of the View.
         */
        disableAutoRender?: boolean;

        /**
         * If set, the placeholder string (plain text or HTML) is rendered in place of the View.
         */
        disabledPlaceholder?: string;

        /**
         * The template to use for the View.
         *
         * Note: Typically, the View itself will set this in its constructor, but this can be
         * useful for overriding the template when initializing for test purposes, or something
         * like A/B testing of different Views.
         */
        template?: string;

        /**
         * See interface definition.
         */
        viewContext: IViewContext;

        /**
         * See interface definition.
         */
        viewModelData?: IViewModelData;
    }

    export interface IWidget {
        /**
         * See interface definition.
         */
        defaults: IWidgetDefaults;

        /**
         * This method destroys the View, cleans the data-bound element to its original state,
         * and disposes of dependencies like subscriptions and child widgets.
         * 
         * @returns void 
         */
        destroy: () => void;

        /**
         * If set, the placeholder string (plain text or HTML) is rendered in place of the View.
         */
        disabledPlaceholder: KnockoutObservable<string>;

        /**
         * The DOM element that the View is bound to.
         */
        element: JQuery;

        /**
         * The accessor for the Header control ViewModel and Widget.
         */
        header: Base.IControl<Header.IViewModel, Header.IWidget>;

        /**
         * This method initializes all the UI controls which will have data loaded into them.
         * You must populate this function with calls to change the control loading() properties to true.
         * 
         * @returns void
         */
        initializeLoading: () => void;

        /**
         * This method initializes all the repositories with the required settings.
         * You must populate this function with instantiations of all the repos your view depends upon.
         * 
         * @returns void
         */
        initializeRepos: () => void;

        /**
         * This method initializes subscriptions to observable ViewModel properties.
         * You must populate this function with the creation of new subscriptions as necessary.
         * 
         * @returns void
         */
        initializeSubscriptions: () => void;

        /**
         * This function encapsulates calling initializeLoading(), initializeRepos, and loadRepos()
         * 
         * @returns JQueryPromise<void>
         */
        loadData: () => JQueryPromise<void>;

        /**
         * This method triggers loading all of the dependent repos and sets up actions for when they complete.
         * You must populate this function with repo load().done() calls.
         *
         * Also add to this function a $.when().done() that calls _loadDeferred.resolve() which provides an
         * indication (useful when testing) that the entire View is done loading.
         * 
         * @returns void
         */
        loadRepos: () => void;

        /**
         * The accessor for the Navigation control ViewModel and Widget.
         */
        navigation: Base.IControl<Navigation.IViewModel, Navigation.IWidget>;

        /**
         * This method triggers the ko.applyBindings call, which binds ViewModels to the template inserted
         * into the View Widget element.
         * 
         * @returns void
         */
        render: () => void;

        /**
         * This method sets the initial set of static content required to initially bind data. This content
         * does not depend on data loading, and thus allows for progressive rendering (first the static content,
         * then the dynamic content).
         * 
         * @returns void
         */
        setStaticViewModelData: () => void;
    }

    export class Widget implements IWidget {
        _controlClasses: IDictionary<string>;
        _controlIds: IDictionary<string>;
        _defaults: IWidgetDefaults;
        _disabledPlaceholder: KnockoutObservable<string>;
        _element: JQuery;
        _loadDeferred: JQueryDeferred<void>;
        _staticViewModelData: IViewModelData;
        _subscriptions: Array<KnockoutSubscription>;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            this._element = element;
            this._defaults = <IWidgetDefaults>defaults;
            this._loadDeferred = $.Deferred<void>();
            this._subscriptions = [];
            this._disabledPlaceholder = ko.observable(this._defaults.disabledPlaceholder || "");

            this._defaults.template = this._defaults.template || DefaultTemplate;
            if (this._defaults.template !== DefaultTemplate) {
                this._defaults.template = DefaultTemplate + this._defaults.template;
            }

            this._controlIds = {
                navigation: "view-navigation",
                header: "view-header"
            };

            this._controlClasses = {};

            this.element.html(DisabledWrapperTemplate.replace("{VIEW_TEMPLATE}", this._defaults.template));
        }

        /**
         * Accessor for the classes for child controls of the View.
         * @returns IDictionary<string>
         */
        public get controlClasses(): IDictionary<string> {
            return this._controlClasses;
        }

        /**
         * Accessor for the IDs for child controls of the View.
         * @returns IDictionary<string>
         */
        public get controlIds(): IDictionary<string> {
            return this._controlIds;
        }

        /**
         * Accessor for the View Widget defaults.
         * @returns IWidgetDefaults
         */
        public get defaults(): IWidgetDefaults {
            return this._defaults;
        }

        /**
         * Accessor for the View disabledPlaceholder property.
         * @returns KnockoutObservable<string>
         */
        public get disabledPlaceholder(): KnockoutObservable<string> {
            return this._disabledPlaceholder;
        }

        /**
         * Accessor for the View Widget element.
         * @returns JQuery
         */
        public get element(): JQuery {
            return this._element;
        }

        /**
         * Accessor for the Header Control ViewModel and Widget properties.
         * @returns Base.IControl<Header.IViewModel, Header.IWidget>
         */
        public get header(): Base.IControl<Header.IViewModel, Header.IWidget> {
            return <Base.IControl<Header.IViewModel, Header.IWidget>>
                (this.getDataFor("#" + this.controlIds["header"]));
        }

        /**
         * Accessor for the Navigation Control ViewModel and Widget properties.
         * @returns Base.IControl<Navigation.IViewModel, Navigation.IWidget>
         */
        public get navigation(): Base.IControl<Navigation.IViewModel, Navigation.IWidget> {
            return <Base.IControl<Navigation.IViewModel, Navigation.IWidget>>
                (this.getDataFor("#" + this.controlIds["navigation"]));
        }

        /**
         * See interface definition.
         */
        public render(): void {
            ko.applyBindings({ viewModel: this._staticViewModelData, widget: this }, this._element[0]);
        }

        /**
         * See interface definition.
         */
        public loadData(): JQueryPromise<void> {
            // No-op (implement in child)
            return this._loadDeferred.promise();
        }

        /**
         * Calls ko.dataFor on the given element and returns the Control, granting
         * access to the ViewModel and Widget properties.
         * @param selector The JQuery selector string to query for.
         * @return Base.IControl<Base.IViewModel, Base.IWidget>
         */
        public getDataFor(selector: string): Base.IControl<Base.IViewModel, Base.IWidget> {
            return ko.dataFor(this._element.find(selector)[0]);
        }

        /**
         * See interface definition.
         */
        public initializeSubscriptions(): void {
            // No-op (implement in child)
        }

        /**
         * See interface definition.
         */
        public initializeRepos(): void {
            // No-op (implement in child)
        }

        /**
         * See interface definition.
         */
        public loadRepos(): void {
            // No-op (implement in child)
        }

        /**
         * See interface definition.
         */
        public initializeLoading(): void {
            // No-op (implement in child)
        }

        /**
         * See interface definition.
         */
        public setStaticViewModelData(): void {
            // No-op (implement in child)
        }

        /**
         * See interface definition.
         */
        public destroy(): void {
            this._subscriptions.forEach((sub: KnockoutSubscription) => {
                sub.dispose();
            });

            this.element.html("");

            ko.cleanNode(this.element[0]);
        }
    }
}