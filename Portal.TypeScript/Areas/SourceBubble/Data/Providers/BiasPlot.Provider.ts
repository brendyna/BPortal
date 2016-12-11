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
    Chart;
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
                        options: {
                            chart: {
                                renderTo: 'container',
                                defaultSeriesType: 'scatter',
                                borderWidth: 1,
                                borderColor: '#ccc',
                                //marginLeft: 90,
                                //marginRight: 50,
                                backgroundColor: '#eee',
                                plotBackgroundColor: '#fff',
                                height: 600
                            },
                            credits: { enabled: false },
                            title: {
                                text: 'Source Bubble'
                            },
                            legend: {
                                enabled: false
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.series.name + '</b><br/>' +
                                        this.x + ': ' + this.y;
                                }
                            },
                            plotOptions: {
                                line: {
                                    
                                },
                                series: {
                                    shadow: false,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}'
                                    },
                                    marker: {
                                        enabled: true,
                                        radius: 2,
                                        width: 2
                                    }
                                }
                            },
                            xAxis: {
                                title: {
                                    text: 'Liberal to Conservative',
                                    margin: 25
                                },
                                labels: {
                                    enabled: false
                                },
                                min: -100,
                                max: 100,
                                tickInterval: 100,
                                tickLength: 0,
                                minorTickLength: 0,
                                gridLineWidth: 1,
                                showLastLabel: false,
                                showFirstLabel: false,
                                lineColor: '#ccc',
                                lineWidth: 1
                            },
                            yAxis: {
                                title: {
                                    text: 'Exaggerated to Reasonable',
                                    rotation: -90,
                                    margin: 25,
                                },
                                labels: {
                                    enabled: false
                                },
                                min: -100,
                                max: 100,
                                gridLineWidth: 1,
                                tickInterval: 100,
                                tickLength: 3,
                                tickAmount: 0,
                                minorTickLength: 0,
                                lineColor: '#ccc',
                                lineWidth: 1,
                                showFirstLabel: false,
                                showLastLabel: false
                            },
                            series: [{
                                //color: '#185aa9',
                                data: [
                                    //{ x: Math.random() * 100, y: -Math.random() * 100 },
                                    //{ x: 0, y: 0, z: 0, name: '' },
                                    // Liberal/Reasonable
                                    { x: -10, y: 90, z: 1, name: 'SlateStar' },
                                    { x: -20, y: 83, z: 0, name: 'BBC' },
                                    { x: -15, y: 83, z: 0, name: 'Al-J' },
                                    { x: -70, y: 67, z: 0, name: 'Freddie DeBoer' },
                                    { x: -18, y: 70, z: 0, name: 'NYT' },
                                    { x: -23, y: 56, z: 0, name: 'NPR' },
                                    { x: -30, y: 49, z: 0, name: 'New Yorker' },
                                    { x: -5, y: 50, z: 0, name: 'Politico' },
                                    { x: -75, y: 40, z: 0, name: 'New Inquiry' },
                                    { x: -10, y: 37, z: 0, name: 'WaPo' },
                                    { x: -1, y: 47, z: 0, name: 'RCP' },
                                    { x: -80, y: 30, z: 0, name: 'Jacobin' },
                                    { x: -33, y: 35, z: 0, name: 'Atlantic' },
                                    { x: -10, y: 33, z: 0, name: 'LATimes' },
                                    { x: -33, y: 20, z: 0, name: 'TPM' },
                                    { x: -15, y: 18, z: 0, name: 'Chicago Tribune' },
                                    { x: -43, y: 5, z: 0, name: 'Guardian' },
                                    // Liberal exaggerated
                                    { x: -90, y: -5, z: 0, name: 'Infoshop' },
                                    { x: -40, y: -7, z: 0, name: 'Slate' },
                                    { x: -19, y: -10, z: 0, name: 'RT' },
                                    { x: -12, y: -12, z: 0, name: 'NetJournal' },
                                    { x: -20, y: -22, z: 0, name: 'MSNBC' },
                                    { x: -25, y: -26, z: 0, name: 'Mic' },
                                    { x: -37, y: -30, z: 0, name: 'NY Mag' },
                                    { x: -30, y: -35, z: 0, name: 'NewRepublic' },
                                    { x: -34, y: -39, z: 0, name: 'HuffPo' },
                                    { x: -75, y: -42, z: 0, name: 'Mother Jones' },
                                    { x: -8, y: -44, z: 0, name: 'CNN' },
                                    { x: -43, y: -47, z: 0, name: 'ArsTechnica' },
                                    { x: -70, y: -49, z: 0, name: 'Thinkprogress' },
                                    { x: -33, y: -50, z: 0, name: 'VICE' },
                                    { x: -40, y: -54, z: 0, name: 'Rolling Stone' },
                                    { x: -6, y: -56, z: 0, name: 'Biz. Insider' },
                                    { x: -95, y: -58, z: 0, name: 'Critical-Theory' },
                                    { x: -30, y: -63, z: 0, name: 'Vox' },
                                    { x: -24, y: -66, z: 0, name: 'DailyBeast' },
                                    { x: -60, y: -70, z: 0, name: 'XoJane' },
                                    { x: -27, y: -71, z: 0, name: 'Independent' },
                                    { x: -31, y: -73, z: 0, name: 'Gawker' },
                                    { x: -46, y: -74, z: 0, name: 'Rawstory' },
                                    { x: -5, y: -75, z: 0, name: 'Examiner' },
                                    { x: -64, y: -77, z: 0, name: 'Jezebel' },
                                    { x: -33, y: -78, z: 0, name: 'Upworthy' },
                                    { x: -24, y: -82, z: 0, name: 'Mary Sue' },
                                    { x: -78, y: -85, z: 0, name: 'Salon' },
                                    { x: -55, y: -97, z: 0, name: 'The Toast' },
                                    // Center
                                    { x: 0, y: 0, z: 0, name: 'USA Today' },
                                    // Conservative reasonable
                                    { x: 33, y: 95, z: 0, name: 'American Conservative' },
                                    { x: 66, y: 90, z: 0, name: 'Future Primaeval' },
                                    { x: 30, y: 83, z: 0, name: 'MargRev' },
                                    { x: 1, y: 77, z: 0, name: 'Economist' },
                                    { x: 35, y: 73, z: 0, name: 'Mitrailleuse' },
                                    { x: 2, y: 70, z: 0, name: 'WSJ' },
                                    { x: 20, y: 63, z: 0, name: 'Ethika' },
                                    { x: 70, y: 62, z: 0, name: 'Social Matter' },
                                    { x: 41, y: 58, z: 0, name: 'First Things' },
                                    { x: 28, y: 53, z: 0, name: 'New Criterion' },
                                    { x: 15, y: 33, z: 0, name: 'Telegraph' },
                                    { x: 54, y: 26, z: 0, name: 'Aospades' },
                                    { x: 16, y: 24, z: 0, name: 'WaEx' },
                                    { x: 21, y: 20, z: 0, name: 'Reason' },
                                    { x: 4, y: 18, z: 0, name: 'Spiked' },
                                    { x: 31, y: 14, z: 0, name: 'CityAM WORLD' },
                                    { x: 67, y: 10, z: 0, name: 'Unz' },
                                    { x: 22, y: 5, z: 0, name: 'NY Post' },
                                    { x: 19, y: 3, z: 0, name: 'Am.Interest' },
                                    { x: 45, y: 2, z: 0, name: 'Federalist' },
                                    // Conservative exaggerated
                                    { x: 28, y: -5, z: 0, name: 'Daily Signal' },
                                    { x: 66, y: -8, z: 0, name: 'Taki' },
                                    { x: 38, y: -10, z: 0, name: 'WaTimes' },
                                    { x: 50, y: -15, z: 0, name: 'American Thinker' },
                                    { x: 26, y: -17, z: 0, name: 'NRO' },
                                    { x: 39, y: -20, z: 0, name: 'Nat Interest' },
                                    { x: 24, y: -25, z: 0, name: 'Fox' },
                                    { x: 65, y: -26, z: 0, name: 'Crisis' },
                                    { x: 42, y: -31, z: 0, name: 'Dailycaller' },
                                    { x: 16, y: -32, z: 0, name: 'Hotair' },
                                    { x: 53, y: -37, z: 0, name: 'Breitbart' },
                                    { x: 8, y: -42, z: 0, name: 'Dailymail' },
                                    { x: 32, y: -45, z: 0, name: 'Wkly.Standard' },
                                    { x: 20, y: -47, z: 0, name: 'Drudge' },
                                    { x: 34, y: -50, z: 0, name: 'The Blaze' },
                                    { x: 85, y: -51, z: 0, name: 'Radix' },
                                    { x: 10, y: -57, z: 0, name: 'IJReview' },
                                    { x: 26, y: -59, z: 0, name: 'RedState' },
                                    { x: 50, y: -64, z: 0, name: 'FreeBeacon' },
                                    { x: 19, y: -70, z: 0, name: 'Zerohedge' },
                                    { x: 54, y: -75, z: 0, name: 'WorldNetDaily' },
                                    { x: 15, y: -80, z: 0, name: 'Intellihub' },
                                    { x: 16, y: -99, z: 0, name: 'Infowars' },
                                ]
                            }]
                        }
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