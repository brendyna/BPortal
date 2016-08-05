export = Main.template;

module Main {
    export let template = `
        <!-- ko if: vm.breadcrumb -->
	        <ul data-bind="foreach: vm.breadcrumb">
                <!-- ko ifnot: ($root.vm.breadcrumb().length - 1) === $index() -->
		            <li><a data-bind="text: $data.text, attr: { href: $data.url }"></a></li>
                <!-- /ko -->
                <!-- ko if: ($root.vm.breadcrumb().length - 1) === $index() -->
                    <li aria-current="page" data-bind="text: $data.text"></li>
                <!-- /ko -->
	        </ul>
        <!-- /ko -->
    `;
}