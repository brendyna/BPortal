export = Main.template;

module Main {
    export let template = `
        <section>
            <div class="layout">
                <div class="module">
                    <section id="BiasPlot" data-bind="wpsSection: viewModel.biasPlotSection"></section>
                </div>
            </div>
        </section>
    `;
}