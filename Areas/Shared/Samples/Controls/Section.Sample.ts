import $ = require("jquery");
import ko = require("knockout");
import DescriptionList = require("Areas/Shared/Controls/DescriptionList");
import Icon = require("Areas/Shared/Controls/Icon");
import Input = require("Areas/Shared/Controls/Input");
import Section = require("Areas/Shared/Controls/Section");
import Select = require("Areas/Shared/Controls/Select");

export = Main;

module Main {
    Select;
    DescriptionList;

    $((): void => {
        // SAMPLE: Default
        let defaults: Section.IWidgetDefaults = {
            viewModelData: {
                title: "This is the section title",
                subtitle: "This is the optional section subtitle. There are two elements in this section header.",
                body: `
                    <strong>This is the section body.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <div><select data-bind="wpsSelect: $vm.select"></select></div>
                `,
                bodyViewModel: {
                    select: <Select.IViewModelData>{
                        name: "Foo",
                        label: "Fancy nested control",
                        options: [
                            { text: "Apple", value: "apple" },
                            { text: "Banana", value: "banana" }
                        ]
                    }
                },
                subsections: [
                    {
                        header: "Subsection",
                        altHeader: true,
                        body: '<p><strong><span data-bind="wpsIcon: $vm.icon"></span>This is the subsection body.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
                        bodyViewModel: {
                            icon: <Icon.IViewModelData>{
                                type: Icon.Type.Document
                            }
                        }
                    },
                    {
                        body: "<p>This subsection does not have a section header. The <code>.subsection__body</code> wrapper div has been omitted for brevity, but this will look the same even if you choose to include it.</p>"
                    }
                ]
            }
        };
        let widget = new Section.Widget($("#sample"), defaults);

        // SAMPLE: Render a sample of what we'll include in the Summary page
        let sectionData: Section.IViewModelData = {
            classes: "sidebar",
            title: "Summary",
            body: `<input data-bind="wpsInput: $vm.siteSearch" />`,
            bodyViewModel: {
                siteSearch: <Input.IViewModelData>{
                    type: Input.Type.Text,
                    placeholder: "Search for any site (e.g. bing.com)",
                    enterCallback: (domain: string) => {
                        window.open("http://wptportal.corp.microsoft.com/sitereporter/details?domain=" + domain);
                    }
                }
            },
            subsections: [
                {
                    header: "Bugs",
                    body: `<dl data-bind="wpsDescriptionList: $vm.summary"></dl>`,
                    bodyViewModel: {
                        summary: <DescriptionList.IViewModelData>{
                            descriptionPairs: [
                                {
                                    term: "Switch risk sites",
                                    descriptions: [{
                                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> 50%</span>`,
                                        contentViewModel: {
                                            icon: <Icon.IViewModelData>{
                                                type: Icon.Type.Interop,
                                                classes: "subtitle"
                                            }
                                        }
                                    }]
                                },
                                {
                                    term: "Outreach bugs",
                                    descriptions: [{
                                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> 26</span>`,
                                        contentViewModel: {
                                            icon: <Icon.IViewModelData>{
                                                type: Icon.Type.Bug
                                            }
                                        }
                                    }]
                                },
                                {
                                    term: "Release bugs",
                                    descriptions: [{
                                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> 23</span>`,
                                        contentViewModel: {
                                            icon: <Icon.IViewModelData>{
                                                type: Icon.Type.Bug
                                            }
                                        }
                                    }]
                                },
                                {
                                    term: "Total bugs",
                                    descriptions: [{
                                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> 671</span>`,
                                        contentViewModel: {
                                            icon: <Icon.IViewModelData>{
                                                type: Icon.Type.Bug
                                            }
                                        }
                                    }]
                                }
                            ]
                        }
                        }
                },
                {
                    header: "Trends",
                    body: `<dl data-bind="wpsDescriptionList: $vm.summary"></dl>`,
                    bodyViewModel: {
                        summary: <DescriptionList.IViewModelData>{
                            descriptionPairs: <Array<DescriptionList.IDescriptionPairData>>[
                                {
                                    term: "Frownies",
                                    descriptions: [{
                                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> 715</span>`,
                                        contentViewModel: {
                                            icon: <Icon.IViewModelData>{
                                                type: Icon.Type.ChevronDown
                                            }
                                        }
                                    }]
                                },
                                {
                                    term: "Navigations",
                                    descriptions: [{
                                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> 6,000</span>`,
                                        contentViewModel: {
                                            icon: <Icon.IViewModelData>{
                                                type: Icon.Type.ChevronUp
                                            }
                                        }
                                    }]
                                },
                                {
                                    term: "Hours of Focus Time",
                                    descriptions: [{
                                        content: `<span class="subtitle"><span data-bind="wpsIcon: $vm.icon"></span> 2,700</span>`,
                                        contentViewModel: {
                                            icon: <Icon.IViewModelData>{
                                                type: Icon.Type.ChevronUp
                                            }
                                        }
                                    }]
                                }
                            ]
                        }
                    }
                }
            ]
        };
        let sectionWidget = new Section.Widget($("#sample-sidebar"), sectionData);
    });
}