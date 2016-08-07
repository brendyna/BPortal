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
                        options: this.getBugTrendChartOptions(this.getSampleBugTrendMultiseriesData())
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
                        options: this.getTrendChartOptions("Frownies", [])
                    },
                    navigations: <Chart.IViewModelData>{
                        classes: "module trends__navigations",
                        options: this.getTrendChartOptions("Navigations", [])
                    },
                    focustime: <Chart.IViewModelData>{
                        classes: "module trends__focustime",
                        options: this.getTrendChartOptions("Focus Time", [])
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

        private getSampleBuiltWithData(): any {
            return {
                "identifier": "facebook.com",
                "metadata": {
                    "topLevelDomain": "facebook.com",
                    "social": null,
                    "companyName": "Facebook",
                    "telephones": null,
                    "emails": [],
                    "city": null,
                    "state": null,
                    "postcode": null,
                    "country": "",
                    "names": [
                        {
                            "name": "Kent Beck",
                            "type": 8
                        },
                        {
                            "name": "Eduardo Saverin",
                            "type": 8
                        },
                        {
                            "name": "Kun Chen",
                            "type": 8
                        },
                        {
                            "name": "Charlie Deets",
                            "type": 8
                        },
                        {
                            "name": "Rohit Wad",
                            "type": 5
                        },
                        {
                            "name": "Bill Weihl",
                            "type": 5
                        },
                        {
                            "name": "Don Seymour",
                            "type": 3
                        },
                        {
                            "name": "baatar nyamkhuu",
                            "type": 3
                        }
                    ],
                    "aRank": 2,
                    "qRank": -1
                },
                "technologies": [
                    {
                        "categories": [
                            "Standard"
                        ],
                        "name": "SPF",
                        "tag": "mx",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "Facebook Like",
                        "tag": "widgets",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1428008942799
                    },
                    {
                        "categories": null,
                        "name": "Akamai",
                        "tag": "cdn",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "DigiCert SSL",
                        "tag": "ssl",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": [
                            "Programming Language"
                        ],
                        "name": "PHP",
                        "tag": "framework",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Facebook CDN",
                        "tag": "cdn",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "Content Delivery Network",
                        "tag": "CDN",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1456617600000
                    },
                    {
                        "categories": [
                            "Standard"
                        ],
                        "name": "DMARC",
                        "tag": "mx",
                        "firstDetected": 1427760000000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "IPv6",
                        "tag": "Server",
                        "firstDetected": 1427760000000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "BOA",
                        "tag": "Web Server",
                        "firstDetected": 1427756400000,
                        "lastDetected": 1427756400000
                    },
                    {
                        "categories": null,
                        "name": "J2EE",
                        "tag": "framework",
                        "firstDetected": 1427238000000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "SSL by Default",
                        "tag": "ssl",
                        "firstDetected": 1427929200000,
                        "lastDetected": 1466722800000
                    },
                    {
                        "categories": null,
                        "name": "Min Width",
                        "tag": "css",
                        "firstDetected": 1430265600000,
                        "lastDetected": 1456444800000
                    },
                    {
                        "categories": null,
                        "name": "Max Width",
                        "tag": "css",
                        "firstDetected": 1430265600000,
                        "lastDetected": 1431388800000
                    },
                    {
                        "categories": null,
                        "name": "Yahoo User Interface",
                        "tag": "javascript",
                        "firstDetected": 1429743600000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Apache Traffic Server",
                        "tag": "Web Server",
                        "firstDetected": 1429743600000,
                        "lastDetected": 1429743600000
                    },
                    {
                        "categories": [
                            "Feedback Forms and Surveys"
                        ],
                        "name": "MailChimp",
                        "tag": "widgets",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": null,
                        "name": "TownNews.com",
                        "tag": "widgets",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "SoundCloud",
                        "tag": "media",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Media News Group Interactive",
                        "tag": "ads",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Ning",
                        "tag": "widgets",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": null,
                        "name": "Constant Contact",
                        "tag": "widgets",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Ad Analytics",
                            "Ad Server",
                            "Digital Video Ads",
                            "Search"
                        ],
                        "name": "Atlas",
                        "tag": "ads",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Enterprise",
                            "Online Video Platform",
                            "Video Analytics",
                            "Video Players"
                        ],
                        "name": "Wistia",
                        "tag": "media",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": null,
                        "name": "World Now",
                        "tag": "ads",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Live Stream / Webcast",
                            "Online Video Platform"
                        ],
                        "name": "Livestream",
                        "tag": "media",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": [
                            "Marketing Automation"
                        ],
                        "name": "aWeber",
                        "tag": "analytics",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1462489200000
                    },
                    {
                        "categories": [
                            "Simple Website Builder"
                        ],
                        "name": "Homestead",
                        "tag": "cms",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1434841200000
                    },
                    {
                        "categories": [
                            "Hosted Solution"
                        ],
                        "name": "ShopTab",
                        "tag": "shop",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1458514800000
                    },
                    {
                        "categories": null,
                        "name": "GetResponse",
                        "tag": "widgets",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1434841200000
                    },
                    {
                        "categories": null,
                        "name": "Qualtrics Site Intercept",
                        "tag": "widgets",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1434841200000
                    },
                    {
                        "categories": null,
                        "name": "Imgur",
                        "tag": "widgets",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Real Estate"
                        ],
                        "name": "flexmls",
                        "tag": "cms",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Online Video Platform"
                        ],
                        "name": "Vid.ly",
                        "tag": "media",
                        "firstDetected": 1434841200000,
                        "lastDetected": 1434841200000
                    },
                    {
                        "categories": null,
                        "name": "Commission Junction",
                        "tag": "ads",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Serendipity",
                        "tag": "cms",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": null,
                        "name": "K2F",
                        "tag": "framework",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": [
                            "Feedback Forms and Surveys"
                        ],
                        "name": "Wufoo",
                        "tag": "widgets",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": null,
                        "name": "Nanigans",
                        "tag": "ads",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": null,
                        "name": "Magic Software",
                        "tag": "widgets",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Image Provider"
                        ],
                        "name": "Shutterstock",
                        "tag": "widgets",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Getty Images",
                        "tag": "widgets",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "MaxCDN",
                        "tag": "cdn",
                        "firstDetected": 1448319600000,
                        "lastDetected": 1448319600000
                    },
                    {
                        "categories": null,
                        "name": "Turner CDN",
                        "tag": "cdn",
                        "firstDetected": 1448319600000,
                        "lastDetected": 1448319600000
                    },
                    {
                        "categories": [
                            "Payment Currency"
                        ],
                        "name": "Euro",
                        "tag": "payment",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Google Front End",
                        "tag": "framework",
                        "firstDetected": 1447196400000,
                        "lastDetected": 1447196400000
                    },
                    {
                        "categories": null,
                        "name": "Adobe ColdFusion",
                        "tag": "framework",
                        "firstDetected": 1453766400000,
                        "lastDetected": 1453852800000
                    },
                    {
                        "categories": null,
                        "name": "YUI3",
                        "tag": "javascript",
                        "firstDetected": 1453852800000,
                        "lastDetected": 1453852800000
                    },
                    {
                        "categories": null,
                        "name": "DHL",
                        "tag": "shipping",
                        "firstDetected": 1455145200000,
                        "lastDetected": 1466722800000
                    },
                    {
                        "categories": null,
                        "name": "Facebook for Websites",
                        "tag": "javascript",
                        "firstDetected": 1454972400000,
                        "lastDetected": 1462834800000
                    },
                    {
                        "categories": null,
                        "name": "Facebook Graph API",
                        "tag": "javascript",
                        "firstDetected": 1454972400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Spanish HREF LANG",
                        "tag": "language",
                        "firstDetected": 1456354800000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "Hindi HREF LANG",
                        "tag": "language",
                        "firstDetected": 1456354800000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "Thai HREF LANG",
                        "tag": "language",
                        "firstDetected": 1456354800000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "English HREF LANG",
                        "tag": "language",
                        "firstDetected": 1456354800000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "Device Pixel Ratio",
                        "tag": "css",
                        "firstDetected": 1456444800000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "Resolution",
                        "tag": "css",
                        "firstDetected": 1456444800000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": null,
                        "name": "UPS",
                        "tag": "shipping",
                        "firstDetected": 1459378800000,
                        "lastDetected": 1466722800000
                    },
                    {
                        "categories": null,
                        "name": "TNT",
                        "tag": "shipping",
                        "firstDetected": 1461193200000,
                        "lastDetected": 1462402800000
                    },
                    {
                        "categories": null,
                        "name": "Weborama",
                        "tag": "ads",
                        "firstDetected": 1462489200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Affiliate Programs"
                        ],
                        "name": "Zanox",
                        "tag": "ads",
                        "firstDetected": 1462489200000,
                        "lastDetected": 1462489200000
                    },
                    {
                        "categories": null,
                        "name": "Wunderground",
                        "tag": "widgets",
                        "firstDetected": 1462489200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "PayPal Button",
                        "tag": "payment",
                        "firstDetected": 1462489200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Mapping SaaS"
                        ],
                        "name": "ArcGIS",
                        "tag": "mapping",
                        "firstDetected": 1462489200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Application Performance"
                        ],
                        "name": "Dynatrace",
                        "tag": "analytics",
                        "firstDetected": 1462489200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Royal Mail",
                        "tag": "shipping",
                        "firstDetected": 1463007600000,
                        "lastDetected": 1463612400000
                    },
                    {
                        "categories": null,
                        "name": "Vimeo CDN",
                        "tag": "cdn",
                        "firstDetected": 1462834800000,
                        "lastDetected": 1462834800000
                    },
                    {
                        "categories": [
                            "JavaScript Library"
                        ],
                        "name": "jQuery",
                        "tag": "javascript",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Campaign Monitor Widget",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "German HREF LANG",
                        "tag": "language",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Perl",
                        "tag": "framework",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "DoubleClick.Net",
                        "tag": "ads",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467327600000
                    },
                    {
                        "categories": [
                            "Image Provider"
                        ],
                        "name": "Fotolia",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Ticketfly",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Google Calendar",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Mixcloud",
                        "tag": "media",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": [
                            "Audience Measurement"
                        ],
                        "name": "MediaMind",
                        "tag": "analytics",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Bookings"
                        ],
                        "name": "TicketLeap",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Mobile Non Scaleable Content",
                        "tag": "mobile",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": [
                            "Bookings"
                        ],
                        "name": "TicketWeb",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Gravatar Profiles",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": [
                            "Live Stream / Webcast",
                            "Online Video Platform",
                            "Social Video Platform"
                        ],
                        "name": "YouTube",
                        "tag": "media",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Japanese Yen",
                        "tag": "payment",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Arts People",
                        "tag": "widgets",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Big Cartel",
                        "tag": "shop",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Viewport Meta",
                        "tag": "mobile",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Chinese HREF LANG",
                        "tag": "language",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "Pound Sterling",
                        "tag": "payment",
                        "firstDetected": 1467068400000,
                        "lastDetected": 1467068400000
                    },
                    {
                        "categories": null,
                        "name": "FedEx",
                        "tag": "shipping",
                        "firstDetected": 1466722800000,
                        "lastDetected": 1466722800000
                    },
                    {
                        "categories": null,
                        "name": "Financial Content",
                        "tag": "analytics",
                        "firstDetected": 1467241200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "Vevo",
                        "tag": "media",
                        "firstDetected": 1467241200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Ad Exchange",
                            "Demand-side Platform"
                        ],
                        "name": "AppNexus",
                        "tag": "ads",
                        "firstDetected": 1467241200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": [
                            "Hosted Solution"
                        ],
                        "name": "AbleCommerce",
                        "tag": "shop",
                        "firstDetected": 1467241200000,
                        "lastDetected": 1467241200000
                    },
                    {
                        "categories": null,
                        "name": "smartURL",
                        "tag": "widgets",
                        "firstDetected": 1467241200000,
                        "lastDetected": 1467241200000
                    }
                ]
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

        private getSampleNavigationsSeries() {
            return [
                { "date": "2016-04-25T00:00:00", "count": 18177.0 }, { "date": "2016-04-26T00:00:00", "count": 17974.0 }, { "date": "2016-04-27T00:00:00", "count": 18054.0 }, { "date": "2016-04-28T00:00:00", "count": 17874.0 }, { "date": "2016-04-29T00:00:00", "count": 16558.0 }, { "date": "2016-04-30T00:00:00", "count": 14894.0 }, { "date": "2016-05-01T00:00:00", "count": 14461.0 }, { "date": "2016-05-02T00:00:00", "count": 16681.0 }, { "date": "2016-05-03T00:00:00", "count": 17275.0 }, { "date": "2016-05-04T00:00:00", "count": 17605.0 }, { "date": "2016-05-05T00:00:00", "count": 16956.0 }, { "date": "2016-05-06T00:00:00", "count": 20023.0 }, { "date": "2016-05-07T00:00:00", "count": 13070.0 }, { "date": "2016-05-08T00:00:00", "count": 14164.0 }, { "date": "2016-05-09T00:00:00", "count": 17091.0 }, { "date": "2016-05-10T00:00:00", "count": 17240.0 }, { "date": "2016-05-11T00:00:00", "count": 18375.0 }, { "date": "2016-05-12T00:00:00", "count": 18862.0 }, { "date": "2016-05-13T00:00:00", "count": 17907.0 }, { "date": "2016-05-14T00:00:00", "count": 15413.0 }, { "date": "2016-05-15T00:00:00", "count": 15047.0 }, { "date": "2016-05-16T00:00:00", "count": 16851.0 }, { "date": "2016-05-17T00:00:00", "count": 18414.0 }, { "date": "2016-05-18T00:00:00", "count": 17483.0 }, { "date": "2016-05-19T00:00:00", "count": 16895.0 }, { "date": "2016-05-20T00:00:00", "count": 16026.0 }, { "date": "2016-05-21T00:00:00", "count": 14283.0 }, { "date": "2016-05-22T00:00:00", "count": 14093.0 }, { "date": "2016-05-23T00:00:00", "count": 16228.0 }, { "date": "2016-05-24T00:00:00", "count": 17226.0 }, { "date": "2016-05-25T00:00:00", "count": 16215.0 }, { "date": "2016-05-26T00:00:00", "count": 16447.0 }, { "date": "2016-05-27T00:00:00", "count": 16601.0 }, { "date": "2016-05-28T00:00:00", "count": 14774.0 }, { "date": "2016-05-29T00:00:00", "count": 14229.0 }, { "date": "2016-05-30T00:00:00", "count": 16004.0 }, { "date": "2016-05-31T00:00:00", "count": 18053.0 }, { "date": "2016-06-01T00:00:00", "count": 18949.0 }, { "date": "2016-06-02T00:00:00", "count": 17752.0 }, { "date": "2016-06-03T00:00:00", "count": 17454.0 }, { "date": "2016-06-04T00:00:00", "count": 14813.0 }, { "date": "2016-06-05T00:00:00", "count": 15024.0 }, { "date": "2016-06-06T00:00:00", "count": 17559.0 }, { "date": "2016-06-07T00:00:00", "count": 17102.0 }, { "date": "2016-06-08T00:00:00", "count": 16823.0 }, { "date": "2016-06-09T00:00:00", "count": 17818.0 }, { "date": "2016-06-10T00:00:00", "count": 18400.0 }, { "date": "2016-06-11T00:00:00", "count": 14796.0 }, { "date": "2016-06-12T00:00:00", "count": 15543.0 }, { "date": "2016-06-13T00:00:00", "count": 19071.0 }, { "date": "2016-06-14T00:00:00", "count": 18359.0 }, { "date": "2016-06-15T00:00:00", "count": 19322.0 }, { "date": "2016-06-16T00:00:00", "count": 18466.0 }, { "date": "2016-06-17T00:00:00", "count": 18205.0 }, { "date": "2016-06-18T00:00:00", "count": 15833.0 }, { "date": "2016-06-19T00:00:00", "count": 15400.0 }, { "date": "2016-06-20T00:00:00", "count": 19662.0 }, { "date": "2016-06-21T00:00:00", "count": 20866.0 }, { "date": "2016-06-22T00:00:00", "count": 20622.0 }, { "date": "2016-06-23T00:00:00", "count": 20134.0 }, { "date": "2016-06-24T00:00:00", "count": 19826.0 }, { "date": "2016-06-25T00:00:00", "count": 16644.0 }, { "date": "2016-06-26T00:00:00", "count": 17040.0 }, { "date": "2016-06-27T00:00:00", "count": 20241.0 }, { "date": "2016-06-28T00:00:00", "count": 19958.0 }, { "date": "2016-06-29T00:00:00", "count": 21609.0 }, { "date": "2016-06-30T00:00:00", "count": 19643.0 }, { "date": "2016-07-01T00:00:00", "count": 19529.0 }, { "date": "2016-07-02T00:00:00", "count": 16671.0 }, { "date": "2016-07-03T00:00:00", "count": 15817.0 }, { "date": "2016-07-04T00:00:00", "count": 17814.0 }, { "date": "2016-07-05T00:00:00", "count": 19834.0 }, { "date": "2016-07-06T00:00:00", "count": 20117.0 }, { "date": "2016-07-07T00:00:00", "count": 19327.0 }, { "date": "2016-07-08T00:00:00", "count": 20042.0 }, { "date": "2016-07-09T00:00:00", "count": 16675.0 }, { "date": "2016-07-10T00:00:00", "count": 17293.0 }, { "date": "2016-07-11T00:00:00", "count": 21267.0 }, { "date": "2016-07-12T00:00:00", "count": 22601.0 }, { "date": "2016-07-13T00:00:00", "count": 22011.0 }, { "date": "2016-07-14T00:00:00", "count": 20154.0 }, { "date": "2016-07-15T00:00:00", "count": 19869.0 }, { "date": "2016-07-16T00:00:00", "count": 17179.0 }, { "date": "2016-07-17T00:00:00", "count": 17351.0 }, { "date": "2016-07-18T00:00:00", "count": 20690.0 }, { "date": "2016-07-19T00:00:00", "count": 22016.0 }, { "date": "2016-07-20T00:00:00", "count": 20935.0 }, { "date": "2016-07-21T00:00:00", "count": 21454.0 }, { "date": "2016-07-22T00:00:00", "count": 20685.0 }
            ];
        }

        private getSampleFrowniesSeries() {
            return [
                { "date": "2016-04-25T00:00:00", "count": 2.0 }, { "date": "2016-04-26T00:00:00", "count": 2.0 }, { "date": "2016-04-27T00:00:00", "count": 2.0 }, { "date": "2016-04-28T00:00:00", "count": 2.0 }, { "date": "2016-04-29T00:00:00", "count": 1.0 }, { "date": "2016-04-30T00:00:00", "count": 2.0 }, { "date": "2016-05-01T00:00:00", "count": 1.0 }, { "date": "2016-05-02T00:00:00", "count": 1.0 }, { "date": "2016-05-04T00:00:00", "count": 1.0 }, { "date": "2016-05-05T00:00:00", "count": 1.0 }, { "date": "2016-05-07T00:00:00", "count": 1.0 }, { "date": "2016-05-11T00:00:00", "count": 1.0 }, { "date": "2016-05-12T00:00:00", "count": 4.0 }, { "date": "2016-05-13T00:00:00", "count": 1.0 }, { "date": "2016-05-14T00:00:00", "count": 1.0 }, { "date": "2016-05-15T00:00:00", "count": 2.0 }, { "date": "2016-05-16T00:00:00", "count": 3.0 }, { "date": "2016-05-17T00:00:00", "count": 1.0 }, { "date": "2016-05-18T00:00:00", "count": 1.0 }, { "date": "2016-05-19T00:00:00", "count": 1.0 }, { "date": "2016-05-21T00:00:00", "count": 1.0 }, { "date": "2016-05-24T00:00:00", "count": 1.0 }, { "date": "2016-05-25T00:00:00", "count": 1.0 }, { "date": "2016-05-26T00:00:00", "count": 1.0 }, { "date": "2016-05-27T00:00:00", "count": 2.0 }, { "date": "2016-05-29T00:00:00", "count": 2.0 }, { "date": "2016-05-31T00:00:00", "count": 1.0 }, { "date": "2016-06-01T00:00:00", "count": 1.0 }, { "date": "2016-06-03T00:00:00", "count": 3.0 }, { "date": "2016-06-04T00:00:00", "count": 1.0 }, { "date": "2016-06-05T00:00:00", "count": 2.0 }, { "date": "2016-06-07T00:00:00", "count": 1.0 }, { "date": "2016-06-08T00:00:00", "count": 1.0 }, { "date": "2016-06-12T00:00:00", "count": 1.0 }, { "date": "2016-06-14T00:00:00", "count": 2.0 }, { "date": "2016-06-18T00:00:00", "count": 1.0 }, { "date": "2016-06-20T00:00:00", "count": 1.0 }, { "date": "2016-06-22T00:00:00", "count": 1.0 }, { "date": "2016-06-25T00:00:00", "count": 1.0 }, { "date": "2016-06-27T00:00:00", "count": 1.0 }, { "date": "2016-06-28T00:00:00", "count": 1.0 }, { "date": "2016-06-30T00:00:00", "count": 1.0 }, { "date": "2016-07-02T00:00:00", "count": 2.0 }, { "date": "2016-07-03T00:00:00", "count": 1.0 }, { "date": "2016-07-06T00:00:00", "count": 1.0 }, { "date": "2016-07-07T00:00:00", "count": 1.0 }, { "date": "2016-07-08T00:00:00", "count": 1.0 }, { "date": "2016-07-09T00:00:00", "count": 2.0 }, { "date": "2016-07-10T00:00:00", "count": 1.0 }, { "date": "2016-07-11T00:00:00", "count": 1.0 }, { "date": "2016-07-13T00:00:00", "count": 1.0 }, { "date": "2016-07-17T00:00:00", "count": 1.0 }, { "date": "2016-07-18T00:00:00", "count": 1.0 }, { "date": "2016-07-19T00:00:00", "count": 1.0 }, { "date": "2016-07-20T00:00:00", "count": 2.0 }
            ];
        }

        private getSampleFocusTimeSeries() {
            return [
                { "date": "2016-04-27T00:00:00", "count": 9.0 }, { "date": "2016-04-28T00:00:00", "count": 9.0 }, { "date": "2016-04-29T00:00:00", "count": 7.0 }, { "date": "2016-04-30T00:00:00", "count": 8.0 }, { "date": "2016-05-01T00:00:00", "count": 9.0 }, { "date": "2016-05-02T00:00:00", "count": 10.0 }, { "date": "2016-05-03T00:00:00", "count": 10.0 }, { "date": "2016-05-04T00:00:00", "count": 13.0 }, { "date": "2016-05-05T00:00:00", "count": 15.0 }, { "date": "2016-05-06T00:00:00", "count": 8.0 }, { "date": "2016-05-07T00:00:00", "count": 11.0 }, { "date": "2016-05-08T00:00:00", "count": 7.0 }, { "date": "2016-05-09T00:00:00", "count": 11.0 }, { "date": "2016-05-10T00:00:00", "count": 10.0 }, { "date": "2016-05-11T00:00:00", "count": 13.0 }, { "date": "2016-05-12T00:00:00", "count": 9.0 }, { "date": "2016-05-13T00:00:00", "count": 9.0 }, { "date": "2016-05-14T00:00:00", "count": 9.0 }, { "date": "2016-05-15T00:00:00", "count": 16.0 }, { "date": "2016-05-16T00:00:00", "count": 9.0 }, { "date": "2016-05-17T00:00:00", "count": 11.0 }, { "date": "2016-05-18T00:00:00", "count": 10.0 }, { "date": "2016-05-19T00:00:00", "count": 9.0 }, { "date": "2016-05-20T00:00:00", "count": 10.0 }, { "date": "2016-05-21T00:00:00", "count": 9.0 }, { "date": "2016-05-22T00:00:00", "count": 9.0 }, { "date": "2016-05-23T00:00:00", "count": 8.0 }, { "date": "2016-05-24T00:00:00", "count": 12.0 }, { "date": "2016-05-25T00:00:00", "count": 9.0 }, { "date": "2016-05-26T00:00:00", "count": 8.0 }, { "date": "2016-05-27T00:00:00", "count": 7.0 }, { "date": "2016-05-28T00:00:00", "count": 9.0 }, { "date": "2016-05-29T00:00:00", "count": 10.0 }, { "date": "2016-05-30T00:00:00", "count": 9.0 }, { "date": "2016-05-31T00:00:00", "count": 10.0 }, { "date": "2016-06-01T00:00:00", "count": 11.0 }, { "date": "2016-06-02T00:00:00", "count": 11.0 }, { "date": "2016-06-03T00:00:00", "count": 10.0 }, { "date": "2016-06-04T00:00:00", "count": 10.0 }, { "date": "2016-06-05T00:00:00", "count": 9.0 }, { "date": "2016-06-06T00:00:00", "count": 9.0 }, { "date": "2016-06-07T00:00:00", "count": 11.0 }, { "date": "2016-06-08T00:00:00", "count": 9.0 }, { "date": "2016-06-09T00:00:00", "count": 8.0 }, { "date": "2016-06-10T00:00:00", "count": 7.0 }, { "date": "2016-06-11T00:00:00", "count": 6.0 }, { "date": "2016-06-12T00:00:00", "count": 6.0 }, { "date": "2016-06-13T00:00:00", "count": 10.0 }, { "date": "2016-06-14T00:00:00", "count": 7.0 }, { "date": "2016-06-15T00:00:00", "count": 8.0 }, { "date": "2016-06-16T00:00:00", "count": 8.0 }, { "date": "2016-06-17T00:00:00", "count": 6.0 }, { "date": "2016-06-18T00:00:00", "count": 6.0 }, { "date": "2016-06-19T00:00:00", "count": 6.0 }, { "date": "2016-06-20T00:00:00", "count": 7.0 }, { "date": "2016-06-21T00:00:00", "count": 7.0 }, { "date": "2016-06-22T00:00:00", "count": 7.0 }, { "date": "2016-06-23T00:00:00", "count": 6.0 }, { "date": "2016-06-24T00:00:00", "count": 8.0 }, { "date": "2016-06-25T00:00:00", "count": 5.0 }, { "date": "2016-06-26T00:00:00", "count": 7.0 }, { "date": "2016-06-27T00:00:00", "count": 8.0 }, { "date": "2016-06-28T00:00:00", "count": 7.0 }, { "date": "2016-06-29T00:00:00", "count": 7.0 }, { "date": "2016-06-30T00:00:00", "count": 6.0 }, { "date": "2016-07-01T00:00:00", "count": 8.0 }, { "date": "2016-07-02T00:00:00", "count": 6.0 }, { "date": "2016-07-03T00:00:00", "count": 6.0 }, { "date": "2016-07-04T00:00:00", "count": 8.0 }, { "date": "2016-07-05T00:00:00", "count": 6.0 }, { "date": "2016-07-06T00:00:00", "count": 9.0 }, { "date": "2016-07-07T00:00:00", "count": 6.0 }, { "date": "2016-07-08T00:00:00", "count": 7.0 }, { "date": "2016-07-09T00:00:00", "count": 9.0 }, { "date": "2016-07-10T00:00:00", "count": 7.0 }, { "date": "2016-07-11T00:00:00", "count": 9.0 }, { "date": "2016-07-12T00:00:00", "count": 10.0 }, { "date": "2016-07-13T00:00:00", "count": 10.0 }, { "date": "2016-07-14T00:00:00", "count": 8.0 }, { "date": "2016-07-15T00:00:00", "count": 7.0 }, { "date": "2016-07-16T00:00:00", "count": 6.0 }, { "date": "2016-07-17T00:00:00", "count": 7.0 }, { "date": "2016-07-18T00:00:00", "count": 9.0 }, { "date": "2016-07-19T00:00:00", "count": 9.0 }, { "date": "2016-07-20T00:00:00", "count": 8.0 }, { "date": "2016-07-21T00:00:00", "count": 8.0 }, { "date": "2016-07-21T00:00:00", "count": 0.0 }
            ];
        }

        private getSampleBugTrendMultiseriesData() {
            return KnockoutUtil.convertToCamelCase({
                "AllBugs": [
                    { "Date": "2016-05-16T00:00:00", "Count": 34 }, { "Date": "2016-05-17T00:00:00", "Count": 39 }, { "Date": "2016-05-18T00:00:00", "Count": 41 }, { "Date": "2016-05-19T00:00:00", "Count": 42 }, { "Date": "2016-05-20T00:00:00", "Count": 42 }, { "Date": "2016-05-21T00:00:00", "Count": 41 }, { "Date": "2016-05-22T00:00:00", "Count": 41 }, { "Date": "2016-05-23T00:00:00", "Count": 40 }, { "Date": "2016-05-24T00:00:00", "Count": 40 }, { "Date": "2016-05-25T00:00:00", "Count": 41 }, { "Date": "2016-05-26T00:00:00", "Count": 39 }, { "Date": "2016-05-27T00:00:00", "Count": 39 }, { "Date": "2016-05-28T00:00:00", "Count": 39 }, { "Date": "2016-05-29T00:00:00", "Count": 39 }, { "Date": "2016-05-30T00:00:00", "Count": 39 }, { "Date": "2016-05-31T00:00:00", "Count": 39 }, { "Date": "2016-06-01T00:00:00", "Count": 52 }, { "Date": "2016-06-02T00:00:00", "Count": 52 }, { "Date": "2016-06-03T00:00:00", "Count": 53 }, { "Date": "2016-06-04T00:00:00", "Count": 53 }, { "Date": "2016-06-05T00:00:00", "Count": 53 }, { "Date": "2016-06-06T00:00:00", "Count": 54 }, { "Date": "2016-06-07T00:00:00", "Count": 52 }, { "Date": "2016-06-08T00:00:00", "Count": 52 }, { "Date": "2016-06-09T00:00:00", "Count": 55 }, { "Date": "2016-06-10T00:00:00", "Count": 55 }, { "Date": "2016-06-11T00:00:00", "Count": 55 }, { "Date": "2016-06-12T00:00:00", "Count": 55 }, { "Date": "2016-06-13T00:00:00", "Count": 52 }, { "Date": "2016-06-14T00:00:00", "Count": 60 }, { "Date": "2016-06-15T00:00:00", "Count": 62 }, { "Date": "2016-06-16T00:00:00", "Count": 62 }, { "Date": "2016-06-17T00:00:00", "Count": 65 }, { "Date": "2016-06-18T00:00:00", "Count": 64 }, { "Date": "2016-06-19T00:00:00", "Count": 64 }, { "Date": "2016-06-20T00:00:00", "Count": 62 }, { "Date": "2016-06-21T00:00:00", "Count": 64 }, { "Date": "2016-06-22T00:00:00", "Count": 61 }, { "Date": "2016-06-23T00:00:00", "Count": 64 }, { "Date": "2016-06-24T00:00:00", "Count": 65 }, { "Date": "2016-06-25T00:00:00", "Count": 67 }, { "Date": "2016-06-26T00:00:00", "Count": 67 }, { "Date": "2016-06-27T00:00:00", "Count": 72 }, { "Date": "2016-06-28T00:00:00", "Count": 72 }, { "Date": "2016-06-29T00:00:00", "Count": 72 }, { "Date": "2016-06-30T00:00:00", "Count": 71 }, { "Date": "2016-07-01T00:00:00", "Count": 74 }, { "Date": "2016-07-02T00:00:00", "Count": 74 }, { "Date": "2016-07-03T00:00:00", "Count": 74 }, { "Date": "2016-07-04T00:00:00", "Count": 75 }, { "Date": "2016-07-05T00:00:00", "Count": 74 }, { "Date": "2016-07-06T00:00:00", "Count": 61 }, { "Date": "2016-07-07T00:00:00", "Count": 63 }, { "Date": "2016-07-08T00:00:00", "Count": 63 }, { "Date": "2016-07-09T00:00:00", "Count": 63 }, { "Date": "2016-07-10T00:00:00", "Count": 67 }, { "Date": "2016-07-11T00:00:00", "Count": 69 }, { "Date": "2016-07-12T00:00:00", "Count": 68 }, { "Date": "2016-07-13T00:00:00", "Count": 69 }, { "Date": "2016-07-14T00:00:00", "Count": 70 }, { "Date": "2016-07-15T00:00:00", "Count": 87 }, { "Date": "2016-07-16T00:00:00", "Count": 88 }, { "Date": "2016-07-17T00:00:00", "Count": 90 }, { "Date": "2016-07-18T00:00:00", "Count": 88 }, { "Date": "2016-07-19T00:00:00", "Count": 89 }, { "Date": "2016-07-20T00:00:00", "Count": 89 }, { "Date": "2016-07-21T00:00:00", "Count": 69 }, { "Date": "2016-07-22T00:00:00", "Count": 69 }
                ],
                "SwitchRiskBugs": [
                    { "Date": "2016-05-16T00:00:00", "Count": 23 }, { "Date": "2016-05-17T00:00:00", "Count": 25 }, { "Date": "2016-05-18T00:00:00", "Count": 25 }, { "Date": "2016-05-19T00:00:00", "Count": 26 }, { "Date": "2016-05-20T00:00:00", "Count": 26 }, { "Date": "2016-05-21T00:00:00", "Count": 26 }, { "Date": "2016-05-22T00:00:00", "Count": 26 }, { "Date": "2016-05-23T00:00:00", "Count": 26 }, { "Date": "2016-05-24T00:00:00", "Count": 26 }, { "Date": "2016-05-25T00:00:00", "Count": 27 }, { "Date": "2016-05-26T00:00:00", "Count": 26 }, { "Date": "2016-05-27T00:00:00", "Count": 26 }, { "Date": "2016-05-28T00:00:00", "Count": 26 }, { "Date": "2016-05-29T00:00:00", "Count": 26 }, { "Date": "2016-05-30T00:00:00", "Count": 26 }, { "Date": "2016-05-31T00:00:00", "Count": 26 }, { "Date": "2016-06-01T00:00:00", "Count": 30 }, { "Date": "2016-06-02T00:00:00", "Count": 30 }, { "Date": "2016-06-03T00:00:00", "Count": 31 }, { "Date": "2016-06-04T00:00:00", "Count": 31 }, { "Date": "2016-06-05T00:00:00", "Count": 31 }, { "Date": "2016-06-06T00:00:00", "Count": 31 }, { "Date": "2016-06-07T00:00:00", "Count": 30 }, { "Date": "2016-06-08T00:00:00", "Count": 30 }, { "Date": "2016-06-09T00:00:00", "Count": 31 }, { "Date": "2016-06-10T00:00:00", "Count": 31 }, { "Date": "2016-06-11T00:00:00", "Count": 31 }, { "Date": "2016-06-12T00:00:00", "Count": 31 }, { "Date": "2016-06-13T00:00:00", "Count": 29 }, { "Date": "2016-06-14T00:00:00", "Count": 29 }, { "Date": "2016-06-15T00:00:00", "Count": 28 }, { "Date": "2016-06-16T00:00:00", "Count": 28 }, { "Date": "2016-06-17T00:00:00", "Count": 30 }, { "Date": "2016-06-18T00:00:00", "Count": 30 }, { "Date": "2016-06-19T00:00:00", "Count": 30 }, { "Date": "2016-06-20T00:00:00", "Count": 31 }, { "Date": "2016-06-21T00:00:00", "Count": 33 }, { "Date": "2016-06-22T00:00:00", "Count": 31 }, { "Date": "2016-06-23T00:00:00", "Count": 32 }, { "Date": "2016-06-24T00:00:00", "Count": 32 }, { "Date": "2016-06-25T00:00:00", "Count": 33 }, { "Date": "2016-06-26T00:00:00", "Count": 33 }, { "Date": "2016-06-27T00:00:00", "Count": 34 }, { "Date": "2016-06-28T00:00:00", "Count": 34 }, { "Date": "2016-06-29T00:00:00", "Count": 35 }, { "Date": "2016-06-30T00:00:00", "Count": 35 }, { "Date": "2016-07-01T00:00:00", "Count": 35 }, { "Date": "2016-07-02T00:00:00", "Count": 35 }, { "Date": "2016-07-03T00:00:00", "Count": 35 }, { "Date": "2016-07-04T00:00:00", "Count": 35 }, { "Date": "2016-07-05T00:00:00", "Count": 35 }, { "Date": "2016-07-06T00:00:00", "Count": 32 }, { "Date": "2016-07-07T00:00:00", "Count": 32 }, { "Date": "2016-07-08T00:00:00", "Count": 33 }, { "Date": "2016-07-09T00:00:00", "Count": 34 }, { "Date": "2016-07-10T00:00:00", "Count": 38 }, { "Date": "2016-07-11T00:00:00", "Count": 39 }, { "Date": "2016-07-12T00:00:00", "Count": 38 }, { "Date": "2016-07-13T00:00:00", "Count": 39 }, { "Date": "2016-07-14T00:00:00", "Count": 38 }, { "Date": "2016-07-15T00:00:00", "Count": 48 }, { "Date": "2016-07-16T00:00:00", "Count": 48 }, { "Date": "2016-07-17T00:00:00", "Count": 48 }, { "Date": "2016-07-18T00:00:00", "Count": 48 }, { "Date": "2016-07-19T00:00:00", "Count": 48 }, { "Date": "2016-07-20T00:00:00", "Count": 48 }, { "Date": "2016-07-21T00:00:00", "Count": 36 }, { "Date": "2016-07-22T00:00:00", "Count": 36 }
                ],
                "OutreachBugs": [
                    { "Date": "2016-05-16T00:00:00", "Count": 2 }, { "Date": "2016-05-17T00:00:00", "Count": 2 }, { "Date": "2016-05-18T00:00:00", "Count": 3 }, { "Date": "2016-05-19T00:00:00", "Count": 3 }, { "Date": "2016-05-20T00:00:00", "Count": 3 }, { "Date": "2016-05-21T00:00:00", "Count": 3 }, { "Date": "2016-05-22T00:00:00", "Count": 3 }, { "Date": "2016-05-23T00:00:00", "Count": 3 }, { "Date": "2016-05-24T00:00:00", "Count": 3 }, { "Date": "2016-05-25T00:00:00", "Count": 3 }, { "Date": "2016-05-26T00:00:00", "Count": 3 }, { "Date": "2016-05-27T00:00:00", "Count": 3 }, { "Date": "2016-05-28T00:00:00", "Count": 3 }, { "Date": "2016-05-29T00:00:00", "Count": 3 }, { "Date": "2016-05-30T00:00:00", "Count": 3 }, { "Date": "2016-05-31T00:00:00", "Count": 3 }, { "Date": "2016-06-01T00:00:00", "Count": 3 }, { "Date": "2016-06-02T00:00:00", "Count": 3 }, { "Date": "2016-06-03T00:00:00", "Count": 3 }, { "Date": "2016-06-04T00:00:00", "Count": 3 }, { "Date": "2016-06-05T00:00:00", "Count": 3 }, { "Date": "2016-06-06T00:00:00", "Count": 3 }, { "Date": "2016-06-07T00:00:00", "Count": 3 }, { "Date": "2016-06-08T00:00:00", "Count": 3 }, { "Date": "2016-06-09T00:00:00", "Count": 3 }, { "Date": "2016-06-10T00:00:00", "Count": 3 }, { "Date": "2016-06-11T00:00:00", "Count": 3 }, { "Date": "2016-06-12T00:00:00", "Count": 3 }, { "Date": "2016-06-13T00:00:00", "Count": 1 }, { "Date": "2016-06-14T00:00:00", "Count": 11 }, { "Date": "2016-06-15T00:00:00", "Count": 10 }, { "Date": "2016-06-16T00:00:00", "Count": 10 }, { "Date": "2016-06-17T00:00:00", "Count": 11 }, { "Date": "2016-06-18T00:00:00", "Count": 11 }, { "Date": "2016-06-19T00:00:00", "Count": 11 }, { "Date": "2016-06-20T00:00:00", "Count": 11 }, { "Date": "2016-06-21T00:00:00", "Count": 11 }, { "Date": "2016-06-22T00:00:00", "Count": 11 }, { "Date": "2016-06-23T00:00:00", "Count": 11 }, { "Date": "2016-06-24T00:00:00", "Count": 11 }, { "Date": "2016-06-25T00:00:00", "Count": 11 }, { "Date": "2016-06-26T00:00:00", "Count": 11 }, { "Date": "2016-06-27T00:00:00", "Count": 10 }, { "Date": "2016-06-28T00:00:00", "Count": 11 }, { "Date": "2016-06-29T00:00:00", "Count": 11 }, { "Date": "2016-06-30T00:00:00", "Count": 11 }, { "Date": "2016-07-01T00:00:00", "Count": 11 }, { "Date": "2016-07-02T00:00:00", "Count": 11 }, { "Date": "2016-07-03T00:00:00", "Count": 11 }, { "Date": "2016-07-04T00:00:00", "Count": 11 }, { "Date": "2016-07-05T00:00:00", "Count": 11 }, { "Date": "2016-07-06T00:00:00", "Count": 2 }, { "Date": "2016-07-07T00:00:00", "Count": 2 }, { "Date": "2016-07-08T00:00:00", "Count": 2 }, { "Date": "2016-07-09T00:00:00", "Count": 2 }, { "Date": "2016-07-10T00:00:00", "Count": 2 }, { "Date": "2016-07-11T00:00:00", "Count": 2 }, { "Date": "2016-07-12T00:00:00", "Count": 2 }, { "Date": "2016-07-13T00:00:00", "Count": 2 }, { "Date": "2016-07-14T00:00:00", "Count": 2 }, { "Date": "2016-07-15T00:00:00", "Count": 2 }, { "Date": "2016-07-16T00:00:00", "Count": 2 }, { "Date": "2016-07-17T00:00:00", "Count": 2 }, { "Date": "2016-07-18T00:00:00", "Count": 2 }, { "Date": "2016-07-19T00:00:00", "Count": 2 }, { "Date": "2016-07-20T00:00:00", "Count": 2 }, { "Date": "2016-07-21T00:00:00", "Count": 3 }, { "Date": "2016-07-22T00:00:00", "Count": 3 }
                ],
                "CurrentReleaseBugs": [
                    { "Date": "2016-05-16T00:00:00", "Count": 5 }, { "Date": "2016-05-17T00:00:00", "Count": 9 }, { "Date": "2016-05-18T00:00:00", "Count": 6 }, { "Date": "2016-05-19T00:00:00", "Count": 7 }, { "Date": "2016-05-20T00:00:00", "Count": 7 }, { "Date": "2016-05-21T00:00:00", "Count": 6 }, { "Date": "2016-05-22T00:00:00", "Count": 6 }, { "Date": "2016-05-23T00:00:00", "Count": 5 }, { "Date": "2016-05-24T00:00:00", "Count": 4 }, { "Date": "2016-05-25T00:00:00", "Count": 4 }, { "Date": "2016-05-26T00:00:00", "Count": 3 }, { "Date": "2016-05-27T00:00:00", "Count": 3 }, { "Date": "2016-05-28T00:00:00", "Count": 3 }, { "Date": "2016-05-29T00:00:00", "Count": 3 }, { "Date": "2016-05-30T00:00:00", "Count": 3 }, { "Date": "2016-05-31T00:00:00", "Count": 3 }, { "Date": "2016-06-01T00:00:00", "Count": 11 }, { "Date": "2016-06-02T00:00:00", "Count": 11 }, { "Date": "2016-06-03T00:00:00", "Count": 12 }, { "Date": "2016-06-04T00:00:00", "Count": 11 }, { "Date": "2016-06-05T00:00:00", "Count": 11 }, { "Date": "2016-06-06T00:00:00", "Count": 12 }, { "Date": "2016-06-07T00:00:00", "Count": 10 }, { "Date": "2016-06-08T00:00:00", "Count": 9 }, { "Date": "2016-06-09T00:00:00", "Count": 12 }, { "Date": "2016-06-10T00:00:00", "Count": 12 }, { "Date": "2016-06-11T00:00:00", "Count": 12 }, { "Date": "2016-06-12T00:00:00", "Count": 12 }, { "Date": "2016-06-13T00:00:00", "Count": 10 }, { "Date": "2016-06-14T00:00:00", "Count": 17 }, { "Date": "2016-06-15T00:00:00", "Count": 20 }, { "Date": "2016-06-16T00:00:00", "Count": 20 }, { "Date": "2016-06-17T00:00:00", "Count": 22 }, { "Date": "2016-06-18T00:00:00", "Count": 21 }, { "Date": "2016-06-19T00:00:00", "Count": 21 }, { "Date": "2016-06-20T00:00:00", "Count": 19 }, { "Date": "2016-06-21T00:00:00", "Count": 19 }, { "Date": "2016-06-22T00:00:00", "Count": 16 }, { "Date": "2016-06-23T00:00:00", "Count": 18 }, { "Date": "2016-06-24T00:00:00", "Count": 18 }, { "Date": "2016-06-25T00:00:00", "Count": 20 }, { "Date": "2016-06-26T00:00:00", "Count": 20 }, { "Date": "2016-06-27T00:00:00", "Count": 24 }, { "Date": "2016-06-28T00:00:00", "Count": 21 }, { "Date": "2016-06-29T00:00:00", "Count": 20 }, { "Date": "2016-06-30T00:00:00", "Count": 19 }, { "Date": "2016-07-01T00:00:00", "Count": 21 }, { "Date": "2016-07-02T00:00:00", "Count": 21 }, { "Date": "2016-07-03T00:00:00", "Count": 21 }, { "Date": "2016-07-04T00:00:00", "Count": 22 }, { "Date": "2016-07-05T00:00:00", "Count": 19 }, { "Date": "2016-07-06T00:00:00", "Count": 7 }, { "Date": "2016-07-07T00:00:00", "Count": 9 }, { "Date": "2016-07-08T00:00:00", "Count": 9 }, { "Date": "2016-07-09T00:00:00", "Count": 8 }, { "Date": "2016-07-10T00:00:00", "Count": 8 }, { "Date": "2016-07-11T00:00:00", "Count": 7 }, { "Date": "2016-07-12T00:00:00", "Count": 6 }, { "Date": "2016-07-13T00:00:00", "Count": 7 }, { "Date": "2016-07-14T00:00:00", "Count": 6 }, { "Date": "2016-07-15T00:00:00", "Count": 6 }, { "Date": "2016-07-16T00:00:00", "Count": 6 }, { "Date": "2016-07-17T00:00:00", "Count": 6 }, { "Date": "2016-07-18T00:00:00", "Count": 5 }, { "Date": "2016-07-19T00:00:00", "Count": 5 }, { "Date": "2016-07-20T00:00:00", "Count": 5 }, { "Date": "2016-07-21T00:00:00", "Count": 4 }, { "Date": "2016-07-22T00:00:00", "Count": 4 }
                ]
            });
        }

        private getBugTrendChartOptions(multiseries: any) {
            var seriesNames = Object.keys(multiseries);
            var multiSeriesArray = new Array();

            $.each(seriesNames, (index, seriesName) => {
                var series = multiseries[seriesName];

                if (series.length > 0) {
                    series = this.formatChartPoints(series);
                }

                // format series name
                var spacedText = seriesName.replace(/([A-Z])/g, " $1");
                var noBugs = spacedText.replace(/(Bugs)/g, "");
                var capitalizedSeriesName = noBugs.charAt(0).toUpperCase() + noBugs.slice(1);

                multiSeriesArray.push({ "name": capitalizedSeriesName, "data": series });
            });

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
                series: multiSeriesArray,
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                }
            };
        }

        private getTrendChartOptions(name: string, series: any) {
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
                series: [
                    {
                        name: name,
                        data: this.formatChartPoints(series)
                    }
                ],
                legend: { enabled: false }
            }
        }

        private formatChartPoints(series) {
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

        private getSampleBugTableData(): any {
            return [
                { "Domain": "facebook.com", "Title": "Pinch zoom out not firing resize event", "Id": 107013, "Keywords": "ReducedDate_20140426 REDUCEDBY_mattkot; COMP_FUNC;  Interop1; Edge_TP1_Reviewed; zTop100 zNotorious250", "Tags": "nonhii; RSEdgeScrub1", "AssignedTo": "Matt Rakow", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition\\Scrolling Effects", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Edge: facebook.com: Text input box is broken from right end.", "Id": 3676153, "Keywords": "Interop0 BrTriage_150725 BrTriage_150725 reducedby_ujeshn ReducedDate_20150828", "Tags": "Mindtree; nonhii; RSEdgeScrub1; RSEdgeScrub1_Repro; RSEdgeScrub2; RSEdgeScrub2_Repro", "AssignedTo": "Balaji Bhaskar", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "apps.facebook.com: Scrolling is not smooth.", "Id": 4751931, "Keywords": "Interop1 BrTriage_150928 needsreduction ", "Tags": "Edgeflighting_TP13; Edgeflighting_TP19; Mindtree; RSEdgeScrub1; RSEdgeScrub1_Repro; TOPFB", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com typing is slow when the CPU is pegged", "Id": 4755478, "Keywords": "Interop1 needsreduction zTop100 zNotorious250", "Tags": "nonhii; RSEdgeScrub1; RSEdgeScrub1_Skipped", "AssignedTo": "Amit Jain (IOT)", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator: http://facebook.com: Narrator is reading same word in two different ways in two different places", "Id": 5329092, "Keywords": "IndiaAppCompat zTop100 zNotorious250", "Tags": "AccSelfLime; Mindtree; RSEdgeScrub1; RSEdgeScrub1_Skipped", "AssignedTo": "Cynthia Shelly", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[Edge F12] DOM - dom tree style attribute doesn't get updated when inline style is changed from style panel", "Id": 5736611, "Keywords": "", "Tags": "dom", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "JAWS  Screen Reader : Web Browsing : JAWS fails to read the description of controls in web pages in Microsoft Edge browser", "Id": 5890032, "Keywords": "IndiaAppCompat", "Tags": "AccWiPro; RSEdgeScrub1; RSEdgeScrub1_Skipped", "AssignedTo": "Rossen Atanassov", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "display:-webkit-box and absolute positioning do not work like Chrome (was: Phone: facebook.com : Check Mark icon is misaligned)", "Id": 5992144, "Keywords": "BrTriage_151230 Interop1 reducedby_frremy ReducedDate_20160213", "Tags": "Mindtree; Phone_EdgeFlighting_TP6; RSEdgeScrub1; RSEdgeScrub1_Repro", "AssignedTo": "Jianyong Meng", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\FlexBox", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Taking Web Note on scrolled Facebook news feed creates weird screenshot issues", "Id": 6249690, "Keywords": "", "Tags": "RSEdgeScrub1; RSEdgeScrub1_Repro", "AssignedTo": "Christian Fortini", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\REN-Rendering", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com : Left panel is flickering on scrolling", "Id": 6361337, "Keywords": "Interop0 BrTriage_160201 NeedsReduction", "Tags": "Edgeflighting_TP19; Mindtree; nonhii; RSEdgeScrub1; RSEdgeScrub1_Repro", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\REN-Rendering\\Jittery Fixed Elements", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[Microsoft Edge PC]:-[Overlapping is observed while trying to create a photo album on facebook.com]", "Id": 6414256, "Keywords": "PCTP Experiences;Spartan; Interop0", "Tags": "ac: validation manual - india; COMPAT_TRIAGED; Edgeflighting_TP19; PCTP Experiences", "AssignedTo": "Patrick Kettner", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\ECO-Web Developer Ecosystem\\Partner Outreach", "Product": "Web", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "[JPN][CONTINUUM] On facebook comment field input string is shown double.", "Id": 6766836, "Keywords": "", "Tags": "AXP_JTOP_Mobile; wtmrs", "AssignedTo": "Amit Jain (IOT)", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing\\IME", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Remove sRGB Color profile detection code in Edge", "Id": 6853978, "Keywords": "BrTriage_160316", "Tags": "Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Rafael Cintron", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Imaging", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Edge:facebook.com:Image overlapping in page print preview ", "Id": 6989313, "Keywords": "Interop1 reducedby_ujeshn ReducedDate_20160324 BrTriage_160324", "Tags": "Edgeflighting_TP19; Mindtree", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Buggy text input in Facebook text message input box on phone (desktop version of web site).", "Id": 7184601, "Keywords": "", "Tags": "", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: facebook.com - Edge browser crashes while trying to move the page in News Feed ( FAILURE_BUCKET_ID:  OOM_c00001ad_microsoftedgecp.exe!out_of_memory)", "Id": 7262326, "Keywords": "crash", "Tags": "th2_release_sec.10586.13094.20160305-1200; wipro", "AssignedTo": "Riff Jiang", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Memory", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Facebook.com - Chat window - Spell check line stays on after hitting enter to send message", "Id": 7283817, "Keywords": "", "Tags": "TIETRI_Approved", "AssignedTo": "Grisha Lyukshin", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing\\Spell Checking and Autocorrection", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "OOM_AVRF_c0000602_microsoftedgecp.exe!out_of_memory", "Id": 7296277, "Keywords": "", "Tags": "", "AssignedTo": "Kevin Babbitt", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com : User unable to enter text in the textboxes as the keypad pop ups momentarily", "Id": 7307300, "Keywords": "needsreduction; Rs1_Input_Related interop1", "Tags": "Mindtree; Phone_Edgeflighting_14295; Phone_EdgeFlighting_TP6; Phone_FH_14322; Phone_FH_14328; Phone_FH_14356", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Text input canvas does not move modern App windows to appropriate position", "Id": 7324455, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Amit Jain (IOT)", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Ctrl-V does not work in some Edge textboxes with Continuum hardware keyboard", "Id": 7332638, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback; TIETRI_Approved; wtmrs", "AssignedTo": "Nirankush Panchbhai", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[Lumia 950] m.facebook.com content realization is slow", "Id": 7434135, "Keywords": "SmoothPanning", "Tags": "", "AssignedTo": "Rico Mariani", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com: The beginning of the text doesn't start with a capital letter on Create Event", "Id": 7443191, "Keywords": "", "Tags": "bstfuture; Mindtree; MRolling100; Rolling100_Phone_TP8; TH2Fix_TP1", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Unable to open sound cloud links from fb app in edge", "Id": 7562488, "Keywords": "ImpactsFacebook", "Tags": "CE_UIF; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Patrick Kettner", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites\\Selfhosters", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[IST_IMP] Microsoft Edge: \"You must enable popups!\" message displayed after Selecting continue with facebook in Pinterest.comSTEPS TO REPRODUCE:1. Launch Browser-> open Pinterest.com website2. Once website is opened, tap on continue with Facebook-> Observ", "Id": 7672208, "Keywords": "", "Tags": "bstfuture; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Cant close that window...", "Id": 7679936, "Keywords": "", "Tags": "", "AssignedTo": "Ibrahim Orakli", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "[IST_IMP] Microsoft Edge: \"101: Requried parameters missing\" message displayed while logging via facebook in jabong.comSTEPS TO REPRODUCE:1. Launch Browser-> Open jabong.com website,Once website is opened2. Tap on sign in-> tap on Facebook->Log in with fa", "Id": 7714033, "Keywords": "", "Tags": "bstfuture; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Facebook chat region false render upon scrolling down", "Id": 7728219, "Keywords": "", "Tags": "", "AssignedTo": "Ibrahim Orakli", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "On Facebook event page, option to open street address in Maps prompts to install app.", "Id": 7729892, "Keywords": "", "Tags": "bstfuture; CE_UIF; Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Edge Seems to Freeze Up Frequently in Build 14361 on Many Common Big Sites (ex: Facebook Live Videos)", "Id": 7880491, "Keywords": "", "Tags": "", "AssignedTo": "Brad Edwards", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "text selection on facebook search box is not working as expected", "Id": 7884712, "Keywords": "Selection_RevampWorkRelated ImpactsFacebook ", "Tags": "TIETRI_Approved", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Autocorrection in Facebook chat puts the text selection in the middle of the autocorrected word in Microsoft Edge on HoloLens and Continuum", "Id": 7890978, "Keywords": "", "Tags": "bstfuture; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook.com : Narrator sets focus at different place instead on Heading for few headings while navigating in Headings mode", "Id": 7895555, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook.com : Narrator reads the items but there is no narrator focus around them", "Id": 7895590, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 3, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook : Narrator sets focus beside search box and reads as \"Editable text\".", "Id": 7895622, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[Microsoft Edge PC]:-[\"Add photos \" option is displayed twice , after deleting the uploaded image in facebook]", "Id": 7918916, "Keywords": "PCTP Experiences;Spartan needsreduction", "Tags": "ac: validation manual - india; COMPAT_TRIAGED; hii; PCTP Experiences", "AssignedTo": "Patrick Kettner", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: facebook: Video thumbnails are not loading", "Id": 7926043, "Keywords": "", "Tags": "bstfuture", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "LastPass extension: Icon overlaps with Edge password/x icons in email/password fields", "Id": 7927537, "Keywords": "", "Tags": "", "AssignedTo": "Chee Chen Tong", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\ECO-Web Developer Ecosystem\\Partner Outreach", "Product": "Edge Extensions", "Iteration": "OS\\1606" }, { "Domain": "facebook.com", "Title": "Edge doesn't support \"Facebook forgot password option\" with selection \"Use your google account to reset the password\". It stuck at email verified window. I had to use chrome to workaround it.", "Id": 7945817, "Keywords": "needsreduction ImpactsFacebook hii", "Tags": "CE_UIF; Checkbox Promoted; hii; Promoted User Feedback", "AssignedTo": "Kris Krueger", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 1, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\DOM-Document Object Model", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Depleted commit and graphics issues leading to black screen when IE puts the system under pressure in Windows 10", "Id": 7980207, "Keywords": "W10AdoptionBlocker; gethelp", "Tags": "", "AssignedTo": "Rico Mariani", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone:Facebook.com :Unable to add the legacy contact on Facebook as keyboard just comes and disappear when tapped on 'Choose a friend' text input field", "Id": 8012182, "Keywords": "", "Tags": "Mindtree; Phone_FH_14372", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "[OUTREACH]: Phone : facebook.com : Images do not fit the mobile viewport properly", "Id": 8012503, "Keywords": "", "Tags": "Adhoc_EmptyDescription; Mindtree; Phone_EdgeFlighting_TP6", "AssignedTo": "Patrick Kettner", "Triage": "Approved by Feature Team", "State": "Active", "Release": "2015", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\ECO-Web Developer Ecosystem\\Partner Outreach", "Product": "Web", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "On facebook.com, while window is of type ContentScriptGlobalScope, top is of type Window", "Id": 8034591, "Keywords": "", "Tags": "EXT_LastPass", "AssignedTo": "Scott Sheehan", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 0, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Redstone", "Iteration": "OS\\1609" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for the textboxes - Last name, Mobile number or email, Re-enter mobile number of email, New password, in Item view", "Id": 8038416, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for the textboxes - \"First Name\", \"Last Name\", \"Mobile number or email\" and \"Re-enter mobile number or email\" in \"Read from here\" view", "Id": 8038643, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for Birthday Month, Day and Year dropdowns, in \"Read from here\" view", "Id": 8038734, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: facebook.com: Clicking enter opens the dropdown menu but does not read the menu items for Settings and Friends dropdown, while narrator is in Item view", "Id": 8039543, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Text Pattern is reading content inside opaque elements instead of reading their label", "Id": 8049361, "Keywords": "", "Tags": "", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator: facebook.com:Narrator reads but does not highlight the Friend Requests, Messages and Notification icon in the page header, in \"Read from Here\" view", "Id": 8062534, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator does not highlight and read the \"Privacy Shortcuts\" link in the header, in \"Read from Here\" view", "Id": 8062670, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!CAPProcessor::DeferLogEvent", "Id": 8066241, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Edge is not responsive and pages hang a lot that I need to recover multiple tiles. I hit this on Sites like facebook craigslist msn news and others", "Id": 8091687, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Rico Mariani", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Feedback", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8123428, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8124989, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8125111, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "'Show/Display Password' button disappears from Password box after right click.", "Id": 8154457, "Keywords": "", "Tags": "Mindtree", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "facebook: typing inside chat is very slow", "Id": 8155729, "Keywords": "impactsfacebook", "Tags": "TIE_FACEBOOK_CLEAN; TIERS2", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Links take long time to open in edge", "Id": 8160430, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Rico Mariani", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Feedback", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "facebook.com: Photo Album pop-up window doesn't come up and photo uploading process keeps on running when trying to upload multiple photos.", "Id": 8165624, "Keywords": "Interop0", "Tags": "Mindtree", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: ASSERT:  scope->HasInnerScopeIndex() (Chakra!ByteCodeGenerator::GetStSlotOp+17b [d:\\a\\_work\\15\\s\\core\\lib\\runtime\\bytecode\\bytecodeemitter.cpp @ 4808])", "Id": 8171416, "Keywords": "", "Tags": "", "AssignedTo": "Paul Leathers", "Triage": "Investigate", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\Chakra Javascript Engine", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Comment editing glitches out on Facebook in Edge", "Id": 8179195, "Keywords": "", "Tags": "CE_UIF; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!GWND::PostWin32MethodCallMessage", "Id": 8192116, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Issues using Edge browser with Facebook", "Id": 8195701, "Keywords": "", "Tags": "", "AssignedTo": "Brad Edwards", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "[Phone Only] Edge as Facebook access - cannot type into the new post field when writing to someone else's timeline", "Id": 8210710, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com : Videos posted on timeline not playing inline", "Id": 8221404, "Keywords": "", "Tags": "Mindtree; Phone_FH_14390", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com : Tapping on post button on Facebook will pop up dialog box asking to \" Close the window\"", "Id": 8227829, "Keywords": "", "Tags": "Mindtree; Phone_FH_14393", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Pitch fluctuates during live streaming from Facebook Live", "Id": 8234235, "Keywords": "", "Tags": "", "AssignedTo": "Venkat Kudallur", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\MCN-Media, Communications, and Networking\\Audio", "Product": "Redstone", "Iteration": "OS\\1607" }
            ];
        }

        private renderBingdexColumn(data, type) {
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
                    { text: "Outreach bugs (" + this.outreachBugs.length + ")", value: this._bugTypeMap[BugType.Outreach] },
                    { text: "Switch risk bugs (" + this.switchRiskBugs.length + ")", value: this._bugTypeMap[BugType.SwitchRisk] },
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

            return this.formatChartPoints(data);
        }

        private get charts(): Array<TrendsForDomainRepository.Chart> {
            return this.repository.resultData["charts"];
        }

        private formatChartPoints(series) {
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
}