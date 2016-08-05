import DataProvider = require("../../Data/Providers/Details.Provider");
import DetailsView = require("../../Views/Details.View");

export = Main;

module Main {
    $((): void => {
        let dataProvider = new DataProvider.Provider();
        let data = {
            navigation: dataProvider.getNavigationData(),
            header: dataProvider.getHeaderData(),
            sidebar: dataProvider.getSidebarData(),
            bugs: dataProvider.getBugsData(),
            trends: dataProvider.getTrendsData(),
            tech: dataProvider.getTechData()
        };
        let summary = new DetailsView.Widget($("#sample"), data);
    });
}