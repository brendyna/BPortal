import $ = require("jquery");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import Config = require("../Config");
import BiasPlotProvider = require("../Data/Providers/BiasPlot.Provider");
import BiasPlotRepo = require("../Data/Repositories/BiasPlot.Repository");
import BiasPlotTemplate = require("../Templates/Views/BiasPlot.Template");
import Section = require("Areas/Shared/Controls/Section");

export = Main;

module Main {
    Section;

    export interface IParams extends Base.IParams {
        foo: string;
    }

    export interface IViewModelData extends Base.IViewModelData {
        BiasPlotSection?: Section.IViewModelData;
        sidebar?: Section.IViewModelData;
    }

    export interface IViewContext extends Base.IViewContext {
        params: IParams;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        biasPlotSection: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "view--BiasPlot";

        private _biasPlotRepo: BiasPlotRepo.IRepository;
        private _biasPlotProvider: BiasPlotProvider.BiasPlotProvider;
        private _staticProvider: BiasPlotProvider.StaticProvider;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || BiasPlotTemplate;

            super(element, defaults, viewModelData);

            this._controlIds = $.extend({
                BiasPlotSection: "BiasPlot",
                sidebar: "sidebar",
                sidebarSampleData: "sidebar--sample-data"
            }, this._controlIds);

            this._controlClasses = $.extend({
                BiasPlotSection: "BiasPlot"
            }, this._controlClasses);

            this.setStaticViewModelData();
            this.element.addClass(Widget.widgetClass);

            if (!this._defaults.disableAutoRender) {
                super.render();

                if (!this._defaults.disableAutoLoad && this.disabledPlaceholder() === "") {
                    this.loadData();
                }
            }
        }

        public destroy(): void {
            super.destroy();

            this.element.removeClass(Widget.widgetClass);
        }

        public get biasPlotSection(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["BiasPlotSection"]));
        }

        public get sidebar(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["sidebar"]));
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public initializeRepos(): void {
        }

        public initializeLoading(): void {
        }

        public loadRepos(): void {
        }

        public initializeSubscriptions(): void {
        }

        public setStaticViewModelData(): void {
            this._staticProvider = new BiasPlotProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._staticProvider.getNavigationViewModelData(),
                header: this._staticProvider.getHeaderViewModelData(),
                sidebar: this._staticProvider.getSidebarSectionViewModelData(),
                biasPlotSection: this._staticProvider.getBiasPlotSectionViewModelData()
            }
        }

        private getRepoSettings(): {} {
            return {
                request: {
                    data: $.extend({}, this.defaults.viewContext.params)
                }
            };
        }
    }
}