import $ = require("jquery");
import ko = require("knockout");
import Accordion = require("Areas/Shared/Controls/Accordion");
import Button = require("Areas/Shared/Controls/Button");

export = Main;

window.ko = ko;

module Main {
    Button;

    function getDefaults(): Accordion.IWidgetDefaults {
        return {
            viewModelData: <Accordion.IViewModelData>{
                groups: [
                    {
                        title: "Group 1",
                        body: `There is some body text here`,
                        expanded: true
                    },
                    {
                        title: "Group 2",
                        body: `There is some body text here too!`
                    },
                    {
                        title: "Group 3",
                        body: `
                            There is some body text here lastly! And:
                            <button data-bind="wpsButton: viewModel.button"></button>
                        `,
                        bodyViewModel: {
                            button: <Button.IViewModelData>{
                                text: "A button!",
                                clickCallback: () => {
                                    window.alert("I've been clicked!");
                                }
                            }
                        }
                    }
                ]
            }
        };
    }

    $((): void => {
        let defaultsBasic = getDefaults();
        let widgetBasicAccordion = new Accordion.Widget($(".basic"), defaultsBasic);

        // Render a sample via the custom binding handler
        ko.applyBindings({ defaults: getDefaults() }, $(".custom-binding")[0]);
    });
}