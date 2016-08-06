export = Main.template;

module Main {
    export let template = `
        <!-- ko if: vm.navigation -->
            <nav id="view-navigation" data-bind="wpsNavigation: vm.navigation"></nav>
        <!-- /ko -->
        <!-- ko if: vm.header -->
            <header id="view-header" data-bind="wpsHeader: vm.header"></header>
        <!-- /ko -->
    `;
}