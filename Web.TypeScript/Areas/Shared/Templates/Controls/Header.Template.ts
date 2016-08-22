export = Main.template;

module Main {
    export let template = `
        <!-- ko ifnot: vm.title() === "" -->
            <h1 data-bind="text: vm.title"></h1>
        <!-- /ko -->
        <!-- ko if: vm.subtitle -->
            <p class="subtitle" data-bind="text: vm.subtitle"></p>
        <!-- /ko -->
    `;
}