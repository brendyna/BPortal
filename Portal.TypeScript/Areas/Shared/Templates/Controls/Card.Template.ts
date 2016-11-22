export = Main.template;

module Main {
	export let template = `
		<!-- ko ifnot: viewModel.image() === "" -->
            <!-- ko if: viewModel.imageLink() === "" -->
			    <img data-bind="attr: { src: viewModel.image, alt: viewModel.imageAlt }" />
            <!-- /ko -->
            <!-- ko ifnot: viewModel.imageLink() === "" -->
			    <a data-bind="attr: { href: viewModel.imageLink, target: widget._imageLinkTarget }, css: { 'module__image': true }">
			        <img data-bind="attr: { src: viewModel.image, alt: viewModel.imageAlt }" />
                </a>
            <!-- /ko -->
		<!-- /ko -->
		<div class="module__content">
			<!-- ko ifnot: viewModel.title() === "" -->
			    <!-- ko if: viewModel.titleLink() === "" -->
				    <span data-bind="text: viewModel.title, attr: { title: viewModel.titleTooltip }, css: { 'subtitle': true }"></span>
			    <!-- /ko -->
                <!-- ko ifnot: viewModel.titleLink() === "" -->
				    <a data-bind="attr: { href: viewModel.titleLink, target: widget._titleLinkTarget }">
                        <span data-bind="text: viewModel.title, attr: { title: viewModel.titleTooltip }, css: { 'subtitle': true }"></span>
                    </a>
			    <!-- /ko -->
            <!-- /ko -->
			<div class="module__content__body" data-bind="html: viewModel.body, customViewModel: viewModel.bodyViewModel"></div>
		</div>
	`;
}