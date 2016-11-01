export = Main.template;

module Main {
    export let template = `
        <section>
            <div class="layout layout--sidebar">
                <div class="module module--secondary">
                    <section id="sidebar" data-bind="wpsSection: vm.sidebar"></section>
                    <section id="sidebar--sample-data" data-bind="wpsSection: vm.sidebarSampleData"></section>
                </div>
                <div class="module module--primary">
                    <section id="example" data-bind="wpsSection: vm.exampleSection"></section>
                </div>
            </div>
        </section>
    `;
}