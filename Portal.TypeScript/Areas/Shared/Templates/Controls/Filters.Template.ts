export = Main.template;

module Main {
    export let template = `
        <div class="layout layout--basic--alt">
            <div class="layout--quarters">
                <!-- ko foreach: viewModel.selectData -->
                    <div class="module"><select data-bind="wpsSelect: { viewModelData: $data }"></select></div>
                <!-- /ko -->
                <!-- ko ifnot: viewModel.hideButtons -->
                    <div class="module">
                        <button data-bind="wpsButton: widget._applyButtonDefaults"></button>
                        <button data-bind="wpsButton: widget._resetButtonDefaults"></button>
                    </div>
                <!-- /ko -->
            </div>
        </div>
    `;
}