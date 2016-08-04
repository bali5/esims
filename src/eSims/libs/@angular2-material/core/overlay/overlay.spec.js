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
var portal_directives_1 = require('../portal/portal-directives');
var portal_1 = require('../portal/portal');
var overlay_1 = require('./overlay');
var overlay_container_1 = require('./overlay-container');
var overlay_state_1 = require('./overlay-state');
var overlay_position_builder_1 = require('./position/overlay-position-builder');
var viewport_ruler_1 = require('./position/viewport-ruler');
describe('Overlay', function () {
    var builder;
    var overlay;
    var componentPortal;
    var templatePortal;
    var overlayContainerElement;
    beforeEach(function () {
        testing_1.addProviders([
            overlay_1.Overlay,
            overlay_position_builder_1.OverlayPositionBuilder,
            viewport_ruler_1.ViewportRuler,
            { provide: overlay_container_1.OverlayContainer, useFactory: function () {
                    return {
                        getContainerElement: function () {
                            if (overlayContainerElement) {
                                return overlayContainerElement;
                            }
                            overlayContainerElement = document.createElement('div');
                            return overlayContainerElement;
                        }
                    };
                } }
        ]);
    });
    var deps = [testing_2.TestComponentBuilder, overlay_1.Overlay];
    beforeEach(testing_1.inject(deps, testing_1.fakeAsync(function (tcb, o) {
        builder = tcb;
        overlay = o;
        builder.createAsync(TestComponentWithTemplatePortals).then(function (fixture) {
            fixture.detectChanges();
            templatePortal = fixture.componentInstance.templatePortal;
            componentPortal = new portal_1.ComponentPortal(PizzaMsg, fixture.componentInstance.viewContainerRef);
        });
        testing_1.flushMicrotasks();
    })));
    it('should load a component into an overlay', fakeAsyncTest(function () {
        var overlayRef;
        overlay.create().then(function (ref) {
            overlayRef = ref;
            overlayRef.attach(componentPortal);
        });
        testing_1.flushMicrotasks();
        expect(overlayContainerElement.textContent).toContain('Pizza');
        overlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(0);
        expect(overlayContainerElement.textContent).toBe('');
    }));
    it('should load a template portal into an overlay', fakeAsyncTest(function () {
        var overlayRef;
        overlay.create().then(function (ref) {
            overlayRef = ref;
            overlayRef.attach(templatePortal);
        });
        testing_1.flushMicrotasks();
        expect(overlayContainerElement.textContent).toContain('Cake');
        overlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(0);
        expect(overlayContainerElement.textContent).toBe('');
    }));
    it('should open multiple overlays', fakeAsyncTest(function () {
        var pizzaOverlayRef;
        var cakeOverlayRef;
        overlay.create().then(function (ref) {
            pizzaOverlayRef = ref;
            pizzaOverlayRef.attach(componentPortal);
        });
        testing_1.flushMicrotasks();
        overlay.create().then(function (ref) {
            cakeOverlayRef = ref;
            cakeOverlayRef.attach(templatePortal);
        });
        testing_1.flushMicrotasks();
        expect(overlayContainerElement.childNodes.length).toBe(2);
        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(overlayContainerElement.textContent).toContain('Cake');
        pizzaOverlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(1);
        expect(overlayContainerElement.textContent).toContain('Cake');
        cakeOverlayRef.dispose();
        expect(overlayContainerElement.childNodes.length).toBe(0);
        expect(overlayContainerElement.textContent).toBe('');
    }));
    describe('applyState', function () {
        var state;
        beforeEach(function () {
            state = new overlay_state_1.OverlayState();
        });
        it('should apply the positioning strategy', fakeAsyncTest(function () {
            state.positionStrategy = new FakePositionStrategy();
            overlay.create(state).then(function (ref) {
                ref.attach(componentPortal);
            });
            testing_1.flushMicrotasks();
            expect(overlayContainerElement.querySelectorAll('.fake-positioned').length).toBe(1);
        }));
    });
});
/** Simple component for testing ComponentPortal. */
var PizzaMsg = (function () {
    function PizzaMsg() {
    }
    PizzaMsg = __decorate([
        core_1.Component({
            selector: 'pizza-msg',
            template: '<p>Pizza</p>',
        }), 
        __metadata('design:paramtypes', [])
    ], PizzaMsg);
    return PizzaMsg;
}());
/** Test-bed component that contains a TempatePortal and an ElementRef. */
var TestComponentWithTemplatePortals = (function () {
    function TestComponentWithTemplatePortals(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    __decorate([
        core_1.ViewChild(portal_directives_1.TemplatePortalDirective), 
        __metadata('design:type', portal_directives_1.TemplatePortalDirective)
    ], TestComponentWithTemplatePortals.prototype, "templatePortal", void 0);
    TestComponentWithTemplatePortals = __decorate([
        core_1.Component({
            selector: 'portal-test',
            template: "<template portal>Cake</template>",
            directives: [portal_directives_1.TemplatePortalDirective],
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], TestComponentWithTemplatePortals);
    return TestComponentWithTemplatePortals;
}());
var FakePositionStrategy = (function () {
    function FakePositionStrategy() {
    }
    FakePositionStrategy.prototype.apply = function (element) {
        element.classList.add('fake-positioned');
        return Promise.resolve();
    };
    return FakePositionStrategy;
}());
function fakeAsyncTest(fn) {
    return testing_1.inject([], testing_1.fakeAsync(fn));
}
//# sourceMappingURL=overlay.spec.js.map