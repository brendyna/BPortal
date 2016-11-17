import $ = require("jquery");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import Card = require("Areas/Shared/Controls/Card");
import Config = require("../Config");
import DefaultTemplate = require("../Templates/Views/PowerBiReportList.Template");
import ko = require("knockout");
import PowerBiReportListProvider = require("../Data/Providers/PowerBiReportList.Provider");
import ReportListRepository = require("../Data/Repositories/PowerBiReportList.Repository");
import Section = require("Areas/Shared/Controls/Section");

export = Main;

module Main {
    Section;
    Card;

    export interface IViewModelData extends Base.IViewModelData {
    }

    export interface IViewContext extends Base.IViewContext {
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        reportlistSection?: Section.IViewModelData;
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "view--reportlist";

        private _reportlistProvider: PowerBiReportListProvider.ReportListProvider;
        private _reportlistRepo: ReportListRepository.IRepository;
        private _reportlistStaticProvider: PowerBiReportListProvider.StaticProvider;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || DefaultTemplate;

            super(element, defaults, viewModelData);

            this._controlClasses = $.extend({
                reportlist: Config.Classes.ReportListSectionClass
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

        public get reportlistSection(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor("." + this.controlClasses["reportlist"]));
        }

        public loadData(): JQueryPromise<void> {
            this.initializeRepos();
            this.initializeLoading();
            this.loadRepos();

            return this._loadDeferred.promise();
        }

        public initializeRepos(): void {
            this._reportlistRepo = new ReportListRepository.Repository({});
        }

        public initializeLoading(): void {
            this.reportlistSection.vm.loading(true);
        }

        public loadRepos(): void {
            this._reportlistRepo.load().done(() => {
                this.applyReportListData();
            });

            $.when<any>(
                this._reportlistRepo.getPromise()
            )
            .done(() => {
                this._loadDeferred.resolve();
            });
        }

        public initializeSubscriptions(): void {
            // No-op (subscription initialization is split up based on repo loads)
        }

        public setStaticViewModelData(): void {
            this._reportlistStaticProvider = new PowerBiReportListProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._reportlistStaticProvider.getNavigationViewModelData(),
                header: this._reportlistStaticProvider.getHeaderViewModelData(),
                reportlistSection: this._reportlistStaticProvider.getReportListViewModelData()
            };
        }

        private applyReportListData(): void {
            this._reportlistProvider = new PowerBiReportListProvider.ReportListProvider(this._reportlistRepo);
            this.reportlistSection.vm.loading(false);
            this.reportlistSection.vm.subsections([this._reportlistProvider.getCardSubsection()]);
        }
    }
}