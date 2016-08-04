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
var ripple_1 = require('./ripple');
/** Creates a DOM event to indicate that a CSS transition for the given property ended. */
var createTransitionEndEvent = function (propertyName) {
    // The "new" TransitionEvent constructor isn't available in anything except Firefox:
    // https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
    // So we just try to create a base event, and IE11 doesn't support that so we have to use
    // the deprecated initTransitionEvent.
    try {
        var event_1 = new Event('transitionend');
        event_1.propertyName = propertyName;
        return event_1;
    }
    catch (e) {
        var event_2 = document.createEvent('TransitionEvent');
        event_2.initTransitionEvent('transitionend', false, /* canBubble */ false, /* cancelable */ propertyName, 0 /* elapsedTime */);
        return event_2;
    }
};
/** Creates a DOM mouse event. */
var createMouseEvent = function (eventType, dict) {
    if (dict === void 0) { dict = {}; }
    // Ideally this would just be "return new MouseEvent(eventType, dict)". But IE11 doesn't support
    // the MouseEvent constructor, and Edge inexplicably divides clientX and clientY by 100 to get
    // pageX and pageY. (Really. After "e = new MouseEvent('click', {clientX: 200, clientY: 300})",
    // e.clientX is 200, e.pageX is 2, e.clientY is 300, and e.pageY is 3.)
    // So instead we use the deprecated createEvent/initMouseEvent API, which works everywhere.
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent(eventType, false, /* canBubble */ false, /* cancelable */ window, /* view */ 0, /* detail */ dict.screenX || 0, dict.screenY || 0, dict.clientX || 0, dict.clientY || 0, false, /* ctrlKey */ false, /* altKey */ false, /* shiftKey */ false, /* metaKey */ 0, /* button */ null /* relatedTarget */);
    return event;
};
/** Extracts the numeric value of a pixel size string like '123px'.  */
var pxStringToFloat = function (s) {
    return parseFloat(s.replace('px', ''));
};
testing_1.describe('MdRipple', function () {
    var builder;
    var fixture;
    var rippleElement;
    var rippleBackground;
    var originalBodyMargin;
    testing_1.beforeEach(function () {
        // Set body margin to 0 during tests so it doesn't mess up position calculations.
        originalBodyMargin = document.body.style.margin;
        document.body.style.margin = '0';
    });
    testing_1.afterEach(function () {
        document.body.style.margin = originalBodyMargin;
    });
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    testing_1.describe('basic ripple', function () {
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(BasicRippleContainer).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                rippleElement = fixture.debugElement.nativeElement.querySelector('[md-ripple]');
                rippleBackground = rippleElement.querySelector('.md-ripple-background');
                testing_1.expect(rippleBackground).toBeTruthy();
            });
        }));
        testing_1.it('shows background when parent receives mousedown event', function () {
            testing_1.expect(rippleBackground.classList).not.toContain('md-ripple-active');
            var mouseDown = createMouseEvent('mousedown');
            // mousedown on the ripple element activates the background ripple.
            rippleElement.dispatchEvent(mouseDown);
            testing_1.expect(rippleBackground.classList).toContain('md-ripple-active');
            // mouseleave on the container removes the background ripple.
            var mouseLeave = createMouseEvent('mouseleave');
            rippleElement.dispatchEvent(mouseLeave);
            testing_1.expect(rippleBackground.classList).not.toContain('md-ripple-active');
        });
        testing_1.it('creates foreground ripples on click', function () {
            rippleElement.click();
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(1);
            // Second click should create another ripple.
            rippleElement.click();
            var ripples = rippleElement.querySelectorAll('.md-ripple-foreground');
            testing_1.expect(ripples.length).toBe(2);
            testing_1.expect(ripples[0].classList).toContain('md-ripple-fade-in');
            testing_1.expect(ripples[1].classList).toContain('md-ripple-fade-in');
            // Signal the end of the first ripple's expansion. The second ripple should be unaffected.
            var opacityTransitionEnd = createTransitionEndEvent('opacity');
            ripples[0].dispatchEvent(opacityTransitionEnd);
            testing_1.expect(ripples[0].classList).not.toContain('md-ripple-fade-in');
            testing_1.expect(ripples[0].classList).toContain('md-ripple-fade-out');
            testing_1.expect(ripples[1].classList).toContain('md-ripple-fade-in');
            testing_1.expect(ripples[1].classList).not.toContain('md-ripple-fade-out');
            // Signal the end of the first ripple's fade out. The ripple should be removed from the DOM.
            ripples[0].dispatchEvent(opacityTransitionEnd);
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(1);
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground')[0]).toBe(ripples[1]);
            // Finish the second ripple.
            ripples[1].dispatchEvent(opacityTransitionEnd);
            testing_1.expect(ripples[1].classList).not.toContain('md-ripple-fade-in');
            testing_1.expect(ripples[1].classList).toContain('md-ripple-fade-out');
            ripples[1].dispatchEvent(opacityTransitionEnd);
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(0);
        });
        testing_1.it('creates ripples when manually triggered', function () {
            var rippleComponent = fixture.debugElement.componentInstance.ripple;
            // start() should show the background, but no foreground ripple yet.
            rippleComponent.start();
            testing_1.expect(rippleBackground.classList).toContain('md-ripple-active');
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(0);
            // end() should deactivate the background and show the foreground ripple.
            rippleComponent.end(0, 0);
            testing_1.expect(rippleBackground.classList).not.toContain('md-ripple-active');
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(1);
        });
        testing_1.it('sizes ripple to cover element', function () {
            // Click the ripple element 50 px to the right and 75px down from its upper left.
            var elementRect = rippleElement.getBoundingClientRect();
            var clickEvent = createMouseEvent('click', { clientX: elementRect.left + 50, clientY: elementRect.top + 75 });
            rippleElement.dispatchEvent(clickEvent);
            // At this point the foreground ripple should be created with a div centered at the click
            // location, and large enough to reach the furthest corner, which is 250px to the right
            // and 125px down relative to the click position.
            var expectedRadius = Math.sqrt(250 * 250 + 125 * 125);
            var expectedLeft = elementRect.left + 50 - expectedRadius;
            var expectedTop = elementRect.top + 75 - expectedRadius;
            var ripple = rippleElement.querySelector('.md-ripple-foreground');
            // Note: getBoundingClientRect won't work because there's a transform applied to make the
            // ripple start out tiny.
            testing_1.expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
            testing_1.expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
            testing_1.expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * expectedRadius, 1);
            testing_1.expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * expectedRadius, 1);
        });
        testing_1.it('expands ripple from center on click event triggered by keyboard', function () {
            var elementRect = rippleElement.getBoundingClientRect();
            // Simulate a keyboard-triggered click by setting event coordinates to 0.
            var clickEvent = createMouseEvent('click', { clientX: 0, clientY: 0, screenX: 0, screenY: 0 });
            rippleElement.dispatchEvent(clickEvent);
            // The foreground ripple should be centered in the middle of the bounding rect, and large
            // enough to reach the corners, which are all 150px horizontally and 100px vertically away.
            var expectedRadius = Math.sqrt(150 * 150 + 100 * 100);
            var expectedLeft = elementRect.left + (elementRect.width / 2) - expectedRadius;
            var expectedTop = elementRect.top + (elementRect.height / 2) - expectedRadius;
            // Note: getBoundingClientRect won't work because there's a transform applied to make the
            // ripple start out tiny.
            var ripple = rippleElement.querySelector('.md-ripple-foreground');
            testing_1.expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
            testing_1.expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
            testing_1.expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * expectedRadius, 1);
            testing_1.expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * expectedRadius, 1);
        });
    });
    testing_1.describe('configuring behavior', function () {
        var controller;
        var rippleComponent;
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(RippleContainerWithInputBindings).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                controller = fixture.debugElement.componentInstance;
                rippleComponent = controller.ripple;
                rippleElement = fixture.debugElement.nativeElement.querySelector('[md-ripple]');
                rippleBackground = rippleElement.querySelector('.md-ripple-background');
                testing_1.expect(rippleBackground).toBeTruthy();
            });
        }));
        testing_1.it('sets ripple background color', function () {
            // This depends on the exact color format that getComputedStyle returns; for example, alpha
            // values are quantized to increments of 1/255, so 0.1 becomes 0.0980392. 0.2 is ok.
            var color = 'rgba(22, 44, 66, 0.8)';
            controller.backgroundColor = color;
            fixture.detectChanges();
            rippleComponent.start();
            testing_1.expect(window.getComputedStyle(rippleBackground).backgroundColor).toBe(color);
        });
        testing_1.it('sets ripple foreground color', function () {
            var color = 'rgba(12, 34, 56, 0.8)';
            controller.color = color;
            fixture.detectChanges();
            rippleElement.click();
            var ripple = rippleElement.querySelector('.md-ripple-foreground');
            testing_1.expect(window.getComputedStyle(ripple).backgroundColor).toBe(color);
        });
        testing_1.it('does not respond to events when disabled input is set', function () {
            controller.disabled = true;
            fixture.detectChanges();
            var mouseDown = createMouseEvent('mousedown');
            // The background ripple should not respond to mouseDown, and no foreground ripple should be
            // created on a click.
            rippleElement.dispatchEvent(mouseDown);
            testing_1.expect(rippleBackground.classList).not.toContain('md-ripple-active');
            rippleElement.click();
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(0);
            // Calling start() and end() should still create a ripple.
            rippleComponent.start();
            testing_1.expect(rippleBackground.classList).toContain('md-ripple-active');
            rippleComponent.end(0, 0);
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(1);
        });
        testing_1.it('allows specifying custom trigger element', function () {
            // Events on the other div don't do anything by default.
            var alternateTrigger = fixture.debugElement.nativeElement.querySelector('.alternateTrigger');
            var mouseDown = createMouseEvent('mousedown');
            alternateTrigger.dispatchEvent(mouseDown);
            testing_1.expect(rippleBackground.classList).not.toContain('md-ripple-active');
            alternateTrigger.click();
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(0);
            // Reassign the trigger element, and now events should create ripples.
            controller.trigger = alternateTrigger;
            fixture.detectChanges();
            alternateTrigger.dispatchEvent(mouseDown);
            testing_1.expect(rippleBackground.classList).toContain('md-ripple-active');
            alternateTrigger.click();
            testing_1.expect(rippleElement.querySelectorAll('.md-ripple-foreground').length).toBe(1);
        });
        testing_1.it('expands ripple from center if centered input is set', function () {
            controller.centered = true;
            fixture.detectChanges();
            // Click the ripple element 50 px to the right and 75px down from its upper left.
            var elementRect = rippleElement.getBoundingClientRect();
            var clickEvent = createMouseEvent('click', { clientX: elementRect.left + 50, clientY: elementRect.top + 75 });
            rippleElement.dispatchEvent(clickEvent);
            // Because the centered input is true, the center of the ripple should be the midpoint of the
            // bounding rect. The ripple should expand to cover the rect corners, which are 150px
            // horizontally and 100px vertically from the midpoint.
            var expectedRadius = Math.sqrt(150 * 150 + 100 * 100);
            var expectedLeft = elementRect.left + (elementRect.width / 2) - expectedRadius;
            var expectedTop = elementRect.top + (elementRect.height / 2) - expectedRadius;
            var ripple = rippleElement.querySelector('.md-ripple-foreground');
            testing_1.expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
            testing_1.expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
            testing_1.expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * expectedRadius, 1);
            testing_1.expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * expectedRadius, 1);
        });
        testing_1.it('uses custom radius if set', function () {
            var customRadius = 42;
            controller.maxRadius = customRadius;
            fixture.detectChanges();
            // Click the ripple element 50 px to the right and 75px down from its upper left.
            var elementRect = rippleElement.getBoundingClientRect();
            var clickEvent = createMouseEvent('click', { clientX: elementRect.left + 50, clientY: elementRect.top + 75 });
            rippleElement.dispatchEvent(clickEvent);
            var expectedLeft = elementRect.left + 50 - customRadius;
            var expectedTop = elementRect.top + 75 - customRadius;
            var ripple = rippleElement.querySelector('.md-ripple-foreground');
            testing_1.expect(pxStringToFloat(ripple.style.left)).toBeCloseTo(expectedLeft, 1);
            testing_1.expect(pxStringToFloat(ripple.style.top)).toBeCloseTo(expectedTop, 1);
            testing_1.expect(pxStringToFloat(ripple.style.width)).toBeCloseTo(2 * customRadius, 1);
            testing_1.expect(pxStringToFloat(ripple.style.height)).toBeCloseTo(2 * customRadius, 1);
        });
    });
});
var BasicRippleContainer = (function () {
    function BasicRippleContainer() {
    }
    __decorate([
        core_1.ViewChild(ripple_1.MdRipple), 
        __metadata('design:type', ripple_1.MdRipple)
    ], BasicRippleContainer.prototype, "ripple", void 0);
    BasicRippleContainer = __decorate([
        core_1.Component({
            directives: [ripple_1.MdRipple],
            template: "\n    <div id=\"container\" md-ripple style=\"position: relative; width:300px; height:200px;\">\n    </div>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], BasicRippleContainer);
    return BasicRippleContainer;
}());
var RippleContainerWithInputBindings = (function () {
    function RippleContainerWithInputBindings() {
        this.trigger = null;
        this.centered = false;
        this.disabled = false;
        this.maxRadius = 0;
        this.color = '';
        this.backgroundColor = '';
    }
    __decorate([
        core_1.ViewChild(ripple_1.MdRipple), 
        __metadata('design:type', ripple_1.MdRipple)
    ], RippleContainerWithInputBindings.prototype, "ripple", void 0);
    RippleContainerWithInputBindings = __decorate([
        core_1.Component({
            directives: [ripple_1.MdRipple],
            template: "\n    <div id=\"container\" style=\"position: relative; width:300px; height:200px;\"\n      md-ripple\n      [md-ripple-trigger]=\"trigger\"\n      [md-ripple-centered]=\"centered\"\n      [md-ripple-max-radius]=\"maxRadius\"\n      [md-ripple-disabled]=\"disabled\"\n      [md-ripple-color]=\"color\"\n      [md-ripple-background-color]=\"backgroundColor\">\n    </div>\n    <div class=\"alternateTrigger\"></div>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], RippleContainerWithInputBindings);
    return RippleContainerWithInputBindings;
}());
//# sourceMappingURL=ripple.spec.js.map