import "jquery";
import "jquery.extensions";
import BaseConfig = require("Areas/Shared/Config");

export = Main;

module Main {
    export class Classes {
    }

    export class Endpoints {
        public static Example = "example";
    }

    export class Ids {
    }
    
    export class Params {
        public static Example = (BaseConfig.isDebugMode() || BaseConfig.isTestRunnerMode()) ? {
            foo: "bar"
        } : {
            foo: $.getUrlVar("foo")
        };
    }

    export class Strings {
    }

    export class Urls {
        public static ExampleApi = "https://example-api.azurewebsites.net/api";
    }
    
    export class Window {
        public static BiasPlotBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "BPortal", url: "javascript:;" },
            { text: "Source Bubble", url: "javascript:;" },
            { text: "Bias Plot" }
        ] : window.BREADCRUMB;
    }
}