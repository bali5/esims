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
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var input_1 = require('./input');
describe('MdInput', function () {
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
    it('creates a native <input> element', testing_1.async(function () {
        builder.createAsync(MdInputBaseTestController)
            .then(function (fixture) {
            fixture.detectChanges();
            expect(fixture.debugElement.query(platform_browser_1.By.css('input'))).toBeTruthy();
        });
    }));
    // TODO(kara): update when core/testing adds fix
    it('support ngModel', testing_1.async(function () {
        builder.createAsync(MdInputBaseTestController)
            .then(function (fixture) {
            fixture.detectChanges();
            var instance = fixture.componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            instance.model = 'hello';
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                // this workaround is temp, see https://github.com/angular/angular/issues/10148
                fixture.detectChanges();
                fixture.whenStable().then(function () {
                    expect(el.value).toBe('hello');
                });
            });
        });
    }));
    it('should have a different ID for outer element and internal input', testing_1.async(function () {
        builder
            .overrideTemplate(MdInputBaseTestController, "\n          <md-input id=\"test-id\"></md-input>\n        ")
            .createAsync(MdInputBaseTestController)
            .then(function (fixture) {
            fixture.detectChanges();
            var componentElement = fixture.debugElement
                .query(platform_browser_1.By.directive(input_1.MdInput)).nativeElement;
            var inputElement = fixture.debugElement.query(platform_browser_1.By.css('input'))
                .nativeElement;
            expect(componentElement.id).toBe('test-id');
            expect(inputElement.id).toBeTruthy();
            expect(inputElement.id).not.toBe(componentElement.id);
        });
    }));
    it('counts characters', testing_1.async(function () {
        builder.createAsync(MdInputBaseTestController).then(function (fixture) {
            var instance = fixture.componentInstance;
            fixture.detectChanges();
            var inputInstance = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            expect(inputInstance.characterCount).toEqual(0);
            instance.model = 'hello';
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                expect(inputInstance.characterCount).toEqual(5);
            });
        });
    }));
    it('copies aria attributes to the inner input', testing_1.async(function () {
        builder.createAsync(MdInputAriaTestController)
            .then(function (fixture) {
            var instance = fixture.componentInstance;
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el.getAttribute('aria-label')).toEqual('label');
            instance.ariaLabel = 'label 2';
            fixture.detectChanges();
            expect(el.getAttribute('aria-label')).toEqual('label 2');
            expect(el.getAttribute('aria-disabled')).toBeTruthy();
        });
    }));
    it('validates there\'s only one hint label per side', testing_1.async(function () {
        builder.createAsync(MdInputInvalidHintTestController)
            .then(function (fixture) {
            expect(function () { return fixture.detectChanges(); })
                .toThrow();
            // TODO(jelbourn): .toThrow(new MdInputDuplicatedHintError('start'));
            // See https://github.com/angular/angular/issues/8348
        });
    }));
    it("validates there's only one hint label per side (attribute)", testing_1.async(function () {
        builder.createAsync(MdInputInvalidHint2TestController)
            .then(function (fixture) {
            expect(function () { return fixture.detectChanges(); })
                .toThrow();
            // TODO(jelbourn): .toThrow(new MdInputDuplicatedHintError('start'));
            // See https://github.com/angular/angular/issues/8348
        });
    }));
    it('validates there\'s only one placeholder', testing_1.async(function () {
        builder.createAsync(MdInputInvalidPlaceholderTestController)
            .then(function (fixture) {
            expect(function () { return fixture.detectChanges(); })
                .toThrow();
            // TODO(jelbourn): .toThrow(new MdInputPlaceholderConflictError());
            // See https://github.com/angular/angular/issues/8348
        });
    }));
    it('validates the type', testing_1.async(function () {
        builder.createAsync(MdInputInvalidTypeTestController).then(function (fixture) {
            // Technically this throws during the OnChanges detection phase,
            // so the error is really a ChangeDetectionError and it becomes
            // hard to build a full exception to compare with.
            // We just check for any exception in this case.
            expect(function () { return fixture.detectChanges(); })
                .toThrow();
        });
    }));
    it('supports hint labels attribute', testing_1.async(function () {
        builder.createAsync(MdInputHintLabelTestController)
            .then(function (fixture) {
            fixture.detectChanges();
            // If the hint label is empty, expect no label.
            expect(fixture.debugElement.query(platform_browser_1.By.css('.md-hint'))).toBeNull();
            fixture.componentInstance.label = 'label';
            fixture.detectChanges();
            expect(fixture.debugElement.query(platform_browser_1.By.css('.md-hint'))).not.toBeNull();
        });
    }));
    it('supports hint labels elements', testing_1.async(function () {
        builder.createAsync(MdInputHintLabel2TestController).then(function (fixture) {
            fixture.detectChanges();
            // In this case, we should have an empty <md-hint>.
            var el = fixture.debugElement.query(platform_browser_1.By.css('md-hint')).nativeElement;
            expect(el.textContent).toBeFalsy();
            fixture.componentInstance.label = 'label';
            fixture.detectChanges();
            el = fixture.debugElement.query(platform_browser_1.By.css('md-hint')).nativeElement;
            expect(el.textContent).toBe('label');
        });
    }));
    it('supports placeholder attribute', testing_1.async(function () {
        builder.createAsync(MdInputPlaceholderAttrTestComponent).then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
            expect(el).toBeNull();
            fixture.componentInstance.placeholder = 'Other placeholder';
            fixture.detectChanges();
            el = fixture.debugElement.query(platform_browser_1.By.css('label'));
            expect(el).not.toBeNull();
            expect(el.nativeElement.textContent).toMatch('Other placeholder');
            expect(el.nativeElement.textContent).not.toMatch(/\*/g);
        });
    }));
    it('supports placeholder element', testing_1.async(function () {
        builder.createAsync(MdInputPlaceholderElementTestComponent).then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
            expect(el).not.toBeNull();
            expect(el.nativeElement.textContent).toMatch('Default Placeholder');
            fixture.componentInstance.placeholder = 'Other placeholder';
            fixture.detectChanges();
            el = fixture.debugElement.query(platform_browser_1.By.css('label'));
            expect(el).not.toBeNull();
            expect(el.nativeElement.textContent).toMatch('Other placeholder');
            expect(el.nativeElement.textContent).not.toMatch(/\*/g);
        });
    }));
    it('supports placeholder required star', testing_1.async(function () {
        builder.createAsync(MdInputPlaceholderRequiredTestComponent).then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('label'));
            expect(el).not.toBeNull();
            expect(el.nativeElement.textContent).toMatch(/hello\s+\*/g);
        });
    }));
    it('supports number types and conserved its value type from Angular', testing_1.async(function () {
        builder.createAsync(MdInputNumberTypeConservedTestComponent).then(function (fixture) {
            fixture.detectChanges();
            var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            inputEl.value = '3';
            // Manually trigger an onchange event.
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', true, true);
            inputEl.dispatchEvent(evt);
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.value).toBe(3);
                expect(typeof fixture.componentInstance.value).toBe('number');
            });
        });
    }));
    it('supports blur and focus events', testing_1.async(function () {
        builder.createAsync(MdInputWithBlurAndFocusEvents).then(function (fixture) {
            var testComponent = fixture.componentInstance;
            var inputComponent = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var fakeEvent = {};
            spyOn(testComponent, 'onFocus');
            spyOn(testComponent, 'onBlur');
            expect(testComponent.onFocus).not.toHaveBeenCalled();
            expect(testComponent.onBlur).not.toHaveBeenCalled();
            inputComponent._handleFocus(fakeEvent);
            expect(testComponent.onFocus).toHaveBeenCalledWith(fakeEvent);
            inputComponent._handleBlur(fakeEvent);
            expect(testComponent.onBlur).toHaveBeenCalledWith(fakeEvent);
        });
    }));
    it('supports the autoComplete attribute', testing_1.async(function () {
        var template = '<md-input [autoComplete]="autoComplete"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('autocomplete')).toBeNull();
            input.autoComplete = 'on';
            fixture.detectChanges();
            expect(el.getAttribute('autocomplete')).toEqual('on');
        });
    }));
    it('supports the autoCorrect attribute', testing_1.async(function () {
        var template = '<md-input [autoCorrect]="autoCorrect"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('autocorrect')).toBeNull();
            input.autoCorrect = 'on';
            fixture.detectChanges();
            expect(el.getAttribute('autocorrect')).toEqual('on');
        });
    }));
    it('supports the autoCapitalize attribute', testing_1.async(function () {
        var template = '<md-input [autoCapitalize]="autoCapitalize"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('autocapitalize')).toBeNull();
            input.autoCapitalize = 'on';
            fixture.detectChanges();
            expect(el.getAttribute('autocapitalize')).toEqual('on');
        });
    }));
    it('supports the autoComplete attribute as an unbound attribute', testing_1.async(function () {
        var template = '<md-input autoComplete></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('autocomplete')).toEqual('');
        });
    }));
    it('supports the autoComplete attribute as an unbound value attribute', testing_1.async(function () {
        var template = '<md-input autoComplete="name"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('autocomplete')).toEqual('name');
        });
    }));
    it('supports the autoFocus attribute', testing_1.async(function () {
        var template = '<md-input [autoFocus]="autoFocus"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('autofocus')).toBeNull();
            input.autoFocus = true;
            fixture.detectChanges();
            expect(el.getAttribute('autofocus')).toEqual('');
        });
    }));
    it('supports the autoFocus attribute as an unbound attribute', testing_1.async(function () {
        var template = '<md-input autoFocus></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('autofocus')).toEqual('');
        });
    }));
    it('supports the disabled attribute', testing_1.async(function () {
        var template = '<md-input [disabled]="disabled"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            input.disabled = false;
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            fixture.detectChanges();
            expect(el.getAttribute('disabled')).toEqual(null);
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(el.getAttribute('disabled')).toEqual('');
        });
    }));
    it('supports the disabled attribute as an unbound attribute', testing_1.async(function () {
        var template = '<md-input disabled></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('disabled')).toEqual('');
        });
    }));
    it('supports the list attribute', testing_1.async(function () {
        var template = '<md-input [list]="list"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            input.disabled = false;
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            fixture.detectChanges();
            expect(el.getAttribute('list')).toEqual(null);
            input.list = 'datalist-id';
            fixture.detectChanges();
            expect(el.getAttribute('list')).toEqual('datalist-id');
        });
    }));
    it('supports the max attribute', testing_1.async(function () {
        var template = '<md-input [max]="max"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            input.disabled = false;
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            fixture.detectChanges();
            expect(el.getAttribute('max')).toEqual(null);
            input.max = 10;
            fixture.detectChanges();
            expect(el.getAttribute('max')).toEqual('10');
            input.max = '2000-01-02';
            fixture.detectChanges();
            expect(el.getAttribute('max')).toEqual('2000-01-02');
        });
    }));
    it('supports the min attribute', testing_1.async(function () {
        var template = '<md-input [min]="min"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            input.disabled = false;
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            fixture.detectChanges();
            expect(el.getAttribute('min')).toEqual(null);
            input.min = 10;
            fixture.detectChanges();
            expect(el.getAttribute('min')).toEqual('10');
            input.min = '2000-01-02';
            fixture.detectChanges();
            expect(el.getAttribute('min')).toEqual('2000-01-02');
        });
    }));
    it('supports the readOnly attribute', testing_1.async(function () {
        var template = '<md-input [readOnly]="readOnly"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            expect(el).not.toBeNull();
            expect(el.getAttribute('readonly')).toBeNull();
            input.readOnly = true;
            fixture.detectChanges();
            expect(el.getAttribute('readonly')).toEqual('');
        });
    }));
    it('supports the readOnly attribute as an unbound attribute', testing_1.async(function () {
        var template = '<md-input readOnly></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('readonly')).toEqual('');
        });
    }));
    it('supports the required attribute', testing_1.async(function () {
        var template = '<md-input [required]="required"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('required')).toBeNull();
            input.required = true;
            fixture.detectChanges();
            expect(el.getAttribute('required')).toEqual('');
        });
    }));
    it('supports the required attribute as an unbound attribute', testing_1.async(function () {
        var template = '<md-input required></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('required')).toEqual('');
        });
    }));
    it('supports the spellCheck attribute', testing_1.async(function () {
        var template = '<md-input [spellCheck]="spellCheck"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('spellcheck')).toEqual('false');
            input.spellCheck = true;
            fixture.detectChanges();
            expect(el.getAttribute('spellcheck')).toEqual('true');
        });
    }));
    it('supports the spellCheck attribute as an unbound attribute', testing_1.async(function () {
        var template = '<md-input spellCheck></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('spellcheck')).toEqual('true');
        });
    }));
    it('supports the step attribute', testing_1.async(function () {
        var template = '<md-input [step]="step"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('step')).toEqual(null);
            input.step = 0.5;
            fixture.detectChanges();
            expect(el.getAttribute('step')).toEqual('0.5');
        });
    }));
    it('supports the tabIndex attribute', testing_1.async(function () {
        var template = '<md-input [tabIndex]="tabIndex"></md-input>';
        builder.overrideTemplate(MdInputOptionalAttributeController, template)
            .createAsync(MdInputOptionalAttributeController)
            .then(function (fixture) {
            fixture.detectChanges();
            var input = fixture.debugElement.query(platform_browser_1.By.directive(input_1.MdInput)).componentInstance;
            var el = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
            expect(el).not.toBeNull();
            expect(el.getAttribute('tabindex')).toEqual(null);
            input.tabIndex = 1;
            fixture.detectChanges();
            expect(el.getAttribute('tabindex')).toEqual('1');
        });
    }));
    it('supports a name attribute', testing_1.async(function () {
        builder.createAsync(MdInputWithNameTestController).then(function (fixture) {
            var inputElement = fixture.debugElement.query(platform_browser_1.By.css('input'))
                .nativeElement;
            fixture.detectChanges();
            expect(inputElement.name).toBe('some-name');
        });
    }));
});
var MdInputNumberTypeConservedTestComponent = (function () {
    function MdInputNumberTypeConservedTestComponent() {
        this.value = 0;
    }
    MdInputNumberTypeConservedTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input type=\"number\" [(ngModel)]=\"value\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputNumberTypeConservedTestComponent);
    return MdInputNumberTypeConservedTestComponent;
}());
var MdInputPlaceholderRequiredTestComponent = (function () {
    function MdInputPlaceholderRequiredTestComponent() {
    }
    MdInputPlaceholderRequiredTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input required placeholder=\"hello\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputPlaceholderRequiredTestComponent);
    return MdInputPlaceholderRequiredTestComponent;
}());
var MdInputPlaceholderElementTestComponent = (function () {
    function MdInputPlaceholderElementTestComponent() {
        this.placeholder = 'Default Placeholder';
    }
    MdInputPlaceholderElementTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input>\n      <md-placeholder>{{placeholder}}</md-placeholder>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputPlaceholderElementTestComponent);
    return MdInputPlaceholderElementTestComponent;
}());
var MdInputPlaceholderAttrTestComponent = (function () {
    function MdInputPlaceholderAttrTestComponent() {
        this.placeholder = '';
    }
    MdInputPlaceholderAttrTestComponent = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [placeholder]=\"placeholder\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputPlaceholderAttrTestComponent);
    return MdInputPlaceholderAttrTestComponent;
}());
var MdInputHintLabel2TestController = (function () {
    function MdInputHintLabel2TestController() {
        this.label = '';
    }
    MdInputHintLabel2TestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input>\n      <md-hint>{{label}}</md-hint>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputHintLabel2TestController);
    return MdInputHintLabel2TestController;
}());
var MdInputHintLabelTestController = (function () {
    function MdInputHintLabelTestController() {
        this.label = '';
    }
    MdInputHintLabelTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [hintLabel]=\"label\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputHintLabelTestController);
    return MdInputHintLabelTestController;
}());
var MdInputInvalidTypeTestController = (function () {
    function MdInputInvalidTypeTestController() {
    }
    MdInputInvalidTypeTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input type=\"file\">\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidTypeTestController);
    return MdInputInvalidTypeTestController;
}());
var MdInputInvalidPlaceholderTestController = (function () {
    function MdInputInvalidPlaceholderTestController() {
    }
    MdInputInvalidPlaceholderTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input placeholder=\"Hello\">\n      <md-placeholder>World</md-placeholder>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidPlaceholderTestController);
    return MdInputInvalidPlaceholderTestController;
}());
var MdInputInvalidHint2TestController = (function () {
    function MdInputInvalidHint2TestController() {
    }
    MdInputInvalidHint2TestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input hintLabel=\"Hello\">\n      <md-hint>World</md-hint>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidHint2TestController);
    return MdInputInvalidHint2TestController;
}());
var MdInputInvalidHintTestController = (function () {
    function MdInputInvalidHintTestController() {
    }
    MdInputInvalidHintTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input>\n      <md-hint>Hello</md-hint>\n      <md-hint>World</md-hint>\n    </md-input>\n  ",
            directives: [input_1.MD_INPUT_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputInvalidHintTestController);
    return MdInputInvalidHintTestController;
}());
var MdInputBaseTestController = (function () {
    function MdInputBaseTestController() {
        this.model = '';
    }
    MdInputBaseTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [(ngModel)]=\"model\">\n    </md-input>\n  ",
            directives: [input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputBaseTestController);
    return MdInputBaseTestController;
}());
var MdInputAriaTestController = (function () {
    function MdInputAriaTestController() {
        this.ariaLabel = 'label';
        this.ariaDisabled = true;
    }
    MdInputAriaTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input [aria-label]=\"ariaLabel\" [aria-disabled]=\"ariaDisabled\">\n    </md-input>\n  ",
            directives: [input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputAriaTestController);
    return MdInputAriaTestController;
}());
var MdInputWithBlurAndFocusEvents = (function () {
    function MdInputWithBlurAndFocusEvents() {
    }
    MdInputWithBlurAndFocusEvents.prototype.onBlur = function (event) { };
    MdInputWithBlurAndFocusEvents.prototype.onFocus = function (event) { };
    MdInputWithBlurAndFocusEvents = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\"></md-input>\n  ",
            directives: [input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputWithBlurAndFocusEvents);
    return MdInputWithBlurAndFocusEvents;
}());
var MdInputOptionalAttributeController = (function () {
    function MdInputOptionalAttributeController() {
    }
    MdInputOptionalAttributeController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input></md-input>\n  ",
            directives: [input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputOptionalAttributeController);
    return MdInputOptionalAttributeController;
}());
var MdInputWithNameTestController = (function () {
    function MdInputWithNameTestController() {
    }
    MdInputWithNameTestController = __decorate([
        core_1.Component({
            selector: 'test-input-controller',
            template: "\n    <md-input name=\"some-name\"></md-input>\n  ",
            directives: [input_1.MdInput]
        }), 
        __metadata('design:paramtypes', [])
    ], MdInputWithNameTestController);
    return MdInputWithNameTestController;
}());
//# sourceMappingURL=input.spec.js.map