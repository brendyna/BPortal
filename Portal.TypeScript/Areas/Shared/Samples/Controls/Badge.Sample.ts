import $ = require("jquery");
import Badge = require("Areas/Shared/Controls/Badge");
import ko = require("knockout");

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

        let defaultsCyan = getDefaults(Badge.Type.Cyan);
        let widgetCyanBadge = new Badge.Widget($("span.cyan"), defaultsCyan);

        let defaultsError = getDefaults(Badge.Type.Error);
        let widgetErrorBadge = new Badge.Widget($("span.error"), defaultsError);

        let defaultsGold = getDefaults(Badge.Type.Gold);
        let widgetGoldBadge = new Badge.Widget($("span.gold"), defaultsGold);

        let defaultsLightGray = getDefaults(Badge.Type.LightGray);
        let widgetLightGrayBadge = new Badge.Widget($("span.light-gray"), defaultsLightGray);

        let defaultsLightGreen = getDefaults(Badge.Type.LightGreen);
        let widgetLightGreenBadge = new Badge.Widget($("span.light-green"), defaultsLightGreen);

        let defaultsPrimary = getDefaults(Badge.Type.Primary);
        let widgetPrimaryBadge = new Badge.Widget($("span.primary"), defaultsPrimary);

        let defaultsWarning = getDefaults(Badge.Type.Warning);
        let widgetWarningBadge = new Badge.Widget($("span.warning"), defaultsWarning);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults() }, $(".custom-binding")[0]);
    });
}