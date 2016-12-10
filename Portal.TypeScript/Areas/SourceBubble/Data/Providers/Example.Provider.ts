import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import Config = require("../../Config");
import ExampleRepo = require("../Repositories/Example.Repository");
import Header = require("Areas/Shared/Controls/Header");
import List = require("Areas/Shared/Controls/List");
import Navigation = require("Areas/Shared/Controls/Navigation");
import Section = require("Areas/Shared/Controls/Section");

export = Main;

module Main {
    Header;
    Navigation;
    Section;

    export interface IStaticProvider {
        getNavigationViewModelData: () => Navigation.IViewModelData;
        getHeaderViewModelData: () => Header.IViewModelData;
        getSidebarSectionViewModelData: () => Section.IViewModelData;
        getSidebarSampleDataSectionViewModelData: () => Section.IViewModelData;
        getExampleSectionViewModelData: () => Section.IViewModelData;
    }

    /**
     * Static providers return static view model data to render the UI that is shown right
     * away, with no dynamic/remote data required to populate it for it to be shown. This enables
     * progressive, less-jarring rendering.
     */
    export class StaticProvider implements IStaticProvider {
        constructor() {
        }

        public getNavigationViewModelData(): Navigation.IViewModelData {
            let navViewModelData: Navigation.IViewModelData = {
                breadcrumb: <Array<Navigation.ICrumbData>>Config.Window.ExampleBreadcrumb
            };

            return navViewModelData;
        }

        public getHeaderViewModelData(): Header.IViewModelData {
            let headerViewModelData: Header.IViewModelData = {
                title: "Getting Started"
            };

            return headerViewModelData;
        }

        public getExampleSectionViewModelData(): Section.IViewModelData {
            let exampleSectionData = <Section.IViewModelData>{
                classes: "example",
                // This use of the Section control demonstrates using a body template and
                // a bodyViewModel to drive that template (aka it demonstrates nested bindings).
                // The body template can contain any markup, including any of the custom binding
                // handlers we expose for the reusable controls.
                //
                // To access the properties exposed via bodyViewModel in the template, use the viewModel
                // variable that's passed into the template by Knockout when binding happens.
                title: "Introduction",
                anchor: "Intro",
                body: `<div data-bind="html: viewModel.introText"></div>`,
                bodyViewModel: {
                    introText: `
                        Welcome to the WPT Portal TypeScript project. This project helps us develop WPT Portal UI separate
                        from the portal, reducing development time and enabling us to decouple the UI from a backend implementation.

                        The point of this Getting Started area is two fold:
                        <br />
                        <ul>
                            <li>To have a simple area that's easy to copy <em>and</em> reference for best practices when jumping in and starting anew; and</li>
                            <li>To outline common patterns, tips, and tricks for creating views and integrating them with <a href="http://ieportal" target="_blank">WPTPortal</a></li>
                        </ul>
                        <br />
                        This view and the example dependencies it relies on aren't meant to go into depth about the Portal-TypeScript project itself.
                        To read more about the overall project, check out the <a href="https://github.com/MicrosoftEdge/IEPortal/wiki/Portal-TypeScript-Overview" target="_blank">Portal-TypeScript wiki page.</a>
                        It's recommended you read both!
                    `
                },
                subsections: [
                    {
                        header: "Repositories",
                        anchor: "Repositories",
                        altHeader: true,
                        // This example shows using the body as just a string with no data binding. This is also an
                        // option if the content is purely static. It's a simpler use case for sections and subsection content.
                        body: `
                            A repository typically maps to an API endpoint from which you retrieve data. It is used to link data types via
                            a Data Transfer Object type, with the backend API. Repositories are used by Views to control loading data, and 
                            are interacted with via Providers, which normalize the data for a View.<br /><br />

                            The key aspects of a repository are:

                            <br />
                            <ul>
                                <li>The <em>getPromise()</em> function, which gets a promise for <em>load()</em> complete so actions can be
                                    triggered when the data loads.</li>
                                <li>The <em>load()</em> function, which constructs the URL and request, dispatches it, and sets up completion callbacks</li>
                                <li>The <em>resultData</em> property, which is set to the AJAX response when the request successfully returns</li>
                            </ul><br />

                            <strong>See examples:</strong> Areas/Shared/Data/Repositories/Base.Repository.ts, Areas/GettingStarted/Data/Repositories/Example.Repository.ts
                        `
                    },
                    {
                        header: "Providers",
                        anchor: "Providers",
                        altHeader: true,
                        body: `
                            A Provider maps data from a repository/API endpoint to the view model format which drives views and controls. In the simplest case,
                            a repositories data transfer object would be the exact same as what's needed to display in the UI. In most cases, though, the
                            data is transformed in one or more ways before being displayed. It's the Providers job to do that.<br /><br />

                            Providers are broken into <em>Static</em> and <em>Dynamic</em> classes. A <em>static</em> provider returns content that has no remote data
                            dependencies. The goal with static content is incremental rendering: show what we can, when we can, to avoid a viewer staring
                            at a blank screen--and to create an experience that loads piece by piece, non jarringly.<br /><br />

                            A <em>dynamic</em> provider typically maps 1:1 to a repository. They handle transforming repo data into view model data which then
                            drives views and controls.<br /><br />

                            <strong>See examples:</strong> Areas/Shared/Data/Providers/Base.Provider.ts, Areas/GettingStarted/Data/Providers/Example.Provider.ts
                        `,
                        bodyViewModel: {

                        }
                    },
                    {
                        header: "Templates, Controls, and Views",
                        anchor: "TemplatesControlsViews",
                        altHeader: true,
                        body: `
                            <h4>Templates</h4>
                            <div>
                                A template is a string containing HTML markup combined with Knockout binding markup (via the <em>data-bind</em> attribute). Thanks
                                to TypeScript, we use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank">ES6 template strings/literals</a>, 
                                enabling embedded expressions and syntax highlighting. This greatly improves the experience of working with strings as templates.<br /><br />

                                The templates are inserted into the DOM by Controls and Views, which then call <a href="http://knockoutjs.com/documentation/observables.html" target="_blank"><em>ko.applyBindings</em></a> 
                                on the inserted element to binding view model data to the DOM.<br /><br />

                                You use custom binding handlers for Controls (see the Controls section) and other Knockout inline and control-flow <a href="http://knockoutjs.com/documentation/binding-syntax.html" target="_blank">bindings</a>
                                for other data-driven templating needs.<br /><br />

                                <strong>See examples:</strong> Areas/GettingStarted/Templates/Views/Example.Template.ts, Areas/Shared/Templates/Controls/DescriptionList.Template.ts
                            </div>

                            <h4>Controls</h4>
                            <div>
                                Controls are reusable pieces of UI that have data-driven APIs. The Shared area provides many controls, which typically link to a component or UI style defined by the
                                <a href="http://edgecore.azurewebsites.net/" target="_blank">Indigo/Edge Core CSS guidelines</a>. That said, the same structure can be followed for creating controls
                                that are area-specific. However, it's good to consider when building a control how to make it reusable for as many other consumers as possible.<br /><br />

                                Key aspects to know about Controls:
                                <ul>
                                    <li><em>Templates</em>: most controls have one or more templates associated with them, which define the content injected into the bound element. These templates are designed to be minimal, and where possible, 
                                        use only standard DOM elements for markup (to avoid gunking up the DOM with unnecessary wrapper divs and such). They use Knockout and custom bindings to render content.</li>
                                    <li><em>ViewModel Data</em>: the raw data that is eventually shaped into an observable view model before it's data-bound to the UI template. Providers typically shape data transfer objects into this format.</li>
                                    <li><em>ViewModel</em>: the observable version of the raw ViewModel data which is used programmatically and by Knockout to handle two-way bindings/updating of the data. This is kept separate from the Widget
                                        so it's easy to pull the data state out of a control at any time.</li>
                                    <li><em>Widget</em>: the main model for the Control that creates the observable view models, sets up the Control template, and binds the view model data to the templates. It also subscribes to changes in the
                                        view model data to handle state changes and consistency.</li>
                                    <li><em>Custom Binding Handlers</em>: while it's possible to new-up a control using the declarative <em>new ViewModel()</em> and <em>new Widget()</em> syntax, it flows easier with template composition to 
                                        define the need for a control in the template, and let the Widget handle newing up the control for you with the right data. This is done via custom binding handlers. Each reusable control exposes a custom binding handler
                                        in the form of <em>wps[ControlName]</em>, e.g. <em>wpsSelect</em> and <em>wpsNavigation</em>. The handler takes in raw view model data and does magic behind the scenes to convert it to observable values
                                        and new-up the Control's widget, binding it to the element the custom binding handler is specified on.</li>
                                </ul><br />

                                <strong>Note:</strong> Controls can be composited, meaning composed of other controls in whole or in part. This level of reuse is enabled by custom binding handlers.<br /><br />
                                
                                <strong>See examples:</strong> Areas/Shared/Controls/Button.ts, Areas/Shared/Controls/Section.ts
                            </div>

                            <h4>Views</h4>
                            <div>
                                Views are in essence like Controls, they have a Widget and defaults that drive the Widget. They have a template which drives the UX. But they inherit from different bases
                                as a View is a composition control, meant to make it easy (in conjunction with the Section control) to create flexible layouts.<br /><br />

                                Views are also more tightly coupled to the MVC side of things (e.g. WPTPortal) than any control, as a View defines which parameters (typically specified in the URL) it needs
                                to expose to its downlevel components (e.g. repositories, providers, and controls) and maps 1:1 to a Controller Action.<br /><br />

                                One key difference is that Views don't have ViewModels of their own. They have ViewModel Data, but that takes the form of IViewModelData defined by Controls. In this sense, Views
                                are indeed all about composition of other states/UI widgets, and differ from Controls in that way.<br /><br />
                                
                                <strong>Note:</strong> It's far more likely you'll author Views than Controls. However, if you have a UI scenario not yet covered by the framework, you may need to author Controls to
                                account for those new scenarios.<br /><br />

                                <strong>See examples:</strong> Areas/Shared/Views/Base.View.ts, Areas/GettingStarted/Views/Example.View.ts
                            </div>
                        `
                    },
                    {
                        header: "Styles",
                        anchor: "Styles",
                        altHeader: true,
                        body: `
                            We rely on Indigo to provide all styles for views and controls. This way, we adhere to those standards and ensure a
                            consistent look and feel across all views that are implemented.<br /><br />

                            In WPTPortal, the Indigo stylesheet is included by default. For local development here, it's included in the sample page.<br /><br />

                            If styles are needed, you'll need to ensure the CSS is copied correctly to package output by updating the <em>nuspec</em> file.
                            You can see in the existing file an example of copying CSS (Shared and SiteReporter areas).<br /><br />

                            <strong>See examples:</strong> <a href="http://edgecore.azurewebsites.net/" target="_blank">http://edgecore.azurewebsites.net/</a>
                        `
                    },
                    {
                        header: "Samples, Mocks, and Tests",
                        anchor: "SamplesMocksTests",
                        altHeader: true,
                        body: `
                            <h4>Samples and Mocks</h4>
                            <div>
                                A key local-development tool is a sample. Samples allow for development of a new Control or View outside of WPTPortal, greatly reducing
                                the dev loop of implementing and debugging.<br /><br />

                                The Sample page for a View is a local representation of what the View will look like and how it'll work when integrated with the WPTPortal. The
                                setup for the local sample is meant to mirror the setup in WPTPortal, making integration as seamless as updating the Portal.TypeScript NuGet package
                                in WPTPortal. There are two key setups which help us develop locally with a sample:

                                <ul>
                                    <li><em>RequireJS Config</em>: <a href="http://requirejs.org/" target="_blank">RequireJS</a> is how we load the JS modules generated by TypeScript. By mirroring 
                                        configurations across Portal.TypeScript and WPTPortal, and ensuring folder structures in the NuGet package mirror WPTPortal, it makes it easy to import changes 
                                        and have them <em>just work</em> in production.</li>
                                    <li><em>Request mocks</em>: One key aspect missing from local development is remote data requests. Using <a href="https://github.com/jakerella/jquery-mockjax" target="_blank">JQuery Mockjax</a>,
                                        we can capture requests issued via JQuery's AJAX interfaces and mock out their responses. This lets us deal with actual data. And, when in WPTPortal where mockjax isn't enabled, the
                                        requests go through to their configured URLs/endpoints as normal, making integration seamless.</li>
                                </ul><br />

                                <strong>See examples:</strong> require.web.config.js, Areas/GettingStarted/Samples/Helpers/Example.Mocks.ts, Areas/GettingStarted/Samples/Views/Example.Sample.ts
                            </div>

                            <h4>Tests</h4>
                            <div>
                                Tests are implemented using <a href="https://qunitjs.com/" target="_blank">QUnit</a>, and are meant to exercise the key UI behaviors expected of the customer.<br /><br />

                                We use the same mock data for tests as we do samples, making what we test as close to reality as possible.<br /><br /> 

                                <strong>Note:</strong> not all tests can be implemented in JS. Some tests that require interactions with password fields or user behaviors unable to be programmatically simulated will benefit
                                from use of WebDriver or other UI automation technologies.<br /><br />

                                <strong>See examples:</strong> Areas/Shared/Tests/Controls/Button.Test.ts, Areas/GettingStarted/Tests/Views/Example.Test.ts
                            </div>
                        `
                    },
                    {
                        header: "Integrating w/WPTPortal",
                        anchor: "WPTPortalIntegration",
                        altHeader: true,
                        body: `
                            The ultimate goal of this framework is to integrate the Views and their dependencies into WPTPortal. Each View is meant to map to a Controller Action View in MVC. In that way, there are a few things
                            to be aware of when integrating and testing that the changes/code in this project work in WPTPortal.<br />

                            <ul>
                                <li><em>Nuspec</em>: the <em>Portal.TypeScript.nuspec</em> file controls how the project contents will be mapped to the NuGet package contents. We intentionally map the contents in a way that will
                                    make them layout correctly when ingested into WPTPortal. Be sure to add the appropriate entries to the <em>&lt;files&gt;</em> element to ensure your area's files are packaged. You can verify by
                                    running the <em>BuildAndPack.ps1</em> script, then navigating to <em>.nuget/packages/obj</em>, changing the package extension to .zip, and verify if the <em>content</em> folder contains your files.</li>
                                <li><em>RequireJS Config (Shared)</em>: it's recommended you create a shared <em>_Layout.cshtml</em> that will be used to define the requirejs configuration options and to render out the shared template
                                    to be used by all MVC Views in your area.</li>
                                <li><em>RequireJS Config (View specific)</em>: the cshtml files which map to individual MVC Views define which JS file to run initially. Every TypeScript View has a sister <em>View.Start.ts</em> file. 
                                    Think about this as the C# or Java equivalent of the <em>main</em> method to run on startup.</li>
                                <li><em>Including assets in csproj</em>: once you've ensured the package contains the right assets for your area, you'll need to upgrade the package in IEPortal.sln to use the local version you generated. When
                                    you're adding a new area, new JS files will be pulled in as part of the package upgrade. You'll need to add those JS files to the csproj to ensure they're including in the Web packaging process which gathers
                                    all the needed assets to deploy IEPortal to the web. The JS files won't be tracked in the git repo for IEPortal, but they'll be included in the csproj.</li>
                            </ul><br />

                            <strong>See examples</strong>: Areas/GettingStarted/Views/Example.View.Start.ts, 
                            <a href="https://github.com/MicrosoftEdge/IEPortal/blob/develop/Web/Areas/SiteReporter/Views/Shared/_Layout.cshtml" target="_blank">Web/Areas/SiteReporter/Views/Shared/_Layout.cshtml</a>, 
                            <a href="https://github.com/MicrosoftEdge/IEPortal/blob/develop/Web/Areas/SiteReporter/Views/Summary/Index.cshtml" target="_blank">Web/Areas/SiteReporter/Views/Summary/Index.cshtml</a>
                        `
                    },
                    {
                        header: "Tips for Pull Requests",
                        anchor: "PullRequestTips",
                        altHeader: true,
                        body: `
                            <ul>
                                <li>Check for style nits like formatting and unnecessary blank lines.</li>
                                <li>Ensure tests are written for the major behaviors of your view</li>
                                <li>If adding an area, ensure the nuspec is updated to include the area in NuGet packaging</li>
                                <li>Run <em>msbuild /t:TestGeneratedFiles</em> on Portal.TypeScript.csproj to ensure all tests pass</li>
                                <li>DRY (don't repeat yourself) out <em>all</em> of your code, tests and samples included</li>
                                <li>Ensure your changes work in WPTPortal by using the package locally (run BuildAndPack.ps1 to generate the NuGet package</li>
                                <li>If you've added a new shared component, ensure there are tests written for it.</li>
                            </ul><br /><br />
                        `
                    }
                ]
            };

            return exampleSectionData;
        }

        public getSidebarSectionViewModelData(): Section.IViewModelData {
            let exampleSectionData = <Section.IViewModelData>{
                classes: "sidebar",
                body: `<ul data-bind="wpsList: viewModel.sections"></ul>`,
                bodyViewModel: {
                    sections: <List.IViewModelData>{
                        type: List.Type.Links,
                        items: [
                            {
                                content: `<a href="#Intro">Introduction</a>`
                            },
                            {
                                content: `<a href="#Repositories">Repositories</a>`
                            },
                            {
                                content: `<a href="#Providers">Providers</a>`
                            },
                            {
                                content: `<a href="#TemplatesControlsViews">Templates, Controls, and Views</a>`
                            },
                            {
                                content: `<a href="#Styles">Styles</a>`
                            },
                            {
                                content: `<a href="#SamplesMocksTests">Samples, Mocks, and Tests</a>`
                            },
                            {
                                content: `<a href="#WPTPortalIntegration">Integrating w/WPTPortal</a>`
                            },
                            {
                                content: `<a href="#PullRequestTips">Tips for Pull Requests</a>`
                            }
                        ]
                    }
                }
            };

            return exampleSectionData;
        }

        public getSidebarSampleDataSectionViewModelData(): Section.IViewModelData {
            let exampleSectionData = <Section.IViewModelData>{
                classes: "sidebar--data-sample",
                title: "Loading data",
                altHeader: true,
                body: `
                    This section is a simple demo of loading data. It's a contrived example
                    to demonstrate the UI and code behind fetching remote content.
                `
            };

            return exampleSectionData;
        }
    }

    /**
     * Dynamic providers typically map one apiece to a repository, and are used
     * to translate data transfer objects into view model data. In an ideal, simple world,
     * data returned from a repository's endpoint would be the exact shape needed by the UI.
     * But often, to decouple UIs from backends, the data is genericized and dynamic providers
     * are used to specialize it for WPTPortal display using Indigo/WPTPortal controls.
     */
    export class ExampleProvider extends BaseProvider.DynamicProvider<ExampleRepo.DataTransferObject> implements BaseProvider.IDynamicProvider {
        constructor(repository: ExampleRepo.IRepository) {
            super(repository);
        }

        public getResponseDataAsString(): string {
            return JSON.stringify(this.repository.resultData);
        }
    }
}