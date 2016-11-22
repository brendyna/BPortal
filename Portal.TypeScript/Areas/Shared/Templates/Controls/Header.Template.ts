export = Main.template;

module Main {
    export let template = `
        <!-- ko ifnot: viewModel.title() === "" -->
            <h1 data-bind="text: viewModel.title"></h1>
        <!-- /ko -->
        <!-- ko if: viewModel.subtitle -->
            <p class="subtitle" data-bind="text: viewModel.subtitle"></p>
        <!-- /ko -->
    `;
}