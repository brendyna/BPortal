import BaseProvider = require("Areas/Shared/Data/Providers/Base.Provider");
import BiasPlotRepo = require("../Repositories/BiasPlot.Repository");
import Chart = require("Areas/Shared/Controls/Chart");
import Config = require("../../Config");
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
        getBiasPlotSectionViewModelData: () => Section.IViewModelData;
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
                breadcrumb: <Array<Navigation.ICrumbData>>Config.Window.BiasPlotBreadcrumb
            };

            return navViewModelData;
        }

        public getHeaderViewModelData(): Header.IViewModelData {
            let headerViewModelData: Header.IViewModelData = {
                title: "Bias Plot"
            };

            return headerViewModelData;
        }

        public getBiasPlotSectionViewModelData(): Section.IViewModelData {
            let BiasPlotSectionData = <Section.IViewModelData>{
                classes: "BiasPlot",
                anchor: "Intro",
                body: `<div data-bind="wpsChart: viewModel.plotChart"></div>`,
                bodyViewModel: {
                    plotChart: <Chart.IViewModelData>{
                    }
                },
                subsections: []
            };

            return BiasPlotSectionData;
        }

        public getSidebarSectionViewModelData(): Section.IViewModelData {
            let BiasPlotSectionData = <Section.IViewModelData>{
                classes: "sidebar",
                body: `<ul data-bind="wpsList: viewModel.sections"></ul>`,
                bodyViewModel: {
                    sections: <List.IViewModelData>{
                        type: List.Type.Links,
                        items: []
                    }
                }
            };

            return BiasPlotSectionData;
        }
    }

    /**
     * Dynamic providers typically map one apiece to a repository, and are used
     * to translate data transfer objects into view model data. In an ideal, simple world,
     * data returned from a repository's endpoint would be the exact shape needed by the UI.
     * But often, to decouple UIs from backends, the data is genericized and dynamic providers
     * are used to specialize it for WPTPortal display using Indigo/WPTPortal controls.
     */
    export class BiasPlotProvider extends BaseProvider.DynamicProvider<BiasPlotRepo.DataTransferObject> implements BaseProvider.IDynamicProvider {
        constructor(repository: BiasPlotRepo.IRepository) {
            super(repository);
        }

        public getResponseDataAsString(): string {
            return JSON.stringify(this.repository.resultData);
        }
    }
}