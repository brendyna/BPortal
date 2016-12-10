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

    // This serves as an adapter for global javascript window object references expected
    // to be present in a production context.
    export class Window {
        // The breadcrumb involves .NET MVC communicating data about the index and controller,
        // which will be written out to the global window object. In test settings, we use a 
        // static breadcrumb as it doesn't matter.
        // In production, use the window object value.
        public static ExampleBreadcrumb = BaseConfig.isTestRunnerMode() ? [
            { text: "WPT Portal", url: "javascript:;" },
            { text: "Getting Started", url: "javascript:;" }
        ] : window.BREADCRUMB;
    }
}