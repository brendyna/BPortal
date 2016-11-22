export = Main.template;

module Main {
    export let template = `
        <!-- ko foreach: viewModel.groups -->
            <details role="group" data-bind="attr: { 'open': $data.expanded }">
                <summary role="button" data-bind="text: $data.title, attr: { 'aria-expanded': $data.expanded, 'tabindex': 0 }"></summary>
                <div class="details__content" data-bind="html: $data.body, customViewModel: $data.bodyViewModel"></div>
            </details>
        <!-- /ko -->
    `;
}