import $ = require("jquery");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import Config = require("../Config");
import ExampleProvider = require("../Data/Providers/Example.Provider");
import ExampleRepo = require("../Data/Repositories/Example.Repository");
import ExampleTemplate = require("../Templates/Views/Example.Template");
import Section = require("Areas/Shared/Controls/Section");

export = Main;

module Main {
    Section;

    export interface IParams extends Base.IParams {
        foo: string;
    }

    export interface IViewModelData extends Base.IViewModelData {
        exampleSection?: Section.IViewModelData;
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
        exampleSection: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        sidebar: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        sidebarSampleData: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "view--example";

        private _exampleRepo: ExampleRepo.IRepository;
        private _exampleProvider: ExampleProvider.ExampleProvider;
        private _staticProvider: ExampleProvider.StaticProvider;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || ExampleTemplate;

            super(element, defaults, viewModelData);

            this._controlIds = $.extend({
                exampleSection: "example",
                sidebar: "sidebar",
                sidebarSampleData: "sidebar--sample-data"
            }, this._controlIds);

            this._controlClasses = $.extend({
                exampleSection: "example"
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
            if (this._exampleRepo) {
                this._exampleRepo.destroy();
            }

            this.element.removeClass(Widget.widgetClass);
        }

        public get exampleSection(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("#" + this.controlIds["exampleSection"]));
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
            this._exampleRepo = new ExampleRepo.Repository(this.getRepoSettings());
        }

        public initializeLoading(): void {
            this.sidebarSampleData.viewModel.loading(true);
        }

        public loadRepos(): void {
            this._exampleRepo.load().done(() => {
                this.applyExampleData();
            });

            // There's a random bug here (remove the <any> and see the compiler error)
            $.when<any>(
                this._exampleRepo.getPromise())
            .done(() => {
                this.initializeSubscriptions();
                this._loadDeferred.resolve();
            });
        }

        public initializeSubscriptions(): void {
        }

        public setStaticViewModelData(): void {
            this._staticProvider = new ExampleProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._staticProvider.getNavigationViewModelData(),
                header: this._staticProvider.getHeaderViewModelData(),
                sidebar: this._staticProvider.getSidebarSectionViewModelData(),
                sidebarSampleData: this._staticProvider.getSidebarSampleDataSectionViewModelData(),
                exampleSection: this._staticProvider.getExampleSectionViewModelData()
            }
        }

        private getRepoSettings(): {} {
            return {
                request: {
                    data: $.extend({}, this.defaults.viewContext.params)
                }
            };
        }

        private applyExampleData(): void {
            this._exampleProvider = new ExampleProvider.ExampleProvider(this._exampleRepo);

            this.sidebarSampleData.viewModel.subsections.push(new Section.SubSection({
                header: "Result data",
                body: this._exampleProvider.getResponseDataAsString()
            }));

            this.sidebarSampleData.viewModel.loading(false);
        }
    }
}