import $ = require("jquery");
import moment = require("moment");

import Config = require("../Config");

export = Main;

module Main {
    export type Settings = {
        authorize?: boolean;
        plainGet?: boolean;
        options?: JQueryAjaxSettings;
        credentials?: PortalCredentials;
    }

    export function getJSON<T>(url: string, settings: Settings = {}): JQueryPromise<T> {
        let deferred = $.Deferred<T>();
        let getFunc = $.getJSON;

        settings.options = settings.options || {};
        settings.options.data = settings.options.data || {};

        if (settings.plainGet) {
            getFunc = $.get;
        }

        if (!Config.Window.DebugMode && settings.authorize) {
            let credentials = settings.credentials || {
                grant_type: "password",
                username: Config.Window.ApiUsername,
                password: Config.Window.ApiPassword
            };

            Portal
                .auth(credentials)
                .done((result: PortalAuthResponse) => {
                    result.get(url, { data: settings.options.data }).done((data: T) => {
                        deferred.resolve(data);
                    });
                });
        } else {
            getFunc(url, settings.options.data).done((data: T) => {
                deferred.resolve(data);
            });
        }

        return deferred.promise();
    }
}