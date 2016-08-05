import $ = require("jquery");
import Base = require("Areas/Shared/Controls/Base");

export = Main;

module Main {
    function initializeWidget(widget: Base.IWidget): void {
        widget._setupElement();
        widget._applyBindings();
        widget._initializeSubscriptions();
        widget._initializeEvents();
    }

    $((): void => {
        QUnit.module("Base");
        test("Control exists", 3, () => {
            // Assert
            ok(Base, "Base loaded");
            equal(typeof (Base.ViewModel), "function", "ViewModel defined");
            equal(typeof (Base.Widget), "function", "Widget defined");
        });

        test("Control renders correctly", 2, () => {
            // Setup
            let widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel);
            let widgetClassNotInitiallyPresent: boolean;
            let widgetClassPresentAfterSetup: boolean;

            // Act
            widgetClassNotInitiallyPresent = !widget.element.hasClass(Base.Widget.widgetClass);
            initializeWidget(widget);
            widgetClassPresentAfterSetup = widget.element.hasClass(Base.Widget.widgetClass);

            // Assert
            ok(widgetClassNotInitiallyPresent, "Fixture did not have widget class applied before render");
            ok(widgetClassPresentAfterSetup, "Fixture has the widget class applied after render");

            widget.destroy();
        });

        test("Control disables correctly", 4, () => {
            // Setup
            let defaults: Base.IWidgetDefaults = {
                viewModelData: {}
            };
            let widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel);
            let expectedDefaultDisabledState = false;
            let actualDefaultDisabledState: boolean;
            let expectedDisabledStateAfterViewModelSetToTrue = true;
            let actualDisabledStateAfterViewModelSetToTrue: boolean;
            let expectedDisabledStateAfterViewModelSetToFalse = false;
            let actualDisabledStateAfterViewModelSetToFalse: boolean;
            let expectedInitialDisabledStateWhenSetAsTrueViaOptions = true;
            let actualDisabledStateWhenSetAsTrueViaOptions: boolean;

            // Act
            initializeWidget(widget);

            actualDefaultDisabledState = widget.element.hasClass(Base.Widget.disabledWidgetClass);

            widget.viewModel.disabled(true);
            actualDisabledStateAfterViewModelSetToTrue = widget.element.hasClass(Base.Widget.disabledWidgetClass);

            widget.viewModel.disabled(false);
            actualDisabledStateAfterViewModelSetToFalse = widget.element.hasClass(Base.Widget.disabledWidgetClass);

            widget.destroy();
            defaults.viewModelData.disabled = true;
            widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel, defaults);
            initializeWidget(widget);
            actualDisabledStateWhenSetAsTrueViaOptions = widget.element.hasClass(Base.Widget.disabledWidgetClass);

            // Assert
            equal(actualDefaultDisabledState, expectedDefaultDisabledState,
                "Disabled class is not present by default");
            equal(actualDisabledStateAfterViewModelSetToTrue, expectedDisabledStateAfterViewModelSetToTrue,
                "Disabled class is present after updating the view model to true");
            equal(actualDisabledStateAfterViewModelSetToFalse, expectedDisabledStateAfterViewModelSetToFalse,
                "Disabled class is not present after updating the view model to false");
            equal(actualDisabledStateWhenSetAsTrueViaOptions, expectedInitialDisabledStateWhenSetAsTrueViaOptions,
                "Disabled class is present after initializing disabled via options to true");

            widget.destroy();
        });

        test("Control loads correctly", 4, () => {
            // Setup
            let loadingContentOverlayClass = ".content__async__loading-overlay";
            let defaults: Base.IWidgetDefaults = {
                viewModelData: {}
            };
            let widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel, defaults);
            let expectedDefaultLoadingState = false;
            let actualDefaultLoadingState: boolean;
            let expectedLoadingStateAfterViewModelSetToTrue = true;
            let actualLoadingStateAfterViewModelSetToTrue: boolean;
            let expectedLoadingStateAfterViewModelSetToFalse = false;
            let actualLoadingStateAfterViewModelSetToFalse: boolean;
            let expectedInitialLoadingStateWhenSetAsTrueViaOptions = true;
            let actualLoadingStateWhenSetAsTrueViaOptions: boolean;

            // Act
            initializeWidget(widget);

            actualDefaultLoadingState = widget.element.find(loadingContentOverlayClass).length === 0 ? false : true;

            widget.viewModel.loading(true);
            actualLoadingStateAfterViewModelSetToTrue = widget.element.find(loadingContentOverlayClass).length === 0 ? false : true;

            widget.viewModel.loading(false);
            actualLoadingStateAfterViewModelSetToFalse = widget.element.find(loadingContentOverlayClass).length === 0 ? false : true;

            widget.destroy();
            defaults.viewModelData.loading = true;
            widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel, defaults);
            initializeWidget(widget);
            actualLoadingStateWhenSetAsTrueViaOptions = widget.element.find(loadingContentOverlayClass).length === 0 ? false : true;

            // Assert
            equal(actualDefaultLoadingState, expectedDefaultLoadingState,
                "Loading overlay is not present by default");
            equal(actualLoadingStateAfterViewModelSetToTrue, expectedLoadingStateAfterViewModelSetToTrue,
                "Loading overlay is present after updating the view model to true");
            equal(actualLoadingStateAfterViewModelSetToFalse, expectedLoadingStateAfterViewModelSetToFalse,
                "Loading overlay is not present after updating the view model to false");
            equal(actualLoadingStateWhenSetAsTrueViaOptions, expectedInitialLoadingStateWhenSetAsTrueViaOptions,
                "Loading overlay is present after initializing Loading via options to true");

            widget.destroy();
        });

        test("Control destroys correctly", 1, () => {
            // Setup
            let defaults: Base.IWidgetDefaults = {
            };
            let widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel, defaults);

            // Act
            widget.destroy();

            // Assert
            ok(!widget.element.hasClass(Base.Widget.widgetClass), "Fixture does not have the widget class after destroy");
        });
    });
}