export = Main.template;

module Main {
    export let template = `
        <!-- ko ifnot: viewModel.anchor() === "" -->
            <a data-bind="attr: { name: viewModel.anchor }"></a>
        <!-- /ko -->
        <!-- ko ifnot: viewModel.title() === "" && viewModel.subtitle() === "" -->
	        <header class="section__header">
                <!-- ko ifnot: viewModel.title() === "" -->
		            <h2 data-bind="text: viewModel.title, css: { 'header--alt': viewModel.altHeader }"></h2>
                <!-- /ko -->
                <!-- ko ifnot: viewModel.subtitle() === "" -->
		            <p class="subtitle" data-bind="text: viewModel.subtitle"></p>
                <!-- /ko -->
	        </header>
        <!-- /ko -->
        <!-- ko if: viewModel.bodyPlaceholder() === "" -->
	        <div class="section__body">
                <!-- ko ifnot: viewModel.body() === "" -->
		            <div data-bind="html: viewModel.body, customViewModel: viewModel.bodyViewModel"></div>
                <!-- /ko -->
                <!-- ko foreach: viewModel.subsections -->
		            <section class="subsection" data-bind="css: $data.classes">
                        <!-- ko ifnot: $data.anchor() === "" -->
                            <a data-bind="attr: { name: $data.anchor }"></a>
                        <!-- /ko -->
                        <!-- ko ifnot: $data.header() === "" -->
			                <h3 class="subsection__header" data-bind="text: $data.header, css: { 'header--alt': $data.altHeader }"></h3>
                        <!-- /ko -->
                        <!-- ko if: $data.bodyPlaceholder() === "" -->
			                <div class="subsection__body" data-bind="html: $data.body, customViewModel: $data.bodyViewModel"></div>
                        <!-- /ko -->
                        <!-- ko ifnot: $data.bodyPlaceholder() === "" -->
			                <div class="body-placeholder" data-bind="html: $data.bodyPlaceholder"></div>
                        <!-- /ko -->
		            </section>
                <!-- /ko -->
	        </div>
        <!-- /ko -->
        <!-- ko ifnot: viewModel.bodyPlaceholder() === "" -->
            <div class="body-placeholder" data-bind="html: viewModel.bodyPlaceholder"></div>
        <!-- /ko -->
    `;
}