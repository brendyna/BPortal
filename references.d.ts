﻿﻿/// <reference path="../typings/index.d.ts" />

interface HumanizeStatic {
    compactInteger: (num: number, precision: number) => number;
}
declare var Humanize: HumanizeStatic;

interface IDictionary<V> {
    [id: string]: V;
}

interface JQueryStatic {
    getUrlVar(name: string): string;
}

interface KnockoutBindingHandlers {
    customViewModel: KnockoutBindingHandler;
    wpsButton: KnockoutBindingHandler;
    wpsChart: KnockoutBindingHandler;
    wpsDescriptionList: KnockoutBindingHandler;
    wpsFilters: KnockoutBindingHandler;
    wpsHeader: KnockoutBindingHandler;
    wpsIcon: KnockoutBindingHandler;
    wpsInput: KnockoutBindingHandler;
    wpsSelect: KnockoutBindingHandler;
    wpsSection: KnockoutBindingHandler;
    wpsTable: KnockoutBindingHandler;
    wpsTabs: KnockoutBindingHandler;
}

interface PortalAuthResponse {
    get: (url: string, data: {}) => any;
}

interface PortalCredentials {
    grant_type: string;
    username: string;
    password: string;
}

interface PortalStatic {
    auth: (credentials: PortalCredentials) => JQueryPromise<PortalAuthResponse>;
}
declare var Portal: PortalStatic;

interface Window {
    API_SERVER: string;
    API_USERNAME: string;
    API_PASSWORD: string;
    BREADCRUMB: any;
}