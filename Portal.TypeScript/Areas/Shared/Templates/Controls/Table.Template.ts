export = Main.template;

module Main {
    export let template = `
        <thead>
            <tr>
                <!-- ko foreach: vm.headers -->
                    <th data-bind="attr: { class: $data.classes }, css: { 'table__column--hidden': $data.hidden }, text: $data.text">
                    </th>
                <!-- /ko -->
            </tr>
        </thead>
        <tbody></tbody>
    `;
}