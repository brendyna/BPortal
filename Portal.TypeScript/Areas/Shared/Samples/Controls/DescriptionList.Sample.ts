import $ = require("jquery");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Icon = require("Areas/Shared/Controls/Icon");
import ko = require("knockout");

export = Main;

module Main {
    $((): void => {
        // SAMPLE: Default
        let defaults: DescriptionList.IWidgetDefaults = {
            viewModelData: {
                descriptionPairs: getDescriptionPairs()
            }
        };
        let widget = new DescriptionList.Widget($("#sample"), defaults);

        // SAMPLE: Rendered via custom binding handler (e.g. wpsDescriptionList: defaults)
        let defaultsCustomBinding: DescriptionList.IWidgetDefaults = {
            viewModelData: {
                descriptionPairs: getDescriptionPairs()
            }
        };
        ko.applyBindings({ defaults: defaultsCustomBinding }, $("#sample-custom-binding")[0]);
    });

    function getDescriptionPairs(): Array<DescriptionList.IDescriptionPairData> {
        return [
            {
                term: "Foo",
                descriptions: [
                    { content: "Regular description" }
                ]
            },
            {
                term: "Great icons",
                descriptions: [
                    {
                        content: `
                                <span data-bind="wpsIcon: $vm.icon1"></span>
                                <span data-bind="wpsIcon: $vm.icon2"></span>
                                <span data-bind="wpsIcon: $vm.icon3"></span>
                                <span data-bind="wpsIcon: $vm.icon4"></span>
                            `,
                        contentViewModel: {
                            icon1: <Icon.IViewModelData>{ type: Icon.Type.Articles },
                            icon2: <Icon.IViewModelData>{ type: Icon.Type.Chart },
                            icon3: <Icon.IViewModelData>{ type: Icon.Type.FileAPIs },
                            icon4: <Icon.IViewModelData>{ type: Icon.Type.Microphone }
                        }
                    }
                ]
            },
            {
                term: "The date",
                descriptions: [
                    { content: "July 2nd 1984" }
                ]
            }
        ];
    }
}