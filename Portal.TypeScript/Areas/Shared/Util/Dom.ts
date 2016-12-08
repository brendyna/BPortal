import $ = require("jquery");
import Base = require("../Controls/Base");
import ko = require("knockout");

export = Main;

module Main {
    export function classify(selector: string): string {
        return "." + selector.replace(" ", ".");
    }

    export function idify(selector: string): string {
        return "#" + selector.replace(" ", "#");
    }
}