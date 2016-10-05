import "jquery";
import "jquery.extensions";

import BaseConfig = require("Areas/Shared/Config");

export = Main;

module Main {
    export class Classes {
        public static DetailsBugsFilters = "bug__filters";
        public static DetailsBugsTable = "bug__list";
        public static DetailsBugsTrendsChart = "bug__trends";
        public static DetailsDomainSnapshot = "domain__snapshot";
        public static DetailsPotentiallyOffensive = "site--potentially-offensive";
        public static DetailsSwitchRiskIcon = "metrics__measurements__icon--switchRisk";
        public static DetailsTrendsFrowniesSubsection = "section__frownies";
        public static DetailsTrendsFocusTimeSubsection = "section__focustime";
        public static DetailsTrendsNavigationsSubsection = "section__navigations";
        public static DetailsTrendsFocusTimeChart = "trends__focustime";
        public static DetailsTrendsFrowniesChart = "trends__frownies";
        public static DetailsTrendsNavigationsChart = "trends__navigations";
        public static LearnMoreLinks = "learn-more-links";
        public static SiteAlexaRank = "site--alexa-rank";
        public static SiteBingdexRank = "site--bingdex-rank";
        public static SiteFavIcon = "site--favicon";
        public static SiteTag = "site-tag";
        public static SummaryBugsTable = "bugs__site-list";
        public static SummaryTileDelta = "sitereporter__tile__delta";
        public static SummaryTrendsTable = "trends__site-list";
        public static SwitchRiskIcon = "icon--flag";
        public static TableOfContents = "table-of-contents";
        public static TrendsFilters = "trends__filters";
    }

    export class Defaults {
        public static EmptyRanking = 9999999; // Set to an extreme value to be safe
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

    export class Ids {
        public static DetailsBugs = "details-bugs";
        public static DetailsSidebar = "details-sidebar";
        public static DetailsTech = "details-tech";
        public static DetailsTrends = "details-trends";
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
        public static SummaryDefaultsEdge = {
            tag: "FakeTag",
            platform: "Desktop",
            release: "RS1"
        }

        public static SummaryDefaultsAlexa = {
            tag: "AlexaTop100",
            platform: "Desktop",
            release: "RS1"
        }
    }

    export class Strings {
        public static AlexaOutOfBounds = ">1,000";
        public static BingdexDescription = "Top sites according to the Bingdex heuristic created by the Bing team (https://www.bingwiki.com/Bingdex_Rank)";
        public static BingdexOutOfBounds = ">750,000";
        public static BugSectionTitle = "Bugs";
        public static BugsTableScanTimePrefix = "Updated";
        public static BugsTableScanTimePlaceholder = "Updated...";
        public static DetailsBugsTableNoDataMessage = "No bugs to show for this site";
        public static DetailsBugsTableNoResultsMessage = "No bugs found";
        public static DetailsBugsTrendsTitle = "Trends";
        public static DetailsFiltersAllBugs = "All bugs";
        public static DetailsFiltersSwitchRiskBugs = "Switch risk bugs";
        public static DetailsFiltersOutreachBugs = "Outreach bugs";
        public static DetailsTechNoDataMessage = "No technologies to show for this site";
        public static DetailsTrendsFrowniesNoDataMessage = "No Frownies data to show for this site";
        public static DetailsTrendsFrowniesTitle = "Frownies";
        public static DetailsTrendsNavigationsTitle = "Navigations";
        public static DetailsTrendsNavigationsNoDataMessage = "No Navigations data to show for this site";
        public static DetailsTrendsFocusTimeTitle = "Focus Time";
        public static DetailsTrendsFocusTimeNoDataMessage = "No Focus Time data to show for this site";
        public static EmptyRankingPlaceholder = "--";
        public static ExtensionInstall = "Install Edge extension";
        public static LearnMore = "Learn about our data";
        public static SummaryPageTitle = "Site Reporter";
        public static SearchBoxPlaceholder = "Search for any site";
        public static SiteSearch = "Search for another site";
        public static SummaryBugSnapshotTitle = "Bug snapshot";
        public static SummaryBugSnapshotOutreachTitle = "Outreach bugs";
        public static SummaryBugSnapshotReleaseTitle = "Release bugs";
        public static SummaryBugSnapshotSwitchRiskTitle = "Switch risk sites";
        public static SummaryBugSnapshotTotalTitle = "Total bugs";
        public static SummaryBugsTableCurrentColumnHeader = "Current";
        public static SummaryBugsTableOutreachColumnHeader = "Outreach";
        public static SummaryBugsTableTotalColumnHeader = "Total";
        public static SummarySnapshotNoDataMessage = "N/A";
        public static SummaryTableAlexaColumnHeader = "Alexa";
        public static SummaryTableBingdexColumnHeader = "Bingdex";
        public static SummaryTableSiteColumnHeader = "Site";
        public static SummaryTrendSnapshotFrowniesTitle = "Frownies";
        public static SummaryTrendSnapshotNavigationsTitle = "Navigations";
        public static SummaryTrendSnapshotFocusTimeTitle = "Hours of Focus Time";
        public static SummaryTrendTableFocusTimeColumnHeader = "Focus Time";
        public static SummaryTrendTableFrowniesColumnHeader = "Frownies";
        public static SummaryTrendTableNavigationsColumnHeader = "Navigations";
        public static SummaryTableNoDataMessage = "No sites to show";
        public static SummaryTableNoResultsMessage = "No sites found";
        public static SummaryTrendSnapshotTitle = "Trend snapshot";
        public static TableFilterPlaceholder = "Filter table";
        public static TechSectionTitle = "Technologies";
        public static TrendsSectionTitle = "Trends";
    }

    export class Urls {
        public static ExtensionLocation = "https://microsoft.sharepoint.com/teams/wdg_core_wpt/pm/_layouts/15/guestaccess.aspx?guestaccesstoken=kFftvLzg%2bOZxqumVHR%2bu9YA3chCfgBoj559xlGowiXw%3d&docid=2_0e1e04756b4f94e568a4c74d8c5b6d4cb&rev=1";
        public static FavIcon = "http://www.google.com/s2/favicons";
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
        public static DetailsBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "WPT Portal", url: "javascript:;" },
            { text: "Site Reporter", url: "javascript:;" },
            { text: "Details", url: "javascript:;" }
        ] : window.BREADCRUMB;
        public static SummaryBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "WPT Portal", url: "javascript:;" },
            { text: "Site Reporter", url: "javascript:;" },
            { text: "Summary", url: "javascript:;" }
        ] : window.BREADCRUMB;
        public static DebugMode = BaseConfig.isDebugMode() || BaseConfig.isTestRunnerMode();
        public static SiteReporterDisabled = window.SITEREPORTER_DISABLED;
    }
}