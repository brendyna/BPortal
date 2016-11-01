import Request = require("../../Util/Request");

export = Main;

module Main {
    /**
     * Defines the properties necessary to configure a
     * repository to make a request for data.
     */
    export interface IRepositorySettings {
        /**
         * The root URL for the API (minus the endpoint).
         */
        baseUrl?: string;

        /**
         * The endpoint for the API (which will be appended to
         * the baseUrl).
         */
        endpoint?: string;

        /**
         * The jQuery AJAX settings object passed to the invoked
         * AJAX function (see http://api.jquery.com/jquery.ajax/)
         */
        request?: JQueryAjaxSettings;

        /**
         * Whether to authorize the request through the WPTPortal
         * OAuth infrastructure.
         */
        authorize?: boolean;

        /**
         * By default, the request response is expected to be JSON.
         * If it will instead be plain text, set this to true.
         */
        plainGet?: boolean;

        /**
         * The result data for the repo.
         * Note: As a setting, this is used for testing to mock responses.
         * In the normal flow of loading a repositories data, this property
         * will be set when the AJAX request successfully loads.
         */
        resultData?: any;
    }

    /**
     * Defines the base properties and functions needed for a repository.
     */
    export interface IRepository<T> {
        /**
         * Cleans up the repo, in particular canceling any ongoing AJAX requests
         * and resolving the async deferred object.
         */
        destroy: () => void;

        /**
         * The settings which configure and control repository functionality.
         */
        settings: IRepositorySettings;

        /**
         * Triggers the AJAX request for the repository data, returning a promise
         * which can be used to perform actions once the request resolves successfully.
         * 
         * @returns JQueryPromise<T> A promise for the async data load task. 
         */
        load: () => JQueryPromise<T>;

        /**
         * Returns a promise for the async data load task. This is useful if you need
         * to get a promise without explicitly triggering load.
         * 
         * @returns JQueryPromise<T> A promise for the async data load task.
         */
        getPromise: () => JQueryPromise<T>;

        /**
         * The result data returned from the API endpoint on success.
         * This data type is typically defined by the repositories Data Transfer Object type.
         */
        resultData: T;
    }

    /**
     * Base class for a repository, which implements a vast majority of the functionality
     * needed by a repository.
     *
     * Typically, a specific repository will extend this class and then just configure its
     * endpoints and settings options before passing it into this parent class to handle loading.
     */
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

        /**
         * Rejects any ongoing async tasks related to loading this data.
         */
        public destroy(): void {
            this._loadDeferred.reject();
        }

        /**
         * Read-only accessor for the settings for the repository.
         * 
         * @returns IRepositorySettings The settings object for this repository.
         */
        public get settings(): IRepositorySettings {
            return this._settings;
        }

        /**
         * Read-only accessor for the result data for the repository when loaded.
         * 
         * @returns T The result data object for this repository, of type Data Transfer Object.
         */
        public get resultData(): T {
            return this._resultData;
        }

        /**
         * Returns a new promise for the async deferred task. If the load deferred has already
         * resolved (meaning load has been called already), a new deferred will be newed up in
         * anticipation of load being called again.
         * 
         * @returns JQueryPromise<T> A promise to be resolved by the load deferred task.
         */
        public getPromise(): JQueryPromise<T> {
            // Must create a new deferred once it's been resolved
            // (to support calling load() multiple times)
            if (this._loadDeferred.state() === "resolved") {
                this._loadDeferred = $.Deferred<T>();
            }

            return this._loadDeferred.promise();
        }

        /**
         * Triggers the AJAX load request and returns a promise to be resolved on successful
         * completion of the request. Once the request succeeds, the resultant data is available
         * on the resultData property of the repository.
         * 
         * @returns JQueryPromise<T> A promise to be resolved by the load deferred task.
         */
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