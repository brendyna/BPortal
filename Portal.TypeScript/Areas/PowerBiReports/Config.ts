import BaseConfig = require("Areas/Shared/Config");

export = Main;

module Main {
    export class Endpoints {
        public static DatasetsList = "getdatasets";
        public static ReportAccessToken = "getreportaccesstoken";
        public static ReportDetail = "getreportdetail";
        public static ReportsList = "getreportdetailslist";
        public static WorkspaceList = "getworkspaces";
    }

    export class Urls {
        public static ImportUtilityUrl = "https://aka.ms/wptpbiadmin";
        public static PowerBiAdminBaseUrl = "/powerbireports/powerbiadmin/";
        public static PowerBiReportsBaseUrl = "/powerbireports/report/";
        public static PowerBiReportsReportUrl = `${Urls.PowerBiReportsBaseUrl}report?reportId=`;
    }

    export class Window {
        public static PowerBiAdminSummaryBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "WPT Portal", url: "javascript:;" },
            { text: "PowerBiAdmin", url: "javascript:;" },
            { text: "Summary", url: "javascript:;" }
        ] : window.BREADCRUMB;

        public static PowerBiReportListBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "WPT Portal", url: "javascript:;" },
            { text: "Reports", url: "javascript:;" },
            { text: "ReportsList", url: "javascript:;" }
        ] : window.BREADCRUMB;
    }

    export class Strings {
        public static DatasetIdColumnHeader = "Dataset Id";
        public static DatasetListTitle = "List of Power BI Datasets in All Available Workspace Collections";
        public static DatasetNameColumnHeader = "Dataset Name";
        public static DatasetsTableNoDataMessage = "No Datasets to show";
        public static ImportPbixFileButton = "Import PBIX File";
        public static ReportListEmptyMessage = "There are no reports to show.";
        public static ReportListTitle = "PowerBI Reports";
        public static WorkspaceCollectionNameColumnHeader = "Workspace Collection Name";
        public static WorkspaceIdColumnHeader = "Workspace Id";
        public static WorkspacesListTitle = "List of Power BI Workspaces in All Available Workspace Collections";
        public static WorkspaceTableNoDataMessage = "No Workspaces to show";
    }

    export class Classes {
        public static DatasetsSectionClass = "datasets__section";
        public static DatasetsTableClass = "datasets__section__table";
        public static ImportPbixButtonClass = "importpbix__button";
        public static ReportCardClass = "reportcard__card";
        public static ReportCardContactClass = "reportcard__card__contact";
        public static ReportListSectionClass = "reportlist__section";
        public static TableColumnDatasetIdClass = "table__column__datasetid";
        public static TableColumnDatasetNameClass = "table__column__datasetname" ;
        public static TableColumnWorkspaceCollectionNameClass = "table__column__workspacecollectionname" ;
        public static TableColumnWorkspaceIdClass = "table__column__workspaceid" ;
        public static WorkspacesSectionClass = "workspaces__section";
        public static WorkspacesTableClass = "workspaces__section__table";
    }
}