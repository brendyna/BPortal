import Config = require("../../Config");
import DetailsView = require("../../Views/Details.View");

export = Main;

module Main {
    let facebookParams = {
        domain: "facebook.com",
        platform: "Desktop",
        release: "RS1"
    };

    let facebookTh2Params = {
        release: "TH2"
    };

    $((): void => {
        setupMockjax();

        let details = new DetailsView.Widget($("#sample"), {
            viewContext: {
                params: $.extend({}, facebookParams)
            }
        });
    });

    export function setupMockjax(): void {
        // Get filters
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.Filters].join("/"),
            responseText: getMockFiltersData()
        });

        // Get buitwith data
        $.mockjax({
            url: [Config.Urls.DetailsPageBase, Config.Endpoints.GetBuildWithData].join("/"),
            responseText: getMockBuiltWithData(),
            data: (data) => {
                return data.domain === facebookParams.domain;
            }
        });

        // Get buitwith data
        $.mockjax({
            url: [Config.Urls.DetailsPageBase, Config.Endpoints.GetBuildWithData].join("/"),
            responseText: getMockBuiltWithData(),
            data: (data) => {
                return data.domain === facebookParams.domain;
            }
        });

        // Get trends for domain
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.TrendsForDomain].join("/"),
            responseText: getMockTrendsForDomainDataRs1(),
            data: (data) => {
                return data.domain === facebookParams.domain
                    && data.release === facebookParams.release;
            }
        });

        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.TrendsForDomain].join("/"),
            responseText: getMockTrendsForDomainDataTh2(),
            data: (data) => {
                return data.domain === facebookParams.domain
                    && data.release === facebookTh2Params.release;
            }
        });
    }

    export function getMockBuiltWithData(): any {
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

    export function getMockFiltersData(): any {
        return {
            "tag": [
                { "disabled": false, "selected": true, "text": " Bingdex Top 100", "value": "BingdexTop100" },
                { "disabled": false, "selected": false, "text": " Mind Tree Top Sites", "value": "MindTreeTopSites" },
                { "disabled": false, "selected": false, "text": " Mind Tree Notorious Sites", "value": "MindTreeNotoriousSites" },
                { "disabled": false, "selected": false, "text": " In Country Testing", "value": "InCountryTesting" }],
            "platform": [
                { "disabled": false, "selected": true, "text": "Desktop", "value": "Desktop" },
            ],
            "release": [
                { "disabled": false, "selected": false, "text": "TH1", "value": "TH1" },
                { "disabled": false, "selected": false, "text": "TH2", "value": "TH2" },
                { "disabled": false, "selected": true, "text": "RS1", "value": "RS1" }
            ]
        };
    }

    export function getMockTrendsForDomainDataRs1(): any {
        return {
            "charts": [
                {
                    "id": "frownies", "name": "Frownies", "dataPoints": [
                        { "date": "2016-04-27T00:00:00", "count": 7.0 }, { "date": "2016-04-28T00:00:00", "count": 10.0 }, { "date": "2016-04-29T00:00:00", "count": 2.0 }, { "date": "2016-04-30T00:00:00", "count": 3.0 }, { "date": "2016-05-01T00:00:00", "count": 5.0 }, { "date": "2016-05-02T00:00:00", "count": 2.0 }, { "date": "2016-05-03T00:00:00", "count": 5.0 }, { "date": "2016-05-04T00:00:00", "count": 6.0 }, { "date": "2016-05-05T00:00:00", "count": 6.0 }, { "date": "2016-05-06T00:00:00", "count": 2.0 }, { "date": "2016-05-07T00:00:00", "count": 3.0 }, { "date": "2016-05-08T00:00:00", "count": 1.0 }, { "date": "2016-05-09T00:00:00", "count": 5.0 }, { "date": "2016-05-10T00:00:00", "count": 4.0 }, { "date": "2016-05-11T00:00:00", "count": 10.0 }, { "date": "2016-05-12T00:00:00", "count": 14.0 }, { "date": "2016-05-13T00:00:00", "count": 5.0 }, { "date": "2016-05-14T00:00:00", "count": 6.0 }, { "date": "2016-05-15T00:00:00", "count": 1.0 }, { "date": "2016-05-16T00:00:00", "count": 4.0 }, { "date": "2016-05-17T00:00:00", "count": 4.0 }, { "date": "2016-05-18T00:00:00", "count": 2.0 }, { "date": "2016-05-19T00:00:00", "count": 10.0 }, { "date": "2016-05-20T00:00:00", "count": 7.0 }, { "date": "2016-05-21T00:00:00", "count": 5.0 }, { "date": "2016-05-22T00:00:00", "count": 3.0 }, { "date": "2016-05-23T00:00:00", "count": 11.0 }, { "date": "2016-05-24T00:00:00", "count": 15.0 }, { "date": "2016-05-25T00:00:00", "count": 4.0 }, { "date": "2016-05-26T00:00:00", "count": 2.0 }, { "date": "2016-05-27T00:00:00", "count": 4.0 }, { "date": "2016-05-28T00:00:00", "count": 4.0 }, { "date": "2016-05-29T00:00:00", "count": 5.0 }, { "date": "2016-05-30T00:00:00", "count": 4.0 }, { "date": "2016-05-31T00:00:00", "count": 8.0 }, { "date": "2016-06-01T00:00:00", "count": 3.0 }, { "date": "2016-06-02T00:00:00", "count": 3.0 }, { "date": "2016-06-03T00:00:00", "count": 3.0 }, { "date": "2016-06-04T00:00:00", "count": 2.0 }, { "date": "2016-06-05T00:00:00", "count": 7.0 }, { "date": "2016-06-06T00:00:00", "count": 2.0 }, { "date": "2016-06-07T00:00:00", "count": 1.0 }, { "date": "2016-06-08T00:00:00", "count": 3.0 }, { "date": "2016-06-09T00:00:00", "count": 4.0 }, { "date": "2016-06-10T00:00:00", "count": 1.0 }, { "date": "2016-06-11T00:00:00", "count": 3.0 }, { "date": "2016-06-12T00:00:00", "count": 1.0 }, { "date": "2016-06-13T00:00:00", "count": 10.0 }, { "date": "2016-06-14T00:00:00", "count": 1.0 }, { "date": "2016-06-16T00:00:00", "count": 4.0 }, { "date": "2016-06-17T00:00:00", "count": 2.0 }, { "date": "2016-06-18T00:00:00", "count": 6.0 }, { "date": "2016-06-20T00:00:00", "count": 3.0 }, { "date": "2016-06-21T00:00:00", "count": 6.0 }, { "date": "2016-06-22T00:00:00", "count": 10.0 }, { "date": "2016-06-23T00:00:00", "count": 4.0 }, { "date": "2016-06-24T00:00:00", "count": 3.0 }, { "date": "2016-06-25T00:00:00", "count": 2.0 }, { "date": "2016-06-26T00:00:00", "count": 1.0 }, { "date": "2016-06-27T00:00:00", "count": 6.0 }, { "date": "2016-06-28T00:00:00", "count": 9.0 }, { "date": "2016-06-29T00:00:00", "count": 10.0 }, { "date": "2016-06-30T00:00:00", "count": 6.0 }, { "date": "2016-07-01T00:00:00", "count": 5.0 }, { "date": "2016-07-02T00:00:00", "count": 9.0 }, { "date": "2016-07-03T00:00:00", "count": 9.0 }, { "date": "2016-07-04T00:00:00", "count": 5.0 }, { "date": "2016-07-05T00:00:00", "count": 7.0 }, { "date": "2016-07-06T00:00:00", "count": 7.0 }, { "date": "2016-07-07T00:00:00", "count": 2.0 }, { "date": "2016-07-08T00:00:00", "count": 6.0 }, { "date": "2016-07-09T00:00:00", "count": 1.0 }, { "date": "2016-07-10T00:00:00", "count": 2.0 }, { "date": "2016-07-11T00:00:00", "count": 3.0 }, { "date": "2016-07-12T00:00:00", "count": 5.0 }, { "date": "2016-07-13T00:00:00", "count": 8.0 }, { "date": "2016-07-14T00:00:00", "count": 4.0 }, { "date": "2016-07-15T00:00:00", "count": 6.0 }, { "date": "2016-07-16T00:00:00", "count": 4.0 }, { "date": "2016-07-17T00:00:00", "count": 1.0 }, { "date": "2016-07-19T00:00:00", "count": 3.0 }, { "date": "2016-07-20T00:00:00", "count": 2.0 }, { "date": "2016-07-21T00:00:00", "count": 2.0 }, { "date": "2016-07-22T00:00:00", "count": 1.0 }, { "date": "2016-07-24T00:00:00", "count": 1.0 }]
                }, {
                    "id": "crashes", "name": "Crashes", "dataPoints": []
                }, {
                    "id": "navigations", "name": "Navigations", "dataPoints": [
                        { "date": "2016-04-27T00:00:00", "count": 45922.0 }, { "date": "2016-04-28T00:00:00", "count": 45025.0 }, { "date": "2016-04-29T00:00:00", "count": 41359.0 }, { "date": "2016-04-30T00:00:00", "count": 37719.0 }, { "date": "2016-05-01T00:00:00", "count": 38853.0 }, { "date": "2016-05-02T00:00:00", "count": 41723.0 }, { "date": "2016-05-03T00:00:00", "count": 42896.0 }, { "date": "2016-05-04T00:00:00", "count": 43238.0 }, { "date": "2016-05-05T00:00:00", "count": 42470.0 }, { "date": "2016-05-06T00:00:00", "count": 41090.0 }, { "date": "2016-05-07T00:00:00", "count": 36428.0 }, { "date": "2016-05-08T00:00:00", "count": 38146.0 }, { "date": "2016-05-09T00:00:00", "count": 43091.0 }, { "date": "2016-05-10T00:00:00", "count": 42664.0 }, { "date": "2016-05-11T00:00:00", "count": 46194.0 }, { "date": "2016-05-12T00:00:00", "count": 44241.0 }, { "date": "2016-05-13T00:00:00", "count": 41447.0 }, { "date": "2016-05-14T00:00:00", "count": 37549.0 }, { "date": "2016-05-15T00:00:00", "count": 37332.0 }, { "date": "2016-05-16T00:00:00", "count": 43527.0 }, { "date": "2016-05-17T00:00:00", "count": 42132.0 }, { "date": "2016-05-18T00:00:00", "count": 43153.0 }, { "date": "2016-05-19T00:00:00", "count": 41882.0 }, { "date": "2016-05-20T00:00:00", "count": 40697.0 }, { "date": "2016-05-21T00:00:00", "count": 36262.0 }, { "date": "2016-05-22T00:00:00", "count": 36911.0 }, { "date": "2016-05-23T00:00:00", "count": 41908.0 }, { "date": "2016-05-24T00:00:00", "count": 41177.0 }, { "date": "2016-05-25T00:00:00", "count": 40939.0 }, { "date": "2016-05-26T00:00:00", "count": 38880.0 }, { "date": "2016-05-27T00:00:00", "count": 41558.0 }, { "date": "2016-05-28T00:00:00", "count": 37895.0 }, { "date": "2016-05-29T00:00:00", "count": 39678.0 }, { "date": "2016-05-30T00:00:00", "count": 42748.0 }, { "date": "2016-05-31T00:00:00", "count": 45768.0 }, { "date": "2016-06-01T00:00:00", "count": 45999.0 }, { "date": "2016-06-02T00:00:00", "count": 46203.0 }, { "date": "2016-06-03T00:00:00", "count": 44109.0 }, { "date": "2016-06-04T00:00:00", "count": 39286.0 }, { "date": "2016-06-05T00:00:00", "count": 39633.0 }, { "date": "2016-06-06T00:00:00", "count": 44539.0 }, { "date": "2016-06-07T00:00:00", "count": 45054.0 }, { "date": "2016-06-08T00:00:00", "count": 45377.0 }, { "date": "2016-06-09T00:00:00", "count": 46771.0 }, { "date": "2016-06-10T00:00:00", "count": 45326.0 }, { "date": "2016-06-11T00:00:00", "count": 40784.0 }, { "date": "2016-06-12T00:00:00", "count": 43426.0 }, { "date": "2016-06-13T00:00:00", "count": 49065.0 }, { "date": "2016-06-14T00:00:00", "count": 47716.0 }, { "date": "2016-06-15T00:00:00", "count": 49443.0 }, { "date": "2016-06-16T00:00:00", "count": 47813.0 }, { "date": "2016-06-17T00:00:00", "count": 48849.0 }, { "date": "2016-06-18T00:00:00", "count": 41286.0 }, { "date": "2016-06-19T00:00:00", "count": 44106.0 }, { "date": "2016-06-20T00:00:00", "count": 51030.0 }, { "date": "2016-06-21T00:00:00", "count": 49228.0 }, { "date": "2016-06-22T00:00:00", "count": 51016.0 }, { "date": "2016-06-23T00:00:00", "count": 47777.0 }, { "date": "2016-06-24T00:00:00", "count": 50440.0 }, { "date": "2016-06-25T00:00:00", "count": 42767.0 }, { "date": "2016-06-26T00:00:00", "count": 44887.0 }, { "date": "2016-06-27T00:00:00", "count": 51302.0 }, { "date": "2016-06-28T00:00:00", "count": 50651.0 }, { "date": "2016-06-29T00:00:00", "count": 51503.0 }, { "date": "2016-06-30T00:00:00", "count": 50792.0 }, { "date": "2016-07-01T00:00:00", "count": 50685.0 }, { "date": "2016-07-02T00:00:00", "count": 44394.0 }, { "date": "2016-07-03T00:00:00", "count": 43833.0 }, { "date": "2016-07-04T00:00:00", "count": 46286.0 }, { "date": "2016-07-05T00:00:00", "count": 49301.0 }, { "date": "2016-07-06T00:00:00", "count": 50194.0 }, { "date": "2016-07-07T00:00:00", "count": 49530.0 }, { "date": "2016-07-08T00:00:00", "count": 50197.0 }, { "date": "2016-07-09T00:00:00", "count": 44308.0 }, { "date": "2016-07-10T00:00:00", "count": 44993.0 }, { "date": "2016-07-11T00:00:00", "count": 51016.0 }, { "date": "2016-07-12T00:00:00", "count": 49994.0 }, { "date": "2016-07-13T00:00:00", "count": 50538.0 }, { "date": "2016-07-14T00:00:00", "count": 50690.0 }, { "date": "2016-07-15T00:00:00", "count": 51268.0 }, { "date": "2016-07-16T00:00:00", "count": 45621.0 }, { "date": "2016-07-17T00:00:00", "count": 44294.0 }, { "date": "2016-07-18T00:00:00", "count": 52176.0 }, { "date": "2016-07-19T00:00:00", "count": 52628.0 }, { "date": "2016-07-20T00:00:00", "count": 51552.0 }, { "date": "2016-07-21T00:00:00", "count": 51356.0 }, { "date": "2016-07-22T00:00:00", "count": 52212.0 }, { "date": "2016-07-23T00:00:00", "count": 48299.0 }, { "date": "2016-07-24T00:00:00", "count": 47240.0 }]
                }, {
                    "id": "focus-time", "name": "Focus Time (hours)", "dataPoints": [
                        { "date": "2016-04-27T00:00:00", "count": 240.0 }, { "date": "2016-04-28T00:00:00", "count": 251.0 }, { "date": "2016-04-29T00:00:00", "count": 219.0 }, { "date": "2016-04-30T00:00:00", "count": 208.0 }, { "date": "2016-05-01T00:00:00", "count": 230.0 }, { "date": "2016-05-02T00:00:00", "count": 257.0 }, { "date": "2016-05-03T00:00:00", "count": 269.0 }, { "date": "2016-05-04T00:00:00", "count": 263.0 }, { "date": "2016-05-05T00:00:00", "count": 260.0 }, { "date": "2016-05-06T00:00:00", "count": 233.0 }, { "date": "2016-05-07T00:00:00", "count": 253.0 }, { "date": "2016-05-08T00:00:00", "count": 239.0 }, { "date": "2016-05-09T00:00:00", "count": 274.0 }, { "date": "2016-05-10T00:00:00", "count": 250.0 }, { "date": "2016-05-11T00:00:00", "count": 237.0 }, { "date": "2016-05-12T00:00:00", "count": 246.0 }, { "date": "2016-05-13T00:00:00", "count": 226.0 }, { "date": "2016-05-14T00:00:00", "count": 221.0 }, { "date": "2016-05-15T00:00:00", "count": 218.0 }, { "date": "2016-05-16T00:00:00", "count": 242.0 }, { "date": "2016-05-17T00:00:00", "count": 242.0 }, { "date": "2016-05-18T00:00:00", "count": 225.0 }, { "date": "2016-05-19T00:00:00", "count": 222.0 }, { "date": "2016-05-20T00:00:00", "count": 212.0 }, { "date": "2016-05-21T00:00:00", "count": 206.0 }, { "date": "2016-05-22T00:00:00", "count": 214.0 }, { "date": "2016-05-23T00:00:00", "count": 229.0 }, { "date": "2016-05-24T00:00:00", "count": 214.0 }, { "date": "2016-05-25T00:00:00", "count": 225.0 }, { "date": "2016-05-26T00:00:00", "count": 221.0 }, { "date": "2016-05-27T00:00:00", "count": 210.0 }, { "date": "2016-05-28T00:00:00", "count": 235.0 }, { "date": "2016-05-29T00:00:00", "count": 259.0 }, { "date": "2016-05-30T00:00:00", "count": 249.0 }, { "date": "2016-05-31T00:00:00", "count": 269.0 }, { "date": "2016-06-01T00:00:00", "count": 275.0 }, { "date": "2016-06-02T00:00:00", "count": 263.0 }, { "date": "2016-06-03T00:00:00", "count": 258.0 }, { "date": "2016-06-04T00:00:00", "count": 255.0 }, { "date": "2016-06-05T00:00:00", "count": 277.0 }, { "date": "2016-06-06T00:00:00", "count": 251.0 }, { "date": "2016-06-07T00:00:00", "count": 256.0 }, { "date": "2016-06-08T00:00:00", "count": 252.0 }, { "date": "2016-06-09T00:00:00", "count": 225.0 }, { "date": "2016-06-10T00:00:00", "count": 211.0 }, { "date": "2016-06-11T00:00:00", "count": 204.0 }, { "date": "2016-06-12T00:00:00", "count": 212.0 }, { "date": "2016-06-13T00:00:00", "count": 206.0 }, { "date": "2016-06-14T00:00:00", "count": 269.0 }, { "date": "2016-06-15T00:00:00", "count": 200.0 }, { "date": "2016-06-16T00:00:00", "count": 223.0 }, { "date": "2016-06-17T00:00:00", "count": 169.0 }, { "date": "2016-06-18T00:00:00", "count": 173.0 }, { "date": "2016-06-19T00:00:00", "count": 194.0 }, { "date": "2016-06-20T00:00:00", "count": 209.0 }, { "date": "2016-06-21T00:00:00", "count": 213.0 }, { "date": "2016-06-22T00:00:00", "count": 218.0 }, { "date": "2016-06-23T00:00:00", "count": 190.0 }, { "date": "2016-06-24T00:00:00", "count": 219.0 }, { "date": "2016-06-25T00:00:00", "count": 190.0 }, { "date": "2016-06-26T00:00:00", "count": 214.0 }, { "date": "2016-06-27T00:00:00", "count": 242.0 }, { "date": "2016-06-28T00:00:00", "count": 226.0 }, { "date": "2016-06-29T00:00:00", "count": 194.0 }, { "date": "2016-06-30T00:00:00", "count": 217.0 }, { "date": "2016-07-01T00:00:00", "count": 182.0 }, { "date": "2016-07-02T00:00:00", "count": 159.0 }, { "date": "2016-07-03T00:00:00", "count": 181.0 }, { "date": "2016-07-04T00:00:00", "count": 188.0 }, { "date": "2016-07-05T00:00:00", "count": 187.0 }, { "date": "2016-07-06T00:00:00", "count": 194.0 }, { "date": "2016-07-07T00:00:00", "count": 198.0 }, { "date": "2016-07-08T00:00:00", "count": 196.0 }, { "date": "2016-07-09T00:00:00", "count": 186.0 }, { "date": "2016-07-10T00:00:00", "count": 193.0 }, { "date": "2016-07-11T00:00:00", "count": 202.0 }, { "date": "2016-07-12T00:00:00", "count": 210.0 }, { "date": "2016-07-13T00:00:00", "count": 202.0 }, { "date": "2016-07-14T00:00:00", "count": 214.0 }, { "date": "2016-07-15T00:00:00", "count": 205.0 }, { "date": "2016-07-16T00:00:00", "count": 177.0 }, { "date": "2016-07-17T00:00:00", "count": 183.0 }, { "date": "2016-07-18T00:00:00", "count": 190.0 }, { "date": "2016-07-19T00:00:00", "count": 190.0 }, { "date": "2016-07-20T00:00:00", "count": 204.0 }, { "date": "2016-07-21T00:00:00", "count": 209.0 }, { "date": "2016-07-22T00:00:00", "count": 207.0 }, { "date": "2016-07-23T00:00:00", "count": 199.0 }]
                }]
        };
    }

    export function getMockTrendsForDomainDataTh2(): any {
        return { "charts": [{ "id": "frownies", "name": "Frownies", "dataPoints": [{ "date": "2016-05-07T00:00:00", "count": 71.0 }, { "date": "2016-05-08T00:00:00", "count": 91.0 }, { "date": "2016-05-09T00:00:00", "count": 58.0 }, { "date": "2016-05-10T00:00:00", "count": 78.0 }, { "date": "2016-05-11T00:00:00", "count": 61.0 }, { "date": "2016-05-12T00:00:00", "count": 65.0 }, { "date": "2016-05-13T00:00:00", "count": 63.0 }, { "date": "2016-05-14T00:00:00", "count": 52.0 }, { "date": "2016-05-15T00:00:00", "count": 94.0 }, { "date": "2016-05-16T00:00:00", "count": 55.0 }, { "date": "2016-05-17T00:00:00", "count": 58.0 }, { "date": "2016-05-18T00:00:00", "count": 75.0 }, { "date": "2016-05-19T00:00:00", "count": 95.0 }, { "date": "2016-05-20T00:00:00", "count": 68.0 }, { "date": "2016-05-21T00:00:00", "count": 70.0 }, { "date": "2016-05-22T00:00:00", "count": 78.0 }, { "date": "2016-05-23T00:00:00", "count": 54.0 }, { "date": "2016-05-24T00:00:00", "count": 70.0 }, { "date": "2016-05-25T00:00:00", "count": 82.0 }, { "date": "2016-05-26T00:00:00", "count": 81.0 }, { "date": "2016-05-27T00:00:00", "count": 66.0 }, { "date": "2016-05-28T00:00:00", "count": 53.0 }, { "date": "2016-05-29T00:00:00", "count": 56.0 }, { "date": "2016-05-30T00:00:00", "count": 69.0 }, { "date": "2016-05-31T00:00:00", "count": 72.0 }, { "date": "2016-06-01T00:00:00", "count": 73.0 }, { "date": "2016-06-02T00:00:00", "count": 83.0 }, { "date": "2016-06-03T00:00:00", "count": 62.0 }, { "date": "2016-06-04T00:00:00", "count": 52.0 }, { "date": "2016-06-05T00:00:00", "count": 64.0 }, { "date": "2016-06-06T00:00:00", "count": 63.0 }, { "date": "2016-06-07T00:00:00", "count": 62.0 }, { "date": "2016-06-08T00:00:00", "count": 70.0 }, { "date": "2016-06-09T00:00:00", "count": 64.0 }, { "date": "2016-06-10T00:00:00", "count": 62.0 }, { "date": "2016-06-11T00:00:00", "count": 69.0 }, { "date": "2016-06-12T00:00:00", "count": 61.0 }, { "date": "2016-06-13T00:00:00", "count": 59.0 }, { "date": "2016-06-14T00:00:00", "count": 58.0 }, { "date": "2016-06-15T00:00:00", "count": 84.0 }, { "date": "2016-06-16T00:00:00", "count": 73.0 }, { "date": "2016-06-17T00:00:00", "count": 87.0 }, { "date": "2016-06-18T00:00:00", "count": 74.0 }, { "date": "2016-06-19T00:00:00", "count": 72.0 }, { "date": "2016-06-20T00:00:00", "count": 58.0 }, { "date": "2016-06-21T00:00:00", "count": 73.0 }, { "date": "2016-06-22T00:00:00", "count": 62.0 }, { "date": "2016-06-23T00:00:00", "count": 69.0 }, { "date": "2016-06-24T00:00:00", "count": 76.0 }, { "date": "2016-06-25T00:00:00", "count": 100.0 }, { "date": "2016-06-26T00:00:00", "count": 73.0 }, { "date": "2016-06-27T00:00:00", "count": 74.0 }, { "date": "2016-06-28T00:00:00", "count": 59.0 }, { "date": "2016-06-29T00:00:00", "count": 67.0 }, { "date": "2016-06-30T00:00:00", "count": 66.0 }, { "date": "2016-07-01T00:00:00", "count": 72.0 }, { "date": "2016-07-02T00:00:00", "count": 71.0 }, { "date": "2016-07-03T00:00:00", "count": 63.0 }, { "date": "2016-07-04T00:00:00", "count": 69.0 }, { "date": "2016-07-05T00:00:00", "count": 78.0 }, { "date": "2016-07-06T00:00:00", "count": 50.0 }, { "date": "2016-07-07T00:00:00", "count": 68.0 }, { "date": "2016-07-08T00:00:00", "count": 47.0 }, { "date": "2016-07-09T00:00:00", "count": 58.0 }, { "date": "2016-07-10T00:00:00", "count": 87.0 }, { "date": "2016-07-11T00:00:00", "count": 63.0 }, { "date": "2016-07-12T00:00:00", "count": 71.0 }, { "date": "2016-07-13T00:00:00", "count": 110.0 }, { "date": "2016-07-14T00:00:00", "count": 87.0 }, { "date": "2016-07-15T00:00:00", "count": 85.0 }, { "date": "2016-07-16T00:00:00", "count": 62.0 }, { "date": "2016-07-17T00:00:00", "count": 78.0 }, { "date": "2016-07-18T00:00:00", "count": 63.0 }, { "date": "2016-07-19T00:00:00", "count": 66.0 }, { "date": "2016-07-20T00:00:00", "count": 58.0 }, { "date": "2016-07-21T00:00:00", "count": 53.0 }, { "date": "2016-07-22T00:00:00", "count": 78.0 }, { "date": "2016-07-23T00:00:00", "count": 71.0 }, { "date": "2016-07-24T00:00:00", "count": 75.0 }, { "date": "2016-07-25T00:00:00", "count": 90.0 }, { "date": "2016-07-26T00:00:00", "count": 77.0 }, { "date": "2016-07-27T00:00:00", "count": 57.0 }, { "date": "2016-07-28T00:00:00", "count": 66.0 }, { "date": "2016-07-29T00:00:00", "count": 67.0 }, { "date": "2016-07-30T00:00:00", "count": 69.0 }, { "date": "2016-07-31T00:00:00", "count": 62.0 }, { "date": "2016-08-01T00:00:00", "count": 64.0 }, { "date": "2016-08-02T00:00:00", "count": 58.0 }, { "date": "2016-08-03T00:00:00", "count": 89.0 }] }, { "id": "crashes", "name": "Crashes", "dataPoints": [] }, { "id": "navigations", "name": "Navigations", "dataPoints": [{ "date": "2016-05-08T00:00:00", "count": 750392.0 }, { "date": "2016-05-09T00:00:00", "count": 834517.0 }, { "date": "2016-05-10T00:00:00", "count": 827558.0 }, { "date": "2016-05-11T00:00:00", "count": 821403.0 }, { "date": "2016-05-12T00:00:00", "count": 817127.0 }, { "date": "2016-05-13T00:00:00", "count": 790873.0 }, { "date": "2016-05-14T00:00:00", "count": 751795.0 }, { "date": "2016-05-15T00:00:00", "count": 772897.0 }, { "date": "2016-05-16T00:00:00", "count": 858371.0 }, { "date": "2016-05-17T00:00:00", "count": 838323.0 }, { "date": "2016-05-18T00:00:00", "count": 855575.0 }, { "date": "2016-05-19T00:00:00", "count": 850122.0 }, { "date": "2016-05-20T00:00:00", "count": 837904.0 }, { "date": "2016-05-21T00:00:00", "count": 782085.0 }, { "date": "2016-05-22T00:00:00", "count": 822026.0 }, { "date": "2016-05-23T00:00:00", "count": 908133.0 }, { "date": "2016-05-24T00:00:00", "count": 902387.0 }, { "date": "2016-05-25T00:00:00", "count": 893624.0 }, { "date": "2016-05-26T00:00:00", "count": 896242.0 }, { "date": "2016-05-27T00:00:00", "count": 862627.0 }, { "date": "2016-05-28T00:00:00", "count": 787878.0 }, { "date": "2016-05-29T00:00:00", "count": 827226.0 }, { "date": "2016-05-30T00:00:00", "count": 918706.0 }, { "date": "2016-05-31T00:00:00", "count": 931637.0 }, { "date": "2016-06-01T00:00:00", "count": 915666.0 }, { "date": "2016-06-02T00:00:00", "count": 941461.0 }, { "date": "2016-06-03T00:00:00", "count": 902860.0 }, { "date": "2016-06-04T00:00:00", "count": 838356.0 }, { "date": "2016-06-05T00:00:00", "count": 873716.0 }, { "date": "2016-06-06T00:00:00", "count": 981295.0 }, { "date": "2016-06-07T00:00:00", "count": 966083.0 }, { "date": "2016-06-08T00:00:00", "count": 958273.0 }, { "date": "2016-06-09T00:00:00", "count": 959809.0 }, { "date": "2016-06-10T00:00:00", "count": 926020.0 }, { "date": "2016-06-11T00:00:00", "count": 858233.0 }, { "date": "2016-06-12T00:00:00", "count": 914874.0 }, { "date": "2016-06-13T00:00:00", "count": 1009030.0 }, { "date": "2016-06-14T00:00:00", "count": 1004111.0 }, { "date": "2016-06-15T00:00:00", "count": 998712.0 }, { "date": "2016-06-16T00:00:00", "count": 983811.0 }, { "date": "2016-06-17T00:00:00", "count": 937116.0 }, { "date": "2016-06-18T00:00:00", "count": 855178.0 }, { "date": "2016-06-19T00:00:00", "count": 888791.0 }, { "date": "2016-06-20T00:00:00", "count": 1006194.0 }, { "date": "2016-06-21T00:00:00", "count": 980932.0 }, { "date": "2016-06-22T00:00:00", "count": 983959.0 }, { "date": "2016-06-23T00:00:00", "count": 944852.0 }, { "date": "2016-06-24T00:00:00", "count": 945449.0 }, { "date": "2016-06-25T00:00:00", "count": 846748.0 }, { "date": "2016-06-26T00:00:00", "count": 905778.0 }, { "date": "2016-06-27T00:00:00", "count": 1007194.0 }, { "date": "2016-06-28T00:00:00", "count": 981534.0 }, { "date": "2016-06-29T00:00:00", "count": 969262.0 }, { "date": "2016-06-30T00:00:00", "count": 957262.0 }, { "date": "2016-07-01T00:00:00", "count": 924990.0 }, { "date": "2016-07-02T00:00:00", "count": 848849.0 }, { "date": "2016-07-03T00:00:00", "count": 861898.0 }, { "date": "2016-07-04T00:00:00", "count": 938055.0 }, { "date": "2016-07-05T00:00:00", "count": 972791.0 }, { "date": "2016-07-06T00:00:00", "count": 945038.0 }, { "date": "2016-07-07T00:00:00", "count": 939630.0 }, { "date": "2016-07-08T00:00:00", "count": 932081.0 }, { "date": "2016-07-09T00:00:00", "count": 845991.0 }, { "date": "2016-07-10T00:00:00", "count": 865465.0 }, { "date": "2016-07-11T00:00:00", "count": 986302.0 }, { "date": "2016-07-12T00:00:00", "count": 968787.0 }, { "date": "2016-07-13T00:00:00", "count": 978493.0 }, { "date": "2016-07-14T00:00:00", "count": 956623.0 }, { "date": "2016-07-15T00:00:00", "count": 933791.0 }, { "date": "2016-07-16T00:00:00", "count": 850316.0 }, { "date": "2016-07-17T00:00:00", "count": 864830.0 }, { "date": "2016-07-18T00:00:00", "count": 972787.0 }, { "date": "2016-07-19T00:00:00", "count": 950515.0 }, { "date": "2016-07-20T00:00:00", "count": 950043.0 }, { "date": "2016-07-21T00:00:00", "count": 951846.0 }, { "date": "2016-07-22T00:00:00", "count": 932229.0 }, { "date": "2016-07-23T00:00:00", "count": 864520.0 }, { "date": "2016-07-24T00:00:00", "count": 878333.0 }, { "date": "2016-07-25T00:00:00", "count": 1001454.0 }, { "date": "2016-07-26T00:00:00", "count": 986005.0 }, { "date": "2016-07-27T00:00:00", "count": 978752.0 }, { "date": "2016-07-28T00:00:00", "count": 963518.0 }, { "date": "2016-07-29T00:00:00", "count": 937216.0 }, { "date": "2016-07-30T00:00:00", "count": 851797.0 }, { "date": "2016-07-31T00:00:00", "count": 878395.0 }, { "date": "2016-08-01T00:00:00", "count": 994726.0 }, { "date": "2016-08-02T00:00:00", "count": 980270.0 }, { "date": "2016-08-03T00:00:00", "count": 957204.0 }] }, { "id": "focus-time", "name": "Focus Time (hours)", "dataPoints": [{ "date": "2016-05-05T00:00:00", "count": 31.0 }, { "date": "2016-05-06T00:00:00", "count": 32.0 }, { "date": "2016-05-07T00:00:00", "count": 28.0 }, { "date": "2016-05-08T00:00:00", "count": 34.0 }, { "date": "2016-05-09T00:00:00", "count": 30.0 }, { "date": "2016-05-10T00:00:00", "count": 32.0 }, { "date": "2016-05-11T00:00:00", "count": 40.0 }, { "date": "2016-05-12T00:00:00", "count": 34.0 }, { "date": "2016-05-13T00:00:00", "count": 30.0 }, { "date": "2016-05-14T00:00:00", "count": 35.0 }, { "date": "2016-05-15T00:00:00", "count": 31.0 }, { "date": "2016-05-16T00:00:00", "count": 34.0 }, { "date": "2016-05-17T00:00:00", "count": 30.0 }, { "date": "2016-05-18T00:00:00", "count": 25.0 }, { "date": "2016-05-19T00:00:00", "count": 25.0 }, { "date": "2016-05-20T00:00:00", "count": 29.0 }, { "date": "2016-05-21T00:00:00", "count": 22.0 }, { "date": "2016-05-22T00:00:00", "count": 33.0 }, { "date": "2016-05-23T00:00:00", "count": 25.0 }, { "date": "2016-05-24T00:00:00", "count": 29.0 }, { "date": "2016-05-25T00:00:00", "count": 29.0 }, { "date": "2016-05-26T00:00:00", "count": 24.0 }, { "date": "2016-05-27T00:00:00", "count": 25.0 }, { "date": "2016-05-28T00:00:00", "count": 23.0 }, { "date": "2016-05-29T00:00:00", "count": 24.0 }, { "date": "2016-05-30T00:00:00", "count": 25.0 }, { "date": "2016-05-31T00:00:00", "count": 30.0 }, { "date": "2016-06-01T00:00:00", "count": 22.0 }, { "date": "2016-06-02T00:00:00", "count": 27.0 }, { "date": "2016-06-03T00:00:00", "count": 23.0 }, { "date": "2016-06-04T00:00:00", "count": 30.0 }, { "date": "2016-06-05T00:00:00", "count": 26.0 }, { "date": "2016-06-06T00:00:00", "count": 25.0 }, { "date": "2016-06-07T00:00:00", "count": 26.0 }, { "date": "2016-06-08T00:00:00", "count": 23.0 }, { "date": "2016-06-09T00:00:00", "count": 20.0 }, { "date": "2016-06-10T00:00:00", "count": 19.0 }, { "date": "2016-06-11T00:00:00", "count": 25.0 }, { "date": "2016-06-12T00:00:00", "count": 25.0 }, { "date": "2016-06-13T00:00:00", "count": 19.0 }, { "date": "2016-06-14T00:00:00", "count": 24.0 }, { "date": "2016-06-15T00:00:00", "count": 20.0 }, { "date": "2016-06-16T00:00:00", "count": 25.0 }, { "date": "2016-06-17T00:00:00", "count": 21.0 }, { "date": "2016-06-18T00:00:00", "count": 25.0 }, { "date": "2016-06-19T00:00:00", "count": 23.0 }, { "date": "2016-06-20T00:00:00", "count": 25.0 }, { "date": "2016-06-21T00:00:00", "count": 23.0 }, { "date": "2016-06-22T00:00:00", "count": 25.0 }, { "date": "2016-06-23T00:00:00", "count": 22.0 }, { "date": "2016-06-24T00:00:00", "count": 29.0 }, { "date": "2016-06-25T00:00:00", "count": 23.0 }, { "date": "2016-06-26T00:00:00", "count": 21.0 }, { "date": "2016-06-27T00:00:00", "count": 25.0 }, { "date": "2016-06-28T00:00:00", "count": 21.0 }, { "date": "2016-06-29T00:00:00", "count": 22.0 }, { "date": "2016-06-30T00:00:00", "count": 21.0 }, { "date": "2016-07-01T00:00:00", "count": 20.0 }, { "date": "2016-07-02T00:00:00", "count": 24.0 }, { "date": "2016-07-03T00:00:00", "count": 28.0 }, { "date": "2016-07-04T00:00:00", "count": 22.0 }, { "date": "2016-07-05T00:00:00", "count": 26.0 }, { "date": "2016-07-06T00:00:00", "count": 28.0 }, { "date": "2016-07-07T00:00:00", "count": 24.0 }, { "date": "2016-07-08T00:00:00", "count": 25.0 }, { "date": "2016-07-09T00:00:00", "count": 22.0 }, { "date": "2016-07-10T00:00:00", "count": 24.0 }, { "date": "2016-07-11T00:00:00", "count": 26.0 }, { "date": "2016-07-12T00:00:00", "count": 25.0 }, { "date": "2016-07-13T00:00:00", "count": 27.0 }, { "date": "2016-07-14T00:00:00", "count": 25.0 }, { "date": "2016-07-15T00:00:00", "count": 24.0 }, { "date": "2016-07-16T00:00:00", "count": 22.0 }, { "date": "2016-07-17T00:00:00", "count": 26.0 }, { "date": "2016-07-18T00:00:00", "count": 22.0 }, { "date": "2016-07-19T00:00:00", "count": 23.0 }, { "date": "2016-07-20T00:00:00", "count": 22.0 }, { "date": "2016-07-21T00:00:00", "count": 26.0 }, { "date": "2016-07-22T00:00:00", "count": 24.0 }, { "date": "2016-07-23T00:00:00", "count": 17.0 }, { "date": "2016-07-24T00:00:00", "count": 17.0 }, { "date": "2016-07-25T00:00:00", "count": 17.0 }, { "date": "2016-07-26T00:00:00", "count": 19.0 }, { "date": "2016-07-27T00:00:00", "count": 19.0 }, { "date": "2016-07-27T00:00:00", "count": 0.0 }, { "date": "2016-07-28T00:00:00", "count": 18.0 }, { "date": "2016-07-29T00:00:00", "count": 17.0 }, { "date": "2016-07-30T00:00:00", "count": 0.0 }, { "date": "2016-07-30T00:00:00", "count": 28.0 }, { "date": "2016-07-31T00:00:00", "count": 0.0 }, { "date": "2016-07-31T00:00:00", "count": 19.0 }] }] };
    }
}