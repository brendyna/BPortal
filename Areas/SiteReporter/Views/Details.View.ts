import $ = require("jquery");
import ko = require("knockout");
import Header = require("Areas/Shared/Controls/Header");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");

import DefaultTemplate = require("../Templates/Views/Details.Template");

export = Main;

module Main {
    Header;
    Navigation;
    Section;

    export interface Control<VM, W> {
        vm: VM;
        widget: W;
    }

    export interface IViewModelData {
        navigation?: Navigation.IViewModelData;
        header: Header.IViewModelData;
        sidebar: Section.IViewModelData;
        bugs: Section.IViewModelData;
        trends: Section.IViewModelData;
        tech: Section.IViewModelData;
    }

    export interface IWidgetDefaults {
        viewModelData: IViewModelData;
        template?: string;
    }

    export interface IWidget {
        element: JQuery;
        defaults: IWidgetDefaults;
        navigation: Control<Navigation.IViewModel, Navigation.IWidget>;
        header: Control<Header.IViewModel, Header.IWidget>;
        sidebar: Control<Section.IViewModel, Section.IWidget>;
        bugs: Control<Section.IViewModel, Section.IWidget>;
        trends: Control<Section.IViewModel, Section.IWidget>;
        tech: Control<Section.IViewModel, Section.IWidget>;
    }

    export class Widget implements IWidget {
        public static controlIds = {
            navigation: "details-navigation",
            header: "details-header",
            sidebar: "details-sidebar",
            bugs: "details-bugs",
            trends: "details-trends",
            tech: "details-tech"
        };

        private _element: JQuery;
        private _defaults: IWidgetDefaults;

        constructor(element: JQuery, defaults: IWidgetDefaults | IViewModelData) {
            if (!(<IWidgetDefaults>defaults).viewModelData) {
                defaults = <IWidgetDefaults>{ viewModelData: defaults };
            }

            this._element = element;
            this._defaults = <IWidgetDefaults>defaults;

            this._defaults.template = this._defaults.template || DefaultTemplate;

            this.element.html(this._defaults.template);

            ko.applyBindings({ vm: this._defaults.viewModelData, widget: this }, this._element[0]);
        }

        public get defaults(): IWidgetDefaults {
            return this._defaults;
        }

        public get element(): JQuery {
            return this._element;
        }

        public get header(): Control<Header.IViewModel, Header.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.header)[0]);
        }

        public get navigation(): Control<Navigation.IViewModel, Navigation.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.navigation)[0]);
        }

        public get sidebar(): Control<Section.IViewModel, Section.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.sidebar)[0]);
        }

        public get bugs(): Control<Section.IViewModel, Section.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.bugs)[0]);
        }

        public get tech(): Control<Section.IViewModel, Section.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.tech)[0]);
        }

        public get trends(): Control<Section.IViewModel, Section.IWidget> {
            return ko.dataFor(this._element.find("#" + Widget.controlIds.trends)[0]);
        }
    }
}