import $ = require("jquery");
import ko = require("knockout");
import KnockoutUtil = require("Areas/Shared/Util/Knockout");
import Table = require("Areas/Shared/Controls/Table");

export = Main;

module Main {
    $((): void => {
        // SAMPLE: Default
        let data: Table.IViewModelData = {
            headers: [
                { hidden: true, text: "DomainId" },
                { hidden: true },
                { text: "Bingdex", classes: "table__column__rank" },
                { classes: "table__column__switch" },
                { text: "Site", classes: "table__column__site" },
                { text: "Outreach", classes: "table__column__bugs outreach__bugs" },
                { text: "Current", classes: "table__column__bugs release__bugs" },
                { text: "Total", classes: "table__column__bugs total__bugs" },
                { classes: "table__column__button" }
            ],
            settings: <DataTables.Settings>{
                lengthChange: false,
                searchDelay: 500,
                data: KnockoutUtil.convertToCamelCase(getSampleData()),
                pageLength: 10,
                autoWidth: false,
                info: false,
                language: <any>{
                    search: "",
                    searchPlaceholder: "Search in the table"
                },
                order: [
                    [
                        2,
                        'asc'
                    ]
                ],
                columns: [
                    { data: 'domainId' },
                    { data: 'isOffensive' },
                    { data: 'bingdexRank' },
                    { data: 'isSwitchRisk' },
                    { data: 'domainName' },
                    { data: 'outreachBugCount' },
                    { data: 'currentReleaseBugCount' },
                    { data: 'activeBugCount' },
                    { data: null }
                ],
                columnDefs: [
                    {
                        targets: 'table__column__rank',
                        width: '1%',
                        render: renderBingdexColumn
                    },
                    {
                        targets: 'table__column__site',
                        width: '20%',
                        render: function (data) {
                            return '<img class="summary--favicon"' +
                                ' src="http://www.google.com/s2/favicons?domain_url=' + data + '" />'
                                + '<span>' + data + '</span>';
                        },
                        className: 'table__column__domain'
                    },
                    {
                        targets: 'table__column__switch',
                        width: '2%',
                        render: function (data, type) {
                            var value;

                            if (type === "sort") {
                                value = data;
                            } else {
                                if (data) {
                                    value = '<span class="icon--warning metrics__measurements__icon--switchRisk"></span>';
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
                        width: '15%',
                        type: 'nullable',
                        className: 'table__column__bugs table__column__bugs--outreach'
                    },
                    {
                        targets: 'release__bugs',
                        width: '15%',
                        type: 'nullable',
                        className: 'table__column__bugs table__column__bugs--release'
                    },
                    {
                        targets: 'total__bugs',
                        width: '15%',
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
                createdRow: function (row, data) {
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
                    //var tableId = "#sample";
                    //var search = $(tableId + '_filter label input').attr("id",
                    //    tableId.replace('#', '') + 'dataTables_filter--input');

                    //$(tableId + '_filter').append(search);
                    //$(tableId + '_filter label').text("Search").attr("for",
                    //    tableId + "dataTables_filter--input");
                    //$(tableId + '_filter').children("label:first").remove();
                    //$(tableId + 'dataTables_filter--input').attr('placeholder', 'filter table');

                    //var selectFilterDiv = $('<div>').addClass('dataTables_filter');
                    //var selectFilter = $('<select>').attr('id', bugTableFilterId).addClass('bug__select__filter');

                    //selectFilterDiv.append(selectFilter);
                    //$(tableId + '_filter').after(selectFilterDiv);

                    //$(selectFilter).change(function () {
                    //    var valueSelected = this.value;
                    //    filterBugData(valueSelected, jsonData);
                    //});

                    //getLastUpdatedTime(tableId);
                    //SiteReporter.AI.TrackDataLoaded("bugs");
                }
            }
        };
        let widget = new Table.Widget($("#sample"), data);
    });

    function getSampleData(): any {
        return [
            { "DomainId": 1, "DomainName": "google.com", "ActiveBugCount": 69, "OutreachBugCount": 3, "CurrentReleaseBugCount": 4, "IsSwitchRisk": true, "BingdexRank": 1, "IsOffensive": false },
            { "DomainId": 2, "DomainName": "facebook.com", "ActiveBugCount": 67, "OutreachBugCount": 3, "CurrentReleaseBugCount": 3, "IsSwitchRisk": true, "BingdexRank": 2, "IsOffensive": false },
            { "DomainId": 3, "DomainName": "youtube.com", "ActiveBugCount": 49, "OutreachBugCount": 2, "CurrentReleaseBugCount": 1, "IsSwitchRisk": true, "BingdexRank": 3, "IsOffensive": false },
            { "DomainId": 4, "DomainName": "baidu.com", "ActiveBugCount": 16, "OutreachBugCount": 3, "CurrentReleaseBugCount": 0, "IsSwitchRisk": true, "BingdexRank": 4, "IsOffensive": false },
            { "DomainId": 5, "DomainName": "mail.google.com", "ActiveBugCount": 4, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": false, "BingdexRank": 5, "IsOffensive": false },
            { "DomainId": 6, "DomainName": "msn.com", "ActiveBugCount": 23, "OutreachBugCount": 2, "CurrentReleaseBugCount": 1, "IsSwitchRisk": true, "BingdexRank": 6, "IsOffensive": false },
            { "DomainId": 7, "DomainName": "yahoo.com", "ActiveBugCount": 25, "OutreachBugCount": 0, "CurrentReleaseBugCount": 1, "IsSwitchRisk": true, "BingdexRank": 7, "IsOffensive": false },
            { "DomainId": 8, "DomainName": "en.wikipedia.org", "ActiveBugCount": 0, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": false, "BingdexRank": 8, "IsOffensive": false },
            { "DomainId": 9, "DomainName": "amazon.com", "ActiveBugCount": 19, "OutreachBugCount": 2, "CurrentReleaseBugCount": 0, "IsSwitchRisk": true, "BingdexRank": 9, "IsOffensive": false },
            { "DomainId": 10, "DomainName": "live.com", "ActiveBugCount": 10, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": true, "BingdexRank": 10, "IsOffensive": false },
            { "DomainId": 11, "DomainName": "google.co.jp", "ActiveBugCount": 1, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": false, "BingdexRank": 11, "IsOffensive": false },
            { "DomainId": 12, "DomainName": "bing.com", "ActiveBugCount": 41, "OutreachBugCount": 0, "CurrentReleaseBugCount": 1, "IsSwitchRisk": true, "BingdexRank": 12, "IsOffensive": false },
            { "DomainId": 13, "DomainName": "yahoo.co.jp", "ActiveBugCount": 2, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": true, "BingdexRank": 13, "IsOffensive": false },
            { "DomainId": 14, "DomainName": "qq.com", "ActiveBugCount": 8, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": true, "BingdexRank": 14, "IsOffensive": false },
            { "DomainId": 15, "DomainName": "vk.com", "ActiveBugCount": 8, "OutreachBugCount": 0, "CurrentReleaseBugCount": 1, "IsSwitchRisk": true, "BingdexRank": 15, "IsOffensive": false },
            { "DomainId": 16, "DomainName": "google.co.in", "ActiveBugCount": 2, "OutreachBugCount": 0, "CurrentReleaseBugCount": 1, "IsSwitchRisk": true, "BingdexRank": 16, "IsOffensive": false },
            { "DomainId": 17, "DomainName": "twitter.com", "ActiveBugCount": 53, "OutreachBugCount": 2, "CurrentReleaseBugCount": 0, "IsSwitchRisk": true, "BingdexRank": 17, "IsOffensive": false },
            { "DomainId": 18, "DomainName": "search.yahoo.co.jp", "ActiveBugCount": 0, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": false, "BingdexRank": 18, "IsOffensive": false },
            { "DomainId": 19, "DomainName": "taobao.com", "ActiveBugCount": 4, "OutreachBugCount": 0, "CurrentReleaseBugCount": 0, "IsSwitchRisk": false, "BingdexRank": 19, "IsOffensive": false },
            { "DomainId": 20, "DomainName": "linkedin.com", "ActiveBugCount": 11, "OutreachBugCount": 1, "CurrentReleaseBugCount": 0, "IsSwitchRisk": true, "BingdexRank": 20, "IsOffensive": false }
        ];
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