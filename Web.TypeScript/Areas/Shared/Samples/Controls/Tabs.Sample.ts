import $ = require("jquery");
import ko = require("knockout");
import Tabs = require("Areas/Shared/Controls/Tabs");

export = Main;

module Main {
    $((): void => {
        let defaults: Tabs.IWidgetDefaults = {
            viewModelData: {
                name: "foo",
                tabs: [
                    {
                        id: "a",
                        text: "A tab",
                        icon: "fa-bug"
                    },
                    {
                        id: "b",
                        text: "B tab",
                        icon: "fa-star"
                    },
                    {
                        id: "c",
                        text: "C tab",
                        icon: "fa-tags"
                    }
                ],
                value: "b"
            }
        };
        let widget = new Tabs.Widget($("#sample"), defaults);

        let sampleMetadata = {
            selectedTab: widget.viewModel.value
        };
        ko.applyBindings(sampleMetadata, $("#sample-metadata")[0]);
    });
}