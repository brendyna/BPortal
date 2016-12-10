export = Main.template;

module Main {
    export let template = `
        <section>
            <div class="layout layout--sidebar">
                <div class="module module--secondary">
                    <section id="sidebar" data-bind="wpsSection: viewModel.sidebar"></section>
                    <section id="sidebar--sample-data" data-bind="wpsSection: viewModel.sidebarSampleData"></section>
                </div>
                <div class="module module--primary">
                    <section id="example" data-bind="wpsSection: viewModel.exampleSection"></section>
                </div>
            </div>
        </section>
    `;
}