import "jquery";
import "qunit";
import Card = require("Areas/Shared/Controls/Card");
import Config = require("Areas/Shared/Config");
import DomUtil = require("Areas/Shared/Util/Dom");
import Icon = require("Areas/Shared/Controls/Icon");

export = Main;

module Main {
    function getMockCard(): Card.IWidgetDefaults {
        return {
            viewModelData: <Card.IViewModelData>{
                body: "A basic untitled card. Sed viverra elit nec semper rhoncus. Donec suscipit nulla vitae odio fringilla aliquam. Aliquam erat volutpat. Aenean pellentesque aliquam sodales. Cras ut justo eget eros dapibus viverra quis vitae elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }
        };
    }

    QUnit.start();

    QUnit.module("Card");

    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Card, "Card loaded");
        assert.equal(typeof (Card.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Card.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let fixture = $("#qunit-fixture");
        let defaults = getMockCard();
        let widget = new Card.Widget(fixture, defaults);
        let image = widget.element.find("img");
        let imageParent: JQuery;
        let title = widget.element.find("span.subtitle");
        let titleParent: JQuery;
        let body = widget.element.find(DomUtil.classify(Config.Classes.CardBody));
        let bodyIcons: JQuery;
        let viewModelData = defaults.viewModelData;

        // Custom binding handlers render correctly in body

        // Assert
        assert.ok(widget.element.hasClass(Card.Widget.widgetClass), "Widget class is present");
        assert.equal(body.html(), viewModelData.body, "Body renders correctly");
        assert.equal(image.length, 0, "Image doesn't render if viewmodel property empty");
        assert.equal(title.length, 0, "Title doesn't render if viewmodel property empty");

        // Act/assert
        widget.viewModel.image("/Web/Content/images/happy_puppy.jpg");
        widget.viewModel.imageAlt("A very happy puppy!");
        widget.viewModel.title("My card title");
        widget.viewModel.titleTooltip("A great tooltip!");

        image = widget.element.find("img");
        imageParent = widget.element.find("img").parent();
        title = widget.element.find("span.subtitle");
        titleParent = widget.element.find("span.subtitle").parent();

        assert.equal(image.length, 1, "Image renders when viewmodel property value is set");
        assert.equal(image.attr("alt"), widget.viewModel.imageAlt(), "Image alt render correctly");
        assert.equal(imageParent.is("a"), false, "Image link does not render if viewmodel property is empty");
        assert.equal(title.length, 1, "Title renders when viewmodel property value is set");
        assert.equal(title.attr("title"), widget.viewModel.titleTooltip(), "Title tooltip renders correctly");
        assert.equal(titleParent.is("a"), false, "Title link does not render if viewmodel property is empty");

        // Act/assert
        widget.viewModel.imageLink("http://www.microsoft.com");
        widget.viewModel.titleLink("http://microsoft.com");

        imageParent = widget.element.find("img").parent();
        titleParent = widget.element.find("span.subtitle").parent();

        assert.equal(imageParent.is("a"), true, "Image parent is a link after imageLink property set");
        assert.equal(imageParent.attr("href"), widget.viewModel.imageLink(), 
            "Image link has correct href after imageLink property set");
        assert.equal(imageParent.attr("target"), widget._getTargetString(Card.TargetType.Self),
            "Image link has right target default");
        assert.equal(titleParent.is("a"), true, "Title parent is a link after titleLink property set");
        assert.equal(titleParent.attr("href"), widget.viewModel.titleLink(),
            "Title link has correct href after titleLink property set");
        assert.equal(titleParent.attr("target"), widget._getTargetString(Card.TargetType.Self),
            "Title link has right target default");

        // Act/assert
        widget.viewModel.imageLinkTarget(Card.TargetType.Blank);
        widget.viewModel.titleLinkTarget(Card.TargetType.Top);

        assert.equal(imageParent.attr("target"), widget._getTargetString(Card.TargetType.Blank),
            "Image link target changes if imageLinkTarget property changes");
        assert.equal(titleParent.attr("target"), widget._getTargetString(Card.TargetType.Top),
            "Title link target changes if titleLinkTarget property changes");

        // Act/assert
        assert.equal(body.find(DomUtil.classify(Icon.Widget.widgetClass)).length, 0,
            "The body has no nested controls prior to updating");

        widget.viewModel.bodyViewModel({
            icons: [
                <Icon.IViewModelData>{
                    type: Icon.Type.Articles
                },
                <Icon.IViewModelData>{
                    type: Icon.Type.Bug
                },
                <Icon.IViewModelData>{
                    type: Icon.Type.BrowserScreenshot
                },
                <Icon.IViewModelData>{
                    type: Icon.Type.JavaScript
                },
                <Icon.IViewModelData>{
                    type: Icon.Type.VirtualMachine
                }
            ]
        });
        widget.viewModel.body(`
            In this body I'm rendering some icons (other controls) to show that bodies can be complex and contain as simple or as complicated a layout as is desired.<br /><br />
            <!-- ko foreach: viewModel.icons -->
                <span data-bind="wpsIcon: $data"></span>&nbsp;
            <!-- /ko -->
        `);

        body = widget.element.find(DomUtil.classify(Config.Classes.CardBody));

        assert.equal(body.find(DomUtil.classify(Icon.Widget.widgetClass)).length,
            widget.viewModel.bodyViewModel().icons.length,
            "The body correctly updates and renders nested controls");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: Card.IWidgetDefaults = {
            viewModelData: {
            }
        };
        let widget = new Card.Widget($("#qunit-fixture"), defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Card.Widget.widgetClass), "Widget class is present");
    });
}