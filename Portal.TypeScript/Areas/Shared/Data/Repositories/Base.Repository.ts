import Request = require("../../Util/Request");

export = Main;

module Main {
    export type RepositoryParams = {
        tag: string;
        platform: string;
        release: string;
    }

    export interface IRepositorySettings {
        baseUrl?: string;
        endpoint?: string;
        request?: JQueryAjaxSettings;
        authorize?: boolean;
        plainGet?: boolean;
        resultData?: any;
    }

    export interface IRepository<T> {
        destroy: () => void;
        settings: IRepositorySettings;
        load: () => JQueryPromise<T>;
        getPromise: () => JQueryPromise<T>;
        resultData: T;
    }

    export class Repository<T> implements IRepository<T> {
        private _settings: IRepositorySettings;
        private _loadDeferred: JQueryDeferred<T>;
        private _requestPromise: JQueryPromise<T>;
        private _resultData: T;
        private _requestSettings: JQueryAjaxSettings;

        constructor(settings: IRepositorySettings = {}) {
            this._settings = settings;
            this._loadDeferred = $.Deferred<T>();
            this._resultData = settings.resultData || <T>{};
        }

        public destroy(): void {
            this._loadDeferred.reject();
        }

        public get settings(): IRepositorySettings {
            return this._settings;
        }

        public get resultData(): T {
            return this._resultData;
        }

        public getPromise(): JQueryPromise<T> {
            // Must create a new deferred once it's been resolved
            // (to support calling load() multiple times)
            if (this._loadDeferred.state() === "resolved") {
                this._loadDeferred = $.Deferred<T>();
            }

            return this._loadDeferred.promise();
        }

        public load(): JQueryPromise<T> {
            Request.getData<T>(this.getRequestUrl(), {
                    authorize: this.settings.authorize,
                    options: this.settings.request,
                    plainGet: this.settings.plainGet
                })
                .done((data: T) => {
                    this._resultData = data;
                    this._loadDeferred.resolve(data);
                });

            return this.getPromise();
        }

        private getRequestUrl(): string {
            let url = this.settings.baseUrl;

            if (this.settings.endpoint) {
                url += "/" + this.settings.endpoint;
            }

            return url;
        }
    }
}