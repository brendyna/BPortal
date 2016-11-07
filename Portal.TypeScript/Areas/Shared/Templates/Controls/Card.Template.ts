export = Main.template;

module Main {
	export let template = `
		<!-- ko ifnot: vm.image() === "" -->
            <!-- ko if: vm.imageLink() === "" -->
			    <img data-bind="attr: { src: vm.image, alt: vm.imageAlt }" />
            <!-- /ko -->
            <!-- ko ifnot: vm.imageLink() === "" -->
			    <a data-bind="attr: { href: vm.imageLink, target: widget._imageLinkTarget }, css: { 'module__image': true }">
			        <img data-bind="attr: { src: vm.image, alt: vm.imageAlt }" />
                </a>
            <!-- /ko -->
		<!-- /ko -->
		<div class="module__content">
			<!-- ko ifnot: vm.title() === "" -->
			    <!-- ko if: vm.titleLink() === "" -->
				    <span data-bind="text: vm.title, attr: { title: vm.titleTooltip }, css: { 'subtitle': true }"></span>
			    <!-- /ko -->
                <!-- ko ifnot: vm.titleLink() === "" -->
				    <a data-bind="attr: { href: vm.titleLink, target: widget._titleLinkTarget }">
                        <span data-bind="text: vm.title, attr: { title: vm.titleTooltip }, css: { 'subtitle': true }"></span>
                    </a>
			    <!-- /ko -->
            <!-- /ko -->
			<div class="module__content__body" data-bind="html: vm.body, customViewModel: vm.bodyViewModel"></div>
		</div>
	`;
}