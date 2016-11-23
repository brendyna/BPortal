import "jquery.mockjax";
import BaseConfig = require("Areas/Shared/Config");
import Config = require("../../Config");
import ReportListRepo = require("../../Data/Repositories/PowerBiReportList.Repository");

export = Main;

module Main {
    if (BaseConfig.isTestRunnerMode()) {
        $.mockjaxSettings.logging = false;
    }

    export function setupReportListMock(): void {
        $.mockjax({
            url: [Config.Urls.PowerBiReportsBaseUrl, Config.Endpoints.ReportsList].join("/"),
            responseText: getMockReportListData()
        });
    }

    export function getMockReportListData(): ReportListRepo.DataTransferObject {
        let reportList: Array<ReportListRepo.PowerBiReport> =
            [
                {
                    "description": "WindowsStoreRecomendation Service usage details.",
                    "group": "WindowsStoreRecomendation",
                    "contact": "kaamin",
                    "tags": "appmap",
                    "id": "349179a5-a35e-489a-b889-e108e97b44bc",
                    "name": "AppMap Reports",
                    "webUrl": "https://app.powerbi.com/reports/349179a5-a35e-489a-b889-e108e97b44bc",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=349179a5-a35e-489a-b889-e108e97b44bc"
                },
                {
                    "description": "WebView Usage Investigation  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk ",
                    "group": "WAF",
                    "contact": "kellycan",
                    "tags": "waf,webview",
                    "id": "90d2958e-dec6-469b-970c-279f09388b3d",
                    "name": "WebViewUsageInvestigation",
                    "webUrl": "https://app.powerbi.com/reports/90d2958e-dec6-469b-970c-279f09388b3d",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=90d2958e-dec6-469b-970c-279f09388b3d"
                },
                {
                    "description": "Html5 Test Score",
                    "group": "TestGroup1",
                    "contact": "anujohn",
                    "tags": "html",
                    "id": "3a79b1f9-3e99-4ce3-924f-90c9802b3fd7",
                    "name": "HtmlTestScore V1",
                    "webUrl": "https://app.powerbi.com/reports/3a79b1f9-3e99-4ce3-924f-90c9802b3fd7",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=3a79b1f9-3e99-4ce3-924f-90c9802b3fd7"
                },
                {
                    "description": "NPS Score Graph  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk ",
                    "group": "TestGroup1",
                    "contact": "anujohn",
                    "tags": "nps",
                    "id": "77dae9e9-ccf6-4f01-a71f-32e6bbe9b049",
                    "name": "NPS Score Graph",
                    "webUrl": "https://app.powerbi.com/reports/77dae9e9-ccf6-4f01-a71f-32e6bbe9b049",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=77dae9e9-ccf6-4f01-a71f-32e6bbe9b049"
                },
                {
                    "description": "Site Feedback Report",
                    "group": "TestGroup2",
                    "contact": "rrajendr",
                    "tags": "feedback",
                    "id": "1de78261-36e6-4c67-a7e3-64cd195bc0c1",
                    "name": "Site Feedback Report",
                    "webUrl": "https://app.powerbi.com/reports/1de78261-36e6-4c67-a7e3-64cd195bc0c1",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=1de78261-36e6-4c67-a7e3-64cd195bc0c1"
                },
                {
                    "description": "WPT Less Privileged App Container (LPAC)",
                    "group": "TestGroup1",
                    "contact": "pchawla",
                    "tags": null,
                    "id": "c3638a10-ceb4-4598-9a02-260eca22ad35",
                    "name": "WPT Less Privileged App Container (LPAC)",
                    "webUrl": "https://app.powerbi.com/reports/c3638a10-ceb4-4598-9a02-260eca22ad35",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=c3638a10-ceb4-4598-9a02-260eca22ad35"
                },
                {
                    "description": "ACG Categories  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk ",
                    "group": null,
                    "contact": "pchawla",
                    "tags": null,
                    "id": "ce51d023-9444-437f-a57d-34c8f00a47db",
                    "name": "ACG Categories",
                    "webUrl": "https://app.powerbi.com/reports/ce51d023-9444-437f-a57d-34c8f00a47db",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=ce51d023-9444-437f-a57d-34c8f00a47db"
                },
                {
                    "description": "ACG Devices kljdfjlkasdjflkjsdlk kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  ",
                    "group": null,
                    "contact": "pchawla",
                    "tags": null,
                    "id": "f27737f5-4676-44b2-b8bc-1db1eb836b36",
                    "name": "ACG Devices",
                    "webUrl": "https://app.powerbi.com/reports/f27737f5-4676-44b2-b8bc-1db1eb836b36",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=f27737f5-4676-44b2-b8bc-1db1eb836b36"
                },
                {
                    "description": "Rolling 100  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk  kljdfjlkasdjflkjsdlk ",
                    "group": null,
                    "contact": "yrosno",
                    "tags": null,
                    "id": "c5d9546c-283f-46ae-a24e-753bfa512c60",
                    "name": "Rolling100",
                    "webUrl": "https://app.powerbi.com/reports/c5d9546c-283f-46ae-a24e-753bfa512c60",
                    "embedUrl": "https://embedded.powerbi.com/appTokenReportEmbed?reportId=c5d9546c-283f-46ae-a24e-753bfa512c60"
                }
            ];

        reportList = reportList.sort(
            (item1, item2) => {
                if (item1.group > item2.group) {
                    return 1;
                } else if (item1.group < item2.group) {
                    return -1;
                }
                return 0;
            }
        );

        return reportList;
    }
}