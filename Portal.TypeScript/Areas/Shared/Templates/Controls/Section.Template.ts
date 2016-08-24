export = Main.template;

module Main {
    export let template = `
        <!-- ko ifnot: vm.anchor() === "" -->
            <a data-bind="attr: { name: vm.anchor }"></a>
        <!-- /ko -->
        <!-- ko ifnot: vm.title() === "" && vm.subtitle() === "" -->
	        <header class="section__header">
                <!-- ko ifnot: vm.title() === "" -->
		            <h2 data-bind="text: vm.title, css: { 'header--alt': vm.altHeader }"></h2>
                <!-- /ko -->
                <!-- ko ifnot: vm.subtitle() === "" -->
		            <p class="subtitle" data-bind="text: vm.subtitle"></p>
                <!-- /ko -->
	        </header>
        <!-- /ko -->
        <!-- ko if: vm.bodyPlaceholder() === "" -->
	        <div class="section__body">
                <!-- ko ifnot: vm.body() === "" -->
		            <div data-bind="html: vm.body, customViewModel: vm.bodyViewModel"></div>
                <!-- /ko -->
                <!-- ko foreach: vm.subsections -->
		            <section class="subsection" data-bind="css: $data.classes">
                        <!-- ko ifnot: $data.header() === "" -->
			                <h3 class="subsection__header" data-bind="text: $data.header, css: { 'header--alt': $data.altHeader }"></h3>
                        <!-- /ko -->
			            <div class="subsection__body" data-bind="html: $data.body, customViewModel: $data.bodyViewModel"></div>
		            </section>
                <!-- /ko -->
	        </div>
        <!-- /ko -->
        <!-- ko ifnot: vm.bodyPlaceholder() === "" -->
            <div class="body-placeholder" data-bind="html: vm.bodyPlaceholder"></div>
        <!-- /ko -->
    `;
}