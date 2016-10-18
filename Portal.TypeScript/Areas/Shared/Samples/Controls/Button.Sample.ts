import $ = require("jquery");
import Button = require("Areas/Shared/Controls/Button");
import ko = require("knockout");

export = Main;

module Main {
    function getDefaults(type: Button.Type = Button.Type.Basic): Button.IWidgetDefaults {
        return {
            viewModelData: {
                text: "Press me",
                type: type,
                title: "Pretty please",
                clickCallback: () => {
                    alert("Thanks!");
                }
            }
        };
    }

    $((): void => {
        let defaultsBasic = getDefaults();
        let widgetBasicButton = new Button.Widget($("button.basic1"), defaultsBasic);
        let widgetBasicButton2 = new Button.Widget($("button.basic2"), defaultsBasic);
        let widgetBasicButton3 = new Button.Widget($("button.basic3"), defaultsBasic);

        let defaultsPrimary = getDefaults(Button.Type.Primary);
        let widgetPrimaryButton = new Button.Widget($("button.primary"), defaultsPrimary);
        let widgetPrimaryLink = new Button.Widget($("a.primary"), defaultsPrimary);

        let defaultsPagePrimary = getDefaults(Button.Type.PagePrimary);
        let widgetPagePrimaryLink = new Button.Widget($("a.page-primary"), defaultsPagePrimary);

        let defaultsWarning = getDefaults(Button.Type.Warning);
        let widgetWarningButton = new Button.Widget($("button.warning"), defaultsWarning);

        let defaultsTextual = getDefaults(Button.Type.Textual);
        let widgetTextualButton = new Button.Widget($("button.textual"), defaultsTextual);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults() }, $(".custom-binding")[0]);
    });
}