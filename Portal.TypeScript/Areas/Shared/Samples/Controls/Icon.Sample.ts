import $ = require("jquery");
import Icon = require("Areas/Shared/Controls/Icon");
import ko = require("knockout");

export = Main;

module Main {
    function getDefaults(): Icon.IWidgetDefaults {
        return {
            viewModelData: {
                type: Icon.Type.LikeDislike
            }
        };
    }

    $((): void => {
        let defaultsBasic = getDefaults();
        let widgetBasicIcon = new Icon.Widget($(".basic"), defaultsBasic);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults() }, $(".custom-binding")[0]);
    });
}