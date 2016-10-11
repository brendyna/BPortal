import BaseConfig = require("Areas/Shared/Config");

export = Main;

module Main {

    export class Endpoints {
        public static ReportsList = "getreportlist";
        public static ReportDetail = "getreportdetail";
        public static ReportAccessToken = "getreportaccesstoken";

        public static WorkspaceList = "getworkspaces";
        public static DatasetsList = "getdatasets";
    }

    export class Urls {
        public static ReportsBaseUrl = "/powerbireports/report/";
        public static PowerBiAdminBaseUrl = "/powerbireports/powerbiadmin/";
    }

    export class Window {
        public static SummaryBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "WPT Portal", url: "javascript:;" },
            { text: "PowerBiAdmin", url: "javascript:;" },
            { text: "Summary", url: "javascript:;" }
        ] : window.BREADCRUMB;
    }

    export class Strings {
        public static WorkspacesListTitle = "List of Power BI Workspaces in All Available Workspace Collections";
        public static DatasetListTitle = "List of Power BI Datasets in All Available Workspace Collections";

        public static WorkspaceCollectionNameColumnHeader = "Workspace Collection Name";
        public static WorkspaceIdColumnHeader = "Workspace Id";
        public static DatasetIdColumnHeader = "Dataset Id";
        public static DatasetNameColumnHeader = "Dataset Name";
    }

}