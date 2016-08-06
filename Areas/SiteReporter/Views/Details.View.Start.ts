import $ = require("jquery");
import Config = require("../Config");
import View = require("./Details.View");

export = Main;

module Main {
    let facebookParams = {
        domain: "facebook.com",
        platform: "Desktop",
        release: "Rs1"
    };

    $((): void => {
        let details = new View.Widget($("#details"), {
            viewContext: {
                params: $.extend({}, facebookParams)
            }
        });
    });
}