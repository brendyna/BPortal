export = Main.template;

module Main {
    export let template = `
        <section>
            <div class="layout layout--sidebar">
                <div class="module module--secondary">
                    <section id="sidebar" data-bind="wpsSection: viewModel.sidebar"></section>
                </div>
                <div class="module module--primary">
                    <section id="BiasPlot" data-bind="wpsSection: viewModel.biasPlotSection"></section>
                </div>
            </div>
        </section>
    `;
}