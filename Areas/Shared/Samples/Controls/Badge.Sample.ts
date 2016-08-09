import $ = require("jquery");
import ko = require("knockout");
import Badge = require("Areas/Shared/Controls/Badge");

export = Main;

module Main {
    function getDefaults(type: Badge.Type = Badge.Type.Default): Badge.IWidgetDefaults {
        return {
            viewModelData: {
                text: "I'm a badge!",
                type: type
            }
        };
    }

    $((): void => {
        let defaultsBasic = getDefaults();
        let widgetBasicBadge = new Badge.Widget($("span.default"), defaultsBasic);

        let defaultsWarning = getDefaults(Badge.Type.Warning);
        let widgetWarningBadge = new Badge.Widget($("span.warning"), defaultsWarning);

        let defaultsError = getDefaults(Badge.Type.Error);
        let widgetPagePrimaryLink = new Badge.Widget($("span.error"), defaultsError);

        let defaultsPrimary = getDefaults(Badge.Type.Primary);
        let widgetPrimaryBadge = new Badge.Widget($("span.primary"), defaultsPrimary);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults() }, $(".custom-binding")[0]);
    });
}