import "jquery";
import "jquery.extensions";

import BaseConfig = require("Areas/Shared/Config");

export = Main;

module Main {
    export class Classes {
        public static DataTablesEmpty = "dataTables_empty";
        public static DataTablesMetadata = "dataTables__filter__metadata";
        public static DetailsBugsTable = "bug__list";
        public static DetailsBugsTrendsChart = "bug__trends";
        public static DetailsPotentiallyOffensive = "site--potentially-offensive";
        public static DetailsSwitchRiskIcon = "metrics__measurements__icon--switchRisk";
        public static DetailsTrendsFocusTimeChart = "trends__focustime";
        public static DetailsTrendsFrowniesChart = "trends__frownies";
        public static DetailsTrendsNavigationsChart = "trends__navigations";
        public static HighchartsTitle = "highcharts-title";
        public static LoadingOverlay = "content__async__loading-overlay";
        public static SiteAlexaRank = "site--alexa-rank";
        public static SiteBingdexRank = "site--bingdex-rank";
        public static SiteFavIcon = "site--favicon";
        public static SiteTag = "site-tag";
    }

    export class Endpoints {
        public static BugTrends = "bugtrends";
        public static BugsForDomain = "bugsfordomain";
        public static BugsForTag = "bugsfortag";
        public static BuiltWithDataForDomain = "builtwithdatafordomain";
        public static DetailsForDomain = "detailsfordomain";
        public static Filters = "filter";
        public static GetBuildWithData = "getbuiltwithdata";
        public static ScanTime = "scantime";
        public static TrendsForDomain = "trendsfordomain";
        public static TrendsForTag = "trendsfortag";
    }

    export class Filters {
        public static Bugs = ["tag"];
        public static DefaultTag = "BingdexTop100";
        public static DefaultPlatform = "Desktop";
        public static DefaultRelease = "RS1";
        public static Trends = ["tag", "release"];
        public static TrendsDetails = ["release"];
    }

    export class Html {
        public static EditableElements = "input,textarea,select,button";
    }

    export class Params {
        public static Domain = "domain";
        public static Tag = "tag";
        public static Platform = "platform";
        public static Release = "release";
        public static DetailsDefaults = (BaseConfig.isDebugMode() || BaseConfig.isTestRunnerMode()) ? {
            domain: "facebook.com",
            platform: "Desktop",
            release: "RS1"
        } : {
            domain: $.getUrlVar("domain"),
            platform: $.getUrlVar("platform"),
            release: $.getUrlVar("release").toUpperCase()
        };
        public static DetailsDefaultsEdge = {
            domain: "randomsite.com",
            platform: "Desktop",
            release: "RS1"
        };
        public static SummaryDefaults = (BaseConfig.isDebugMode() || BaseConfig.isTestRunnerMode()) ? {
            tag: "BingdexTop100",
            platform: "Desktop",
            release: "RS1"
        } : {
            tag: $.getUrlVar("tag") || "BingdexTop100",
            platform: $.getUrlVar("platform"),
            release: $.getUrlVar("release").toUpperCase()
        };
    }

    export class Strings {
        public static AlexaOutOfBounds = ">1,000";
        public static BingdexDescription = "Top sites according to the Bingdex heuristic created by the Bing team (https://www.bingwiki.com/Bingdex_Rank)";
        public static BingdexOutOfBounds = ">750,000";
        public static DetailsBugsTableScanTimePlaceholder = "Updated...";
        public static DetailsBugsTableNoDataMessage = "No bugs to show for this site";
        public static DetailsBugsTrendsTitle = "Trends";
        public static DetailsTrendsFrowniesTitle = "Frownies";
        public static DetailsTrendsNavigationsTitle = "Navigations";
        public static DetailsTrendsFocusTimeTitle = "Focus Time";
        public static ExtensionInstall = "Install Edge extension";
        public static LearnMore = "Learn about our data";
        public static SummaryPageTitle = "Site Reporter";
        public static SearchBoxPlaceholder = "Search for any site";
    }

    export class Urls {
        public static ExtensionLocation = "https://microsoft.sharepoint.com/teams/wdg_core_wpt/pm/_layouts/15/guestaccess.aspx?guestaccesstoken=kFftvLzg%2bOZxqumVHR%2bu9YA3chCfgBoj559xlGowiXw%3d&docid=2_0e1e04756b4f94e568a4c74d8c5b6d4cb&rev=1";
        public static FavIcon = "http://www.google.com/s2/favicons"; //?domain_url=facebook.com";
        public static LearnMore = "https://osgwiki.com/wiki/SiteReporter";
        public static SummaryPage = '/sitereporter/summary?';
        public static DetailsPage = '/sitereporter/details?';
        public static SiteReporterApi = "https://sitereporter-api.azurewebsites.net/api";
        public static SiteReporterWiki = "https://osgwiki.com/wiki/SiteReporter";
    }

    export class Window {
        public static ApiServer = window.API_SERVER;
        public static ApiUsername = window.API_USERNAME;
        public static ApiPassword = window.API_PASSWORD;
        public static Breadcrumb = window.BREADCRUMB;
        public static DebugMode = BaseConfig.isDebugMode() || BaseConfig.isTestRunnerMode();
        public static SiteReporterDisabled = window.SITEREPORTER_DISABLED;
    }
}