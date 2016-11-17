import Base = require("Areas/Shared/Controls/Base");
import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import Button = require("Areas/Shared/Controls/Button");
import Card = require("Areas/Shared/Controls/Card");
import Config = require("../../Config");
import Header = require("Areas/Shared/Controls/Header");
import Navigation = require("Areas/Shared/Controls/Navigation");
import ReportListRepository = require("../Repositories/PowerBiReportList.Repository");
import Section = require("Areas/Shared/Controls/Section");

export = Main;

module Main {
    Header;
    Section;
    Card;
    Button;

    export interface IStaticProvider {
        getNavigationViewModelData: () => Navigation.IViewModelData;
        getHeaderViewModelData: () => Header.IViewModelData;
        getReportListViewModelData: () => Section.IViewModelData;
    }

    export interface IDynamicProvider extends BaseProvider.IDynamicProvider {
    }

    export class StaticProvider implements IStaticProvider {
        constructor() {
        }

        public getNavigationViewModelData(): Navigation.IViewModelData {
            let navViewModelData: Navigation.IViewModelData = {
                breadcrumb: <Array<Navigation.ICrumbData>>Config.Window.PowerBiReportListBreadcrumb
            };

            return navViewModelData;
        }

        public getHeaderViewModelData(): Header.IViewModelData {
            let headerViewModelData: Header.IViewModelData = {
                title: Config.Strings.ReportListTitle
            };

            return headerViewModelData;
        }

        public getReportListViewModelData(): Section.IViewModelData {
            return {
                altHeader: true,
                classes: Config.Classes.ReportListSectionClass,
                body: `
                    <button data-bind="wpsButton: $vm.buttonViewModel"></button>
                `,
                bodyViewModel: {
                    buttonViewModel:
                    <Button.IViewModelData>{
                        classes: Config.Classes.ImportPbixButtonClass,
                        text: Config.Strings.ImportPbixFileButton,
                        title: Config.Strings.ImportPbixFileButton,
                        type: Button.Type.Basic,
                        clickCallback: () => { window.open(Config.Urls.ImportUtilityUrl) }
                    }
                }
            };
        }
    }

    export class ReportListProvider extends BaseProvider.DynamicProvider<ReportListRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: ReportListRepository.IRepository) {
            super(repository);
        }

        public getCardSubsection(): Section.ISubSection {
            let cardlist: Array<Card.IViewModelData> = [];

            if (this.repository.resultData) {
                this.repository.resultData.forEach((report: ReportListRepository.PowerBiReport) => {
                    cardlist.push(
                        {
                            classes: Config.Classes.ReportCardClass,
                            title: report.name,
                            titleLink: `${Config.Urls.PowerBiReportsReportUrl}${report.id}`,
                            titleLinkTarget: Card.TargetType.Blank,
                            body: `${report.description} <br/><br/> Contact: <a class="${Config.Classes.ReportCardContactClass}" href="mailto:${report.contact}@microsoft.com">${report.contact}</a>`
                        }
                    );
                });
            }

            let subSection = <Section.ISubSectionData>{
                body: `
                    <div class="layout layout--thirds">
                        <!-- ko ifnot: $vm.cards.length > 0 -->
                            <span>${Config.Strings.ReportListEmptyMessage}</span>
                        <!-- /ko -->
                        <!-- ko if: $vm.cards.length > 0 -->
                            <!-- ko foreach: $vm.cards -->
                                <div data-bind="wpsCard: $data"></div>
                            <!-- /ko -->
                        <!-- /ko -->
                    </div>
                `,
                anchor: "",
                bodyViewModel: {
                    cards: cardlist
                }
            }

            return Base.createFromDefaults(subSection, Section.SubSection)[0];
        }
    }
}