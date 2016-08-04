import { ElementRef, AfterContentInit } from '@angular/core';
export declare class MdSlider implements AfterContentInit {
    /** A renderer to handle updating the slider's thumb and fill track. */
    private _renderer;
    /** The dimensions of the slider. */
    private _sliderDimensions;
    disabled: boolean;
    /** The miniumum value that the slider can have. */
    private _min;
    /** The maximum value that the slider can have. */
    private _max;
    /** The percentage of the slider that coincides with the value. */
    private _percent;
    /** The values at which the thumb will snap. */
    step: number;
    /**
     * Whether or not the thumb is sliding.
     * Used to determine if there should be a transition for the thumb and fill track.
     * TODO: internal
     */
    isSliding: boolean;
    /**
     * Whether or not the slider is active (clicked or sliding).
     * Used to shrink and grow the thumb as according to the Material Design spec.
     * TODO: internal
     */
    isActive: boolean;
    /** Indicator for if the value has been set or not. */
    private _isInitialized;
    /** Value of the slider. */
    private _value;
    min: number;
    max: number;
    value: number;
    constructor(elementRef: ElementRef);
    /**
     * Once the slider has rendered, grab the dimensions and update the position of the thumb and
     * fill track.
     * TODO: internal
     */
    ngAfterContentInit(): void;
    /** TODO: internal */
    onClick(event: MouseEvent): void;
    /** TODO: internal */
    onSlide(event: HammerInput): void;
    /** TODO: internal */
    onSlideStart(event: HammerInput): void;
    /** TODO: internal */
    onSlideEnd(): void;
    /** TODO: internal */
    onResize(): void;
    /** TODO: internal */
    onBlur(): void;
    /**
     * When the value changes without a physical position, the percentage needs to be recalculated
     * independent of the physical location.
     * This is also used to move the thumb to a snapped value once sliding is done.
     */
    updatePercentFromValue(): void;
    /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     */
    updateValueFromPosition(pos: number): void;
    /**
     * Snaps the thumb to the current value.
     * Called after a click or drag event is over.
     */
    snapToValue(): void;
    /**
     * Return a number between two numbers.
     */
    clamp(value: number, min?: number, max?: number): number;
}
/**
 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
 */
export declare class SliderRenderer {
    private _sliderElement;
    constructor(elementRef: ElementRef);
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     */
    getSliderDimensions(): ClientRect;
    /**
     * Update the physical position of the thumb and fill track on the slider.
     */
    updateThumbAndFillPosition(percent: number, width: number): void;
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     */
    addFocus(): void;
}
export declare const MD_SLIDER_DIRECTIVES: typeof MdSlider[];
