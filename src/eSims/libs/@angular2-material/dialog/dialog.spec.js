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
var dialog_1 = require('./dialog');
var overlay_1 = require('@angular2-material/core/overlay/overlay');
var overlay_container_1 = require('@angular2-material/core/overlay/overlay-container');
var dialog_config_1 = require('./dialog-config');
var dialog_ref_1 = require('./dialog-ref');
describe('MdDialog', function () {
    var builder;
    var dialog;
    var overlayContainerElement;
    var testViewContainerRef;
    var viewContainerFixture;
    beforeEach(function () {
        testing_1.addProviders([
            overlay_1.OVERLAY_PROVIDERS,
            dialog_1.MdDialog,
            { provide: overlay_container_1.OverlayContainer, useFactory: function () {
                    return {
                        getContainerElement: function () {
                            overlayContainerElement = document.createElement('div');
                            return overlayContainerElement;
                        }
                    };
                } },
        ]);
    });
    var deps = [testing_2.TestComponentBuilder, dialog_1.MdDialog];
    beforeEach(testing_1.inject(deps, testing_1.fakeAsync(function (tcb, d) {
        builder = tcb;
        dialog = d;
    })));
    beforeEach(testing_1.async(function () {
        builder.createAsync(ComponentWithChildViewContainer).then(function (fixture) {
            viewContainerFixture = fixture;
            viewContainerFixture.detectChanges();
            testViewContainerRef = fixture.componentInstance.childViewContainer;
        });
    }));
    it('should open a dialog with a component', testing_1.async(function () {
        var config = new dialog_config_1.MdDialogConfig();
        config.viewContainerRef = testViewContainerRef;
        dialog.open(PizzaMsg, config).then(function (dialogRef) {
            expect(overlayContainerElement.textContent).toContain('Pizza');
            expect(dialogRef.componentInstance).toEqual(jasmine.any(PizzaMsg));
            expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
            viewContainerFixture.detectChanges();
            var dialogContainerElement = overlayContainerElement.querySelector('md-dialog-container');
            expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
        });
        detectChangesForDialogOpen(viewContainerFixture);
    }));
    it('should apply the configured role to the dialog element', testing_1.async(function () {
        var config = new dialog_config_1.MdDialogConfig();
        config.viewContainerRef = testViewContainerRef;
        config.role = 'alertdialog';
        dialog.open(PizzaMsg, config).then(function (dialogRef) {
            viewContainerFixture.detectChanges();
            var dialogContainerElement = overlayContainerElement.querySelector('md-dialog-container');
            expect(dialogContainerElement.getAttribute('role')).toBe('alertdialog');
        });
        detectChangesForDialogOpen(viewContainerFixture);
    }));
    it('should close a dialog and get back a result', testing_1.async(function () {
        var config = new dialog_config_1.MdDialogConfig();
        config.viewContainerRef = testViewContainerRef;
        dialog.open(PizzaMsg, config).then(function (dialogRef) {
            viewContainerFixture.detectChanges();
            var afterCloseResult;
            dialogRef.afterClosed().subscribe(function (result) {
                afterCloseResult = result;
            });
            dialogRef.close('Charmander');
            viewContainerFixture.whenStable().then(function () {
                expect(afterCloseResult).toBe('Charmander');
                expect(overlayContainerElement.childNodes.length).toBe(0);
            });
        });
        detectChangesForDialogOpen(viewContainerFixture);
    }));
});
/** Runs the necessary detectChanges for a dialog to complete its opening. */
function detectChangesForDialogOpen(fixture) {
    // TODO(jelbourn): figure out why the test zone is "stable" when there are still pending
    // tasks, such that we have to use `setTimeout` to run the second round of change detection.
    // Two rounds of change detection are necessary: one to *create* the dialog container, and
    // another to cause the lifecycle events of the container to run and load the dialog content.
    fixture.detectChanges();
    setTimeout(function () { return fixture.detectChanges(); }, 50);
}
var DirectiveWithViewContainer = (function () {
    function DirectiveWithViewContainer(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    DirectiveWithViewContainer = __decorate([
        core_1.Directive({ selector: 'dir-with-view-container' }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], DirectiveWithViewContainer);
    return DirectiveWithViewContainer;
}());
var ComponentWithChildViewContainer = (function () {
    function ComponentWithChildViewContainer(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    Object.defineProperty(ComponentWithChildViewContainer.prototype, "childViewContainer", {
        get: function () {
            return this.childWithViewContainer.viewContainerRef;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(DirectiveWithViewContainer), 
        __metadata('design:type', DirectiveWithViewContainer)
    ], ComponentWithChildViewContainer.prototype, "childWithViewContainer", void 0);
    ComponentWithChildViewContainer = __decorate([
        core_1.Component({
            selector: 'arbitrary-component',
            template: "<dir-with-view-container></dir-with-view-container>",
            directives: [DirectiveWithViewContainer],
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], ComponentWithChildViewContainer);
    return ComponentWithChildViewContainer;
}());
/** Simple component for testing ComponentPortal. */
var PizzaMsg = (function () {
    function PizzaMsg(dialogRef) {
        this.dialogRef = dialogRef;
    }
    PizzaMsg = __decorate([
        core_1.Component({
            selector: 'pizza-msg',
            template: '<p>Pizza</p>',
        }), 
        __metadata('design:paramtypes', [dialog_ref_1.MdDialogRef])
    ], PizzaMsg);
    return PizzaMsg;
}());
//# sourceMappingURL=dialog.spec.js.map