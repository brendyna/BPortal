export = Main.template;

module Main {
    export let template = `
        <section>
            <div class="layout">
                <div class="module">
                    <section id="summary-workspaces" data-bind="wpsSection: viewModel.workspaces"></section>
                    <section id="summary-datatables" data-bind="wpsSection: viewModel.datasets"></section>
                </div>
            </div>
        </section>
    `;
}