export = Main.template;

module Main {
    export let template = `
        <!-- ko foreach: viewModel.descriptionPairs -->
            <dt data-bind="text: $data.term"></dt>
            <!-- ko foreach: $data.descriptions -->
                <dd data-bind="html: $data.content, customViewModel: $data.contentViewModel"></dd>
            <!-- /ko -->
        <!-- /ko -->
    `;
}