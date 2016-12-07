import "jquery";
import "qunit";
import Config = require("Areas/Shared/Config");
import Note = require("Areas/Shared/Controls/Note");

export = Main;

module Main {
    function getMockNote(): Note.IWidgetDefaults {
        return {};
    }

    QUnit.start();
    QUnit.module("Note");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Note, "Note loaded");
        assert.equal(typeof (Note.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Note.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Note.IWidgetDefaults = {
            viewModelData: {
                text: "My Note",
                title: "Note"
            }
        };
        let widget = new Note.Widget($("#qunit-fixture"), defaults);

        // Act

        // Assert
        assert.ok(widget.element.hasClass(Note.Widget.widgetClass), "Widget class is present");
        assert.ok(widget.element.hasClass(Config.Classes.NoteBlock), "Default note class is present");
        assert.equal(widget.element.find("h4").text(), defaults.viewModelData.title, "Note title rendered correctly");
        assert.equal(widget.element.find("p").text(), defaults.viewModelData.text, "Note text rendered correctly");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: Note.IWidgetDefaults = {
            viewModelData: {
                text: "My Note"
            }
        };
        let widget = new Note.Widget($("#qunit-fixture"), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Note.Widget.widgetClass), "Widget class is present");
        assert.equal(widget.element.text(), "", "Note element is empty after destroy");
    });

    QUnit.test("Note type computeds work correctly", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Note.IWidgetDefaults = {
            viewModelData: {
                text: "My Note"
            }
        };
        let widget = new Note.Widget($("#qunit-fixture"), defaults);
        let noteClasses = [
            Config.Classes.NoteBlock,
            Config.Classes.NoteBlockWarning,
            Config.Classes.NoteBlockError,
            Config.Classes.NoteInline
        ];
        let defaultClassPresentInitially = false;
        let warningClassPresentAfterVMUpdate = false;
        let errorClassPresentAfterVMUpdate = false;
        let inlineClassPresentAfterVMUpdate = false;

        // Act
        defaultClassPresentInitially = widget.element.hasClass(noteClasses[0]);

        widget.viewModel.type(Note.Type.Warning);
        warningClassPresentAfterVMUpdate = widget.element.hasClass(noteClasses[1]);

        widget.viewModel.type(Note.Type.Error);
        errorClassPresentAfterVMUpdate = widget.element.hasClass(noteClasses[2]);

        widget.viewModel.type(Note.Type.Inline);
        inlineClassPresentAfterVMUpdate = widget.element.hasClass(noteClasses[3]);

        // Assert
        assert.ok(defaultClassPresentInitially, "Default Note class renders correctly");
        assert.ok(warningClassPresentAfterVMUpdate, "Warning Primary Note class renders correctly");
        assert.ok(errorClassPresentAfterVMUpdate, "Error Note class renders correctly");
        assert.ok(inlineClassPresentAfterVMUpdate, "Inline Note class renders correctly");

        widget.destroy();
    });

    QUnit.test("Title collapses (hides) when value is empty", (assert) => {
        // Setup
        let fixture = $("qunit-fixture");
        let defaults: Note.IWidgetDefaults = {
            viewModelData: {
                text: "My Note",
                title: "Note"
            }
        };
        let widget = new Note.Widget($("#qunit-fixture"), defaults);
        let noteTitlePresentInitially = false;
        let titleElementDisappearsWhenValueEmptied = false;

        // Act
        noteTitlePresentInitially = widget.element.find("h4").length > 0;

        widget.viewModel.title("");
        titleElementDisappearsWhenValueEmptied = widget.element.find("h4").length === 0;

        // Assert
        assert.ok(noteTitlePresentInitially, "Title element is present initially");
        assert.ok(titleElementDisappearsWhenValueEmptied, "Title element is removed when value emptied");

        widget.destroy();
    });
}