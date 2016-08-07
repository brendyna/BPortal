import moment = require("moment");

import Base = require("Areas/Shared/Controls/Base");
import Chart = require("Areas/Shared/Controls/Chart");
import Config = require("../../Config");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Filters = require("Areas/Shared/Controls/Filters");
import Header = require("Areas/Shared/Controls/Header");
import Icon = require("Areas/Shared/Controls/Icon");
import Input = require("Areas/Shared/Controls/Input");
import KnockoutUtil = require("Areas/Shared/Util/Knockout");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");
import Select = require("Areas/Shared/Controls/Select");
import Table = require("Areas/Shared/Controls/Table");

import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import BugsForDomainRepository = require("../Repositories/BugsForDomain.Repository");
import BugTrendsRepository = require("../Repositories/BugTrends.Repository");
import GetBuiltWithDataRepository = require("../Repositories/GetBuiltWithData.Repository");
import TrendsForDomainRepository = require("../Repositories/TrendsForDomain.Repository");

export = Main;

module Main {
    DescriptionList;
    KnockoutUtil;

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
                breadcrumb: [
                    { text: "WPT Portal", url: "javascript:;" },
                    { text: "Site Reporter", url: "javascript:;" },
                    { text: "Details", url: "javascript:;" }
                ]
            };

            return navData;
        }

        public getHeaderViewModelData(): Header.IViewModelData {
            let headerData: Header.IViewModelData = {
                title: "facebook.com"
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
                        placeholder: "Search for another site",
                        enterCallback: (domain: string) => {
                            window.open("http://wptportal.corp.microsoft.com/sitereporter/details?domain=" + domain);
                        }
                    }
                },
                subsections: [
                    {
                        body: `<dl data-bind="wpsDescriptionList: $vm.highlights"></dl>`,
                        bodyViewModel: {
                            highlights: <DescriptionList.IViewModelData>{
                                classes: "domain__snapshot"
                            }
                        }
                    },
                    {
                        body: `<dl data-bind="wpsDescriptionList: $vm.links"></dl>`,
                        bodyViewModel: {
                            links: <DescriptionList.IViewModelData>{
                                descriptionPairs: [
                                    {
                                        descriptions: [
                                            {
                                                content: `<a data-bind="text: $vm.text, attr: { href: $vm.url }"></a>`,
                                                contentViewModel: {
                                                    text: "Learn about our data",
                                                    url: "https://osgwiki.com/wiki/SiteReporter"
                                                }
                                            },
                                            {
                                                content: `<a data-bind="text: $vm.text, attr: { href: $vm.url }"></a>`,
                                                contentViewModel: {
                                                    text: "Install Edge extension",
                                                    url: "file://iefs/Users/brendyna/SiteReporterEdgeExtension"
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
                            classes: "subtitle metrics__measurements__icon--switchRisk"
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
                            classes: "sitereporter__tile__delta--Sad"
                        }
                    }
                }]
            };
        }

        public getFavIconDescriptionPair(): DescriptionList.IDescriptionPairData {
            return {
                descriptions: [{
                    content: `<img class="summary--favicon" data-bind="attr: { src: $vm.src }" />`,
                    contentViewModel: {
                        src: "http://www.google.com/s2/favicons?domain_url=facebook.com"
                    }
                }]
            };
        }

        public getBingdexDescriptionPair(): DescriptionList.IDescriptionPairData {
            return {
                term: "Bingdex rank",
                descriptions: [{
                    content: `<span class="subtitle" data-bind="text: $vm.text"></span>`,
                    contentViewModel: {
                        text: "#1"
                    }
                }]
            };
        }

        public getAlexaDescriptionPair(): DescriptionList.IDescriptionPairData {
            return {
                term: "Alexa rank",
                descriptions: [{
                    content: `<span class="subtitle" data-bind="text: $vm.text"></span>`,
                    contentViewModel: {
                        text: "#1"
                    }
                }]
            };
        }

        public getBugsViewModelData(): Section.IViewModelData {
            return {
                title: "Bugs",
                altHeader: true,
                body: `
                    <div data-bind="wpsFilters: $vm.filters"></div>
                    <table data-bind="wpsTable: $vm.table"></table>
                    <div data-bind="wpsChart: $vm.bugs"></div>
                `,
                bodyViewModel: {
                    filters: this.getBugFilterData(),
                    table: this.getBugTableData(),
                    bugs: <Chart.IViewModelData>{
                        classes: "bug__trends",
                        options: this.getBugTrendChartOptions()
                    }
                }
            };
        }

        public getTrendsViewModelData(): Section.IViewModelData {
            let trendsData = <Section.IViewModelData>{
                title: "Trends",
                altHeader: true,
                body: `
                    <div data-bind="wpsFilters: $vm.filters"></div>
                    <div class="layout layout--halves">
                        <div data-bind="wpsChart: $vm.frownies"s></div>
                        <div data-bind="wpsChart: $vm.navigations"></div>
                        <div data-bind="wpsChart: $vm.focustime"></div>
                    </div>
                `,
                bodyViewModel: {
                    filters: <Filters.IViewModelData>{
                        classes: "trends__filters",
                        hideButtons: true
                    },
                    frownies: <Chart.IViewModelData>{
                        classes: "module trends__frownies",
                        options: this.getTrendChartOptions("Frownies")
                    },
                    navigations: <Chart.IViewModelData>{
                        classes: "module trends__navigations",
                        options: this.getTrendChartOptions("Navigations")
                    },
                    focustime: <Chart.IViewModelData>{
                        classes: "module trends__focustime",
                        options: this.getTrendChartOptions("Focus Time")
                    }
                }
            };

            return trendsData;
        }

        public getTechViewModelData(): Section.IViewModelData {
            return {
                title: "Technologies",
                altHeader: true,
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
                classes: "bug__filters",
                hideButtons: true
            };
        }

        private getBugTableData(): Table.IViewModelData {
            return {
                classes: "bug__list",
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
                metadata: "Updated...",
                settings: <DataTables.Settings>{
                    lengthChange: false,
                    searchDelay: 500,
                    pageLength: 5,
                    autoWidth: false,
                    info: false,
                    language: <any>{
                        search: "",
                        searchPlaceholder: "Filter table"
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
                    { text: "All bugs (" + this.bugs.length + ")", value: this._bugTypeMap[BugType.All] },
                    { text: "Switch risk bugs (" + this.switchRiskBugs.length + ")", value: this._bugTypeMap[BugType.SwitchRisk] },
                    { text: "Outreach bugs (" + this.outreachBugs.length + ")", value: this._bugTypeMap[BugType.Outreach] },
                    { text: this.releaseBugs[0].Release + " bugs (" + this.releaseBugs.length + ")", value: this._bugTypeMap[BugType.Release] }
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
            let data = [];

            this.charts.forEach((chart: TrendsForDomainRepository.Chart) => {
                if (this._typeMap[type] === chart.id) {
                    data = chart.dataPoints;
                }
            });

            return formatChartPoints(data);
        }

        private get charts(): Array<TrendsForDomainRepository.Chart> {
            return this.repository.resultData["charts"];
        }
    }

    export class BuiltWithProvider extends BaseProvider.DynamicProvider<GetBuiltWithDataRepository.DataTransferObject> implements BaseProvider.IDynamicProvider {
        constructor(repository: GetBuiltWithDataRepository.IRepository) {
            super(repository);
        }

        public getTechnologies(): string {
            let technologies = [];

            this.repository.resultData.technologies.forEach((tech: GetBuiltWithDataRepository.Technology) => {
                technologies.push(tech.name);
            });

            return technologies.join(", ");
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