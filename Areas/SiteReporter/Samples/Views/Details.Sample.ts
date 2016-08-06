import Config = require("../../Config");
import DetailsView = require("../../Views/Details.View");

export = Main;

module Main {
    let facebookParams = {
        domain: "facebook.com",
        platform: "Desktop",
        release: "Rs1"
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
            url: [Config.Urls.DetailsPageBase, Config.Endpoints.GetBuildWithData].join("/"),
            responseText: getMockBuiltWithData(),
            data: (data) => {
                return data.domain === facebookParams.domain;
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
}