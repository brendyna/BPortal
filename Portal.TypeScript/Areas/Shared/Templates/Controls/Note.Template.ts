export = Main.template;

module Main {
	export let template = `
        <!-- ko ifnot: viewModel.title() == "" -->
            <h4 data-bind="text: viewModel.title"></h4>
        <!-- /ko -->
		<p data-bind="text: viewModel.text"></p>
	`;
}