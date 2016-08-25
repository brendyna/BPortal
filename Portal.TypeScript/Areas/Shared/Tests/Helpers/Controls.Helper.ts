import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");

export = Main;

module Main {
    export type SetupObject<WD, W, VMD> = {
        fixture: JQuery;
        defaults: WD;
        widget: W;
        options?: SetupObjectOptions<VMD>;
    };

    export type SetupObjectOptions<VMD> = {
        fixtureSelector?: string;
        skipWidget?: boolean;
        viewModelData?: VMD
    }

    export function beforeEach<WD extends Base.IWidgetDefaults, W extends Base.Widget, VMD extends Base.IViewModelData>
        (widgetType: { new (e: JQuery, d: WD | VMD): W },
        options: SetupObjectOptions<VMD> = {}): SetupObject<WD, W, VMD> {
        // Setup
        let fixture = $(options.fixtureSelector || "#qunit-fixture");
        let defaults = <WD>{};
        let widget: W;

        defaults.viewModelData = options.viewModelData || {};
        if (!options.skipWidget) {
            widget = new widgetType(fixture, defaults);
        }

        return { fixture: fixture, defaults: defaults, widget: widget, options: options };
    }

    export function afterEach<WD extends Base.IWidgetDefaults, W extends Base.Widget, VMD extends Base.IViewModelData>
        (setup: SetupObject<WD, W, VMD>) {
        if (!setup.options.skipWidget) {
            setup.widget.destroy();
        }
    }
}