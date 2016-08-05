export = Main.template;

module Main {
    export let template = `
        <nav id="details-navigation" data-bind="wpsNavigation: vm.navigation"></nav>
        <header id="details-header" data-bind="wpsHeader: vm.header"></header>
        <section>
            <div class="layout layout--sidebar">
                <div class="module module--secondary">
                    <section id="details-sidebar" data-bind="wpsSection: vm.sidebar"></section>
                </div>
                <div class="module module--primary">
                    <section id="details-bugs" data-bind="wpsSection: vm.bugs"></section>
                    <section id="details-tech" data-bind="wpsSection: vm.tech"></section>
                    <section id="details-trends" data-bind="wpsSection: vm.trends"></section>
                </div>
            </div>
        </section>
    `;
}