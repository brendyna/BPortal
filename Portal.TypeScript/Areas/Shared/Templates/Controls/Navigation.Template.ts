export = Main.template;

module Main {
    export let template = `
        <!-- ko if: viewModel.breadcrumb -->
	        <ul data-bind="foreach: viewModel.breadcrumb">
                <!-- ko ifnot: ($root.viewModel.breadcrumb().length - 1) === $index() -->
		            <li><a data-bind="text: $data.text, attr: { href: $data.url }"></a></li>
                <!-- /ko -->
                <!-- ko if: ($root.viewModel.breadcrumb().length - 1) === $index() -->
                    <li aria-current="page" data-bind="text: $data.text"></li>
                <!-- /ko -->
	        </ul>
        <!-- /ko -->
    `;
}