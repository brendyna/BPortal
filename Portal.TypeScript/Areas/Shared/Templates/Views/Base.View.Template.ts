export = Main.template;

module Main {
    export let template = `
        <!-- ko if: viewModel.navigation -->
            <nav id="view-navigation" data-bind="wpsNavigation: viewModel.navigation"></nav>
        <!-- /ko -->
        <!-- ko if: viewModel.header -->
            <header id="view-header" data-bind="wpsHeader: viewModel.header"></header>
        <!-- /ko -->
    `;
}