import $ = require("jquery");
import ko = require("knockout");
import Base = require("Areas/Shared/Controls/Base");
import Header = require("Areas/Shared/Controls/Header");
import Navigation = require("Areas/Shared/Controls/Navigation");

import DefaultTemplate = require("../Templates/Views/Base.View.Template");
import DisabledWrapperTemplate = require("../Templates/Views/Base.View.DisabledWrapper.Template");

window.ko = ko; // enables easy debugging w/ko not bound to require

export = Main;

module Main {
    Header;
    Navigation;

    export interface IParams {
    }

    export interface IViewModelData {
        navigation?: Navigation.IViewModelData;
        header?: Header.IViewModelData;
    }

    export interface IViewContext {
        params: IParams;
    }

    export interface IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
        template?: string;
        disableAutoRender?: boolean;
        disabledPlaceholder?: string;
    }

    export interface IWidget {
        element: JQuery;
        defaults: IWidgetDefaults;
        navigation: Base.IControl<Navigation.IViewModel, Navigation.IWidget>;
        header: Base.IControl<Header.IViewModel, Header.IWidget>;
        render: () => void;
        loadData: () => JQueryPromise<void>;
        initializeSubscriptions: () => void;
        initializeRepos: () => void;
        loadRepos: () => void;
        initializeLoading: () => void;
        setStaticViewModelData: () => void;
        disabledPlaceholder: KnockoutObservable<string>;
        destroy: () => void;
    }

    export class Widget implements IWidget {
        _controlIds: IDictionary<string>;
        _controlClasses: IDictionary<string>;
        _element: JQuery;
        _defaults: IWidgetDefaults;
        _loadDeferred: JQueryDeferred<void>;
        _subscriptions: Array<KnockoutSubscription>;
        _staticViewModelData: IViewModelData;
        _disabledPlaceholder: KnockoutObservable<string>;

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

        public get controlClasses(): IDictionary<string> {
            return this._controlClasses;
        }

        public get controlIds(): IDictionary<string> {
            return this._controlIds;
        }

        public get defaults(): IWidgetDefaults {
            return this._defaults;
        }

        public get disabledPlaceholder(): KnockoutObservable<string> {
            return this._disabledPlaceholder;
        }

        public get element(): JQuery {
            return this._element;
        }

        public get header(): Base.IControl<Header.IViewModel, Header.IWidget> {
            return <Base.IControl<Header.IViewModel, Header.IWidget>>
                (this.getDataFor("#" + this.controlIds["header"]));
        }

        public get navigation(): Base.IControl<Navigation.IViewModel, Navigation.IWidget> {
            return <Base.IControl<Navigation.IViewModel, Navigation.IWidget>>
                (this.getDataFor("#" + this.controlIds["navigation"]));
        }

        public render(): void {
            ko.applyBindings({ vm: this._staticViewModelData, widget: this }, this._element[0]);
        }

        public loadData(): JQueryPromise<void> {
            // No-op (implement in child)
            return this._loadDeferred.promise();
        }

        public getDataFor(selector: string): Base.IControl<Base.IViewModel, Base.IWidget> {
            return ko.dataFor(this._element.find(selector)[0]);
        }

        public initializeSubscriptions(): void {
            // No-op (implement in child)
        }

        public initializeRepos(): void {
            // No-op (implement in child)
        }

        public loadRepos(): void {
            // No-op (implement in child)
        }

        public initializeLoading(): void {
            // No-op (implement in child)
        }

        public setStaticViewModelData(): void {
            // No-op (implement in child)
        }

        public destroy(): void {
            this._subscriptions.forEach((sub: KnockoutSubscription) => {
                sub.dispose();
            });
        }
    }
}