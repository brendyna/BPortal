import "jquery";
import "jquery.extensions";
import BaseConfig = require("Areas/Shared/Config");

export = Main;

module Main {
    export class Classes {
        public static CrawlSectionClass = "crawl__section";
        public static CrawlStatusSectionClass = "crawl-status__note";
        public static ScheduleButtonClass = "schedule__button";
        public static FieldsetClass = "browsers__fieldset";
        public static GithubScriptUrlClass = "script__input";
        public static RunTypeClass = "run__select";
        public static UrlsToCrawlClass = "urls__input";
    }

    export class Endpoints {
        public static CrawlerLaunch = "schedule/addrun";
    }

    export class Ids {
        public static ChromeCheck = "chromeCheck";
        public static EdgeCheck = "edgeCheck";
        public static FirefoxCheck = "firefoxCheck";
    }

    export class Strings {
        public static HeaderTitle = "Azure Crawler";
        public static SectionTitle = "Schedule an Interop Crawl";
        public static ScheduleButton = "Schedule";
        public static ScheduleSuccess = "Your crawl has been successfully scheduled!";
        public static ScheduleError = "There was an issue scheduling your crawl, please try again later.";
        public static RunName = "Run";
        public static RunLabel= "Run Type";
        public static RunCssOption = "Css Usage";
        public static RunRecipeOption = "Recipe";
        public static GithubPlaceholder = "Github script url";
        public static UrlPlaceholder = "Urls to crawl";
        public static GithubToolTip = "Url to the script to run. Can be left blank and a default value will be used.";
        public static UrlToolTip = "Url to the file of urls to run. Can be left blank and a default value will be used.";
        public static FieldsetTitle = "Browsers";
    }

    export class Values {
        public static NotificationTimeout = 8000;
    }

    export class Urls {
        public static Portal = BaseConfig.Window.RootUrl;
    }
  
    export class Window {
        public static CrawlerBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "WPT Portal", url: "javascript:;" },
            { text: "Azure Crawler", url: "javascript:;" }
        ] : window.BREADCRUMB;
    }
}