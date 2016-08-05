import $ = require("jquery");
import ko = require("knockout");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    function getDefaults(): Select.IWidgetDefaults {
        return {
            viewModelData: {
                id: "select-foo",
                name: "Foo",
                label: "A great selection",
                options: [
                    { text: "Apple", value: "apple" },
                    { text: "Banana", value: "banana" },
                    { text: "Pear", value: "pear" }
                ]
            }
        };
    }

    $((): void => {
        let defaultsBasic = getDefaults();
        let widgetBasicSelect = new Select.Widget($("select.basic"), defaultsBasic);

        let defaultsDisabled = getDefaults();
        defaultsDisabled.viewModelData.disabled = true;
        let widgetDisabledSelect = new Select.Widget($("select.basic-disabled"), defaultsDisabled);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults() }, $(".custom-binding")[0]);

        // Track some metadata so we can observe things changes/demo that
        ko.applyBindings({
            basicSelectValue: widgetBasicSelect.viewModel.value,
            customBoundSelectValue: (<Select.ViewModel>ko.dataFor($(".custom-binding")[0]).vm).value
        }, $("#sample-metadata")[0]);
    });
}