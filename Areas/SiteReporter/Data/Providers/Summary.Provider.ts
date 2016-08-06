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
import BugsForTagRepository = require("../Repositories/BugsForTag.Repository");
import FiltersRepository = require("../Repositories/Filters.Repository");
import TrendsForTagRepository = require("../Repositories/TrendsForTag.Repository");
import ScanTimeRepository = require("../Repositories/ScanTime.Repository");

export = Main;

module Main {
    Chart;
    DescriptionList;
    Filters;
    Header;
    Icon;
    Input;
    KnockoutUtil;
    Section;
    Table;

    export enum FiltersType {
        Bugs,
        Trends
    }

    export interface IStaticProvider {
        getNavigationViewModelData: () => Navigation.IViewModelData;
        getHeaderViewModelData: () => Header.IViewModelData;
        getSidebarViewModelData: () => Section.IViewModelData;
        getBugsViewModelData: () => Section.IViewModelData;
        getTrendsViewModelData: () => Section.IViewModelData;
    }

    export interface IDynamicProvider extends BaseProvider.IDynamicProvider {
    }

    export class StaticProvider implements IStaticProvider {
        constructor() {
        }

        public getNavigationViewModelData(): Navigation.IViewModelData {
            let navViewModelData: Navigation.IViewModelData = {
                breadcrumb: <Array<Navigation.ICrumbData>>Config.Window.Breadcrumb
            };

            return navViewModelData;
        }

        public getHeaderViewModelData(): Header.IViewModelData {
            let headerViewModelData: Header.IViewModelData = {
            };

            return headerViewModelData;
        }

        public getSidebarViewModelData(): Section.IViewModelData {
            let sidebarData = <Section.IViewModelData>{
                classes: "sidebar",
                body: `<input data-bind="wpsInput: $vm.siteSearch" />`,
                bodyViewModel: {
                    siteSearch: <Input.IViewModelData>{
                        type: Input.Type.Text,
                        placeholder: "Search for any site",
                        enterCallback: (domain: string) => {
                            window.open("http://wptportal.corp.microsoft.com/sitereporter/details?domain=" + domain);
                        }
                    }
                },
                subsections: [
                    {
                        header: "Bug snapshot",
                        body: `<dl data-bind="wpsDescriptionList: $vm.summary"></dl>`,
                        bodyViewModel: {
                            summary: <DescriptionList.IViewModelData>{
                                classes: "sidebar__bug-snapshot"
                            }
                        }
                    },
                    {
                        header: "Trend snapshot",
                        body: `<dl data-bind="wpsDescriptionList: $vm.summary"></dl>`,
                        bodyViewModel: {
                            summary: <DescriptionList.IViewModelData>{
                                classes: "sidebar__trend-snapshot",
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

        public getBugsViewModelData(): Section.IViewModelData {
            return {
                title: "Bugs",
                altHeader: true,
                body: `
                    <div data-bind="wpsFilters: $vm.filters"></div>
                    <table data-bind="wpsTable: $vm.table"></table>
                `,
                bodyViewModel: {
                    filters: this.getBugFilterData(),
                    table: this.getBugTableData()
                }
            };
        }

        public getTrendsViewModelData(): Section.IViewModelData {
            let trendsData = <Section.IViewModelData>{
                title: "Trends",
                altHeader: true,
                body: `
                    <div data-bind="wpsFilters: $vm.filters"></div>
                    <table data-bind="wpsTable: $vm.table"></table>
                `,
                bodyViewModel: {
                    filters: this.getTrendsFilterData(),
                    table: this.getTrendsTableData()
                }
            };

            return trendsData;
        }

        private getBugFilterData(): Filters.IViewModelData {
            return {
                classes: "bugs__filters",
                hideButtons: true,
            };
        }

        private getBugTableData(): Table.IViewModelData {
            return {
                classes: "bugs__site-list",
                headers: [
                    { classes: "table__column__switch" },
                    { hidden: true, text: "DomainId" },
                    { hidden: true },
                    { text: "Site", classes: "table__column__site" },
                    { text: "Bingdex", classes: "table__column__rank" },
                    { text: "Outreach", classes: "table__column__bugs outreach__bugs" },
                    { text: "Current", classes: "table__column__bugs release__bugs" },
                    { text: "Total", classes: "table__column__bugs total__bugs" },
                    { classes: "table__column__button" }
                ],
                metadata: "Updated 15 minutes ago",
                settings: <DataTables.Settings>{
                    lengthChange: false,
                    searchDelay: 500,
                    pageLength: 10,
                    autoWidth: false,
                    info: false,
                    language: <any>{
                        search: "",
                        searchPlaceholder: "Filter table"
                    },
                    order: [
                        [
                            4,
                            'asc'
                        ]
                    ],
                    columns: [
                        { data: 'isSwitchRisk' },
                        { data: 'domainId' },
                        { data: 'isOffensive' },
                        { data: 'domainName' },
                        { data: 'bingdexRank' },
                        { data: 'outreachBugCount' },
                        { data: 'currentReleaseBugCount' },
                        { data: 'activeBugCount' },
                        { data: null }
                    ],
                    columnDefs: [
                        {
                            targets: 'table__column__rank',
                            width: '16%',
                            render: renderBingdexColumn
                        },
                        {
                            targets: 'table__column__site',
                            width: '30%',
                            render: function (data) {
                                return '<img class="summary--favicon"' +
                                    ' src="http://www.google.com/s2/favicons?domain_url=' + data + '" />'
                                    + '<span>' + data + '</span>';
                            },
                            className: 'table__column__domain'
                        },
                        {
                            targets: 'table__column__switch',
                            width: '1%',
                            render: function (data, type) {
                                var value;

                                if (type === "sort") {
                                    value = data;
                                } else {
                                    if (data) {
                                        value = '<span class="icon--flag metrics__measurements__icon--switchRisk"></span>';
                                    } else {
                                        value = '';
                                    }
                                }

                                return value;
                            },
                            className: 'table__column__switch table__column__bugs--switch'
                        },
                        {
                            targets: 'table__column--hidden',
                            width: '0%',
                            className: 'table__column--hidden',
                            visible: false
                        },
                        {
                            targets: 'outreach__bugs',
                            width: '16%',
                            type: 'nullable',
                            className: 'table__column__bugs table__column__bugs--outreach'
                        },
                        {
                            targets: 'release__bugs',
                            width: '16%',
                            type: 'nullable',
                            className: 'table__column__bugs table__column__bugs--release'
                        },
                        {
                            targets: 'total__bugs',
                            width: '16%',
                            type: 'nullable',
                            className: 'table__column__bugs table__column__bugs--total'
                        },
                        {
                            targets: 'table__column__button',
                            width: '5%',
                            data: null,
                            defaultContent: '<button><span>Details</span></button>',
                            className: 'table__column__details'
                        }
                    ],
                    createdRow: function (row: Element, data: BugsForTagRepository.SiteBugSummary) {
                        $('td.table__column__details', row).on('click', function () {
                            window.open('/SiteReporter/Details?'
                                + 'domain=' + (<any>data).domainName
                                + '&platform=' + "Desktop" //window.PLATFORM
                                + '&release=' + "RS1"); //window.RELEASE);
                        });
                        if ((<any>data).isOffensive === true) {
                            var newRowVal = '<span title="May contain offensive content">'
                                + $('td.table__column__domain', row).html()
                                + '<strong class="badge--danger">**</strong></span>';
                            $('td.table__column__domain', row).html(newRowVal);
                        }
                    },
                    initComplete: function () {
                    }
                }
            };
        }

        private getTrendsFilterData(): Filters.IViewModelData {
            return {
                classes: "trends__filters",
                hideButtons: true
            };
        }

        private getTrendsTableData(): Table.IViewModelData {
            return {
                classes: "trends__site-list",
                headers: [
                    { hidden: true, text: "DomainId" },
                    { hidden: true },
                    { text: "Site", classes: "table__column__site" },
                    { text: "Bingdex", classes: "table__column__rank" },
                    { text: "Frownies", classes: "table__column__delta--Reverse" },
                    { text: "Navigations", classes: "table__column__delta--Standard" },
                    { text: "Focus Time", classes: "table__column__delta--Standard" },
                    { classes: "table__column__button" }
                ],
                settings: <DataTables.Settings>{
                    lengthChange: false,
                    searchDelay: 500,
                    pageLength: 10,
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
                        { data: 'domainId' },
                        { data: 'isOffensive' },
                        { data: 'domainName' },
                        { data: 'bingdexRank' },
                        { data: 'frowny' },
                        { data: 'navigation' },
                        { data: 'focusTime' },
                        { data: null }
                    ],
                    columnDefs: [
                        {
                            targets: 'table__column__rank',
                            width: '15%',
                            render: renderBingdexColumn
                        },
                        {
                            targets: 'table__column__site',
                            width: '30%',
                            render: function (data) {
                                return '<img class="summary--favicon"' +
                                    ' src="http://www.google.com/s2/favicons?domain_url=' + data + '" />'
                                    + '<span>' + data + '</span>';
                            },
                            className: 'table__column__domain'
                        },
                        {
                            targets: 'table__column--hidden',
                            width: '0%',
                            className: 'table__column--hidden',
                            visible: false
                        },
                        {
                            targets: 'table__column__delta--Standard',
                            width: '15%',
                            render: function (data, type) {
                                var value;

                                if (type === "sort") {
                                    value = Math.abs(data);
                                } else {
                                    var span;
                                    if (data > 0) {
                                        span = '<span class="sitereporter__tile__delta'
                                            + ' sitereporter__tile__delta--Happy'
                                            + ' sitereporter__tile__delta--Up" data-original="'
                                            + data + '"></span>';
                                    } else if (data < 0) {
                                        span = '<span class="sitereporter__tile__delta'
                                            + ' sitereporter__tile__delta--Sad'
                                            + ' sitereporter__tile__delta--Down" data-original="'
                                            + data + '"></span>';
                                    } else {
                                        span = '<span class="sitereporter__tile__delta'
                                            + ' sitereporter__tile__delta--Neutral'
                                            + ' sitereporter__tile__delta--Equal" data-original="'
                                            + data + '"></span>';
                                    }
                                    value = span + Humanize.compactInteger(Math.abs(data.toFixed(2)), 1);
                                }

                                return value;
                            }
                        },
                        {
                            targets: 'table__column__delta--Reverse',
                            width: '15%',
                            render: function (data, type) {
                                var value;

                                if (type === "sort") {
                                    value = Math.abs(data);
                                } else {
                                    var span;
                                    if (data > 0) {
                                        span = '<span class="sitereporter__tile__delta'
                                            + ' sitereporter__tile__delta--Sad'
                                            + ' sitereporter__tile__delta--Up" data-original="'
                                            + data + '"></span>';
                                    } else if (data < 0) {
                                        span = '<span class="sitereporter__tile__delta'
                                            + ' sitereporter__tile__delta--Happy'
                                            + ' sitereporter__tile__delta--Down" data-original="'
                                            + data + '"></span>';
                                    } else {
                                        span = '<span class="sitereporter__tile__delta'
                                            + ' sitereporter__tile__delta--Neutral'
                                            + ' sitereporter__tile__delta--Equal" data-original="'
                                            + data + '"></span>';
                                    }
                                    value = span + Humanize.compactInteger(Math.abs(data.toFixed(2)), 1);
                                }

                                return value;
                            }
                        },
                        {
                            targets: 'table__column__button',
                            width: '5%',
                            data: null,
                            defaultContent: '<button><span>Details</span></button>',
                            className: 'details-button'
                        }
                    ],
                    createdRow: function (row: Element, data: TrendsForTagRepository.SiteTrendSummary) {
                        $(row).find('.details-button').on('click', function () {
                            window.open('/SiteReporter/Details?'
                                + 'domain=' + data.domainName
                                + '&platform=' + 'Desktop' //window.PLATFORM
                                + '&release=' + 'RS1') //window.RELEASE);
                        });

                        if (data.isOffensive === true) {
                            var newRowVal = '<span title="May contain offensive content">'
                                + $('td.table__column__domain', row).html()
                                + '<strong class="badge--danger">**</strong></span>';
                            $('td.table__column__domain', row).html(newRowVal);
                        }
                    },
                    initComplete: function () {
                        //SiteReporter.AI.TrackDataLoaded("trends");
                    }
                }
            };
        }
    }

    export class BugsProvider extends BaseProvider.DynamicProvider<BugsForTagRepository.DataTransferObject> implements BaseProvider.IDynamicProvider {
        constructor(repository: BugsForTagRepository.IRepository) {
            super(repository);
        }

        public getBugSnapshotData(): Array<DescriptionList.IDescriptionPair> {
            let data: Array<DescriptionList.DescriptionPair> = [];
            let switchRiskCount = 0;
            let outreachBugCount = 0;
            let releaseBugCount = 0;
            let totalBugCount = 0;

            this.repository.resultData.forEach((summary: BugsForTagRepository.SiteBugSummary) => {
                outreachBugCount += summary.OutreachBugCount;
                releaseBugCount += summary.CurrentReleaseBugCount;
                totalBugCount += summary.ActiveBugCount;

                if (summary.IsSwitchRisk) {
                    switchRiskCount++;
                }
            });

            [
                { term: "Switch risk sites", value: Humanize.compactInteger(((switchRiskCount / this.repository.resultData.length) * 100), 1) + "%", icon: Icon.Type.Flag, classes: "metrics__measurements__icon--switchRisk" },
                { term: "Outreach bugs", value: Humanize.compactInteger(outreachBugCount, 1), icon: Icon.Type.Bug },
                { term: "Release bugs", value: Humanize.compactInteger(releaseBugCount, 1), icon: Icon.Type.Bug },
                { term: "Total bugs", value: Humanize.compactInteger(totalBugCount, 1), icon: Icon.Type.Bug }
            ].forEach((snapshot) => {
                data.push(new DescriptionList.DescriptionPair({
                    term: snapshot.term,
                    descriptions: [{
                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon, css: $vm.classes"></span>&nbsp;<span data-bind="text: $vm.text"></span></span>`,
                        contentViewModel: {
                            classes: (<any>snapshot).classes || "",
                            text: snapshot.value,
                            icon: <Icon.IViewModelData>{
                                type: snapshot.icon,
                                classes: "subtitle"
                            }
                        }
                    }]
                }));
            });

            return data;
        }

        public getBugTableData(): Array<any> {
            return KnockoutUtil.convertToCamelCase(this.repository.resultData);
        }
    }

    export class FiltersProvider extends BaseProvider.DynamicProvider<FiltersRepository.DataTransferObject> implements BaseProvider.IDynamicProvider {
        constructor(repository: FiltersRepository.IRepository) {
            super(repository);
        }

        public getFilterSelectDataByType(type: FiltersType): Array<Select.IViewModelData> {
            let data: Array<Select.IViewModelData> = [];
            let typeFilterNames: Array<string>;

            switch (type) {
                case FiltersType.Bugs:
                    typeFilterNames = Config.Filters.Bugs;
                    break;

                case FiltersType.Trends:
                    typeFilterNames = Config.Filters.Trends;
                    break;
            }


            typeFilterNames.forEach((name: string) => {
                let optionsDTO = this.getResultFilterOptionsByName(name);
                data.push({
                    name: name,
                    options: this.transformDTOOptionsToVMOptionsData(optionsDTO)
                });
            });

            return data;
        }

        private transformDTOOptionsToVMOptionsData(dtoOptions: Array<FiltersRepository.Option>): Array<Select.IOptionData> {
            let optionsData: Array<Select.IOptionData> = [];

            dtoOptions.forEach((dtoOption: FiltersRepository.Option) => {
                optionsData.push({
                    text: dtoOption.text,
                    value: dtoOption.value,
                    disabled: dtoOption.disabled
                });
            });

            return optionsData;
        }

        private getResultFilterOptionsByName(name: string): Array<FiltersRepository.Option> {
            return this.repository.resultData[name];
        }
    }

    export class TrendsProvider extends BaseProvider.DynamicProvider<TrendsForTagRepository.DataTransferObject> implements BaseProvider.IDynamicProvider {
        constructor(repository: TrendsForTagRepository.IRepository) {
            super(repository);
        }

        public getTrendsSnapshotData(): Array<DescriptionList.IDescriptionPair> {
            let data = [];
            let frowniesCount = 0;
            let navigationsCount = 0;
            let focusTimeCount = 0;

            this.repository.resultData.data.forEach((summary: TrendsForTagRepository.SiteTrendSummary) => {
                frowniesCount += summary.frowny;
                navigationsCount += summary.navigation;
                focusTimeCount += summary.focusTime;
            });

            [
                { term: "Frownies", value: frowniesCount },
                { term: "Navigations", value: navigationsCount },
                { term: "Hours of Focus Time", value: focusTimeCount }
            ].forEach((snapshot) => {
                let colorClass = "";

                if (snapshot.value > 0) {
                    if (snapshot.term === "Frownies") {
                        colorClass = "sitereporter__tile__delta--Sad";
                    } else {
                        colorClass = "sitereporter__tile__delta--Happy";
                    }
                } else {
                    if (snapshot.term === "Frownies") {
                        colorClass = "sitereporter__tile__delta--Happy";
                    } else {
                        colorClass = "sitereporter__tile__delta--Sad";
                    }
                }

                data.push({
                    term: snapshot.term,
                    descriptions: [{
                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span>&nbsp;<span data-bind="text: $vm.text"></span></span>`,
                        contentViewModel: {
                            text: Humanize.compactInteger(Math.abs(snapshot.value), 1),
                            icon: <Icon.IViewModelData>{
                                type: (snapshot.value > 0) ? Icon.Type.Up : Icon.Type.Down,
                                classes: "subtitle " + colorClass
                            }
                        }
                    }]
                });
            });

            return Base.createFromDefaults(data, DescriptionList.DescriptionPair);
        }

        public getTrendsTableData(): Array<any> {
            return KnockoutUtil.convertToCamelCase(this.repository.resultData.data);
        }
    }

    export class ScanTimeProvider extends BaseProvider.DynamicProvider<ScanTimeRepository.DataTransferObject> implements BaseProvider.IDynamicProvider {
        constructor(repository: ScanTimeRepository.IRepository) {
            super(repository);
        }

        public getLastScannedTime(): string {
            return moment(this.repository.resultData).fromNow();
        }
    }

    function renderBingdexColumn(data, type) {
        var value;
        if ((type === "sort" || type === "type") && data === 0) {
            value = (<any>Number).MAX_SAFE_INTEGER;
        } else if (data === 0) {
            value = 'n/a';
        } else {
            value = data;
        }
        return value;
    }
}