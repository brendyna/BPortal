import Config = require("../../Config");
import ExampleMocks = require("../Helpers/Example.Mocks");
import View = require("../../Views/Example.View");

export = Main;

module Main {
    $((): void => {
        setupMockjax();

        let defaults: View.IWidgetDefaults = {
            viewContext: {
                params: $.extend({}, {}) 
            }
        };

        let example = new View.Widget($("#example"), defaults);
    });

    export function setupMockjax(): void {
        ExampleMocks.setupExampleMock();
    }
}