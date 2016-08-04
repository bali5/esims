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
var list_1 = require('./list');
describe('MdList', function () {
    var builder;
    beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    it('should add and remove focus class on focus/blur', testing_1.async(function () {
        var template = "\n        <md-list>\n          <a md-list-item>\n            Paprika\n          </a>\n        </md-list>";
        builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            var listItem = fixture.debugElement.query(platform_browser_1.By.directive(list_1.MdListItem));
            var listItemDiv = fixture.debugElement.query(platform_browser_1.By.css('.md-list-item'));
            fixture.detectChanges();
            expect(listItemDiv.nativeElement.classList).not.toContain('md-list-item-focus');
            listItem.componentInstance._handleFocus();
            fixture.detectChanges();
            expect(listItemDiv.nativeElement.classList).toContain('md-list-item-focus');
            listItem.componentInstance._handleBlur();
            fixture.detectChanges();
            expect(listItemDiv.nativeElement.classList).not.toContain('md-list-item-focus');
        });
    }));
    it('should not apply any class to a list without lines', testing_1.async(function () {
        var template = "\n        <md-list>\n          <md-list-item>\n            Paprika\n          </md-list-item>\n        </md-list>";
        builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            var listItem = fixture.debugElement.query(platform_browser_1.By.css('md-list-item'));
            fixture.detectChanges();
            expect(listItem.nativeElement.className).toBe('');
        });
    }));
    it('should apply md-2-line class to lists with two lines', testing_1.async(function () {
        var template = "\n        <md-list>\n          <md-list-item *ngFor=\"let item of items\">\n            <img src=\"\">\n            <h3 md-line>{{item.name}}</h3>\n            <p md-line>{{item.description}}</p>\n          </md-list-item>\n        </md-list>";
        return builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            fixture.detectChanges();
            var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('md-list-item'));
            expect(listItems[0].nativeElement.className).toBe('md-2-line');
            expect(listItems[1].nativeElement.className).toBe('md-2-line');
        });
    }));
    it('should apply md-3-line class to lists with three lines', testing_1.async(function () {
        var template = "\n        <md-list>\n          <md-list-item *ngFor=\"let item of items\">\n            <h3 md-line>{{item.name}}</h3>\n            <p md-line>{{item.description}}</p>\n            <p md-line>Some other text</p>\n          </md-list-item>\n        </md-list>";
        return builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            fixture.detectChanges();
            var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('md-list-item'));
            expect(listItems[0].nativeElement.className).toBe('md-3-line');
            expect(listItems[1].nativeElement.className).toBe('md-3-line');
        });
    }));
    it('should apply md-list-avatar class to list items with avatars', testing_1.async(function () {
        var template = "\n        <md-list>\n          <md-list-item>\n            <img src=\"\" md-list-avatar>\n            Paprika\n          </md-list-item>\n         <md-list-item>\n            Pepper\n          </md-list-item>\n        </md-list>";
        return builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            fixture.detectChanges();
            var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('md-list-item'));
            expect(listItems[0].nativeElement.className).toBe('md-list-avatar');
            expect(listItems[1].nativeElement.className).toBe('');
        });
    }));
    it('should not clear custom classes provided by user', testing_1.async(function () {
        var template = "\n        <md-list>\n          <md-list-item class=\"test-class\" *ngFor=\"let item of items\">\n            <h3 md-line>{{item.name}}</h3>\n            <p md-line>{{item.description}}</p>\n          </md-list-item>\n        </md-list>";
        return builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            fixture.detectChanges();
            var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('md-list-item'));
            expect(listItems[0].nativeElement.classList.contains('test-class')).toBe(true);
        });
    }));
    it('should update classes if number of lines change', testing_1.async(function () {
        var template = "\n        <md-list>\n          <md-list-item *ngFor=\"let item of items\">\n            <h3 md-line>{{item.name}}</h3>\n            <p md-line>{{item.description}}</p>\n            <p md-line *ngIf=\"showThirdLine\">Some other text</p>\n          </md-list-item>\n        </md-list>";
        return builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            fixture.debugElement.componentInstance.showThirdLine = false;
            fixture.detectChanges();
            var listItem = fixture.debugElement.children[0].query(platform_browser_1.By.css('md-list-item'));
            expect(listItem.nativeElement.className).toBe('md-2-line');
            fixture.debugElement.componentInstance.showThirdLine = true;
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                expect(listItem.nativeElement.className).toBe('md-3-line');
            });
        });
    }));
    it('should add aria roles properly', testing_1.async(function () {
        var template = "\n        <md-list>\n          <md-list-item *ngFor=\"let item of items\">\n            {{item.name}}\n          </md-list-item>\n        </md-list>";
        return builder.overrideTemplate(TestList, template).createAsync(TestList).then(function (fixture) {
            fixture.detectChanges();
            var list = fixture.debugElement.children[0];
            var listItem = fixture.debugElement.children[0].query(platform_browser_1.By.css('md-list-item'));
            expect(list.nativeElement.getAttribute('role')).toBe('list');
            expect(listItem.nativeElement.getAttribute('role')).toBe('listitem');
        });
    }));
});
var TestList = (function () {
    function TestList() {
        this.items = [
            { 'name': 'Paprika', 'description': 'A seasoning' },
            { 'name': 'Pepper', 'description': 'Another seasoning' }
        ];
        this.showThirdLine = false;
    }
    TestList = __decorate([
        core_1.Component({
            selector: 'test-list',
            template: "",
            directives: [list_1.MD_LIST_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TestList);
    return TestList;
}());
//# sourceMappingURL=list.spec.js.map