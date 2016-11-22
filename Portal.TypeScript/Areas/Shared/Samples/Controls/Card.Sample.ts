import $ = require("jquery");
import Card = require("Areas/Shared/Controls/Card");
import Icon = require("Areas/Shared/Controls/Icon");
import Section = require("Areas/Shared/Controls/Section");

export = Main;

module Main {
    Card;
    Icon;

    $((): void => {
        // SAMPLE: Default
        // Render a bunch of cards in a sample section with a layout of .layout.layout-thirds
        let defaults: Section.IWidgetDefaults = {
            viewModelData: {
                body: `
                    <div class="layout layout--thirds">
                        <!-- ko foreach: viewModel.cards -->
                            <div data-bind="wpsCard: $data"></div>
                        <!-- /ko -->
                    </div>
                `,
                bodyViewModel: {
                    cards: [
                        <Card.IViewModelData>{
                            body: "A basic untitled card. Sed viverra elit nec semper rhoncus. Donec suscipit nulla vitae odio fringilla aliquam. Aliquam erat volutpat. Aenean pellentesque aliquam sodales. Cras ut justo eget eros dapibus viverra quis vitae elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                        },
                        <Card.IViewModelData>{
                            title: "A basic titled card",
                            body: "Sed viverra elit nec semper rhoncus. Donec suscipit nulla vitae odio fringilla aliquam. Aliquam erat volutpat. Aenean pellentesque aliquam sodales. Cras ut justo eget eros dapibus viverra quis vitae elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                        },
                        <Card.IViewModelData>{
                            title: "A basic linked title card",
                            titleLink: "http://www.microsoft.com",
                            titleLinkTarget: Card.TargetType.Blank,
                            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut erat id odio accumsan maximus ac eu nisi. Suspendisse sit amet porta eros. Vestibulum neque elit, finibus in dolor eget, suscipit lobortis nisl. Aenean posuere massa a elit tincidunt venenatis."
                        },
                        <Card.IViewModelData>{
                            title: "A complicated titled card body",
                            body: `
                                In this body I'm rendering some icons (other controls) to show that bodies can be complex and contain as simple or as complicated a layout as is desired.<br /><br />
                                <!-- ko foreach: viewModel.icons -->
                                    <span data-bind="wpsIcon: $data"></span>&nbsp;
                                <!-- /ko -->
                            `,
                            bodyViewModel: {
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
                            }
                        },
                        <Card.IViewModelData>{
                            title: "A picture titled card",
                            image: "/Web/Content/images/happy_puppy.jpg",
                            body: "Sed viverra elit nec semper rhoncus. Donec suscipit nulla vitae odio fringilla aliquam. Aliquam erat volutpat. Aenean pellentesque aliquam sodales. Cras ut justo eget eros dapibus viverra quis vitae elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                        },
                        <Card.IViewModelData>{
                            title: "A linked picture, tooltipped titled card",
                            titleTooltip: "A super happy kitty!",
                            image: "/Web/Content/images/happy_kitty.jpg",
                            imageLink: "http://www.microsoft.com",
                            imageLinkTarget: Card.TargetType.Blank,
                            imageAlt: "A super happy kitty!",
                            body: "Sed viverra elit nec semper rhoncus. Donec suscipit nulla vitae odio fringilla aliquam. Aliquam erat volutpat. Aenean pellentesque aliquam sodales. Cras ut justo eget eros dapibus viverra quis vitae elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                        }
                    ]
                }
            }
        };

        let widget = new Section.Widget($("#sample"), defaults);
    });
}