import "jquery";
import "wps.portal";
import Config = require("../Config");

export = Main;

module Main {
    export interface IRequestSettings {
        authorize?: boolean;
        options?: JQueryAjaxSettings;
        credentials?: PortalCredentials;
    }

    export interface IGetRequestSettings extends IRequestSettings {
        plainGet?: boolean;
    }

    export function getData<T>(url: string, settings: IGetRequestSettings = {}): JQueryPromise<T> {
        return triggerRequest(url, settings, (settings.plainGet ? $.get : $.getJSON));
    }

    export function postData<T>(url: string, settings: IRequestSettings = {}): JQueryPromise<T> {
        return triggerRequest(url, settings, $.post);
    }

    function triggerRequest<T>(
        url: string,
        settings: IRequestSettings,
        requestFunc: RequestFunction
    ): JQueryPromise<T> {
        let deferred = $.Deferred<T>();

        settings.options = settings.options || {};
        settings.options.data = settings.options.data || {};

        if (!Config.Window.DebugMode && settings.authorize) {
            let credentials = settings.credentials || {
                grant_type: "password",
                username: Config.Window.ApiUsername,
                password: Config.Window.ApiPassword
            };

            Portal
                .auth(credentials)
                .done((result: PortalAuthResponse) => {
                    let authRequestFunc = ($.post.toString() === requestFunc.toString())
                        ? result.post : result.get;

                    authRequestFunc(url, { data: settings.options.data }).done((data: T) => {
                        deferred.resolve(data);
                    });
                });
        } else {
            requestFunc(url, settings.options.data).done((data: T) => {
                deferred.resolve(data);
            });
        }

        return deferred.promise();
    }
}