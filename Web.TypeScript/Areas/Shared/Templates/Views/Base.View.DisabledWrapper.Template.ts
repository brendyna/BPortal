export = Main.template;

module Main {
    export let template = `
        <!-- ko if: widget.disabledPlaceholder() === "" -->
            {VIEW_TEMPLATE}
        <!-- /ko -->
        <!-- ko ifnot: widget.disabledPlaceholder() === "" -->
            <div data-bind="html: widget.disabledPlaceholder"></div>
        <!-- /ko -->
    `;
}