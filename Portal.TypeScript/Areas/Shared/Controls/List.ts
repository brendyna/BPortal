import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

import DefaultTemplate = require("../Templates/Controls/List.Template");

export = Main;

window.ko = ko;

module Main {
    export enum Type {
        Basic,
        Links,
        Icons,
        SiteSectionLinks,
        Avatars,
        Bios
    }

    export interface IItemData {
        classes?: string;
        content?: string;
    }

    export interface IItem {
        classes: KnockoutObservable<string>;
        content: KnockoutObservable<string>;
    }

    export interface IViewModelData extends Base.IViewModelData {
        type?: Type;
        items?: Array<IItemData>;
    }

    export interface IViewModel extends Base.IViewModel {
        type: KnockoutObservable<Type>;
        items: KnockoutObservableArray<IItem>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        viewModel: IViewModel;
    }

    export class Item implements IItem {
        private _classes: KnockoutObservable<string>;
        private _content: KnockoutObservable<string>;

        constructor(data: IItemData = {}) {
            this._classes = ko.observable(data.classes || "");
            this._content = ko.observable<string>(data.content || "");
        }

        public get classes(): KnockoutObservable<string> {
            return this._classes;
        }

        public get content(): KnockoutObservable<string> {
            return this._content;
        }
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _type: KnockoutObservable<Type>;
        private _items: KnockoutObservableArray<IItem>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._type = ko.observable(data.type || Type.Basic);
            this._items = ko.observableArray<Item>(
                Base.createFromDefaults(data.items, Item));
        }

        public get items(): KnockoutObservableArray<IItem> {
            return this._items;
        }

        public get type(): KnockoutObservable<Type> {
            return this._type;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "list";
        public static widgetLinksListClass = "list--links";
        public static widgetIconsListClass = "list--icons";
        public static widgetSiteSectionLinksListClass = "list--site-section-links";
        public static widgetAvatarsListClass = "list--avatars";
        public static widgetBiosListClass = "list--bios";

        _linksList: KnockoutComputed<boolean>;
        _iconsList: KnockoutComputed<boolean>;
        _siteSectionLinksList: KnockoutComputed<boolean>;
        _avatarsList: KnockoutComputed<boolean>;
        _biosList: KnockoutComputed<boolean>;

        constructor(element: JQuery, defaults: IWidgetDefaults | IViewModelData = {}) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            this._linksList = ko.computed(() => {
                return this.viewModel.type() === Type.Links;
            });

            this._iconsList = ko.computed(() => {
                return this.viewModel.type() === Type.Icons;
            });

            this._siteSectionLinksList = ko.computed(() => {
                return this.viewModel.type() === Type.SiteSectionLinks;
            });

            this._avatarsList = ko.computed(() => {
                return this.viewModel.type() === Type.Avatars;
            });

            this._biosList = ko.computed(() => {
                return this.viewModel.type() === Type.Bios;
            });

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addBinding("css", "'" + Widget.widgetLinksListClass + "': widget._linksList");
            super._addBinding("css", "'" + Widget.widgetIconsListClass + "': widget._iconsList");
            super._addBinding("css", "'" + Widget.widgetSiteSectionLinksListClass + "': widget._siteSectionLinksList");
            super._addBinding("css", "'" + Widget.widgetAvatarsListClass + "': widget._avatarsList");
            super._addBinding("css", "'" + Widget.widgetBiosListClass + "': widget._biosList");

            super._setupElement();

            super._addClass(Widget.widgetClass);

            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();

            super._initializeSubscriptions();
            super._initializeEvents();
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsList = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}