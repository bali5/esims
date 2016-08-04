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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var portal_directives_1 = require('./portal-directives');
var portal_1 = require('./portal');
var dom_portal_host_1 = require('./dom-portal-host');
describe('Portals', function () {
    var builder;
    beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    describe('PortalHostDirective', function () {
        it('should load a component into the portal', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            // Set the selectedHost to be a ComponentPortal.
            var testAppComponent = appFixture.debugElement.componentInstance;
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg);
            appFixture.detectChanges();
            // Flush the attachment of the Portal.
            testing_1.flushMicrotasks();
            // Expect that the content of the attached portal is present.
            var hostContainer = appFixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pizza');
        }));
        it('should load a component into the portal with a given injector', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            // Create a custom injector for the component.
            var chocolateInjector = new ChocolateInjector(appFixture.componentInstance.injector);
            // Set the selectedHost to be a ComponentPortal.
            var testAppComponent = appFixture.debugElement.componentInstance;
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg, null, chocolateInjector);
            appFixture.detectChanges();
            // Flush the attachment of the Portal.
            testing_1.flushMicrotasks();
            appFixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = appFixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pizza');
            expect(hostContainer.textContent).toContain('Chocolate');
        }));
        it('should load a <template> portal', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            var testAppComponent = appFixture.debugElement.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            appFixture.detectChanges();
            // Set the selectedHost to be a TemplatePortal.
            testAppComponent.selectedPortal = testAppComponent.cakePortal;
            appFixture.detectChanges();
            // Flush the attachment of the Portal.
            testing_1.flushMicrotasks();
            // Expect that the content of the attached portal is present.
            var hostContainer = appFixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Cake');
        }));
        it('should load a <template> portal with the `*` sugar', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            var testAppComponent = appFixture.debugElement.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            appFixture.detectChanges();
            // Set the selectedHost to be a TemplatePortal (with the `*` syntax).
            testAppComponent.selectedPortal = testAppComponent.piePortal;
            appFixture.detectChanges();
            // Flush the attachment of the Portal.
            testing_1.flushMicrotasks();
            // Expect that the content of the attached portal is present.
            var hostContainer = appFixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pie');
        }));
        it('should load a <template> portal with a binding', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            var testAppComponent = appFixture.debugElement.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            appFixture.detectChanges();
            // Set the selectedHost to be a TemplatePortal.
            testAppComponent.selectedPortal = testAppComponent.portalWithBinding;
            appFixture.detectChanges();
            // Flush the attachment of the Portal.
            testing_1.flushMicrotasks();
            // Now that the portal is attached, change detection has to happen again in order
            // for the bindings to update.
            appFixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = appFixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Banana');
            // When updating the binding value.
            testAppComponent.fruit = 'Mango';
            appFixture.detectChanges();
            // Expect the new value to be reflected in the rendered output.
            expect(hostContainer.textContent).toContain('Mango');
        }));
        it('should change the attached portal', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            var testAppComponent = appFixture.debugElement.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            appFixture.detectChanges();
            // Set the selectedHost to be a ComponentPortal.
            testAppComponent.selectedPortal = testAppComponent.piePortal;
            appFixture.detectChanges();
            // Flush the attachment of the Portal.
            testing_1.flushMicrotasks();
            appFixture.detectChanges();
            // Expect that the content of the attached portal is present.
            var hostContainer = appFixture.nativeElement.querySelector('.portal-container');
            expect(hostContainer.textContent).toContain('Pie');
            testAppComponent.selectedPortal = new portal_1.ComponentPortal(PizzaMsg);
            appFixture.detectChanges();
            testing_1.flushMicrotasks();
            expect(hostContainer.textContent).toContain('Pizza');
        }));
    });
    describe('DomPortalHost', function () {
        var componentLoader;
        var someViewContainerRef;
        var someInjector;
        var someDomElement;
        var host;
        beforeEach(testing_1.inject([core_1.ComponentResolver], function (dcl) {
            componentLoader = dcl;
        }));
        beforeEach(function () {
            someDomElement = document.createElement('div');
            host = new dom_portal_host_1.DomPortalHost(someDomElement, componentLoader);
        });
        it('should attach and detach a component portal', testing_1.fakeAsync(function () {
            builder.createAsync(ArbitraryViewContainerRefComponent).then(function (fixture) {
                someViewContainerRef = fixture.componentInstance.viewContainerRef;
            });
            testing_1.flushMicrotasks();
            var portal = new portal_1.ComponentPortal(PizzaMsg, someViewContainerRef);
            var componentInstance;
            portal.attach(host).then(function (ref) {
                componentInstance = ref.instance;
            });
            testing_1.flushMicrotasks();
            expect(componentInstance).toEqual(jasmine.any(PizzaMsg));
            expect(someDomElement.textContent).toContain('Pizza');
            host.detach();
            testing_1.flushMicrotasks();
            expect(someDomElement.innerHTML).toBe('');
        }));
        it('should attach and detach a component portal with a given injector', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(ArbitraryViewContainerRefComponent).then(function (fixture) {
                appFixture = fixture;
                someViewContainerRef = fixture.componentInstance.viewContainerRef;
                someInjector = fixture.componentInstance.injector;
            });
            testing_1.flushMicrotasks();
            var chocolateInjector = new ChocolateInjector(someInjector);
            var portal = new portal_1.ComponentPortal(PizzaMsg, someViewContainerRef, chocolateInjector);
            var componentInstance;
            portal.attach(host).then(function (ref) {
                componentInstance = ref.instance;
            });
            testing_1.flushMicrotasks();
            appFixture.detectChanges();
            expect(componentInstance).toEqual(jasmine.any(PizzaMsg));
            expect(someDomElement.textContent).toContain('Pizza');
            expect(someDomElement.textContent).toContain('Chocolate');
            host.detach();
            testing_1.flushMicrotasks();
            expect(someDomElement.innerHTML).toBe('');
        }));
        it('should attach and detach a template portal', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            appFixture.detectChanges();
            appFixture.componentInstance.cakePortal.attach(host);
            testing_1.flushMicrotasks();
            expect(someDomElement.textContent).toContain('Cake');
        }));
        it('should attach and detach a template portal with a binding', testing_1.fakeAsync(function () {
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            var testAppComponent = appFixture.debugElement.componentInstance;
            // Detect changes initially so that the component's ViewChildren are resolved.
            appFixture.detectChanges();
            // Attach the TemplatePortal.
            testAppComponent.portalWithBinding.attach(host);
            appFixture.detectChanges();
            // Flush the attachment of the Portal.
            testing_1.flushMicrotasks();
            // Now that the portal is attached, change detection has to happen again in order
            // for the bindings to update.
            appFixture.detectChanges();
            // Expect that the content of the attached portal is present.
            expect(someDomElement.textContent).toContain('Banana');
            // When updating the binding value.
            testAppComponent.fruit = 'Mango';
            appFixture.detectChanges();
            // Expect the new value to be reflected in the rendered output.
            expect(someDomElement.textContent).toContain('Mango');
            host.detach();
            expect(someDomElement.innerHTML).toBe('');
        }));
        it('should change the attached portal', testing_1.fakeAsync(function () {
            builder.createAsync(ArbitraryViewContainerRefComponent).then(function (fixture) {
                someViewContainerRef = fixture.componentInstance.viewContainerRef;
            });
            testing_1.flushMicrotasks();
            var appFixture;
            builder.createAsync(PortalTestApp).then(function (fixture) {
                appFixture = fixture;
            });
            // Flush the async creation of the PortalTestApp.
            testing_1.flushMicrotasks();
            appFixture.detectChanges();
            appFixture.componentInstance.piePortal.attach(host);
            testing_1.flushMicrotasks();
            expect(someDomElement.textContent).toContain('Pie');
            host.detach();
            testing_1.flushMicrotasks();
            host.attach(new portal_1.ComponentPortal(PizzaMsg, someViewContainerRef));
            testing_1.flushMicrotasks();
            expect(someDomElement.textContent).toContain('Pizza');
        }));
    });
});
var Chocolate = (function () {
    function Chocolate() {
    }
    Chocolate.prototype.toString = function () {
        return 'Chocolate';
    };
    return Chocolate;
}());
var ChocolateInjector = (function () {
    function ChocolateInjector(parentInjector) {
        this.parentInjector = parentInjector;
    }
    ChocolateInjector.prototype.get = function (token) {
        return token === Chocolate ? new Chocolate() : this.parentInjector.get(token);
    };
    return ChocolateInjector;
}());
/** Simple component for testing ComponentPortal. */
var PizzaMsg = (function () {
    function PizzaMsg(snack) {
        this.snack = snack;
    }
    PizzaMsg = __decorate([
        core_1.Component({
            selector: 'pizza-msg',
            template: '<p>Pizza</p><p>{{snack}}</p>',
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Chocolate])
    ], PizzaMsg);
    return PizzaMsg;
}());
/** Simple component to grab an arbitrary ViewContainerRef */
var ArbitraryViewContainerRefComponent = (function () {
    function ArbitraryViewContainerRefComponent(viewContainerRef, injector) {
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
    ArbitraryViewContainerRefComponent = __decorate([
        core_1.Component({
            selector: 'some-placeholder',
            template: '<p>Hello</p>'
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.Injector])
    ], ArbitraryViewContainerRefComponent);
    return ArbitraryViewContainerRefComponent;
}());
/** Test-bed component that contains a portal host and a couple of template portals. */
var PortalTestApp = (function () {
    function PortalTestApp(injector) {
        this.injector = injector;
        this.fruit = 'Banana';
    }
    Object.defineProperty(PortalTestApp.prototype, "cakePortal", {
        get: function () {
            return this.portals.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalTestApp.prototype, "piePortal", {
        get: function () {
            return this.portals.toArray()[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalTestApp.prototype, "portalWithBinding", {
        get: function () {
            return this.portals.toArray()[2];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChildren(portal_directives_1.TemplatePortalDirective), 
        __metadata('design:type', core_1.QueryList)
    ], PortalTestApp.prototype, "portals", void 0);
    PortalTestApp = __decorate([
        core_1.Component({
            selector: 'portal-test',
            template: "\n  <div class=\"portal-container\">\n    <template [portalHost]=\"selectedPortal\"></template>\n  </div>\n\n  <template portal>Cake</template>\n\n  <div *portal>Pie</div>\n\n  <template portal> {{fruit}} </template>\n  ",
            directives: [portal_directives_1.PortalHostDirective, portal_directives_1.TemplatePortalDirective],
        }), 
        __metadata('design:paramtypes', [core_1.Injector])
    ], PortalTestApp);
    return PortalTestApp;
}());
//# sourceMappingURL=portal.spec.js.map