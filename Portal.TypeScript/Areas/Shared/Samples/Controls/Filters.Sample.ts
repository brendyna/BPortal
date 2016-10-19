import $ = require("jquery");
import Filters = require("Areas/Shared/Controls/Filters");
import ko = require("knockout");

export = Main;

module Main {
    $((): void => {
        let defaults: Filters.IWidgetDefaults = {
            viewModelData: {
                selectData: [
                    {
                        name: "foo",
                        options: [
                            { text: "a", value: "a-value" },
                            { text: "b", value: "b-value" }
                        ]
                    },
                    {
                        name: "bar",
                        options: [
                            { text: "c", value: "c-value" },
                            { text: "d", value: "d-value" },
                            { text: "e", value: "e-value" }
                        ]
                    }
                ],
                applyFilterCallback: () => {
                    window.alert("Apply button clicked!");
                },
                resetFilterCallback: () => {
                    window.alert("Reset button clicked!");
                }
            }
        };
        let widget = new Filters.Widget($("#sample"), defaults);

        // Track some metadata so we can observe things changes/demo that
        ko.applyBindings({
            filtersValue: ko.computed((): string => {
                let val = widget.viewModel.value();
                return ko.toJSON(val);
            })
        }, $("#sample-metadata")[0]);
    });
}