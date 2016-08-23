export = Main.template;

module Main {
    export let template = `
        <!-- ko foreach: vm.tabs -->
            <div class="control__tabs__tab">
                <input type="radio" data-bind="attr: { id: $data.id, name: $parent.vm.name }, value: $data.id, checked: $parent.vm.value" />
                <label data-bind="attr: { for: $data.id }">
                    <i data-bind="css: $data.icon" class="fa"></i>
                    <span data-bind="text: $data.text"></span>
                </label>
            </div>
        <!-- /ko -->
        <div class="control__tabs__divider"></div>
    `;
}