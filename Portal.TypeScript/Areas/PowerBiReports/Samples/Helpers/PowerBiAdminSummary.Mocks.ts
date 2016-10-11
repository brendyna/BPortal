import "jquery.mockjax";

import BaseConfig = require("Areas/Shared/Config");
import Config = require("../../Config");
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

}