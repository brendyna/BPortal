import "jquery";
import "qunit";
import Base = require("Areas/Shared/Controls/Base");

export = Main;

module Main {
    function initializeWidget(widget: Base.IWidget): void {
        widget._setupElement();
        widget._applyBindings();
        widget._initializeSubscriptions();
        widget._initializeEvents();
    }

    QUnit.start();
    QUnit.module("Base");
    QUnit.test("Control exists", (assert) => {
        // Assert
        assert.ok(Base, "Base loaded");
        assert.equal(typeof (Base.ViewModel), "function", "ViewModel defined");
        assert.equal(typeof (Base.Widget), "function", "Widget defined");
    });

    QUnit.test("Control renders correctly", (assert) => {
        // Setup
        let widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel);
        let widgetClassNotInitiallyPresent: boolean;
        let widgetClassPresentAfterSetup: boolean;

        // Act
        widgetClassNotInitiallyPresent = !widget.element.hasClass(Base.Widget.widgetClass);
        initializeWidget(widget);
        widgetClassPresentAfterSetup = widget.element.hasClass(Base.Widget.widgetClass);

        // Assert
        assert.ok(widgetClassNotInitiallyPresent, "Fixture did not have widget class applied before render");
        assert.ok(widgetClassPresentAfterSetup, "Fixture has the widget class applied after render");

        widget.destroy();
    });

    QUnit.test("Control disables correctly", (assert) => {
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
        assert.equal(actualDefaultDisabledState, expectedDefaultDisabledState,
            "Disabled class is not present by default");
        assert.equal(actualDisabledStateAfterViewModelSetToTrue, expectedDisabledStateAfterViewModelSetToTrue,
            "Disabled class is present after updating the view model to true");
        assert.equal(actualDisabledStateAfterViewModelSetToFalse, expectedDisabledStateAfterViewModelSetToFalse,
            "Disabled class is not present after updating the view model to false");
        assert.equal(actualDisabledStateWhenSetAsTrueViaOptions, expectedInitialDisabledStateWhenSetAsTrueViaOptions,
            "Disabled class is present after initializing disabled via options to true");

        widget.destroy();
    });

    QUnit.test("Control loads correctly", (assert) => {
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
        assert.equal(actualDefaultLoadingState, expectedDefaultLoadingState,
            "Loading overlay is not present by default");
        assert.equal(actualLoadingStateAfterViewModelSetToTrue, expectedLoadingStateAfterViewModelSetToTrue,
            "Loading overlay is present after updating the view model to true");
        assert.equal(actualLoadingStateAfterViewModelSetToFalse, expectedLoadingStateAfterViewModelSetToFalse,
            "Loading overlay is not present after updating the view model to false");
        assert.equal(actualLoadingStateWhenSetAsTrueViaOptions, expectedInitialLoadingStateWhenSetAsTrueViaOptions,
            "Loading overlay is present after initializing Loading via options to true");

        widget.destroy();
    });

    QUnit.test("Control destroys correctly", (assert) => {
        // Setup
        let defaults: Base.IWidgetDefaults = {
        };
        let widget = new Base.Widget($("#qunit-fixture"), Base.ViewModel, defaults);

        // Act
        widget.destroy();

        // Assert
        assert.ok(!widget.element.hasClass(Base.Widget.widgetClass), "Fixture does not have the widget class after destroy");
    });
}