import $ = require("jquery");
import Base = require("Areas/Shared/Views/Base.View");
import BaseControl = require("Areas/Shared/Controls/Base");
import Button = require("Areas/Shared/Controls/Button");
import Config = require("../Config");
import CrawlProvider = require("../Data/Providers/CrawlScheduler.Provider");
import CrawlRepo = require("../Data/Repositories/CrawlScheduler.Repository");
import CrawlTemplate = require("../Templates/Views/CrawlScheduler.Template");
import DomUtil = require("Areas/Shared/Util/Dom");
import Input = require("Areas/Shared/Controls/Input");
import Note = require("Areas/Shared/Controls/Note");
import Section = require("Areas/Shared/Controls/Section");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    Section;
    Note;

    export interface IViewModelData extends Base.IViewModelData {
        crawlerSection?: Section.IViewModelData;
        crawlerStatus?: Note.IViewModelData;
    }

    export interface IViewContext extends Base.IViewContext {
    }

    export interface IWidgetDefaults extends Base.IWidgetDefaults {
        viewContext: IViewContext;
        viewModelData?: IViewModelData;
    }

    export interface IWidget extends Base.IWidget {
        crawlerSection: BaseControl.IControl<Section.IViewModel, Section.IWidget>;
        crawlerStatus: BaseControl.IControl<Note.IViewModel, Section.IWidget>;
    }

    export class Widget extends Base.Widget implements IWidget {
        public static widgetClass = "view--crawler";

        private _crawlRepo: CrawlRepo.IRepository;
        private _staticProvider: CrawlProvider.StaticProvider;

        constructor(element: JQuery, defaults: IWidgetDefaults, viewModelData: IViewModelData = {}) {
            defaults.template = defaults.template || CrawlTemplate;

            super(element, defaults, viewModelData);

            this._controlClasses = $.extend({
                crawlerStatus: Config.Classes.CrawlStatusSectionClass,
                crawlerSection: Config.Classes.CrawlSectionClass,
                scheduleButton: Config.Classes.ScheduleButtonClass,
                githubScriptUrl: Config.Classes.GithubScriptUrlClass,
                runType: Config.Classes.RunTypeClass,
                urlsToCrawl: Config.Classes.UrlsToCrawlClass
            }, this._controlClasses);

            this._controlIds = $.extend({
                chromeCheck: Config.Ids.ChromeCheck,
                edgeCheck: Config.Ids.EdgeCheck,
                firefoxCheck: Config.Ids.FirefoxCheck
            }, this._controlIds);

            this.setStaticViewModelData();
            this.element.addClass(Widget.widgetClass);

            if (!this._defaults.disableAutoRender) {
                super.render();
            }

            this.initializeRepos();
            this.initializeFormSubmit();
        }

        public destroy(): void {
            super.destroy();

            // Destroying repositories ensures active AJAX calls don't
            // return and execute code after the view is destroyed
            if (this._crawlRepo) {
                this._crawlRepo.destroy();
            }

            this.element.removeClass(Widget.widgetClass);
        }

        public get crawlerStatus(): BaseControl.IControl<Note.IViewModel, Note.IWidget> {
            return <BaseControl.IControl<Note.IViewModel, Note.IWidget>>
                (super.getDataFor(DomUtil.classify(this.controlClasses["crawlerStatus"])));
        }
        
        public get crawlerSection(): BaseControl.IControl<Section.IViewModel, Section.IWidget> {
            return <BaseControl.IControl<Section.IViewModel, Section.IWidget>>
                (super.getDataFor(DomUtil.classify(this.controlClasses["crawlerSection"])));
        }

        public get browserSelectSubsection(): CrawlProvider.IBrowserSelectViewModel {
            return this.crawlerSection.viewModel.subsections()[0].bodyViewModel();
        }

        public get githubUrlInput(): BaseControl.IControl<Input.IViewModel, Input.IWidget> {
            return <BaseControl.IControl<Input.IViewModel, Input.IWidget>>
                (super.getDataFor(DomUtil.classify(this.controlClasses["githubScriptUrl"])));
        }

        public get runTypeSelect(): BaseControl.IControl<Select.IViewModel, Select.IWidget> {
            return <BaseControl.IControl<Select.IViewModel, Select.IWidget>>
                (super.getDataFor(DomUtil.classify(this.controlClasses["runType"])));
        }

        public get scheduleButton(): BaseControl.IControl<Button.IViewModel, Button.IWidget> {
            return <BaseControl.IControl<Button.IViewModel, Button.IWidget>>
                (super.getDataFor(DomUtil.classify(this.controlClasses["scheduleButton"])));
        }

        public get urlsToCrawlInput(): BaseControl.IControl<Input.IViewModel, Input.IWidget> {
            return <BaseControl.IControl<Input.IViewModel, Input.IWidget>>
                (super.getDataFor(DomUtil.classify(this.controlClasses["urlsToCrawl"])));
        }

        public initializeRepos(): void {
            this._crawlRepo = new CrawlRepo.Repository({});
        }

        public initializeSubscriptions(): void {
        }

        public setStaticViewModelData(): void {
            this._staticProvider = new CrawlProvider.StaticProvider();

            this._staticViewModelData = <IViewModelData>{
                navigation: this._staticProvider.getNavigationViewModelData(),
                header: this._staticProvider.getHeaderViewModelData(),
                crawlerSection: this._staticProvider.getSectionViewModelData(),
                crawlerStatus: this._staticProvider.getNotificationViewModelData()
            }
        }

        private initializeFormSubmit(): void {
            this.scheduleButton.viewModel.clickCallback(() => {
                this.submitForm();
            });
        }

        private submitForm(): void {
            this._crawlRepo.settings.request.data = <CrawlRepo.CrawlSubmitParameters>{
                chromeSelected: this.browserSelectSubsection.chromeSelected(),
                edgeSelected: this.browserSelectSubsection.edgeSelected(),
                firefoxSelected: this.browserSelectSubsection.firefoxSelected(),
                runType: this.runTypeSelect.viewModel.value(),
                githubUrl: this.githubUrlInput.viewModel.value(),
                blobUrl: this.urlsToCrawlInput.viewModel.value()
            };

            this._crawlRepo.submit()
                .done((data: CrawlRepo.DataTransferObject) => {
                    if (data.status != null && data.status === "success") {
                        this.crawlerStatus.viewModel.type(Note.Type.Default);
                        this.crawlerStatus.viewModel.text(Config.Strings.ScheduleSuccess);
                    }
                    else {
                        this.crawlerStatus.viewModel.type(Note.Type.Error);
                        this.crawlerStatus.viewModel.text(Config.Strings.ScheduleError + " Exception: " + data.exception);
                    }

                    this.crawlerStatus.viewModel.visible(true);
                    setTimeout(() => {
                        this.crawlerStatus.viewModel.visible(false);
                    }, Config.Values.NotificationTimeout);
                })
                .fail(() => {
                    this.crawlerStatus.viewModel.type(Note.Type.Error);
                    this.crawlerStatus.viewModel.text(Config.Strings.ScheduleError);
                    this.crawlerStatus.viewModel.visible(true);
                    setTimeout(() => {
                        this.crawlerStatus.viewModel.visible(false);
                    }, Config.Values.NotificationTimeout);
                });
        }
    }
}