export = Main.template;

module Main {
    export let template = `
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