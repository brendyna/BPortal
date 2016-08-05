import $ = require("jquery");
import ko = require("knockout");
import Base = require("../Controls/Base");

export = Main;

module Main {
    export function handleCustomBinding<W extends Base.Widget>(
        element: Element,
        type: { new (e: JQuery, d: Base.IWidgetDefaults): W },
        valueAccessor: () => Base.IWidgetDefaults,
        bindingContext)
    {
        // Clean the node of its current bindings
        element = ko.cleanNode(element);
        $(element).attr("data-bind", null).empty();

        let widgetDefaults = ko.unwrap(valueAccessor());

        // Support passing in widget defaults, or just the
        // view model data (which we'll catch and turn into widget defaults)
        if (!widgetDefaults.viewModelData) {
            widgetDefaults = {
                viewModelData: widgetDefaults
            };
        }

        let widget = new type($(element), widgetDefaults);

        // If this is being called from within another widget,
        // Add the widget to the binding context widget's list of child widgets so it's cleaned up property
        if (bindingContext.$root.widget && bindingContext.$root.widget._childWidgets) {
            (<Base.Widget>bindingContext.$root.widget)._childWidgets.push(widget);
        }

        return { controlsDescendantBindings: true };
    }

    export function convertToCamelCase(obj) {
        if (!obj || typeof obj !== "object") {
            return null;
        }

        if (obj instanceof Array) {
            return $.map(obj, function (value) {
                return convertToCamelCase(value);
            });
        }

        var newObj = {};
        $.each(obj, function (key, value) {
            if (value instanceof Array) {
                value = convertToCamelCase(value);
            }
            key = key.charAt(0).toLowerCase() + key.slice(1);
            newObj[key] = value;
        });

        return newObj;
    }
}