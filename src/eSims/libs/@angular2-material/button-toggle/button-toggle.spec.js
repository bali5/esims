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
var forms_1 = require('@angular/forms');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var button_toggle_1 = require('./button-toggle');
var unique_selection_dispatcher_1 = require('@angular2-material/core/coordination/unique-selection-dispatcher');
describe('MdButtonToggle', function () {
    var builder;
    var dispatcher;
    beforeEach(function () {
        testing_1.addProviders([
            forms_1.disableDeprecatedForms(),
            forms_1.provideForms(),
            { provide: unique_selection_dispatcher_1.MdUniqueSelectionDispatcher, useFactory: function () {
                    dispatcher = new unique_selection_dispatcher_1.MdUniqueSelectionDispatcher();
                    return dispatcher;
                } }
        ]);
    });
    beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    describe('inside of an exclusive selection group', function () {
        var fixture;
        var groupDebugElement;
        var groupNativeElement;
        var buttonToggleDebugElements;
        var buttonToggleNativeElements;
        var groupInstance;
        var buttonToggleInstances;
        var testComponent;
        beforeEach(testing_1.async(function () {
            builder.createAsync(ButtonTogglesInsideButtonToggleGroup).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                testComponent = fixture.debugElement.componentInstance;
                groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(button_toggle_1.MdButtonToggleGroup));
                groupNativeElement = groupDebugElement.nativeElement;
                groupInstance = groupDebugElement.injector.get(button_toggle_1.MdButtonToggleGroup);
                buttonToggleDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(button_toggle_1.MdButtonToggle));
                buttonToggleNativeElements =
                    buttonToggleDebugElements.map(function (debugEl) { return debugEl.nativeElement; });
                buttonToggleInstances = buttonToggleDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
            });
        }));
        it('should set individual button toggle names based on the group name', function () {
            expect(groupInstance.name).toBeTruthy();
            for (var _i = 0, buttonToggleInstances_1 = buttonToggleInstances; _i < buttonToggleInstances_1.length; _i++) {
                var buttonToggle = buttonToggleInstances_1[_i];
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
        });
        it('should disable click interactions when the group is disabled', function () {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();
            buttonToggleNativeElements[0].click();
            expect(buttonToggleInstances[0].checked).toBe(false);
        });
        it('should update the group value when one of the toggles changes', function () {
            expect(groupInstance.value).toBeFalsy();
            var nativeCheckboxLabel = buttonToggleDebugElements[0].query(platform_browser_1.By.css('label')).nativeElement;
            nativeCheckboxLabel.click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
        });
        it('should update the group and toggles when one of the button toggles is clicked', function () {
            expect(groupInstance.value).toBeFalsy();
            var nativeCheckboxLabel = buttonToggleDebugElements[0].query(platform_browser_1.By.css('label')).nativeElement;
            nativeCheckboxLabel.click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(buttonToggleInstances[1].checked).toBe(false);
            var nativeCheckboxLabel2 = buttonToggleDebugElements[1].query(platform_browser_1.By.css('label')).nativeElement;
            nativeCheckboxLabel2.click();
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test2');
            expect(groupInstance.selected).toBe(buttonToggleInstances[1]);
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[1].checked).toBe(true);
        });
        it('should check a button toggle upon interaction with underlying native radio button', function () {
            var nativeRadioInput = buttonToggleDebugElements[0].query(platform_browser_1.By.css('input')).nativeElement;
            nativeRadioInput.click();
            fixture.detectChanges();
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(groupInstance.value);
        });
        it('should emit a change event from button toggles', testing_1.fakeAsync(function () {
            expect(buttonToggleInstances[0].checked).toBe(false);
            var changeSpy = jasmine.createSpy('button-toggle change listener');
            buttonToggleInstances[0].change.subscribe(changeSpy);
            buttonToggleInstances[0].checked = true;
            fixture.detectChanges();
            testing_1.tick();
            expect(changeSpy).toHaveBeenCalled();
            buttonToggleInstances[0].checked = false;
            fixture.detectChanges();
            testing_1.tick();
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));
        it('should emit a change event from the button toggle group', testing_1.fakeAsync(function () {
            expect(groupInstance.value).toBeFalsy();
            var changeSpy = jasmine.createSpy('button-toggle-group change listener');
            groupInstance.change.subscribe(changeSpy);
            groupInstance.value = 'test1';
            fixture.detectChanges();
            testing_1.tick();
            expect(changeSpy).toHaveBeenCalled();
            groupInstance.value = 'test2';
            fixture.detectChanges();
            testing_1.tick();
            expect(changeSpy).toHaveBeenCalledTimes(2);
        }));
        it('should update the group and button toggles when updating the group value', function () {
            expect(groupInstance.value).toBeFalsy();
            testComponent.groupValue = 'test1';
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test1');
            expect(groupInstance.selected).toBe(buttonToggleInstances[0]);
            expect(buttonToggleInstances[0].checked).toBe(true);
            expect(buttonToggleInstances[1].checked).toBe(false);
            testComponent.groupValue = 'test2';
            fixture.detectChanges();
            expect(groupInstance.value).toBe('test2');
            expect(groupInstance.selected).toBe(buttonToggleInstances[1]);
            expect(buttonToggleInstances[0].checked).toBe(false);
            expect(buttonToggleInstances[1].checked).toBe(true);
        });
        it('should deselect all of the checkboxes when the group value is cleared', function () {
            buttonToggleInstances[0].checked = true;
            expect(groupInstance.value).toBeTruthy();
            groupInstance.value = null;
            expect(buttonToggleInstances.every(function (toggle) { return !toggle.checked; })).toBe(true);
        });
    });
    describe('button toggle group with ngModel', function () {
        var fixture;
        var groupDebugElement;
        var groupNativeElement;
        var buttonToggleDebugElements;
        var buttonToggleNativeElements;
        var groupInstance;
        var buttonToggleInstances;
        var testComponent;
        var groupNgControl;
        beforeEach(testing_1.async(function () {
            builder.createAsync(ButtonToggleGroupWithNgModel).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                testComponent = fixture.debugElement.componentInstance;
                groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(button_toggle_1.MdButtonToggleGroup));
                groupNativeElement = groupDebugElement.nativeElement;
                groupInstance = groupDebugElement.injector.get(button_toggle_1.MdButtonToggleGroup);
                groupNgControl = groupDebugElement.injector.get(forms_1.NgControl);
                buttonToggleDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(button_toggle_1.MdButtonToggle));
                buttonToggleNativeElements =
                    buttonToggleDebugElements.map(function (debugEl) { return debugEl.nativeElement; });
                buttonToggleInstances = buttonToggleDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
            });
        }));
        it('should set individual radio names based on the group name', function () {
            expect(groupInstance.name).toBeTruthy();
            for (var _i = 0, buttonToggleInstances_2 = buttonToggleInstances; _i < buttonToggleInstances_2.length; _i++) {
                var buttonToggle = buttonToggleInstances_2[_i];
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
            groupInstance.name = 'new name';
            for (var _a = 0, buttonToggleInstances_3 = buttonToggleInstances; _a < buttonToggleInstances_3.length; _a++) {
                var buttonToggle = buttonToggleInstances_3[_a];
                expect(buttonToggle.name).toBe(groupInstance.name);
            }
        });
        it('should check the corresponding button toggle on a group value change', function () {
            expect(groupInstance.value).toBeFalsy();
            for (var _i = 0, buttonToggleInstances_4 = buttonToggleInstances; _i < buttonToggleInstances_4.length; _i++) {
                var buttonToggle = buttonToggleInstances_4[_i];
                expect(buttonToggle.checked).toBeFalsy();
            }
            groupInstance.value = 'red';
            for (var _a = 0, buttonToggleInstances_5 = buttonToggleInstances; _a < buttonToggleInstances_5.length; _a++) {
                var buttonToggle = buttonToggleInstances_5[_a];
                expect(buttonToggle.checked).toBe(groupInstance.value === buttonToggle.value);
            }
            expect(groupInstance.selected.value).toBe(groupInstance.value);
        });
        it('should have the correct ngControl state initially and after interaction', testing_1.fakeAsync(function () {
            expect(groupNgControl.valid).toBe(true);
            expect(groupNgControl.pristine).toBe(true);
            expect(groupNgControl.touched).toBe(false);
            buttonToggleInstances[1].checked = true;
            fixture.detectChanges();
            testing_1.tick();
            expect(groupNgControl.valid).toBe(true);
            expect(groupNgControl.pristine).toBe(false);
            expect(groupNgControl.touched).toBe(false);
            var nativeRadioLabel = buttonToggleDebugElements[2].query(platform_browser_1.By.css('label')).nativeElement;
            nativeRadioLabel.click();
            fixture.detectChanges();
            testing_1.tick();
            expect(groupNgControl.valid).toBe(true);
            expect(groupNgControl.pristine).toBe(false);
            expect(groupNgControl.touched).toBe(true);
        }));
        it('should update the ngModel value when selecting a button toggle', testing_1.fakeAsync(function () {
            buttonToggleInstances[1].checked = true;
            fixture.detectChanges();
            testing_1.tick();
            expect(testComponent.modelValue).toBe('green');
        }));
    });
    describe('button toggle group with ngModel and change event', function () {
        var fixture;
        var groupDebugElement;
        var groupNativeElement;
        var buttonToggleDebugElements;
        var buttonToggleNativeElements;
        var groupInstance;
        var buttonToggleInstances;
        var testComponent;
        var groupNgControl;
        beforeEach(testing_1.async(function () {
            builder.createAsync(ButtonToggleGroupWithNgModel).then(function (f) {
                fixture = f;
                testComponent = fixture.debugElement.componentInstance;
                groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(button_toggle_1.MdButtonToggleGroup));
                groupNativeElement = groupDebugElement.nativeElement;
                groupInstance = groupDebugElement.injector.get(button_toggle_1.MdButtonToggleGroup);
                groupNgControl = groupDebugElement.injector.get(forms_1.NgControl);
                buttonToggleDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(button_toggle_1.MdButtonToggle));
                buttonToggleNativeElements =
                    buttonToggleDebugElements.map(function (debugEl) { return debugEl.nativeElement; });
                buttonToggleInstances = buttonToggleDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
                fixture.detectChanges();
            });
        }));
        it('should update the model before firing change event', testing_1.fakeAsync(function () {
            expect(testComponent.modelValue).toBeUndefined();
            expect(testComponent.lastEvent).toBeUndefined();
            groupInstance.value = 'red';
            fixture.detectChanges();
            testing_1.tick();
            expect(testComponent.modelValue).toBe('red');
            expect(testComponent.lastEvent.value).toBe('red');
        }));
    });
    describe('inside of a multiple selection group', function () {
        var fixture;
        var groupDebugElement;
        var groupNativeElement;
        var buttonToggleDebugElements;
        var buttonToggleNativeElements;
        var groupInstance;
        var buttonToggleInstances;
        var testComponent;
        beforeEach(testing_1.async(function () {
            builder.createAsync(ButtonTogglesInsideButtonToggleGroupMultiple).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                testComponent = fixture.debugElement.componentInstance;
                groupDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(button_toggle_1.MdButtonToggleGroupMultiple));
                groupNativeElement = groupDebugElement.nativeElement;
                groupInstance = groupDebugElement.injector.get(button_toggle_1.MdButtonToggleGroupMultiple);
                buttonToggleDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(button_toggle_1.MdButtonToggle));
                buttonToggleNativeElements =
                    buttonToggleDebugElements.map(function (debugEl) { return debugEl.nativeElement; });
                buttonToggleInstances = buttonToggleDebugElements.map(function (debugEl) { return debugEl.componentInstance; });
            });
        }));
        it('should disable click interactions when the group is disabled', function () {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();
            buttonToggleNativeElements[0].click();
            expect(buttonToggleInstances[0].checked).toBe(false);
        });
        it('should check a button toggle when clicked', function () {
            expect(buttonToggleInstances.every(function (buttonToggle) { return !buttonToggle.checked; })).toBe(true);
            var nativeCheckboxLabel = buttonToggleDebugElements[0].query(platform_browser_1.By.css('label')).nativeElement;
            nativeCheckboxLabel.click();
            expect(buttonToggleInstances[0].checked).toBe(true);
        });
        it('should allow for multiple toggles to be selected', function () {
            buttonToggleInstances[0].checked = true;
            fixture.detectChanges();
            expect(buttonToggleInstances[0].checked).toBe(true);
            buttonToggleInstances[1].checked = true;
            fixture.detectChanges();
            expect(buttonToggleInstances[1].checked).toBe(true);
            expect(buttonToggleInstances[0].checked).toBe(true);
        });
        it('should check a button toggle upon interaction with underlying native checkbox', function () {
            var nativeCheckboxInput = buttonToggleDebugElements[0].query(platform_browser_1.By.css('input')).nativeElement;
            nativeCheckboxInput.click();
            fixture.detectChanges();
            expect(buttonToggleInstances[0].checked).toBe(true);
        });
        it('should deselect a button toggle when selected twice', function () {
            buttonToggleNativeElements[0].click();
            fixture.detectChanges();
            buttonToggleNativeElements[0].click();
            fixture.detectChanges();
            expect(buttonToggleInstances[0].checked).toBe(false);
        });
    });
    describe('as standalone', function () {
        var fixture;
        var buttonToggleDebugElement;
        var buttonToggleNativeElement;
        var buttonToggleInstance;
        var testComponent;
        beforeEach(testing_1.async(function () {
            builder.createAsync(StandaloneButtonToggle).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                testComponent = fixture.debugElement.componentInstance;
                buttonToggleDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(button_toggle_1.MdButtonToggle));
                buttonToggleNativeElement = buttonToggleDebugElement.nativeElement;
                buttonToggleInstance = buttonToggleDebugElement.componentInstance;
            });
        }));
        it('should toggle when clicked', function () {
            var nativeCheckboxLabel = buttonToggleDebugElement.query(platform_browser_1.By.css('label')).nativeElement;
            nativeCheckboxLabel.click();
            fixture.detectChanges();
            expect(buttonToggleInstance.checked).toBe(true);
            nativeCheckboxLabel.click();
            fixture.detectChanges();
            expect(buttonToggleInstance.checked).toBe(false);
        });
    });
});
var ButtonTogglesInsideButtonToggleGroup = (function () {
    function ButtonTogglesInsideButtonToggleGroup() {
        this.isGroupDisabled = false;
        this.groupValue = null;
    }
    ButtonTogglesInsideButtonToggleGroup = __decorate([
        core_1.Component({
            directives: [button_toggle_1.MD_BUTTON_TOGGLE_DIRECTIVES],
            template: "\n  <md-button-toggle-group [disabled]=\"isGroupDisabled\" [value]=\"groupValue\">\n    <md-button-toggle value=\"test1\">Test1</md-button-toggle>\n    <md-button-toggle value=\"test2\">Test2</md-button-toggle>\n    <md-button-toggle value=\"test3\">Test3</md-button-toggle>\n  </md-button-toggle-group>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ButtonTogglesInsideButtonToggleGroup);
    return ButtonTogglesInsideButtonToggleGroup;
}());
var ButtonToggleGroupWithNgModel = (function () {
    function ButtonToggleGroupWithNgModel() {
        this.options = [
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
        ];
    }
    ButtonToggleGroupWithNgModel = __decorate([
        core_1.Component({
            directives: [button_toggle_1.MD_BUTTON_TOGGLE_DIRECTIVES],
            template: "\n  <md-button-toggle-group [(ngModel)]=\"modelValue\" (change)=\"lastEvent = $event\">\n    <md-button-toggle *ngFor=\"let option of options\" [value]=\"option.value\">\n      {{option.label}}\n    </md-button-toggle>\n  </md-button-toggle-group>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ButtonToggleGroupWithNgModel);
    return ButtonToggleGroupWithNgModel;
}());
var ButtonTogglesInsideButtonToggleGroupMultiple = (function () {
    function ButtonTogglesInsideButtonToggleGroupMultiple() {
        this.isGroupDisabled = false;
    }
    ButtonTogglesInsideButtonToggleGroupMultiple = __decorate([
        core_1.Component({
            directives: [button_toggle_1.MD_BUTTON_TOGGLE_DIRECTIVES],
            template: "\n  <md-button-toggle-group [disabled]=\"isGroupDisabled\" multiple>\n    <md-button-toggle value=\"eggs\">Eggs</md-button-toggle>\n    <md-button-toggle value=\"flour\">Flour</md-button-toggle>\n    <md-button-toggle value=\"sugar\">Sugar</md-button-toggle>\n  </md-button-toggle-group>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ButtonTogglesInsideButtonToggleGroupMultiple);
    return ButtonTogglesInsideButtonToggleGroupMultiple;
}());
var StandaloneButtonToggle = (function () {
    function StandaloneButtonToggle() {
    }
    StandaloneButtonToggle = __decorate([
        core_1.Component({
            directives: [button_toggle_1.MD_BUTTON_TOGGLE_DIRECTIVES],
            template: "\n  <md-button-toggle>Yes</md-button-toggle>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StandaloneButtonToggle);
    return StandaloneButtonToggle;
}());
//# sourceMappingURL=button-toggle.spec.js.map