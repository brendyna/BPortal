import $ = require("jquery");
import Base = require("./Base");
import Config = require("../Config");
import DefaultTemplate = require("../Templates/Controls/Card.Template");
import DomUtil = require("../Util/Dom");
import KnockoutUtil = require("../Util/Knockout");
import ko = require("knockout");

export = Main;

module Main {
    export enum TargetType {
        Blank = 1,
        Parent,
        Self,
        Top
    }

    export interface IViewModelData extends Base.IViewModelData {
        body?: string;
        bodyViewModel?: any;
        image?: string;
        imageAlt?: string;
        imageLink?: string;
        imageLinkTarget?: TargetType;
        title?: string;
        titleLink?: string;
        titleLinkTarget?: TargetType;
        titleTooltip?: string;
    }

    export interface IViewModel extends Base.IViewModel {
        body: KnockoutObservable<string>;
        bodyViewModel: KnockoutObservable<any>;
        image: KnockoutObservable<string>;
        imageAlt: KnockoutObservable<string>;
        imageLink: KnockoutObservable<string>;
        imageLinkTarget: KnockoutObservable<TargetType>;
        title: KnockoutObservable<string>;
        titleLink: KnockoutObservable<string>;
        titleLinkTarget: KnockoutObservable<TargetType>;
        titleTooltip: KnockoutObservable<string>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _body: KnockoutObservable<string>;
        private _bodyViewModel: KnockoutObservable<any>;
        private _image: KnockoutObservable<string>;
        private _imageAlt: KnockoutObservable<string>;
        private _imageLink: KnockoutObservable<string>;
        private _imageLinkTarget: KnockoutObservable<TargetType>;
        private _title: KnockoutObservable<string>;
        private _titleLink: KnockoutObservable<string>;
        private _titleLinkTarget: KnockoutObservable<TargetType>;
        private _titleTooltip: KnockoutObservable<string>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._body = ko.observable(data.body || "");
            this._bodyViewModel = ko.observable(data.bodyViewModel || {});
            this._image = ko.observable(data.image || "");
            this._imageAlt = ko.observable(data.imageAlt || "");
            this._imageLink = ko.observable(data.imageLink || "");
            this._imageLinkTarget = ko.observable(data.imageLinkTarget || TargetType.Self);
            this._title = ko.observable(data.title || "");
            this._titleLink = ko.observable(data.titleLink || "");
            this._titleLinkTarget = ko.observable(data.titleLinkTarget || TargetType.Self);
            this._titleTooltip = ko.observable(data.titleTooltip || "");
        }

        public get body(): KnockoutObservable<string> {
            return this._body;
        }

        public get bodyViewModel(): KnockoutObservable<string> {
            return this._bodyViewModel;
        }

        public get image(): KnockoutObservable<string> {
            return this._image;
        }

        public get imageAlt(): KnockoutObservable<string> {
            return this._imageAlt;
        }

        public get imageLink(): KnockoutObservable<string> {
            return this._imageLink;
        }

        public get imageLinkTarget(): KnockoutObservable<TargetType> {
            return this._imageLinkTarget;
        }

        public get title(): KnockoutObservable<string> {
            return this._title;
        }

        public get titleLink(): KnockoutObservable<string> {
            return this._titleLink;
        }

        public get titleLinkTarget(): KnockoutObservable<TargetType> {
            return this._titleLinkTarget;
        }

        public get titleTooltip(): KnockoutObservable<string> {
            return this._titleTooltip;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "module module--image-card card";

        private _targetTypeMap: IDictionary<string>;
        private _imageLinkTarget: KnockoutComputed<string>;
        private _titleLinkTarget: KnockoutComputed<string>;

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults, DefaultTemplate));

            this._targetTypeMap = {};
            this._targetTypeMap[TargetType.Self] = "_self";
            this._targetTypeMap[TargetType.Blank] = "_blank";
            this._targetTypeMap[TargetType.Top] = "_top";
            this._targetTypeMap[TargetType.Parent] = "_parent";

            this._imageLinkTarget = ko.computed((): string => {
                return this._getTargetString(this.viewModel.imageLinkTarget());
            }, this, { deferEvaluation: true, pure: true });

            this._titleLinkTarget = ko.computed((): string => {
                return this._getTargetString(this.viewModel.titleLinkTarget());
            }, this, { deferEvaluation: true, pure: true });

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();

            this._imageLinkTarget.dispose();
            this._titleLinkTarget.dispose();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _getTargetString(type: TargetType): string {
            return this._targetTypeMap[type];
        }

        public _setupElement(): void {
            super._setupElement();

            super._addClass(Widget.widgetClass);

            this._applyBindings();
        }

        public _applyBindings(): void {
            super._applyBindings();

            this._initializeSubscriptions();
            super._initializeEvents();
        }

        public _initializeSubscriptions(): void {
            super._initializeSubscriptions();

            this._subscriptions.push(this.viewModel.body.subscribe((newBody: string) => {
                let body = this.element.find(DomUtil.classify(Config.Classes.CardBody));
                body.attr("data-bind", "html: vm.body, customViewModel: vm.bodyViewModel");
                ko.cleanNode(body[0]);
                ko.applyBindings({ vm: this.viewModel }, body[0]);
            }));
        }
    }

    /**
     * Custom binding handler enables us to nest controls and invoke their widgets
     * view view models only.
     */
    ko.bindingHandlers.wpsCard = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}