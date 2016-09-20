/// <amd-dependency path="datatables" />

import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import Config = require("../Config");
import KnockoutUtil = require("../Util/Knockout");

import DefaultTemplate = require("../Templates/Controls/Table.Template");

export = Main;

module Main {
    export interface IHeaderData {
        text?: string;
        classes?: string;
        hidden?: boolean;
    }

    export interface IHeader {
        text:KnockoutObservable<string>;
        classes: KnockoutObservable<string>;
        hidden: KnockoutObservable<boolean>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        headers?: Array<IHeaderData>;
        settings?: DataTables.Settings;
        metadata?: string;
    }

    export interface IViewModel extends Base.IViewModel {
        headers: KnockoutObservableArray<IHeader>;
        settings: KnockoutObservable<DataTables.Settings>;
        metadata: KnockoutObservable<string>
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        data: KnockoutObservable<any>;
        getDataUpdatePromise: () => JQueryPromise<void>;
    }

    export class Header implements IHeader {
        private _text: KnockoutObservable<string>;
        private _classes: KnockoutObservable<string>;
        private _hidden: KnockoutObservable<boolean>;

        constructor(data: IHeaderData = {}) {
            this._text = ko.observable(data.text || "");
            this._classes = ko.observable(data.classes || "");
            this._hidden = ko.observable(data.hidden || false);
        }

        public get text(): KnockoutObservable<string> {
            return this._text;
        }

        public get classes(): KnockoutObservable<string> {
            return this._classes;
        }

        public get hidden(): KnockoutObservable<boolean> {
            return this._hidden;
        }
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _headers: KnockoutObservableArray<IHeader>;
        private _settings: KnockoutObservable<DataTables.Settings>;
        private _metadata: KnockoutObservable<string>;

        constructor(data: IViewModelData = {}) {
            super(data);
            this._headers = ko.observableArray<Header>(Base.createFromDefaults(data.headers, Header));
            this._settings = ko.observable(data.settings || {});
            this._metadata = ko.observable(data.metadata || "");
        }

        public get headers(): KnockoutObservableArray<IHeader> {
            return this._headers
        }

        public get settings(): KnockoutObservable<DataTables.Settings> {
            return this._settings
        }

        public get metadata(): KnockoutObservable<string> {
            return this._metadata;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "table table--overflow";

        private _data: KnockoutObservable<any>;
        private _metadataElement: JQuery;
        private _dataUpdateDeferred: JQueryDeferred<void>;

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            this._data = ko.observable(this.viewModel.settings().data || {});
            this._dataUpdateDeferred = $.Deferred<void>();

            this.wrapDataTablesCallbacks();

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();

            ko.cleanNode(this._metadataElement[0]);
            $(this.element).DataTable().destroy();
        }

        public get data(): KnockoutObservable<any> {
            return this._data;
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public getDataUpdatePromise(): JQueryPromise<void> {
            if (this._dataUpdateDeferred.state() === "resolved") {
                this._dataUpdateDeferred = $.Deferred<void>();
            }

            return this._dataUpdateDeferred.promise();
        }

        public _setupElement(): void {
            super._addClass(Widget.widgetClass);
            super._setupElement();

            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();

            $(this.element).DataTable(this.viewModel.settings());

            this._initializeSubscriptions();
            super._initializeEvents();
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();

            this._subscriptions.push(
                this.viewModel.settings.subscribe((newSettings: DataTables.Settings) => {
                    $(this.element).DataTable().destroy();
                    $(this.element).DataTable(newSettings);
                }));

            this._subscriptions.push(this.data.subscribe((newData: any) => {
                let dataTable = $(this.element).DataTable();
                dataTable.clear();
                dataTable.rows.add(newData);
                dataTable.draw();
            }));
        }

        public _tableInitComplete(): void {
            this._metadataElement = $('<div data-bind="text: metadata">')
                .addClass(`dataTables_filter ${Config.Classes.TableMetadata}`);

            $(this.element).parent().find(".dataTables_filter").after(this._metadataElement);
            ko.applyBindings({ metadata: this.viewModel.metadata }, this._metadataElement[0]);
        }

        public _tableDrawComplete(): void {
            let wrapper = this.element.parent().parent();
            let pages = wrapper.find(".dataTables_paginate span a.paginate_button").length;
            let table = $(this.element).DataTable();

            // Clean up the UI if there are a few number of/no pages

            if (pages <= 1) {
                wrapper.find(".dataTables_paginate").hide();
            } else {
                wrapper.find(".dataTables_paginate").show();
            }

            this._dataUpdateDeferred.resolve();
        }

        private wrapDataTablesCallbacks(): void {
            let settings = this.viewModel.settings();
            let originalDrawCallback = settings.drawCallback;
            let originalInitCompleteCallback = settings.initComplete;

            settings.drawCallback = () => {
                if (originalDrawCallback) {
                    (<any>originalDrawCallback)();
                }

                this._tableDrawComplete();
            };

            settings.initComplete = () => {
                if (originalInitCompleteCallback) {
                    (<any>originalInitCompleteCallback)();
                }

                this._tableInitComplete();
            };

            this.viewModel.settings(settings);
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsTable = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}