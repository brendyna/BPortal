export = Main.template;

module Main {
    export let template = `
        <section>
            <div class="layout layout--sidebar">
                <div class="module module--secondary">
                    <section id="details-sidebar" data-bind="wpsSection: viewModel.sidebar"></section>
                </div>
                <div class="module module--primary">
                    <section id="details-bugs" data-bind="wpsSection: viewModel.bugs"></section>
                    <section id="details-tech" data-bind="wpsSection: viewModel.tech"></section>
                    <section id="details-trends" data-bind="wpsSection: viewModel.trends"></section>
                </div>
            </div>
        </section>
    `;
}