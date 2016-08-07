export = Main;

module Main {
    export class Endpoints {
        public static BugTrends = "bugtrends";
        public static BugsForDomain = "bugsfordomain";
        public static BugsForTag = "bugsfortag";
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
        public static Trends = ["tag", "platform", "release"];
        public static TrendsDetails = ["platform", "release"];
    }

    export class Html {
        public static EditableElements = "input,textarea,select,button";
    }

    export class Params {
        public static Domain = "domain";
        public static Tag = "tag";
        public static Platform = "platform";
        public static Release = "release";
    }

    export class Strings {
        public static BingdexDescription = "Top sites according to the Bingdex heuristic created by the Bing team (https://www.bingwiki.com/Bingdex_Rank)";
        public static ExtensionInstall = "Install Edge extension";
        public static LearnMore = "Learn about our data";
        public static SummaryPageTitle = "Site Reporter";
        public static SearchBoxPlaceholder = "Search for any site";
    }

    export class Urls {
        public static ExtensionLocation = "file:\\iefs\Users\brendyna\SiteReporterEdgeExtension";
        public static LearnMore = "https://osgwiki.com/wiki/SiteReporter";
        public static SummaryPage = '/SiteReporter/Summary/Index2?';
        public static DetailsPage = '/SiteReporter/Details?';
        public static DetailsPageBase = "http://wptportal.corp.microsoft.com/sitereporter/details";
        public static SiteReporterApi = "https://sitereporter-api.azurewebsites.net/api";
    }

    export class Window {
        public static ApiServer = window.API_SERVER;
        public static ApiUsername = window.API_USERNAME;
        public static ApiPassword = window.API_PASSWORD;
        public static Breadcrumb = window.BREADCRUMB;
        public static DebugMode = document.location.href.indexOf("localhost:8080") !== -1;
    }
}