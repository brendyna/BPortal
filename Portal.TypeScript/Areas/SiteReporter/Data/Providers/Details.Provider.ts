import "humanize";
import Badge = require("Areas/Shared/Controls/Badge");
import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import BugsForDomainRepository = require("../Repositories/BugsForDomain.Repository");
import BugTrendsRepository = require("../Repositories/BugTrends.Repository");
import BuiltWithDataForDomainRepository = require("../Repositories/BuiltWithDataForDomain.Repository");
import Chart = require("Areas/Shared/Controls/Chart");
import Config = require("../../Config");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import DetailsForDomainRepository = require("../Repositories/DetailsForDomain.Repository");
import Filters = require("Areas/Shared/Controls/Filters");
import Header = require("Areas/Shared/Controls/Header");
import Icon = require("Areas/Shared/Controls/Icon");
import Input = require("Areas/Shared/Controls/Input");
import KnockoutUtil = require("Areas/Shared/Util/Knockout");
import List = require("Areas/Shared/Controls/List");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");
import Select = require("Areas/Shared/Controls/Select");
import Table = require("Areas/Shared/Controls/Table");
import TrendsForDomainRepository = require("../Repositories/TrendsForDomain.Repository");

export = Main;

module Main {
    Badge;
    Chart;
    DescriptionList;
    Filters;
    Header;
    Icon;
    Input;
    KnockoutUtil;
    List;
    Navigation;
    Section;
    Table;

    export enum BugType {
        All,
        Release,
        Outreach,
        SwitchRisk
    }

    export enum ChartType {
        FocusTime,
        Frownies,
        Navigations
    }

    export interface IStaticProvider {
        getNavigationViewModelData: Navigation.IViewModelData;
        getHeaderViewModelData: Header.IViewModelData;
        getSidebarViewModelData: Section.IViewModelData;
        getBugsViewModelData: Section.IViewModelData;
        getTrendsViewModelData: Section.IViewModelData;
        getTechViewModelData: Section.IViewModelData;
    }

    export interface IDynamicProvider extends BaseProvider.IDynamicProvider {
    }

    export class StaticProvider implements IStaticProvider {
        constructor() {
        }

        public getNavigationViewModelData(): Navigation.IViewModelData {
            let navData: Navigation.IViewModelData = {
                breadcrumb: <Array<Navigation.ICrumbData>>Config.Window.DetailsBreadcrumb
            };

            return navData;
        }

        public getHeaderViewModelData(title: string): Header.IViewModelData {
            let headerData: Header.IViewModelData = {
                title: title
            };

            return headerData;
        }

        public getSidebarViewModelData(): Section.IViewModelData {
            let sidebarData = <Section.IViewModelData>{
                classes: "sidebar",
                body: `<input data-bind="wpsInput: $vm.siteSearch" />`,
                bodyViewModel: {
                    siteSearch: <Input.IViewModelData>{
                        type: Input.Type.Text,
                        placeholder: Config.Strings.SiteSearch,
                        enterCallback: (domain: string) => {
                            window.open("http://wptportal.corp.microsoft.com/sitereporter/details?domain=" + domain);
                        }
                    }
                },
                subsections: [
                    {
                        classes: Config.Classes.TableOfContents,
                        body: `<ul data-bind="wpsList: $vm.sections"></ul>`,
                        bodyViewModel: {
                            sections: <List.IViewModelData>{
                                type: List.Type.Links,
                                items: [
                                    {
                                        content: `<a href="#${Config.Strings.BugSectionTitle}">${Config.Strings.BugSectionTitle}</a>`
                                    },
                                    {
                                        content: `<a href="#${Config.Strings.TechSectionTitle}">${Config.Strings.TechSectionTitle}</a>`
                                    },
                                    {
                                        content: `<a href="#${Config.Strings.TrendsSectionTitle}">${Config.Strings.TrendsSectionTitle}</a>`
                                    }
                                ]
                            }
                        }
                    },
                    {
                        classes: "snapshot",
                        body: `<dl data-bind="wpsDescriptionList: $vm.highlights"></dl>`,
                        bodyViewModel: {
                            highlights: <DescriptionList.IViewModelData>{
                                classes: Config.Classes.DetailsDomainSnapshot
                            }
                        }
                    },
                    {
                        classes: Config.Classes.LearnMoreLinks,
                        body: `<dl data-bind="wpsDescriptionList: $vm.links"></dl>`,
                        bodyViewModel: {
                            links: <DescriptionList.IViewModelData>{
                                descriptionPairs: [
                                    {
                                        descriptions: [
                                            {
                                                content: `<a data-bind="text: $vm.text, attr: { href: $vm.url, target: '_blank' }"></a>`,
                                                contentViewModel: {
                                                    text: Config.Strings.LearnMore,
                                                    url: Config.Urls.SiteReporterWiki
                                                }
                                            },
                                            {
                                                content: `<a data-bind="text: $vm.text, attr: { href: $vm.url, target: '_blank' }"></a>`,
                                                contentViewModel: {
                                                    text: Config.Strings.ExtensionInstall,
                                                    url: Config.Urls.ExtensionLocation
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]
            };

            return sidebarData;
        }

        public getSwitchRiskDescriptionPair(): DescriptionList.IDescriptionPairData {
            return {
                descriptions: [{
                    content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> Switch risk</span>`,
                    contentViewModel: {
                        icon: <Icon.IViewModelData>{
                            type: Icon.Type.Flag,
                            classes: "subtitle " + Config.Classes.DetailsSwitchRiskIcon
                        }
                    }
                }]
            };
        }

        public getOffensiveContentDescriptionPair(): DescriptionList.IDescriptionPairData {
            return {
                descriptions: [{
                    content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> Potentially offensive content</span>`,
                    contentViewModel: {
                        icon: <Icon.IViewModelData>{
                            type: Icon.Type.Blocked,
                            classes: "sitereporter__tile__delta--Sad " + Config.Classes.DetailsPotentiallyOffensive
                        }
                    }
                }]
            };
        }

        public getFavIconDescriptionPair(domain: string): DescriptionList.IDescriptionPairData {
            return {
                descriptions: [{
                    content: `<img class="${Config.Classes.SiteFavIcon}" data-bind="attr: { src: $vm.src }" />`,
                    contentViewModel: {
                        src: "http://www.google.com/s2/favicons?domain_url=" + domain
                    }
                }]
            };
        }

        public getBugsViewModelData(): Section.IViewModelData {
            return {
                title: "Bugs",
                altHeader: true,
                anchor: "Bugs",
                classes: "details--bugs",
                body: `
                    <div data-bind="wpsFilters: $vm.filters"></div>
                    <table data-bind="wpsTable: $vm.table"></table>
                    <div data-bind="wpsChart: $vm.bugs"></div>
                `,
                bodyViewModel: {
                    filters: this.getBugFilterData(),
                    table: this.getBugTableData(),
                    bugs: <Chart.IViewModelData>{
                        classes: Config.Classes.DetailsBugsTrendsChart,
                        options: this.getBugTrendChartOptions()
                    }
                }
            };
        }

        public getTrendsViewModelData(): Section.IViewModelData {
            let trendsData = <Section.IViewModelData>{
                title: "Trends",
                altHeader: true,
                anchor: "Trends",
                classes: "details--trends",
                body: `<div data-bind="wpsFilters: $vm.filters"></div>`,
                bodyViewModel: {
                    filters: <Filters.IViewModelData>{
                        classes: Config.Classes.TrendsFilters,
                        hideButtons: true
                    }
                },
                subsections: [
                    {
                        body: `<div data-bind="wpsChart: $vm"s></div>`,
                        classes: "section__frownies",
                        bodyViewModel: <Chart.IViewModelData>{
                            classes: Config.Classes.DetailsTrendsFrowniesChart,
                            options: this.getTrendChartOptions(Config.Strings.DetailsTrendsFrowniesTitle)
                        }
                    },
                    {
                        body: `<div data-bind="wpsChart: $vm"></div>`,
                        classes: "section__navigations",
                        bodyViewModel: <Chart.IViewModelData>{
                            classes: Config.Classes.DetailsTrendsNavigationsChart,
                            options: this.getTrendChartOptions(Config.Strings.DetailsTrendsNavigationsTitle)
                        }
                    },
                    {
                        body: `<div data-bind="wpsChart: $vm"></div>`,
                        classes: "section__focustime",
                        bodyViewModel: <Chart.IViewModelData>{
                            classes: Config.Classes.DetailsTrendsFocusTimeChart,
                            options: this.getTrendChartOptions(Config.Strings.DetailsTrendsFocusTimeTitle)
                        }
                    }
                ]
            };

            return trendsData;
        }

        public getTechViewModelData(): Section.IViewModelData {
            return {
                title: "Technologies",
                altHeader: true,
                anchor: "Technologies",
                classes: "details--technologies",
                body: `
                    <div data-bind="text: $vm.builtwith"></div>
                `,
                bodyViewModel: {
                    builtwith: ko.observable("")
                }
            };
        }

        private getBugFilterData(): Filters.IViewModelData {
            return {
                classes: Config.Classes.DetailsBugsFilters,
                hideButtons: true
            };
        }

        private getBugTableData(): Table.IViewModelData {
            return {
                classes: Config.Classes.DetailsBugsTable,
                headers: [
                    { text: "Id" },
                    { text: "AreaPath" },
                    { text: "AssignedTo" },
                    { text: "Iteration" },
                    { text: "Keywords" },
                    { text: "Priority" },
                    { text: "Product" },
                    { text: "Release" },
                    { text: "Severity" },
                    { text: "State" },
                    { text: "Tags" },
                    { text: "Title" }
                ],
                metadata: Config.Strings.BugsTableScanTimePlaceholder,
                settings: <DataTables.Settings>{
                    lengthChange: false,
                    searchDelay: 500,
                    pageLength: 5,
                    autoWidth: false,
                    info: false,
                    language: <any>{
                        search: "",
                        searchPlaceholder: Config.Strings.TableFilterPlaceholder,
                        emptyTable: Config.Strings.DetailsBugsTableNoDataMessage,
                        zeroRecords: Config.Strings.DetailsBugsTableNoResultsMessage
                    },
                    order: [
                        [
                            3,
                            'asc'
                        ]
                    ],
                    columns: [
                        { data: 'id' },
                        { data: 'areaPath' },
                        { data: 'assignedTo' },
                        { data: 'iteration' },
                        { data: 'keywords' },
                        { data: 'priority' },
                        { data: 'product' },
                        { data: 'release' },
                        { data: 'severity' },
                        { data: 'state' },
                        { data: 'tags' },
                        { data: 'title' }
                    ],
                    columnDefs: [
                        {
                            targets: [0],
                            width: '0%',
                            render: function (data) {
                                return '<a href="https://microsoft.visualstudio.com/DefaultCollection/OS/_workitems/edit/'
                                    + data + '" target="_blank">' + data + '</a>';
                            }
                        },
                        {
                            targets: [1, 4, 5, 6, 8, 9, 10],
                            width: '0%',
                            className: 'table__column--hidden',
                            visible: false
                        },
                        {
                            targets: [3],
                            width: '0%',
                            render: function (data) {
                                var vals = data.split('\\');

                                if (vals.length > 1) {
                                    return vals[1];
                                }

                                return '';
                            }
                        }
                    ]
                }
            };
        }

        private getBugTrendChartOptions() {
            return {
                chart: {
                    type: 'spline',
                    height: 300
                },
                title: { text: "Trends" },
                lang: {
                    noData: "No bug trend data to display"
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%b %e', this.value);
                        }
                    }
                },
                yAxis: {
                    title: { text: "" },
                    min: 0,
                    gridLineWidth: 0
                },
                plotOptions: {
                    spline: {
                        marker: { enabled: false },
                        lineWidth: 2
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                }
            };
        }

        private getTrendChartOptions(name: string) {
            return {
                chart: {
                    type: 'areaspline',
                    height: 300
                },
                title: { text: name },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%b %e', this.value);
                        }
                    }
                },
                yAxis: {
                    title: { text: '' },
                    min: 0,
                    gridLineWidth: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.y}</b>'
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.2,
                        marker: { enabled: false }
                    }
                },
                legend: { enabled: false }
            }
        }
    }

    export class BugTrendsProvider extends BaseProvider.DynamicProvider<BugTrendsRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: BugTrendsRepository.IRepository) {
            super(repository);
        }

        public getChartSeriesData(): Array<any> {
            var seriesNames = Object.keys(this.repository.resultData);
            var multiSeriesArray = new Array();

            seriesNames.forEach((seriesName, index) => {
                var series = this.repository.resultData[seriesName];

                if (series.length > 0) {
                    series = formatChartPoints(KnockoutUtil.convertToCamelCase(series));
                }

                // format series name
                var spacedText = seriesName.replace(/([A-Z])/g, " $1");
                var noBugs = spacedText.replace(/(Bugs)/g, "");
                var capitalizedSeriesName = noBugs.charAt(0).toUpperCase() + noBugs.slice(1);

                multiSeriesArray.push({ "name": capitalizedSeriesName, "data": series });
            });

            return multiSeriesArray;
        }

        public isBugTrendDataEmpty(): boolean {
            let objHasProperties = false;
            for (var prop in this.repository.resultData) {
                if (this.repository.resultData.hasOwnProperty(prop)) {
                    objHasProperties = true;
                }
            }   

            return !objHasProperties || (this.repository.resultData.AllBugs.length === 0
                && this.repository.resultData.CurrentReleaseBugs.length === 0
                && this.repository.resultData.OutreachBugs.length === 0
                && this.repository.resultData.SwitchRiskBugs.length === 0);
        }
    }

    export class BugsProvider extends BaseProvider.DynamicProvider<BugsForDomainRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        public static SelectName = "bug";

        private _bugTypeMap: Array<string>;

        constructor(repository: BugsForDomainRepository.IRepository) {
            super(repository);

            this._bugTypeMap = [];
            this._bugTypeMap[BugType.All] = "AllBugs";
            this._bugTypeMap[BugType.Release] = "ReleaseBug";
            this._bugTypeMap[BugType.Outreach] = "OutreachBug";
            this._bugTypeMap[BugType.SwitchRisk] = "SwitchRisk";
        }

        public isBugDataEmpty(): boolean {
            return this.repository.resultData.Bugs.length === 0
                && this.repository.resultData.CurrentReleaseBugs.length === 0
                && this.repository.resultData.OutreachBugs.length === 0
                && this.repository.resultData.SwitchRiskBugs.length === 0;
        }

        public get isSwitchRisk(): boolean {
            return this.repository.resultData.IsSwitchRisk;
        }

        public getBugTableData(): Array<any> {
            return KnockoutUtil.convertToCamelCase(this.repository.resultData.Bugs);
        }

        public getBugTableDataByType(type: string): Array<any> {
            let data: Array<any>;

            switch (type) {
                case this._bugTypeMap[BugType.Release]:
                    data = this.releaseBugs;
                    break;

                case this._bugTypeMap[BugType.Outreach]:
                    data = this.outreachBugs;
                    break;

                case this._bugTypeMap[BugType.SwitchRisk]:
                    data = this.switchRiskBugs;
                    break;

                case this._bugTypeMap[BugType.All]:
                default:
                    data = this.bugs;
                    break;
            }

            return KnockoutUtil.convertToCamelCase(data);
        }

        public getFilterSelectData(): Array<Select.IViewModelData> {
            let data: Array<Select.IViewModelData> = [];

            data.push({
                name: BugsProvider.SelectName,
                options: [
                    { text: `${Config.Strings.DetailsFiltersAllBugs} (${this.bugs.length})`, value: this._bugTypeMap[BugType.All] },
                    { text: `${Config.Strings.DetailsFiltersSwitchRiskBugs} (${this.switchRiskBugs.length})`, value: this._bugTypeMap[BugType.SwitchRisk] },
                    { text: `${Config.Strings.DetailsFiltersOutreachBugs} (${this.outreachBugs.length})`, value: this._bugTypeMap[BugType.Outreach] },
                    { text: `${(this.releaseBugs[0] && this.releaseBugs[0].Release || "Current release")} bugs (${this.releaseBugs.length})`, value: this._bugTypeMap[BugType.Release] }
                ]
            });

            return data;
        }

        public get bugTypeMap(): Array<string> {
            return this._bugTypeMap;
        }

        public get bugs(): Array<BugsForDomainRepository.Bug> {
            return this.repository.resultData.Bugs;
        }

        public get releaseBugs(): Array<BugsForDomainRepository.Bug> {
            return this.repository.resultData.CurrentReleaseBugs;
        }

        public get outreachBugs(): Array<BugsForDomainRepository.Bug> {
            return this.repository.resultData.OutreachBugs;
        }

        public get switchRiskBugs(): Array<BugsForDomainRepository.Bug> {
            return this.repository.resultData.SwitchRiskBugs;
        }
    }

    export class DetailsForDomainProvider extends BaseProvider.DynamicProvider<DetailsForDomainRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {

        constructor(repository: DetailsForDomainRepository.IRepository) {
            super(repository);
        }

        public get isOffensive(): boolean {
            return this.repository.resultData.isOffensive;
        }

        public getBingdexDescriptionPair(): DescriptionList.IDescriptionPairData {
            let text = this.repository.resultData.bingdexRank === 0 ?
                Config.Strings.BingdexOutOfBounds :
                "#" + Humanize.intComma(this.repository.resultData.bingdexRank);

            return {
                term: "Bingdex rank",
                descriptions: [{
                    content: `<span data-bind="text: $vm.text, css: $vm.classes"></span>`,
                    contentViewModel: {
                        text: text,
                        classes: "subtitle " + Config.Classes.SiteBingdexRank
                    }
                }]
            };
        }

        public getAlexaDescriptionPair(): DescriptionList.IDescriptionPairData {
            let text = this.repository.resultData.alexaRank === 0 ?
                Config.Strings.AlexaOutOfBounds :
                "#" + Humanize.intComma(this.repository.resultData.alexaRank);

            return {
                term: "Alexa rank",
                descriptions: [{
                    content: `<span data-bind="text: $vm.text, css: $vm.classes"></span>`,
                    contentViewModel: {
                        text: text,
                        classes: "subtitle " + Config.Classes.SiteAlexaRank
                    }
                }]
            };
        }

        public getTagsDescriptionPair(): DescriptionList.IDescriptionPairData {
            return {
                term: "Tags",
                descriptions: [
                    {
                        content: `<!-- ko foreach: $vm.badges -->
                                    <span class="${Config.Classes.SiteTag}" data-bind="wpsBadge: $data"></span>
                                  <!-- /ko -->`,
                        contentViewModel: {
                            badges: this.repository.resultData.tags.map(tag => {
                                return {
                                    text: tag.text,
                                    type: Badge.Type.Default
                                };
                            })
                        }
                    }
                ]
            };
        }

        public isTagsDataEmpty(): boolean {
            return this.repository.resultData.tags === undefined
                || this.repository.resultData.tags.length === 0;
        }
    }

    export class TrendsProvider extends BaseProvider.DynamicProvider<TrendsForDomainRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        private _typeMap: Array<string>;

        constructor(repository: TrendsForDomainRepository.IRepository) {
            super(repository);

            this._typeMap = [];
            this._typeMap[ChartType.FocusTime] = "focus-time";
            this._typeMap[ChartType.Frownies] = "frownies";
            this._typeMap[ChartType.Navigations] = "navigations";
        }

        public getChartDataByType(type: ChartType): Array<TrendsForDomainRepository.DataPoint> {
            return formatChartPoints(this.getChart(type).dataPoints);
        }

        public isAllDataEmpty(): boolean {
            return this.isDataEmpty(ChartType.Frownies)
                && this.isDataEmpty(ChartType.FocusTime)
                && this.isDataEmpty(ChartType.Navigations);
        }
        
        public isDataEmpty(type: ChartType): boolean {
            let chart = this.getChart(type);

            return chart === undefined || this.getChart(type).dataPoints.length === 0;
        }

        private getChart(type: ChartType): TrendsForDomainRepository.Chart {
            let retChart: TrendsForDomainRepository.Chart;

            this.charts.forEach((chart: TrendsForDomainRepository.Chart) => {
                if (this._typeMap[type] === chart.id) {
                    retChart = chart;
                }
            });

            return retChart;
        }

        private get charts(): Array<TrendsForDomainRepository.Chart> {
            return this.repository.resultData["charts"];
        }
    }

    export class BuiltWithDataForDomainProvider extends BaseProvider.DynamicProvider<BuiltWithDataForDomainRepository.DataTransferObject>
        implements BaseProvider.IDynamicProvider {
        constructor(repository: BuiltWithDataForDomainRepository.IRepository) {
            super(repository);
        }

        public getTechnologies(): string {
            let technologies = [];

            this.repository.resultData.technologies.forEach((tech: BuiltWithDataForDomainRepository.Technology) => {
                technologies.push(tech.name);
            });

            return technologies.join(", ");
        }

        public isDataEmpty(): boolean {
            return this.repository.resultData === null
                || this.getTechnologies().length === 0;
        }
    }

    export function formatChartPoints(series) {
        'use strict';

        var newSeries = series;
        $.each(newSeries, (point, value) => {
            var d = new Date(value.date.substr(0, 10));
            newSeries[point] = [
                Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()),
                value.count
            ];
        });
        return newSeries.sort();
    }
}