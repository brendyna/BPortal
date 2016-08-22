import $ = require("jquery");
import ko = require("knockout");
import Base = require("./Base");
import KnockoutUtil = require("../Util/Knockout");

export = Main;

module Main {
    export interface IViewModelData extends Base.IViewModelData {
        /**
         * String representing the prefix-less icon class name.
         * Use Icon.Type to easily discover available icon class names.
         */
        type?: string;
    }

    export interface IViewModel extends Base.IViewModel {
        /**
         * String representing the prefix-less icon class name.
         * Use Icon.Type to easily discover available icon class names.
         */
        type: KnockoutObservable<string>;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        viewModel: IViewModel;
    }

    export class Type {
        private static IconPrefix = "icon--";
        public static Accept = Type.IconPrefix + "accept";
        public static Add = Type.IconPrefix + "add";
        public static Articles = Type.IconPrefix + "articles";
        public static Asterisk = Type.IconPrefix + "asterisk";
        public static Back = Type.IconPrefix + "back";
        public static Blocked = Type.IconPrefix + "blocked";
        public static BrowserScreenshot = Type.IconPrefix + "browser-screenshot";
        public static Bug = Type.IconPrefix + "bug";
        public static Calendar = Type.IconPrefix + "calendar";
        public static Camera = Type.IconPrefix + "camera";
        public static Cancel = Type.IconPrefix + "cancel";
        public static Changed = Type.IconPrefix + "changed";
        public static ChangeLog = Type.IconPrefix + "changelog";
        public static Chart = Type.IconPrefix + "chart";
        public static Check = Type.IconPrefix + "check";
        public static ChevronDown = Type.IconPrefix + "chevron-down";
        public static ChevronLeft = Type.IconPrefix + "chevron-left";
        public static ChevronRight = Type.IconPrefix + "chevron-right";
        public static ChevronUp = Type.IconPrefix + "chevron-up";
        public static Clear = Type.IconPrefix + "clear";
        public static Code = Type.IconPrefix + "code";
        public static CSS = Type.IconPrefix + "css";
        public static Delete = Type.IconPrefix + "delete";
        public static Deprecated = Type.IconPrefix + "deprecated";
        public static Device = Type.IconPrefix + "device";
        public static Dislike = Type.IconPrefix + "dislike";
        public static Document = Type.IconPrefix + "document";
        public static Documentation = Type.IconPrefix + "documentation";
        public static Dom = Type.IconPrefix + "dom";
        public static Down = Type.IconPrefix + "down";
        public static Download = Type.IconPrefix + "download";
        public static Edit = Type.IconPrefix + "edit";
        public static EditMirrored = Type.IconPrefix + "edit-mirrored";
        public static Error = Type.IconPrefix + "error";
        public static F12DevTools = Type.IconPrefix + "f12-dev-tools";
        public static FAQ = Type.IconPrefix + "faq";
        public static FavoriteStar = Type.IconPrefix + "favorite-star";
        public static FavoriteStarFill = Type.IconPrefix + "favorite-star-fill";
        public static FeatureRequest = Type.IconPrefix + "feature-request";
        public static FeedbackApp = Type.IconPrefix + "feedback-app";
        public static FileAPIs = Type.IconPrefix + "fileapis";
        public static Filter = Type.IconPrefix + "filter";
        public static Filters = Type.IconPrefix + "filters";
        public static Fixed = Type.IconPrefix + "fixed";
        public static Flag = Type.IconPrefix + "flag";
        public static Forward = Type.IconPrefix + "forward";
        public static GlobalNavButton = Type.IconPrefix + "global-nav-button";
        public static Graphics = Type.IconPrefix + "graphics";
        public static Health = Type.IconPrefix + "health";
        public static Help = Type.IconPrefix + "help";
        public static HelpMirrored = Type.IconPrefix + "help-mirrored";
        public static History = Type.IconPrefix + "history";
        public static Info = Type.IconPrefix + "info";
        public static Input = Type.IconPrefix + "input";
        public static Interop = Type.IconPrefix + "interop";
        public static Issues = Type.IconPrefix + "issues";
        public static JavaScript = Type.IconPrefix + "javascript";
        public static JS = Type.IconPrefix + "js";
        public static Like = Type.IconPrefix + "like";
        public static LikeDislike = Type.IconPrefix + "like-dislike";
        public static Link = Type.IconPrefix + "link";
        public static Lock = Type.IconPrefix + "lock";
        public static Mail = Type.IconPrefix + "mail";
        public static Media = Type.IconPrefix + "media";
        public static Message = Type.IconPrefix + "message";
        public static Microphone = Type.IconPrefix + "microphone";
        public static Misc = Type.IconPrefix + "misc";
        public static More = Type.IconPrefix + "more";
        public static Multimedia = Type.IconPrefix + "multimedia";
        public static NetworkConnectivity = Type.IconPrefix + "networkconnectivity";
        public static New = Type.IconPrefix + "new";
        public static News = Type.IconPrefix + "news";
        public static OfflineStorage = Type.IconPrefix + "offline-storage";
        public static OpenSource = Type.IconPrefix + "open-source";
        public static Page = Type.IconPrefix + "page";
        public static Pause = Type.IconPrefix + "pause";
        public static People = Type.IconPrefix + "people";
        public static Performance = Type.IconPrefix + "performance";
        public static PersonalFinance = Type.IconPrefix + "personal-finance";
        public static Play = Type.IconPrefix + "play";
        public static QuickNote = Type.IconPrefix + "quick-note";
        public static RealTimeCommunication = Type.IconPrefix + "realtimecommunication";
        public static Recent = Type.IconPrefix + "recent";
        public static Refresh = Type.IconPrefix + "refresh";
        public static Remote = Type.IconPrefix + "remote";
        public static Remove = Type.IconPrefix + "remove";
        public static Repair = Type.IconPrefix + "repair";
        public static Sad = Type.IconPrefix + "sad";
        public static Scan = Type.IconPrefix + "scan";
        public static Search = Type.IconPrefix + "search";
        public static Security = Type.IconPrefix + "security";
        public static Settings = Type.IconPrefix + "settings";
        public static Share = Type.IconPrefix + "share";
        public static SiteScan = Type.IconPrefix + "site-scan";
        public static Stop = Type.IconPrefix + "stop";
        public static Success = Type.IconPrefix + "success";
        public static Switch = Type.IconPrefix + "switch";
        public static Sync = Type.IconPrefix + "sync";
        public static Tag = Type.IconPrefix + "tag";
        public static Touch = Type.IconPrefix + "touch";
        public static Trackers = Type.IconPrefix + "trackers";
        public static Unknown = Type.IconPrefix + "unknown";
        public static Up = Type.IconPrefix + "up";
        public static Upload = Type.IconPrefix + "upload";
        public static UserInput = Type.IconPrefix + "userinput";
        public static Video = Type.IconPrefix + "video";
        public static VirtualMachine = Type.IconPrefix + "virtual-machine";
        public static Volume = Type.IconPrefix + "volume";
        public static WebComponents = Type.IconPrefix + "webcomponents";
        public static Zoom = Type.IconPrefix + "zoom";
        public static ZoomOut = Type.IconPrefix + "zoom-out";
    }

    export class ViewModel extends Base.ViewModel implements IViewModel {
        private _type: KnockoutObservable<string>;

        constructor(data: IViewModelData = {}) {
            super(data);

            this._type = ko.observable(data.type || "");
        }

        public get type(): KnockoutObservable<string> {
            return this._type;
        }
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "icon";

        constructor(element: JQuery, defaults?: IWidgetDefaults | IViewModelData) {
            super(element, ViewModel, Widget.resolveDefaults(defaults));

            // Icon is an inline element which uses the element its bound to
            // as the template
            this._template = "";

            this._setupElement();
        }

        public destroy(): void {
            super.destroy();
        }

        public get viewModel(): IViewModel {
            return <IViewModel>this._viewModel;
        }

        public _setupElement(): void {
            super._addClass(this.viewModel.type());
            super._addClass(Widget.widgetClass);

            super._setupElement();

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
    ko.bindingHandlers.wpsIcon = {
        init: function (element: Element, valueAccessor: () => Base.IWidgetDefaults, allBindings: any, viewModel, bindingContext) {
            return KnockoutUtil.handleCustomBinding(element, Widget, valueAccessor, bindingContext);
        }
    };
}