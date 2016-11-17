import "jquery.mockjax";
import BaseConfig = require("Areas/Shared/Config");
import Config = require("../../Config");
import DatasetsRepo = require("../../Data/Repositories/PowerBiDatasets.Repository");
import WorkspacesRepo = require("../../Data/Repositories/PowerBiWorkspaces.Repository");

export = Main;

module Main {
    if (BaseConfig.isTestRunnerMode()) {
        $.mockjaxSettings.logging = false;
    }

    export function setupWorkspacesMock(): void {
        $.mockjax({
            url: [Config.Urls.PowerBiAdminBaseUrl, Config.Endpoints.WorkspaceList].join("/"),
            responseText: getMockWorkspacesData()
        });
    }

    export function setupDatasetsMock(): void {
        $.mockjax({
            url: [Config.Urls.PowerBiAdminBaseUrl, Config.Endpoints.DatasetsList].join("/"),
            responseText: getMockDatasetsTableData()
        });
    }

    export function getMockWorkspacesData(): WorkspacesRepo.DataTransferObject {
        return [
            {
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "workspaceCollectionName": "WPT-PBIE-Test"
            },
            {
                "workspaceId": "1f544309-4ba2-4c0a-886d-43c4ad61427f",
                "workspaceCollectionName": "WPT-PBIE-Test"
            },
            {
                "workspaceId": "78e7aad9-ea44-4020-9736-8080a6e3d01d",
                "workspaceCollectionName": "WPT-PBIE-Test"
            },
            {
                "workspaceId": "3710a946-86fb-46f7-b98b-ab431dd98eb1",
                "workspaceCollectionName": "WPT-PBIE-Test"
            },
            {
                "workspaceId": "9bed9add-c404-461c-af33-54b18b5100a0",
                "workspaceCollectionName": "WPT-PBIE-Test"
            },
            {
                "workspaceId": "665bf459-db65-4f6e-8f1a-95782bdddd02",
                "workspaceCollectionName": "WPT-PBIE-Test"
            }
        ];
    }

    export function getMockDatasetsTableData(): DatasetsRepo.DataTransferObject {
        return [
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "WPTCMTest",
                "datasetId": "c517711f-897b-4b92-a9c7-69de8f7b369b"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "WPTDashboardSample",
                "datasetId": "8664e049-821b-452c-b3fa-e6165fe47b49"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Table1",
                "datasetId": "ca533634-10af-4938-b91e-597177ec4288"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Table1",
                "datasetId": "9a3de054-dc40-40dc-a32f-67d1c9c44ba8"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Products",
                "datasetId": "fed70597-1bb3-4455-b7a1-0f32ba470f1f"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Sales",
                "datasetId": "e4accd5b-b4b7-4b91-b2f5-fa3c9780457e"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Products",
                "datasetId": "35b7f090-6078-43e5-93e5-cf6b68349ca6"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Sales",
                "datasetId": "c1626a5e-06bf-4f2d-b214-9f219c22766d"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Products",
                "datasetId": "cb30bfef-963a-4fde-ac6c-1480e425b3f4"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Sales",
                "datasetId": "ba484bc9-1752-4e48-a207-4f989225cb93"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Products",
                "datasetId": "a4af1e89-a778-4ade-8ba8-ef8c2cea50f5"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Sales",
                "datasetId": "dd14a758-89f7-4796-a399-366c8a6728cb"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Calendar",
                "datasetId": "4d7ea8b5-61e8-4dda-82ae-7aa2979caf8f"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Channel",
                "datasetId": "6bcec1d5-5208-4e3e-b14e-397e89ca91cf"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Calendar",
                "datasetId": "94d447dd-2479-459c-86bf-f41ebc7c3797"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Channel",
                "datasetId": "f3ac6f02-828b-4e2e-ba8a-3925f92ca541"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "MekkoCar",
                "datasetId": "7ed108d7-9ee8-473b-9f82-3acefb525ac5"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "MekkoCar",
                "datasetId": "103c4403-1697-47f8-ab4b-3c1b4696070e"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "MekkoCar1",
                "datasetId": "b2d9849a-a5c0-45f3-9bcb-3b065d7823f8"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "MekkoCar",
                "datasetId": "f82c4c9a-5938-403a-b38b-ad0109e89ee9"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "GapAnalysis",
                "datasetId": "a15b5744-d9e6-430d-bdc0-a5d7a33eb3c5"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "MekkoCar",
                "datasetId": "8e5ec049-c8ab-4b60-a0eb-6e5d19e21f7b"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "MekkoCar",
                "datasetId": "1164865b-3a7e-4846-9485-cb33c00f254e"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "GapAnalysis",
                "datasetId": "2bc991a5-5aab-4b25-9dad-f8bdc1f5746a"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "GapAnalysis",
                "datasetId": "266e2bab-0f67-4ac6-8250-1cc15eb1689b"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "GapAnalysis",
                "datasetId": "aa95970c-7d8d-41d7-9580-9849800aa7f6"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "GapAnalysis",
                "datasetId": "e83531b0-780e-4c0d-bdda-3e1f9fdde647"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Table1",
                "datasetId": "3242ea77-adff-419e-9dc9-8f67e7b6ca29"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Vishal-Table",
                "datasetId": "ee6247a1-2d86-4711-ae97-35da5679b043"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Vishal-Table1",
                "datasetId": "a4fe3655-1108-4d8a-ba88-c50c598863ee"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Vishal-Table1",
                "datasetId": "6a3b4d09-336c-43a0-9b2a-e2d0b57ff448"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Vishal-Table1",
                "datasetId": "78adcf4a-1d7c-4ba4-961d-9cea0ff51cdc"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "Vishal-Table1",
                "datasetId": "2a28c533-768d-4415-ac63-8199302d4bd4"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "foonew",
                "datasetId": "63ecc841-01e2-4c70-9c54-8a70cb1205ff"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "foonew1",
                "datasetId": "f1e85d3e-de5b-48e5-b4f0-b9cdfdcb55b8"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "new-contoso",
                "datasetId": "e1f2b36c-b3ac-4fa1-83c1-b08e14eeeaec"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "c99ed3ce-2692-4335-9021-deee5887b2f8",
                "datasetName": "measure-356mb",
                "datasetId": "d54ccc11-0e32-4ad2-8e32-5350960dc546"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "1f544309-4ba2-4c0a-886d-43c4ad61427f",
                "datasetName": "Contoso",
                "datasetId": "adc3068e-d32d-4df9-8cd6-c8b2061bb751"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "1f544309-4ba2-4c0a-886d-43c4ad61427f",
                "datasetName": "GapAnalysis",
                "datasetId": "f84ae99e-da4f-4b64-ae38-9fb508472f39"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "1f544309-4ba2-4c0a-886d-43c4ad61427f",
                "datasetName": "GapAnalysis",
                "datasetId": "851cab6b-533a-4898-b63d-ca4f17e8b2ac"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "1f544309-4ba2-4c0a-886d-43c4ad61427f",
                "datasetName": "GapAnalysis",
                "datasetId": "7ad2c1e0-1ead-4f65-9b55-da4e357c0914"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "1f544309-4ba2-4c0a-886d-43c4ad61427f",
                "datasetName": "GapAnalysis",
                "datasetId": "25c56dee-c2a5-486e-8d37-01c033a8d3d4"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "1f544309-4ba2-4c0a-886d-43c4ad61427f",
                "datasetName": "GapAnalysis",
                "datasetId": "a5a49466-b6fc-49fe-b05d-3587ecc2d267"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "78e7aad9-ea44-4020-9736-8080a6e3d01d",
                "datasetName": "GapAnalysis",
                "datasetId": "02ea56a5-0e1d-433d-9d6a-ca5bdc4c2754"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "78e7aad9-ea44-4020-9736-8080a6e3d01d",
                "datasetName": "GapAnalysis",
                "datasetId": "fe8bdfe1-1cc9-4d09-a38a-4b1be8f569e8"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "78e7aad9-ea44-4020-9736-8080a6e3d01d",
                "datasetName": "GapAnalysis",
                "datasetId": "009e3644-d8ac-4c20-a05c-a3a591510bd6"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "78e7aad9-ea44-4020-9736-8080a6e3d01d",
                "datasetName": "GapAnalysis",
                "datasetId": "f8efedd7-b091-454f-8f3b-5bf237d3dcef"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "78e7aad9-ea44-4020-9736-8080a6e3d01d",
                "datasetName": "GapAnalysis",
                "datasetId": "b56937a1-7b1f-48bd-b717-8a837b1d32cd"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "3710a946-86fb-46f7-b98b-ab431dd98eb1",
                "datasetName": "GapAnalysis",
                "datasetId": "455220eb-baf3-4fc9-a439-213ce7d41a38"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "9bed9add-c404-461c-af33-54b18b5100a0",
                "datasetName": "GapAnalysis",
                "datasetId": "11ffe724-0c8a-46b9-b90e-57cac3d043cb"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "9bed9add-c404-461c-af33-54b18b5100a0",
                "datasetName": "GapAnalysis",
                "datasetId": "ef2aad7e-77cc-4472-97f7-ffab5b011086"
            },
            {
                "workspaceCollectionName": "WPT-PBIE-Test",
                "workspaceId": "665bf459-db65-4f6e-8f1a-95782bdddd02",
                "datasetName": "Sample",
                "datasetId": "24fca52c-0b5a-4e04-b71a-e15381d87a2f"
            }
        ];
    }
}