import $ = require("jquery");
import Input = require("Areas/Shared/Controls/Input");
import ko = require("knockout");

export = Main;

module Main {
    function getDefaults(): Input.IWidgetDefaults {
        return {
            viewModelData: {
                type: "foo",
                enterCallback: () => {
                    alert("Hey-o!");
                }
            }
        };
    }

    $((): void => {
        let defaultsBasic = getDefaults();
        let widgetBasicInput = new Input.Widget($("input.basic"), defaultsBasic);

        let defaultsDisabled = getDefaults();
        defaultsDisabled.viewModelData.disabled = true;
        let widgetDisabledInput = new Input.Widget($("input.basic-disabled"), defaultsDisabled);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults() }, $(".custom-binding")[0]);

        // Track some metadata so we can observe things changes/demo that
        ko.applyBindings({
            basicInputValue: widgetBasicInput.viewModel.value,
            customBoundInputValue: (<Input.ViewModel>ko.dataFor($(".custom-binding")[0]).vm).value
        }, $("#sample-metadata")[0]);
    });
}