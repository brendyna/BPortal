import $ = require("jquery");
import ko = require("knockout");
import List = require("Areas/Shared/Controls/List");
import Icon = require("Areas/Shared/Controls/Icon");
import Section = require("Areas/Shared/Controls/Section");
import Input = require("Areas/Shared/Controls/Input");

export = Main;

module Main {
    $((): void => {
        // SAMPLE: Default
        let defaults: List.IWidgetDefaults = {
            viewModelData: {
                items: getItems()
            }
        };
        let widget = new List.Widget($("#sample"), defaults);

        // SAMPLE: Links list
        let linksDefaults: List.IWidgetDefaults = {
            viewModelData: {
                type: List.Type.Links,
                items: getLinksItems()
            }
        };
        let linksWidget = new List.Widget($("#sample-links"), linksDefaults);

        // SAMPLE: Rendered via custom binding handler (e.g. wpsList: defaults)
        let defaultsCustomBinding: List.IWidgetDefaults = {
            viewModelData: {
                items: getItems()
            }
        };
        ko.applyBindings({ defaults: defaultsCustomBinding }, $("#sample-custom-binding")[0]);
    });

    function getItems(): Array<List.IItemData> {
        return [
            {
                content: "Item 1"
            },
            {
                content: "Item 2"
            }
        ];
    }

    function getLinksItems(): Array<List.IItemData> {
        return [
            {
                content: '<a href="#Bugs">Bugs</a>'
            },
            {
                content: '<a href="#Trends">Trends</a>'
            }
        ];
    }
}