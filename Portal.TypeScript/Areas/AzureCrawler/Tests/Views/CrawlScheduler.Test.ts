import "jquery";
import "qunit";
import BaseConfig = require("Areas/Shared/Config");
import Config = require("Areas/AzureCrawler/Config");
import DomUtil = require("Areas/Shared/Util/Dom");
import Header = require("Areas/Shared/Controls/Header");
import Button = require("Areas/Shared/Controls/Button");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Note = require("Areas/Shared/Controls/Note");
import Mocks = require("Areas/AzureCrawler/Samples/Helpers/CrawlScheduler.Mocks");
import View = require("Areas/AzureCrawler/Views/CrawlScheduler.View");
import Select = require("Areas/Shared/Controls/Select");

export = Main;
module Main {
    setupMockjax();

    QUnit.start();

    // ### Exists ###
    QUnit.module("Crawler View: Exists", (hooks) => {
        QUnit.test("View exists", (assert) => {
            // Assert
            assert.ok(View, "View loaded");
            assert.equal(typeof (View.Widget), "function", "Widget defined");
        });
    });

    QUnit.module("Crawler View: Basics", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("View renders correctly", (assert) => {
            // Assert
            assert.equal(widget.element.hasClass(View.Widget.widgetClass), true, "Widget class is present");
            assert.ok(widget.element.children().length > 0, "There are child elements");
        });

        QUnit.test("View destroys correctly", (assert) => {
            // Act
            widget.destroy();

            // Assert
            assert.equal(widget.element.hasClass(View.Widget.widgetClass), false, "Widget class is not present");
            assert.equal(widget.element.children().length, 0, "There are no child elements");
        });
    });

    QUnit.module("Crawler View: Static", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Breadcrumb renders correctly", (assert) => {
            let nav = widget.element.find(DomUtil.classify((Navigation.Widget.widgetClass)));
            let navVM: Navigation.IViewModel = ko.dataFor(nav[0]).viewModel;
            let breadcrumbs = nav.find("li");

            // Act

            // Assert
            assert.equal(breadcrumbs.length, navVM.breadcrumb().length, "The correct number of crumbs are present");
            for (let i = 0; i < breadcrumbs.length; i++) {
                assert.equal($(breadcrumbs.get(i)).text(), Config.Window.CrawlerBreadcrumb[i].text, "Crumb " + i + " has correct text");
            }
        });

        QUnit.test("Header renders correctly", (assert) => {
            let header = $(DomUtil.classify((Header.Widget.widgetClass)));

            // Assert
            assert.equal(header.find("h1").text(), "Azure Crawler", "The header title is correct");
        });

        QUnit.test("Fieldset renders correctly", (assert) => {
            let fieldSet = $(DomUtil.classify((Config.Classes.FieldsetClass)));

            // Assert
            assert.equal(fieldSet.find("legend").text(), "Browsers", "Correct ledgend element is present");
        });

        QUnit.test("Select renders correctly", (assert) => {
            let select = $(DomUtil.classify((Select.Widget.widgetClass)));

            // Assert
            assert.equal(select.attr("name"), "Run", "Correct select element is present");
        });

        QUnit.test("Script Input renders correctly", (assert) => {
            let input = $(DomUtil.classify((Config.Classes.GithubScriptUrlClass)));

            // Assert
            assert.equal(input.attr("placeholder"), Config.Strings.GithubPlaceholder, "Github input element is present");
        });

        QUnit.test("Url Input renders correctly", (assert) => {
            let input = $(DomUtil.classify((Config.Classes.UrlsToCrawlClass)));

            // Assert
            assert.equal(input.attr("placeholder"), Config.Strings.UrlPlaceholder, "Url select input is present");
        });

        QUnit.test("Button renders correctly", (assert) => {
            let button = $(DomUtil.classify((Button.Widget.widgetClass)));

            // Assert
            assert.equal(button.text(), Config.Strings.ScheduleButton, "Button title is correct");
        });
    });

    QUnit.module("Crawl View: Post", (hooks) => {
        let widget: View.IWidget;

        hooks.before((assert) => {
            widget = create(getDisableLoadWidgetDefaults());
        });

        hooks.after((assert) => {
            destroy(widget);
        });

        QUnit.test("Data is posted and response is successful",
            (assert) => {
                assert.expect(5);
                var done1 = assert.async();
                var done2 = assert.async();

                let button = widget.element.find(DomUtil.classify((Button.Widget.widgetClass)));
                let check = widget.element.find("#chromeCheck");
                let note = widget.element.find(DomUtil.classify((Note.Widget.widgetClass)));
                let timeout = Config.Values.NotificationTimeout;

                $(document)
                    .ajaxSend((event, request, settings) => {
                        assert.equal(settings.url, BaseConfig.Window.RootUrl + "/schedule/addrun", "The url is correct");
                        assert.equal(settings.data, "chromeSelected=true&edgeSelected=false&firefoxSelected=false&runType=cssUsage&githubUrl=&blobUrl=", "The parameters posted are correct");
                        done1();
                    })
                    .ajaxComplete((event, request, settings) => {
                        var response = JSON.parse(request.responseText);
                        assert.equal(response.status, "success", "The response was a success");
                        assert.equal(note.text().trim(), Config.Strings.ScheduleSuccess, "Notification text is displayed");
                        assert.ok(note.hasClass(BaseConfig.Classes.NoteBlock), "Success note is displayed");
                        //Have to wait for the note to hide, else widget is destroyed and global error is thrown trying to hide it
                        setTimeout(() => { done2(); }, timeout);
                    });

                check.click();
                button.click();
            });
    });

    function setupMockjax(): void {
        Mocks.setupCrawlSubmitMock();
    }

    function create(customDefaults?: View.IWidgetDefaults): View.IWidget {
        // Create a random fixture so we can parallelize tests
        let fixtures = $("#qunit-fixtures");
        let randFixtureId = Math.round(Math.random() * 1000);
        let randFixture = $('<div class="qunit-fixture" id="fixture-' + randFixtureId + '"></div>');
        fixtures.append(randFixture);

        return new View.Widget(randFixture, customDefaults || getWidgetDefaults());
    }

    function destroy(widget: View.IWidget): void {
        // Act
        widget.destroy();
    }

    function getWidgetDefaults(): View.IWidgetDefaults {
        return {
            viewContext: { params: {}}};
    }

    function getDisableLoadWidgetDefaults(): View.IWidgetDefaults {
        let defaults = getWidgetDefaults();
        defaults.disableAutoLoad = true;

        return defaults;
    }
}