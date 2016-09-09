export = Main;

module Main {
    export class Html {
        public static EditableElements = "input,textarea,select,button,keygen";
    }

    export class Strings {
        public static ApplyButtonText = "Apply Filter";
        public static ResetButtonText = "Reset";
    }

    export class Window {
        public static ApiUsername = window.API_USERNAME;
        public static ApiPassword = window.API_PASSWORD;
        public static DebugMode = document.location.href.indexOf("localhost:1305") !== -1
            || (<any>window).chutzpah !== undefined;
    }

    export function isDebugMode(): boolean {
        return document.location.href.indexOf("localhost:1305") !== -1
            || (<any>window).chutzpah !== undefined;
    }

    export function isPortalDebugMode(): boolean {
        return document.location.href.indexOf("localhost:61484") !== -1;
    }

    export function isTestRunnerMode(): boolean {
        return (<any>window).chutzpah !== undefined;
    }
}