import BaseConfig = require("Areas/Shared/Config");

export = Main;

module Main {

    export class Endpoints {
        public static ReportsList = "getreportlist";
        public static ReportDetail = "getreportdetail?reportid=";
        public static ReportAccessToken = "getreportaccesstoken?reportid=";

        public static WorkspaceList = "getworkspaces";
        public static DatasetsList = "getdatasets";
    }

    export class Urls {
        public static ReportsBaseUrl = "/powerbireports/report/";
        public static PowerBiAdminBaseUrl = "/powerbireports/powerbiadmin/result";
    }
}