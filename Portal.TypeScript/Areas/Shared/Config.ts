export = Main;

module Main {
    export class Classes {
        public static CardBody = "module__content__body";
        public static ChartSeries = "highcharts-series";
        public static ChartTitle = "highcharts-title";
        public static LoadingOverlay = "content__async__loading-overlay";
        public static NoteBlock = "block-note";
        public static NoteBlockError = "block-note--error";
        public static NoteBlockWarning = "block-note--warning";
        public static NoteInline = "note--error";
        public static SectionBody = "section__body";
        public static SectionBodyPlaceholder = "body-placeholder";
        public static TableEmpty = "dataTables_empty";
        public static TableFilter = "dataTables_filter";
        public static TableMetadata = "dataTables__filter__metadata";
    }

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