import $ = require("jquery");
import Note = require("Areas/Shared/Controls/Note");
import ko = require("knockout");

export = Main;

module Main {
    function getDefaults(type: Note.Type = Note.Type.Default, title = "Note"): Note.IWidgetDefaults {
        return {
            viewModelData: {
                text: "I'm a note of a certain style! Here's my body, short and stout.",
                title: title,
                type: type
            }
        };
    }

    $((): void => {
        let defaultsBasic = getDefaults();
        let widgetBasicNote = new Note.Widget($("div.default"), defaultsBasic);

        let defaultsWarning = getDefaults(Note.Type.Warning, "Warning");
        let widgetWarningNote = new Note.Widget($("div.warning"), defaultsWarning);

        let defaultsError = getDefaults(Note.Type.Error, "Error");
        let widgetErrorNote = new Note.Widget($("div.error"), defaultsError);

        let defaultsInline = getDefaults(Note.Type.Inline);
        let widgetInlineNote = new Note.Widget($("p.inline"), defaultsInline);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults(Note.Type.Default, "") }, $(".custom-binding")[0]);
    });
}