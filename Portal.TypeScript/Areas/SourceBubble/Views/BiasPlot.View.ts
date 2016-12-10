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
        sidebarSampleData?: Section.IViewModelData;
    }

    export interface IViewContext extends Base.IViewContext {
        params: IParams;
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        BiasPlotSection: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        sidebarSampleData: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "view--BiasPlot";

        private _BiasPlotRepo: BiasPlotRepo.IRepository;
        private _BiasPlotProvider: BiasPlotProvider.BiasPlotProvider;
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

            // Destroying repositories ensures active AJAX calls don't
            // return and execute code after the view is destroyed
            if (this._BiasPlotRepo) {
                this._BiasPlotRepo.destroy();
            }

            this.element.removeClass(Widget.widgetClass);
        }

        public get BiasPlotSection(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["BiasPlotSection"]));
        }

        public get sidebar(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["sidebar"]));
        }

        public get sidebarSampleData(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["sidebarSampleData"]));
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public initializeRepos(): void {
            this._BiasPlotRepo = new BiasPlotRepo.Repository(this.getRepoSettings());
        }

        public initializeLoading(): void {
            this.sidebarSampleData.viewModel.loading(true);
        }

        public loadRepos(): void {
            this._BiasPlotRepo.load().done(() => {
                this.applyBiasPlotData();
            });

            // There's a random bug here (remove the <any> and see the compiler error)
            $.when<any>(
                this._BiasPlotRepo.getPromise())
            .done(() => {
                this.initializeSubscriptions();
                this._loadDeferred.resolve();
            });
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

        private applyBiasPlotData(): void {
            this._BiasPlotProvider = new BiasPlotProvider.BiasPlotProvider(this._BiasPlotRepo);

            this.sidebarSampleData.viewModel.subsections.push(new Section.SubSection({
                header: "Result data",
                body: this._BiasPlotProvider.getResponseDataAsString()
            }));

            this.sidebarSampleData.viewModel.loading(false);
        }
    }
}