export = Main.template;

module Main {
    export let template = `
            <div class="layout">
                <div class="module">
                    <div id="crawlerStatus" data-bind="wpsNote: viewModel.crawlerStatus"></div>
                    <section id="crawlerSection" data-bind="wpsSection: viewModel.crawlerSection"></section>
                </div>
            </div>
    `;
}