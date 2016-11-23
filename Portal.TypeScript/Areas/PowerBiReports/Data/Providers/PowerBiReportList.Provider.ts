import Accordion = require("Areas/Shared/Controls/Accordion");
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
    Accordion;
    Button;
    Card;
    Header;
    Section;

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
                    <button data-bind="wpsButton: viewModel.buttonViewModel"></button>
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

        public getReportSubsection(reportList: Array<ReportListRepository.PowerBiReport>): Array<Card.IViewModelData> {
            let cardlist: Array<Card.IViewModelData> = [];

            if (reportList) {
                reportList.forEach((report: ReportListRepository.PowerBiReport) => {
                    cardlist.push(
                        <Card.IViewModelData>
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

            return cardlist;
        }

        public getReportAccordions(): Section.SubSection {

            let reportGroups = this.getGroupedReports();

            let accordionGroups: Accordion.IViewModelData = {};
            accordionGroups.groups = [];
            accordionGroups.classes = Config.Classes.ReportGroupsContainerClass;

            for (var cardGroup in reportGroups) {
                let reportCards = this.getReportSubsection(reportGroups[cardGroup]);
                accordionGroups.groups.push(
                <Accordion.IGroupData>
                    {
                        title: (cardGroup === "null") ? Config.Strings.ReportGroupOthers : cardGroup,
                        expanded: true,
                        body: `<div class="layout layout--thirds">
                                   <!-- ko foreach: viewModel.cards -->
                                    <div data-bind="wpsCard: $data"></div>
                                   <!-- /ko -->
                               </div>`,
                        bodyViewModel: {
                            cards: reportCards
                        }
                    }
                );
            }

            let subSection = <Section.ISubSectionData>{
                body: `
                     <div data-bind="wpsAccordion: viewModel.cardgroups"></div>
                `,
                anchor: "",
                bodyViewModel: {
                    cardgroups: accordionGroups
                }
            }

            return Base.createFromDefaults(subSection, Section.SubSection)[0];
        }

        private getGroupedReports(): IDictionary<Array<ReportListRepository.PowerBiReport>> {

            let reportList: Array<ReportListRepository.PowerBiReport> = this.repository.resultData;

            reportList = reportList.sort(
                (item1, item2) => {
                    if (item1.group > item2.group) {
                        return 1;
                    }else if (item1.group < item2.group) {
                        return -1;
                    }
                    return 0;
                }
            );

            let groups: IDictionary<Array<ReportListRepository.PowerBiReport>> = {};

            reportList.forEach(
                (item: ReportListRepository.PowerBiReport) => {
                    if (groups[item.group]) {
                        groups[item.group].push(item);
                    } else {
                        groups[item.group] = [item];
                    }
                }
            );

            return groups;
        }
    }
}