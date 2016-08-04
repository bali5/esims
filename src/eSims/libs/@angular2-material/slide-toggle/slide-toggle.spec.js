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
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var slide_toggle_1 = require('./slide-toggle');
var forms_1 = require('@angular/forms');
describe('MdSlideToggle', function () {
    var builder;
    beforeEach(function () {
        testing_1.addProviders([
            forms_1.disableDeprecatedForms(),
            forms_1.provideForms(),
        ]);
    });
    beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    describe('basic behavior', function () {
        var fixture;
        var testComponent;
        var slideToggle;
        var slideToggleElement;
        var slideToggleControl;
        var labelElement;
        var inputElement;
        beforeEach(testing_1.async(function () {
            builder.createAsync(SlideToggleTestApp).then(function (f) {
                fixture = f;
                testComponent = fixture.debugElement.componentInstance;
                // Enable jasmine spies on event functions, which may trigger at initialization
                // of the slide-toggle component.
                spyOn(fixture.debugElement.componentInstance, 'onSlideChange').and.callThrough();
                spyOn(fixture.debugElement.componentInstance, 'onSlideClick').and.callThrough();
                // Initialize the slide-toggle component, by triggering the first change detection cycle.
                fixture.detectChanges();
                var slideToggleDebug = fixture.debugElement.query(platform_browser_1.By.css('md-slide-toggle'));
                slideToggle = slideToggleDebug.componentInstance;
                slideToggleElement = slideToggleDebug.nativeElement;
                slideToggleControl = slideToggleDebug.injector.get(forms_1.NgControl);
                inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
                labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
            });
        }));
        // TODO(kara); update when core/testing adds fix
        it('should update the model correctly', testing_1.async(function () {
            expect(slideToggleElement.classList).not.toContain('md-checked');
            testComponent.slideModel = true;
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                fixture.detectChanges();
                expect(slideToggleElement.classList).toContain('md-checked');
            });
        }));
        it('should apply class based on color attribute', function () {
            testComponent.slideColor = 'primary';
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('md-primary');
            testComponent.slideColor = 'accent';
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('md-accent');
        });
        it('should correctly update the disabled property', function () {
            expect(inputElement.disabled).toBeFalsy();
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(inputElement.disabled).toBeTruthy();
        });
        it('should correctly update the checked property', function () {
            expect(slideToggle.checked).toBeFalsy();
            testComponent.slideChecked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBeTruthy();
        });
        it('should set the toggle to checked on click', function () {
            expect(slideToggle.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('md-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('md-checked');
            expect(slideToggle.checked).toBe(true);
        });
        it('should not trigger the click event multiple times', function () {
            // By default, when clicking on a label element, a generated click will be dispatched
            // on the associated input element.
            // Since we're using a label element and a visual hidden input, this behavior can led
            // to an issue, where the click events on the slide-toggle are getting executed twice.
            expect(slideToggle.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('md-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('md-checked');
            expect(slideToggle.checked).toBe(true);
            expect(testComponent.onSlideClick).toHaveBeenCalledTimes(1);
        });
        it('should trigger the change event properly', testing_1.async(function () {
            expect(inputElement.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('md-checked');
            labelElement.click();
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(slideToggleElement.classList).toContain('md-checked');
            // Wait for the fixture to become stable, because the EventEmitter for the change event,
            // will only fire after the zone async change detection has finished.
            fixture.whenStable().then(function () {
                // The change event shouldn't fire, because the value change was not caused
                // by any interaction.
                expect(testComponent.onSlideChange).toHaveBeenCalledTimes(1);
            });
        }));
        it('should not trigger the change event by changing the native value', testing_1.async(function () {
            expect(inputElement.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('md-checked');
            testComponent.slideChecked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(slideToggleElement.classList).toContain('md-checked');
            // Wait for the fixture to become stable, because the EventEmitter for the change event,
            // will only fire after the zone async change detection has finished.
            fixture.whenStable().then(function () {
                // The change event shouldn't fire, because the value change was not caused
                // by any interaction.
                expect(testComponent.onSlideChange).not.toHaveBeenCalled();
            });
        }));
        it('should not trigger the change event on initialization', testing_1.async(function () {
            expect(inputElement.checked).toBe(false);
            expect(slideToggleElement.classList).not.toContain('md-checked');
            testComponent.slideChecked = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
            expect(slideToggleElement.classList).toContain('md-checked');
            // Wait for the fixture to become stable, because the EventEmitter for the change event,
            // will only fire after the zone async change detection has finished.
            fixture.whenStable().then(function () {
                // The change event shouldn't fire, because the native input element is not focused.
                expect(testComponent.onSlideChange).not.toHaveBeenCalled();
            });
        }));
        it('should add a suffix to the inputs id', function () {
            testComponent.slideId = 'myId';
            fixture.detectChanges();
            expect(inputElement.id).toBe('myId-input');
            testComponent.slideId = 'nextId';
            fixture.detectChanges();
            expect(inputElement.id).toBe('nextId-input');
            testComponent.slideId = null;
            fixture.detectChanges();
            // Once the id input is falsy, we use a default prefix with a incrementing unique number.
            expect(inputElement.id).toMatch(/md-slide-toggle-[0-9]+-input/g);
        });
        it('should forward the specified name to the input', function () {
            testComponent.slideName = 'myName';
            fixture.detectChanges();
            expect(inputElement.name).toBe('myName');
            testComponent.slideName = 'nextName';
            fixture.detectChanges();
            expect(inputElement.name).toBe('nextName');
            testComponent.slideName = null;
            fixture.detectChanges();
            expect(inputElement.name).toBe('');
        });
        it('should forward the aria-label attribute to the input', function () {
            testComponent.slideLabel = 'ariaLabel';
            fixture.detectChanges();
            expect(inputElement.getAttribute('aria-label')).toBe('ariaLabel');
            testComponent.slideLabel = null;
            fixture.detectChanges();
            expect(inputElement.hasAttribute('aria-label')).toBeFalsy();
        });
        it('should forward the aria-labelledby attribute to the input', function () {
            testComponent.slideLabelledBy = 'ariaLabelledBy';
            fixture.detectChanges();
            expect(inputElement.getAttribute('aria-labelledby')).toBe('ariaLabelledBy');
            testComponent.slideLabelledBy = null;
            fixture.detectChanges();
            expect(inputElement.hasAttribute('aria-labelledby')).toBeFalsy();
        });
        it('should be initially set to ng-pristine', function () {
            expect(slideToggleElement.classList).toContain('ng-pristine');
            expect(slideToggleElement.classList).not.toContain('ng-dirty');
        });
        it('should emit the new values properly', testing_1.async(function () {
            labelElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                // We're checking the arguments type / emitted value to be a boolean, because sometimes the
                // emitted value can be a DOM Event, which is not valid.
                // See angular/angular#4059
                expect(testComponent.lastEvent.checked).toBe(true);
            });
        }));
        it('should support subscription on the change observable', function () {
            slideToggle.change.subscribe(function (event) {
                expect(event.checked).toBe(true);
            });
            slideToggle.toggle();
            fixture.detectChanges();
        });
        it('should have the correct control state initially and after interaction', function () {
            // The control should start off valid, pristine, and untouched.
            expect(slideToggleControl.valid).toBe(true);
            expect(slideToggleControl.pristine).toBe(true);
            expect(slideToggleControl.touched).toBe(false);
            // After changing the value programmatically, the control should
            // become dirty (not pristine), but remain untouched.
            slideToggle.checked = true;
            fixture.detectChanges();
            expect(slideToggleControl.valid).toBe(true);
            expect(slideToggleControl.pristine).toBe(false);
            expect(slideToggleControl.touched).toBe(false);
            // After a user interaction occurs (such as a click), the control should remain dirty and
            // now also be touched.
            labelElement.click();
            fixture.detectChanges();
            expect(slideToggleControl.valid).toBe(true);
            expect(slideToggleControl.pristine).toBe(false);
            expect(slideToggleControl.touched).toBe(true);
        });
        it('should not set the control to touched when changing the state programmatically', function () {
            // The control should start off with being untouched.
            expect(slideToggleControl.touched).toBe(false);
            testComponent.slideChecked = true;
            fixture.detectChanges();
            expect(slideToggleControl.touched).toBe(false);
            expect(slideToggleElement.classList).toContain('md-checked');
            // After a user interaction occurs (such as a click), the control should remain dirty and
            // now also be touched.
            inputElement.click();
            fixture.detectChanges();
            expect(slideToggleControl.touched).toBe(true);
            expect(slideToggleElement.classList).not.toContain('md-checked');
        });
        // TODO(kara): update when core/testing adds fix
        it('should not set the control to touched when changing the model', testing_1.async(function () {
            // The control should start off with being untouched.
            expect(slideToggleControl.touched).toBe(false);
            testComponent.slideModel = true;
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                fixture.detectChanges();
                expect(slideToggleControl.touched).toBe(false);
                expect(slideToggle.checked).toBe(true);
                expect(slideToggleElement.classList).toContain('md-checked');
            });
        }));
        it('should correctly set the slide-toggle to checked on focus', function () {
            expect(slideToggleElement.classList).not.toContain('md-slide-toggle-focused');
            dispatchFocusChangeEvent('focus', inputElement);
            fixture.detectChanges();
            expect(slideToggleElement.classList).toContain('md-slide-toggle-focused');
        });
    });
    describe('custom template', function () {
        var testComponent;
        var slideToggle;
        var slideToggleElement;
        var labelElement;
        var inputElement;
        it('should not trigger the change event on initialization', testing_1.async(function () {
            builder
                .overrideTemplate(SlideToggleTestApp, "\n          <md-slide-toggle checked=\"true\" (change)=\"onSlideChange($event)\"></md-slide-toggle>\n        ")
                .createAsync(SlideToggleTestApp)
                .then(function (fixture) {
                // Initialize the variables for our test.
                initializeTest(fixture);
                // Enable jasmine spies on event functions, which may trigger at initialization
                // of the slide-toggle component.
                spyOn(fixture.debugElement.componentInstance, 'onSlideChange').and.callThrough();
                fixture.detectChanges();
                fixture.whenStable().then(function () {
                    expect(testComponent.onSlideChange).not.toHaveBeenCalled();
                });
            });
        }));
        /**
         * Initializes the suites variables, to allow developers to easily access the several variables
         * without loading / querying them always again.
         * @param fixture Custom fixture, which contains the slide-toggle component.
         */
        function initializeTest(fixture) {
            testComponent = fixture.debugElement.componentInstance;
            // Initialize the slide-toggle component, by triggering the first change detection cycle.
            fixture.detectChanges();
            var slideToggleDebug = fixture.debugElement.query(platform_browser_1.By.css('md-slide-toggle'));
            slideToggle = slideToggleDebug.componentInstance;
            slideToggleElement = slideToggleDebug.nativeElement;
            inputElement = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            labelElement = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        }
    });
});
/**
 * Dispatches a focus change event from an element.
 * @param eventName Name of the event, either 'focus' or 'blur'.
 * @param element The element from which the event will be dispatched.
 */
function dispatchFocusChangeEvent(eventName, element) {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
}
var SlideToggleTestApp = (function () {
    function SlideToggleTestApp() {
        this.isDisabled = false;
        this.slideModel = false;
        this.slideChecked = false;
    }
    SlideToggleTestApp.prototype.onSlideClick = function (event) { };
    SlideToggleTestApp.prototype.onSlideChange = function (event) {
        this.lastEvent = event;
    };
    SlideToggleTestApp = __decorate([
        core_1.Component({
            selector: 'slide-toggle-test-app',
            template: "\n    <md-slide-toggle [(ngModel)]=\"slideModel\" [disabled]=\"isDisabled\" [color]=\"slideColor\" \n                     [id]=\"slideId\" [checked]=\"slideChecked\" [name]=\"slideName\" \n                     [aria-label]=\"slideLabel\" [ariaLabel]=\"slideLabel\" \n                     [ariaLabelledby]=\"slideLabelledBy\" (change)=\"onSlideChange($event)\"\n                     (click)=\"onSlideClick($event)\">\n      <span>Test Slide Toggle</span>\n    </md-slide-toggle>\n  ",
            directives: [slide_toggle_1.MdSlideToggle]
        }), 
        __metadata('design:paramtypes', [])
    ], SlideToggleTestApp);
    return SlideToggleTestApp;
}());
//# sourceMappingURL=slide-toggle.spec.js.map