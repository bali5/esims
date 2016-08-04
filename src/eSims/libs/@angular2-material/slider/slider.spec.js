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
var slider_1 = require('./slider');
var platform_browser_2 = require('@angular/platform-browser');
var test_gesture_config_1 = require('./test-gesture-config');
describe('MdSlider', function () {
    var builder;
    var gestureConfig;
    beforeEach(function () {
        testing_1.addProviders([
            { provide: platform_browser_2.HAMMER_GESTURE_CONFIG, useFactory: function () {
                    gestureConfig = new test_gesture_config_1.TestGestureConfig();
                    return gestureConfig;
                } }
        ]);
    });
    beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    describe('standard slider', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var trackFillElement;
        var trackFillDimensions;
        var sliderTrackElement;
        var sliderDimensions;
        var thumbElement;
        var thumbDimensions;
        beforeEach(testing_1.async(function () {
            builder.createAsync(StandardSlider).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(slider_1.MdSlider));
                sliderNativeElement = sliderDebugElement.nativeElement;
                sliderInstance = sliderDebugElement.componentInstance;
                trackFillElement = sliderNativeElement.querySelector('.md-slider-track-fill');
                trackFillDimensions = trackFillElement.getBoundingClientRect();
                sliderTrackElement = sliderNativeElement.querySelector('.md-slider-track');
                sliderDimensions = sliderTrackElement.getBoundingClientRect();
                thumbElement = sliderNativeElement.querySelector('.md-slider-thumb-position');
                thumbDimensions = thumbElement.getBoundingClientRect();
            });
        }));
        it('should set the default values', function () {
            expect(sliderInstance.value).toBe(0);
            expect(sliderInstance.min).toBe(0);
            expect(sliderInstance.max).toBe(100);
        });
        it('should update the value on a click', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchClickEvent(sliderTrackElement, 0.19);
            // The expected value is 19 from: percentage * difference of max and min.
            expect(sliderInstance.value).toBe(19);
        });
        it('should update the value on a slide', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.89, gestureConfig);
            // The expected value is 89 from: percentage * difference of max and min.
            expect(sliderInstance.value).toBe(89);
        });
        it('should set the value as min when sliding before the track', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, -1.33, gestureConfig);
            expect(sliderInstance.value).toBe(0);
        });
        it('should set the value as max when sliding past the track', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 1.75, gestureConfig);
            expect(sliderInstance.value).toBe(100);
        });
        it('should update the track fill on click', function () {
            expect(trackFillDimensions.width).toBe(0);
            dispatchClickEvent(sliderTrackElement, 0.39);
            trackFillDimensions = trackFillElement.getBoundingClientRect();
            thumbDimensions = thumbElement.getBoundingClientRect();
            // The thumb and track fill positions are relative to the viewport, so to get the thumb's
            // offset relative to the track, subtract the offset on the track fill.
            var thumbPosition = thumbDimensions.left - trackFillDimensions.left;
            // The track fill width should be equal to the thumb's position.
            expect(Math.round(trackFillDimensions.width)).toBe(Math.round(thumbPosition));
        });
        it('should update the thumb position on click', function () {
            expect(thumbDimensions.left).toBe(sliderDimensions.left);
            // 50% is used here because the click event that is dispatched truncates the position and so
            // a value had to be used that would not be truncated.
            dispatchClickEvent(sliderTrackElement, 0.5);
            thumbDimensions = thumbElement.getBoundingClientRect();
            // The thumb position should be at 50% of the slider's width + the offset of the slider.
            // Both the thumb and the slider are affected by this offset.
            expect(thumbDimensions.left).toBe(sliderDimensions.width * 0.5 + sliderDimensions.left);
        });
        it('should update the track fill on slide', function () {
            expect(trackFillDimensions.width).toBe(0);
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.86, gestureConfig);
            trackFillDimensions = trackFillElement.getBoundingClientRect();
            thumbDimensions = thumbElement.getBoundingClientRect();
            // The thumb and track fill positions are relative to the viewport, so to get the thumb's
            // offset relative to the track, subtract the offset on the track fill.
            var thumbPosition = thumbDimensions.left - trackFillDimensions.left;
            // The track fill width should be equal to the thumb's position.
            expect(Math.round(trackFillDimensions.width)).toBe(Math.round(thumbPosition));
        });
        it('should update the thumb position on slide', function () {
            expect(thumbDimensions.left).toBe(sliderDimensions.left);
            // The slide event also truncates the position passed in, so 50% is used here as well to
            // ensure the ability to calculate the expected position.
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.5, gestureConfig);
            thumbDimensions = thumbElement.getBoundingClientRect();
            expect(thumbDimensions.left).toBe(sliderDimensions.width * 0.5 + sliderDimensions.left);
        });
        it('should add the md-slider-active class on click', function () {
            var containerElement = sliderNativeElement.querySelector('.md-slider-container');
            expect(containerElement.classList).not.toContain('md-slider-active');
            dispatchClickEvent(sliderNativeElement, 0.23);
            fixture.detectChanges();
            expect(containerElement.classList).toContain('md-slider-active');
        });
        it('should remove the md-slider-active class on blur', function () {
            var containerElement = sliderNativeElement.querySelector('.md-slider-container');
            dispatchClickEvent(sliderNativeElement, 0.95);
            fixture.detectChanges();
            expect(containerElement.classList).toContain('md-slider-active');
            // Call the `onBlur` handler directly because we cannot simulate a focus event in unit tests.
            sliderInstance.onBlur();
            fixture.detectChanges();
            expect(containerElement.classList).not.toContain('md-slider-active');
        });
        it('should add and remove the md-slider-sliding class when sliding', function () {
            var containerElement = sliderNativeElement.querySelector('.md-slider-container');
            expect(containerElement.classList).not.toContain('md-slider-sliding');
            dispatchSlideStartEvent(sliderNativeElement, 0, gestureConfig);
            fixture.detectChanges();
            expect(containerElement.classList).toContain('md-slider-sliding');
            dispatchSlideEndEvent(sliderNativeElement, 0.34, gestureConfig);
            fixture.detectChanges();
            expect(containerElement.classList).not.toContain('md-slider-sliding');
        });
    });
    describe('disabled slider', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        beforeEach(testing_1.async(function () {
            builder.createAsync(DisabledSlider).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(slider_1.MdSlider));
                sliderNativeElement = sliderDebugElement.nativeElement;
                sliderInstance = sliderDebugElement.componentInstance;
            });
        }));
        it('should be disabled', function () {
            expect(sliderInstance.disabled).toBeTruthy();
        });
        it('should not change the value on click when disabled', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchClickEvent(sliderNativeElement, 0.63);
            expect(sliderInstance.value).toBe(0);
        });
        it('should not change the value on slide when disabled', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchSlideEvent(sliderNativeElement, sliderNativeElement, 0, 0.5, gestureConfig);
            expect(sliderInstance.value).toBe(0);
        });
        it('should not add the md-slider-active class on click when disabled', function () {
            var containerElement = sliderNativeElement.querySelector('.md-slider-container');
            expect(containerElement.classList).not.toContain('md-slider-active');
            dispatchClickEvent(sliderNativeElement, 0.43);
            fixture.detectChanges();
            expect(containerElement.classList).not.toContain('md-slider-active');
        });
        it('should not add the md-slider-sliding class on slide when disabled', function () {
            var containerElement = sliderNativeElement.querySelector('.md-slider-container');
            expect(containerElement.classList).not.toContain('md-slider-sliding');
            dispatchSlideStartEvent(sliderNativeElement, 0.46, gestureConfig);
            fixture.detectChanges();
            expect(containerElement.classList).not.toContain('md-slider-sliding');
        });
    });
    describe('slider with set min and max', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var sliderTrackElement;
        var sliderDimensions;
        var trackFillElement;
        var thumbElement;
        beforeEach(testing_1.async(function () {
            builder.createAsync(SliderWithMinAndMax).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(slider_1.MdSlider));
                sliderNativeElement = sliderDebugElement.nativeElement;
                sliderInstance = sliderDebugElement.injector.get(slider_1.MdSlider);
                sliderTrackElement = sliderNativeElement.querySelector('.md-slider-track');
                sliderDimensions = sliderTrackElement.getBoundingClientRect();
                trackFillElement = sliderNativeElement.querySelector('.md-slider-track-fill');
                thumbElement = sliderNativeElement.querySelector('.md-slider-thumb-position');
            });
        }));
        it('should set the default values from the attributes', function () {
            expect(sliderInstance.value).toBe(4);
            expect(sliderInstance.min).toBe(4);
            expect(sliderInstance.max).toBe(6);
        });
        it('should set the correct value on click', function () {
            dispatchClickEvent(sliderTrackElement, 0.09);
            // Computed by multiplying the difference between the min and the max by the percentage from
            // the click and adding that to the minimum.
            var value = Math.round(4 + (0.09 * (6 - 4)));
            expect(sliderInstance.value).toBe(value);
        });
        it('should set the correct value on slide', function () {
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.62, gestureConfig);
            // Computed by multiplying the difference between the min and the max by the percentage from
            // the click and adding that to the minimum.
            var value = Math.round(4 + (0.62 * (6 - 4)));
            expect(sliderInstance.value).toBe(value);
        });
        it('should snap the thumb and fill to the nearest value on click', function () {
            dispatchClickEvent(sliderTrackElement, 0.68);
            fixture.detectChanges();
            var trackFillDimensions = trackFillElement.getBoundingClientRect();
            var thumbDimensions = thumbElement.getBoundingClientRect();
            var thumbPosition = thumbDimensions.left - trackFillDimensions.left;
            // The closest snap is halfway on the slider.
            expect(thumbDimensions.left).toBe(sliderDimensions.width * 0.5 + sliderDimensions.left);
            expect(Math.round(trackFillDimensions.width)).toBe(Math.round(thumbPosition));
        });
        it('should snap the thumb and fill to the nearest value on slide', function () {
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.74, gestureConfig);
            fixture.detectChanges();
            dispatchSlideEndEvent(sliderNativeElement, 0.74, gestureConfig);
            fixture.detectChanges();
            var trackFillDimensions = trackFillElement.getBoundingClientRect();
            var thumbDimensions = thumbElement.getBoundingClientRect();
            var thumbPosition = thumbDimensions.left - trackFillDimensions.left;
            // The closest snap is at the halfway point on the slider.
            expect(thumbDimensions.left).toBe(sliderDimensions.left + sliderDimensions.width * 0.5);
            expect(Math.round(trackFillDimensions.width)).toBe(Math.round(thumbPosition));
        });
    });
    describe('slider with set value', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var sliderTrackElement;
        beforeEach(testing_1.async(function () {
            builder.createAsync(SliderWithValue).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(slider_1.MdSlider));
                sliderNativeElement = sliderDebugElement.nativeElement;
                sliderInstance = sliderDebugElement.injector.get(slider_1.MdSlider);
                sliderTrackElement = sliderNativeElement.querySelector('.md-slider-track');
            });
        }));
        it('should set the default value from the attribute', function () {
            expect(sliderInstance.value).toBe(26);
        });
        it('should set the correct value on click', function () {
            dispatchClickEvent(sliderTrackElement, 0.92);
            // On a slider with default max and min the value should be approximately equal to the
            // percentage clicked. This should be the case regardless of what the original set value was.
            expect(sliderInstance.value).toBe(92);
        });
        it('should set the correct value on slide', function () {
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.32, gestureConfig);
            expect(sliderInstance.value).toBe(32);
        });
    });
    describe('slider with set step', function () {
        var fixture;
        var sliderDebugElement;
        var sliderNativeElement;
        var sliderInstance;
        var sliderTrackElement;
        var sliderDimensions;
        var trackFillElement;
        var thumbElement;
        beforeEach(testing_1.async(function () {
            builder.createAsync(SliderWithStep).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                sliderDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(slider_1.MdSlider));
                sliderNativeElement = sliderDebugElement.nativeElement;
                sliderInstance = sliderDebugElement.injector.get(slider_1.MdSlider);
                sliderTrackElement = sliderNativeElement.querySelector('.md-slider-track');
                sliderDimensions = sliderTrackElement.getBoundingClientRect();
                trackFillElement = sliderNativeElement.querySelector('.md-slider-track-fill');
                thumbElement = sliderNativeElement.querySelector('.md-slider-thumb-position');
            });
        }));
        it('should set the correct step value on click', function () {
            expect(sliderInstance.value).toBe(0);
            dispatchClickEvent(sliderTrackElement, 0.13);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(25);
        });
        it('should snap the thumb and fill to a step on click', function () {
            dispatchClickEvent(sliderNativeElement, 0.66);
            fixture.detectChanges();
            var trackFillDimensions = trackFillElement.getBoundingClientRect();
            var thumbDimensions = thumbElement.getBoundingClientRect();
            var thumbPosition = thumbDimensions.left - trackFillDimensions.left;
            // The closest step is at 75% of the slider.
            expect(thumbDimensions.left).toBe(sliderDimensions.width * 0.75 + sliderDimensions.left);
            expect(Math.round(trackFillDimensions.width)).toBe(Math.round(thumbPosition));
        });
        it('should set the correct step value on slide', function () {
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.07, gestureConfig);
            fixture.detectChanges();
            expect(sliderInstance.value).toBe(0);
        });
        it('should snap the thumb and fill to a step on slide', function () {
            dispatchSlideEvent(sliderTrackElement, sliderNativeElement, 0, 0.88, gestureConfig);
            fixture.detectChanges();
            dispatchSlideEndEvent(sliderNativeElement, 0.88, gestureConfig);
            fixture.detectChanges();
            var trackFillDimensions = trackFillElement.getBoundingClientRect();
            var thumbDimensions = thumbElement.getBoundingClientRect();
            var thumbPosition = thumbDimensions.left - trackFillDimensions.left;
            // The closest snap is at the end of the slider.
            expect(thumbDimensions.left).toBe(sliderDimensions.width + sliderDimensions.left);
            expect(Math.round(trackFillDimensions.width)).toBe(Math.round(thumbPosition));
        });
    });
});
// The transition has to be removed in order to test the updated positions without setTimeout.
var StandardSlider = (function () {
    function StandardSlider() {
    }
    StandardSlider = __decorate([
        core_1.Component({
            directives: [slider_1.MD_SLIDER_DIRECTIVES],
            template: "<md-slider></md-slider>",
            styles: ["\n    .md-slider-track-fill, .md-slider-thumb-position {\n        transition: none !important;\n    }\n  "],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], StandardSlider);
    return StandardSlider;
}());
var DisabledSlider = (function () {
    function DisabledSlider() {
    }
    DisabledSlider = __decorate([
        core_1.Component({
            directives: [slider_1.MD_SLIDER_DIRECTIVES],
            template: "<md-slider disabled></md-slider>"
        }), 
        __metadata('design:paramtypes', [])
    ], DisabledSlider);
    return DisabledSlider;
}());
var SliderWithMinAndMax = (function () {
    function SliderWithMinAndMax() {
    }
    SliderWithMinAndMax = __decorate([
        core_1.Component({
            directives: [slider_1.MD_SLIDER_DIRECTIVES],
            template: "<md-slider min=\"4\" max=\"6\"></md-slider>",
            styles: ["\n    .md-slider-track-fill, .md-slider-thumb-position {\n        transition: none !important;\n    }\n  "],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], SliderWithMinAndMax);
    return SliderWithMinAndMax;
}());
var SliderWithValue = (function () {
    function SliderWithValue() {
    }
    SliderWithValue = __decorate([
        core_1.Component({
            directives: [slider_1.MD_SLIDER_DIRECTIVES],
            template: "<md-slider value=\"26\"></md-slider>"
        }), 
        __metadata('design:paramtypes', [])
    ], SliderWithValue);
    return SliderWithValue;
}());
var SliderWithStep = (function () {
    function SliderWithStep() {
    }
    SliderWithStep = __decorate([
        core_1.Component({
            directives: [slider_1.MD_SLIDER_DIRECTIVES],
            template: "<md-slider step=\"25\"></md-slider>",
            styles: ["\n    .md-slider-track-fill, .md-slider-thumb-position {\n        transition: none !important;\n    }\n  "],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], SliderWithStep);
    return SliderWithStep;
}());
/**
 * Dispatches a click event from an element.
 * Note: The mouse event truncates the position for the click.
 * @param element The element from which the event will be dispatched.
 * @param percentage The percentage of the slider where the click should occur. Used to find the
 * physical location of the click.
 */
function dispatchClickEvent(element, percentage) {
    var dimensions = element.getBoundingClientRect();
    var y = dimensions.top;
    var x = dimensions.left + (dimensions.width * percentage);
    var event = document.createEvent('MouseEvent');
    event.initMouseEvent('click', true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);
    element.dispatchEvent(event);
}
/**
 * Dispatches a slide event from an element.
 * @param trackElement The track element from which the event location will be calculated.
 * @param containerElement The container element from which the event will be dispatched.
 * @param startPercent The percentage of the slider where the slide will begin.
 * @param endPercent The percentage of the slider where the slide will end.
 * @param gestureConfig The gesture config for the test to handle emitting the slide events.
 */
function dispatchSlideEvent(trackElement, containerElement, startPercent, endPercent, gestureConfig) {
    var dimensions = trackElement.getBoundingClientRect();
    var startX = dimensions.left + (dimensions.width * startPercent);
    var endX = dimensions.left + (dimensions.width * endPercent);
    gestureConfig.emitEventForElement('slidestart', containerElement, {
        // The actual event has a center with an x value that the slide listener is looking for.
        center: { x: startX },
        // The event needs a source event with a prevent default so we fake one.
        srcEvent: { preventDefault: jasmine.createSpy('preventDefault') }
    });
    gestureConfig.emitEventForElement('slide', containerElement, {
        center: { x: endX },
        srcEvent: { preventDefault: jasmine.createSpy('preventDefault') }
    });
}
/**
 * Dispatches a slidestart event from an element.
 * @param element The element from which the event will be dispatched.
 * @param startPercent The percentage of the slider where the slide will begin.
 * @param gestureConfig The gesture config for the test to handle emitting the slide events.
 */
function dispatchSlideStartEvent(element, startPercent, gestureConfig) {
    var dimensions = element.getBoundingClientRect();
    var x = dimensions.left + (dimensions.width * startPercent);
    gestureConfig.emitEventForElement('slidestart', element, {
        center: { x: x },
        srcEvent: { preventDefault: jasmine.createSpy('preventDefault') }
    });
}
/**
 * Dispatches a slideend event from an element.
 * @param element The element from which the event will be dispatched.
 * @param endPercent The percentage of the slider where the slide will end.
 * @param gestureConfig The gesture config for the test to handle emitting the slide events.
 */
function dispatchSlideEndEvent(element, endPercent, gestureConfig) {
    var dimensions = element.getBoundingClientRect();
    var x = dimensions.left + (dimensions.width * endPercent);
    gestureConfig.emitEventForElement('slideend', element, {
        center: { x: x },
        srcEvent: { preventDefault: jasmine.createSpy('preventDefault') }
    });
}
//# sourceMappingURL=slider.spec.js.map