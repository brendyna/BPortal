﻿/// <reference path="../typings/index.d.ts" />

interface HumanizeStatic {
    compactInteger: (num: number, precision: number) => number;
    intComma: (num: number) => number;
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
    wpsAccordion: KnockoutBindingHandler;
    wpsButton: KnockoutBindingHandler;
    wpsCard: KnockoutBindingHandler;
    wpsChart: KnockoutBindingHandler;
    wpsDescriptionList: KnockoutBindingHandler;
    wpsFilters: KnockoutBindingHandler;
    wpsHeader: KnockoutBindingHandler;
    wpsIcon: KnockoutBindingHandler;
    wpsInput: KnockoutBindingHandler;
    wpsList: KnockoutBindingHandler;
    wpsNavigation: KnockoutBindingHandler;
    wpsNote: KnockoutBindingHandler;
    wpsSelect: KnockoutBindingHandler;
    wpsSection: KnockoutBindingHandler;
    wpsTable: KnockoutBindingHandler;
    wpsTabs: KnockoutBindingHandler;
    wpsBadge: KnockoutBindingHandler;
}

type RequestFunction = (url: string, data: {}) => any;

interface PortalAuthResponse {
    get: RequestFunction;
    post: RequestFunction;
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
    ko: KnockoutStatic;
    SITEREPORTER_DISABLED: string;
}