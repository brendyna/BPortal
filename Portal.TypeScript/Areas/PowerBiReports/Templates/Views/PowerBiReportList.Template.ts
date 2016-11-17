export = Main.template;

module Main {
    export let template = `
        <section>
            <div class="layout">
                <div class="module">
                    <section id="reportlist" data-bind="wpsSection: vm.reportlistSection"></section>
                </div>
            </div>
        </section>
    `;
}