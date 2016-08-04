"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var tooltip_1 = require('@angular2-material/tooltip/tooltip');
var overlay_1 = require('@angular2-material/core/overlay/overlay');
var overlay_container_1 = require('@angular2-material/core/overlay/overlay-container');
testing_1.describe('MdTooltip', function () {
    var builder;
    var overlayContainerElement;
    testing_1.beforeEachProviders(function () { return [
        overlay_1.OVERLAY_PROVIDERS,
        { provide: overlay_container_1.OverlayContainer, useFactory: function () {
                return {
                    getContainerElement: function () {
                        overlayContainerElement = document.createElement('div');
                        return overlayContainerElement;
                    }
                };
            } },
    ]; });
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    testing_1.describe('basic usage', function () {
        var fixture;
        var buttonDebugElement;
        var buttonElement;
        var tooltipDirective;
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(BasicTooltipDemo).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
                buttonElement = buttonDebugElement.nativeElement;
                tooltipDirective = buttonDebugElement.injector.get(tooltip_1.MdTooltip);
            });
        }));
        testing_1.it('should show/hide on mouse enter/leave', testing_1.async(function () {
            testing_1.expect(tooltipDirective.visible).toBeFalsy();
            tooltipDirective._handleMouseEnter(null);
            testing_1.expect(tooltipDirective.visible).toBeTruthy();
            fixture.detectChanges();
            whenStable([
                function () {
                    testing_1.expect(overlayContainerElement.textContent).toBe('some message');
                    tooltipDirective._handleMouseLeave(null);
                },
                function () {
                    testing_1.expect(overlayContainerElement.textContent).toBe('');
                }
            ]);
        }));
        /**
         * Utility function to make it easier to use multiple `whenStable` checks.
         * Accepts an array of callbacks, each to wait for stability before running.
         * TODO: Remove the `setTimeout()` when a viable alternative is available
         * @param callbacks
         */
        function whenStable(callbacks) {
            if (callbacks.length) {
                fixture.detectChanges();
                fixture.whenStable().then(function () {
                    // TODO(jelbourn): figure out why the test zone is "stable" when there are still pending
                    // tasks, such that we have to use `setTimeout` to run the second round of change
                    // detection. Two rounds of change detection are necessary: one to *create* the tooltip,
                    // and another to cause the lifecycle events of the tooltip to run and load the tooltip
                    // content.
                    setTimeout(function () {
                        callbacks[0]();
                        whenStable(callbacks.slice(1));
                    }, 50);
                });
            }
        }
    });
});
var BasicTooltipDemo = (function () {
    function BasicTooltipDemo() {
        this.position = 'below';
    }
    BasicTooltipDemo = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [tooltip_1.MD_TOOLTIP_DIRECTIVES],
            template: "<button md-tooltip=\"some message\" [tooltip-position]=\"position\">Button</button>"
        }), 
        __metadata('design:paramtypes', [])
    ], BasicTooltipDemo);
    return BasicTooltipDemo;
}());
//# sourceMappingURL=tooltip.spec.js.map