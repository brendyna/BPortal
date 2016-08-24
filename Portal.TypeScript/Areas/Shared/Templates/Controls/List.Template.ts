﻿export = Main.template;

module Main {
    export let template = `
        <!-- ko foreach: vm.items -->
            <li data-bind="html: $data.content, css: $data.classes"></li>
        <!-- /ko -->
    `;
}