export = Main.template;

module Main {
    export let template = `
        <!-- ko if: vm.breadcrumb -->
            <nav class="breadcrumb" aria-label="breadcrumbs">
	            <ul data-bind="foreach: vm.breadcrumb">
                    <!-- ko ifnot: ($root.vm.breadcrumb().length - 1) === $index() -->
		                <li><a data-bind="text: $data.text, attr: { href: $data.url }"></a></li>
                    <!-- /ko -->
                    <!-- ko if: ($root.vm.breadcrumb().length - 1) === $index() -->
                        <li aria-current="page" data-bind="text: $data.text"></li>
                    <!-- /ko -->
	            </ul>
            </nav>
        <!-- /ko -->
        <!-- ko ifnot: vm.title() === "" -->
            <h1 data-bind="text: vm.title"></h1>
        <!-- /ko -->
        <!-- ko if: vm.subtitle -->
            <p class="subtitle" data-bind="text: vm.subtitle"></p>
        <!-- /ko -->
    `;
}