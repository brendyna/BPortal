export = Main.template;

module Main {
    export let template = `
        <nav id="summary-navigation" data-bind="wpsNavigation: vm.navigation"></nav>
        <header id="summary-header" data-bind="wpsHeader: vm.header"></header>
        <section>
            <div class="layout layout--sidebar">
                <div class="module module--secondary">
                    <section id="summary-sidebar" data-bind="wpsSection: vm.sidebar"></section>
                </div>
                <div class="module module--primary">
                    <section id="summary-bugs" data-bind="wpsSection: vm.bugs"></section>
                    <section id="summary-trends" data-bind="wpsSection: vm.trends"></section>
                </div>
            </div>
        </section>
    `;
}