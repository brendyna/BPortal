import Base = require("./Base");
import DefaultTemplate = require("../Templates/Controls/Accordion.Template");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export interface IGroupData {
        body?: string;
        bodyViewModel?: any;
        expanded?: boolean;
        title?: string;
    }

    export interface IGroup {
        body: KnockoutObservable<string>;
        bodyViewModel: KnockoutObservable<any>;
        expanded: KnockoutObservable<boolean>;
        title: KnockoutObservable<string>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        groups?: Array<IGroupData>;
    }

    export interface IViewModel extends Base.IViewModel {
        groups: KnockoutObservableArray<IGroup>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        viewModel: IViewModel;
    }

    export class Group implements IGroup {
        private _body: KnockoutObservable<string>;
        private _bodyViewModel: KnockoutObservable<any>;
        private _expanded: KnockoutObservable<boolean>;
        private _title: KnockoutObservable<string>;

        constructor(data: IGroupData = {}) {
            this._body = ko.observable(data.body || "");
            this._bodyViewModel = ko.observable(data.bodyViewModel || {});
            this._expanded = ko.observable(data.expanded || false);
            this._title = ko.observable(data.title || "");
        }

        public get expanded(): KnockoutObservable<boolean> {
            return this._expanded;
        }

        public get body(): KnockoutObservable<string> {
            return this._body;
        }

        public get bodyViewModel(): KnockoutObservable<any> {
            return this._bodyViewModel;
        }

        public get title(): KnockoutObservable<string> {
            return this._title;
        }
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _groups: KnockoutObservableArray<IGroup>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._groups = ko.observableArray<IGroup>(Base.createFromDefaults(data.groups, Group));
        }

        public get groups(): KnockoutObservableArray<IGroup> {
            return this._groups;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "accordion";

        constructor(element: JQuery, defaults?: IWidgetDefaults) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();

            this.element.off("click keydown", "summary");
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
            super._applyBindings();
            this._initializeSubscriptions();
            this._initializeEvents();
        }

        public _initializeEvents(): void {
            super._initializeEvents();

            this.element.on("click keydown", "summary", (e: JQueryEventObject) => {
                this.toggleGroup(e, e.target || e.srcElement);
            });
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();
        }

        private toggleGroup(e: JQueryEventObject, target: Element): void {
            let keydown = e.type === 'keydown';
            let key = keydown && (e.which || e.keyCode);
            let parent = target.parentElement;
            let groupVM: IGroup;

            // Space (32) or Enter (13) to expand/collapse
            if (keydown && (key !== 32 && key !== 13)) {
                return;
            }

            groupVM = ko.dataFor(parent);
            groupVM.expanded(!groupVM.expanded());

            e.preventDefault();
        };
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsAccordion = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}