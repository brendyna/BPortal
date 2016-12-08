import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import Button = require("Areas/Shared/Controls/Button");
import Config = require("../../Config");
import CrawlRepo = require("../Repositories/CrawlScheduler.Repository");
import Header = require("Areas/Shared/Controls/Header");
import Icon = require("Areas/Shared/Controls/Icon");
import Input = require("Areas/Shared/Controls/Input");
import ko = require("knockout");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Note = require("Areas/Shared/Controls/Note");
import Section = require("Areas/Shared/Controls/Section");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    Header;
    Navigation;
    Section;
    Button;
    Input;
    Select;
    Note;

    export interface IBrowserSelectViewModelData {
        chromeSelected: boolean;
        edgeSelected: boolean;
        firefoxSelected: boolean;
    }

    export interface IBrowserSelectViewModel {
        chromeSelected: KnockoutObservable<boolean>;
        edgeSelected: KnockoutObservable<boolean>;
        firefoxSelected: KnockoutObservable<boolean>;
    }

    export interface IRunParametersViewModelData {
        blobUrl: Input.IViewModelData;
        githubUrl: Input.IViewModelData;
        runType: Select.IViewModelData;
    }

    export interface IStaticProvider {
        getNavigationViewModelData: () => Navigation.IViewModelData;
        getHeaderViewModelData: () => Header.IViewModelData;
        getSectionViewModelData: () => Section.IViewModelData;
        getNotificationViewModelData: () => Note.IViewModelData;
    }

    export class StaticProvider implements IStaticProvider {
        constructor() {
        }

        public getNavigationViewModelData(): Navigation.IViewModelData {
            let navViewModelData: Navigation.IViewModelData = {
                breadcrumb: <Array<Navigation.ICrumbData>>Config.Window.CrawlerBreadcrumb
            };

            return navViewModelData;
        }

        public getHeaderViewModelData(): Header.IViewModelData {
            let headerViewModelData: Header.IViewModelData = {
                title: Config.Strings.HeaderTitle
            };

            return headerViewModelData;
        }

        public getNotificationViewModelData(): Note.IViewModelData {
            let crawlNotificationSectionData = <Note.IViewModelData>{
                classes: Config.Classes.CrawlStatusSectionClass,
                visible: false
            }
            return crawlNotificationSectionData;
        };

        public getSectionViewModelData(): Section.IViewModelData {
            let crawlSectionData = <Section.IViewModelData>{
                classes: Config.Classes.CrawlSectionClass,
                title: Config.Strings.SectionTitle,
                subsections: [
                    {
                        body: `<fieldset class="${Config.Classes.FieldsetClass}"><legend>${Config.Strings.FieldsetTitle}</legend>
                                <input id="${Config.Ids.EdgeCheck}" type="checkbox" data-bind="checked: viewModel.edgeSelected" /> <label for="${Config.Ids.EdgeCheck}">Edge</label>
                                <input id="${Config.Ids.ChromeCheck}" type="checkbox" data-bind="checked: viewModel.chromeSelected" /> <label for="${Config.Ids.ChromeCheck}">Chrome</label>
                                <input id="${Config.Ids.FirefoxCheck}" type="checkbox" data-bind="checked: viewModel.firefoxSelected" /> <label for="${Config.Ids.FirefoxCheck}">Firefox</label></fieldset>`,
                        bodyViewModel: <IBrowserSelectViewModel>{
                            edgeSelected: ko.observable(false),
                            chromeSelected: ko.observable(false),
                            firefoxSelected: ko.observable(false)
                        }
                    },
                    {
                        body: `<select data-bind="wpsSelect: viewModel.runType"></select> <br/>
                               <input data-bind="wpsInput: viewModel.githubUrl" /> <span title="${Config.Strings.GithubToolTip}" data-bind="wpsIcon: viewModel.scriptIcon" style="cursor:pointer"></span> <br/>
                               <input data-bind="wpsInput: viewModel.blobUrl" /> <span title="${Config.Strings.UrlToolTip}" data-bind="wpsIcon: viewModel.urlIcon" style="cursor:pointer"></span>`,
                        bodyViewModel: <IRunParametersViewModelData>{
                            runType: <Select.IViewModelData>{
                                classes: Config.Classes.RunTypeClass,
                                name: Config.Strings.RunName,
                                label: Config.Strings.RunLabel,
                                options: [
                                    { text: Config.Strings.RunCssOption, value: "cssUsage" },
                                    { text: Config.Strings.RunRecipeOption, value: "recipe" }
                                ]
                            },
                            githubUrl: <Input.IViewModelData>{
                                type: Input.Type.Url,
                                classes: Config.Classes.GithubScriptUrlClass,
                                placeholder: Config.Strings.GithubPlaceholder
                            },
                            blobUrl: <Input.IViewModelData>{
                                type: Input.Type.Url,
                                classes: Config.Classes.UrlsToCrawlClass,
                                placeholder: Config.Strings.UrlPlaceholder
                            },
                            scriptIcon: {
                                type: Icon.Type.Help
                            },
                            urlIcon: {
                                type: Icon.Type.Help
                            }
                        }
                    },
                    {
                        body: `<button data-bind="wpsButton: viewModel.scheduleButton"></button>`,
                        bodyViewModel: {
                            scheduleButton:<Button.IViewModelData>{
                                classes: Config.Classes.ScheduleButtonClass,
                                text: Config.Strings.ScheduleButton,
                                title: Config.Strings.ScheduleButton
                            }
                        }
                    }
                ]
            };

            return crawlSectionData;
        }
    }
}