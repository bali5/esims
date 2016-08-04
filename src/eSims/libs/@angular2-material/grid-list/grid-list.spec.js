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
var grid_list_1 = require('./grid-list');
var grid_tile_1 = require('./grid-tile');
describe('MdGridList', function () {
    var builder;
    beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    it('should throw error if cols is not defined', testing_1.async(function () {
        var template = "<md-grid-list></md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            expect(function () {
                fixture.detectChanges();
            }).toThrowError(/must pass in number of columns/);
        });
    }));
    it('should throw error if rowHeight ratio is invalid', testing_1.async(function () {
        var template = "<md-grid-list cols=\"4\" rowHeight=\"4:3:2\"></md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            expect(function () {
                fixture.detectChanges();
            }).toThrowError(/invalid ratio given for row-height/);
        });
    }));
    it('should throw error if tile colspan is wider than total cols', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"4\">\n        <md-grid-tile colspan=\"5\"></md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            expect(function () {
                fixture.detectChanges();
            }).toThrowError(/tile with colspan 5 is wider than grid/);
        });
    }));
    it('should default to 1:1 row height if undefined ', testing_1.async(function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"1\">\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            // in ratio mode, heights are set using the padding-top property
            expect(getProp(tile, 'padding-top')).toBe('200px');
        });
    }));
    it('should use a ratio row height if passed in', testing_1.async(function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"1\" [rowHeight]=\"height\">\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.height = '4:1';
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            expect(getProp(tile, 'padding-top')).toBe('100px');
            fixture.componentInstance.height = '2:1';
            fixture.detectChanges();
            expect(getProp(tile, 'padding-top')).toBe('200px');
        });
    }));
    it('should divide row height evenly in "fit" mode', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"1\" rowHeight=\"fit\" [style.height]=\"height\">\n        <md-grid-tile></md-grid-tile>\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.height = '300px';
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            // 149.5 * 2 = 299px + 1px gutter = 300px
            expect(getProp(tile, 'height')).toBe('149.5px');
            fixture.componentInstance.height = '200px';
            fixture.detectChanges();
            // 99.5 * 2 = 199px + 1px gutter = 200px
            expect(getProp(tile, 'height')).toBe('99.5px');
        });
    }));
    it('should use the fixed row height if passed in', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"4\" [rowHeight]=\"height\">\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.height = '100px';
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            expect(getProp(tile, 'height')).toBe('100px');
            fixture.componentInstance.height = '200px';
            fixture.detectChanges();
            expect(getProp(tile, 'height')).toBe('200px');
        });
    }));
    it('should default to pixels if row height units are missing', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"4\" rowHeight=\"100\">\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
                expect(getProp(tile, 'height')).toBe('100px');
            });
        });
    }));
    it('should default gutter size to 1px', testing_1.async(function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"2\" rowHeight=\"100px\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                // check horizontal gutter
                expect(getProp(tiles[0], 'width')).toBe('99.5px');
                expect(getComputedLeft(tiles[1])).toBe(100.5);
                // check vertical gutter
                expect(getProp(tiles[0], 'height')).toBe('100px');
                expect(getProp(tiles[2], 'top')).toBe('101px');
            });
        });
    }));
    it('should set the gutter size if passed', testing_1.async(function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"2\" gutterSize=\"2px\" rowHeight=\"100px\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                // check horizontal gutter
                expect(getProp(tiles[0], 'width')).toBe('99px');
                expect(getComputedLeft(tiles[1])).toBe(101);
                // check vertical gutter
                expect(getProp(tiles[0], 'height')).toBe('100px');
                expect(getProp(tiles[2], 'top')).toBe('102px');
            });
        });
    }));
    it('should use pixels if gutter units are missing', testing_1.async(function () {
        var template = "\n      <div style=\"width:200px\">\n        <md-grid-list cols=\"2\" gutterSize=\"2\" rowHeight=\"100px\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                // check horizontal gutter
                expect(getProp(tiles[0], 'width')).toBe('99px');
                expect(getComputedLeft(tiles[1])).toBe(101);
                // check vertical gutter
                expect(getProp(tiles[0], 'height')).toBe('100px');
                expect(getProp(tiles[2], 'top')).toBe('102px');
            });
        });
    }));
    it('should set the correct list height in ratio mode', testing_1.async(function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"1\" rowHeight=\"4:1\">\n          <md-grid-tile></md-grid-tile>\n          <md-grid-tile></md-grid-tile>\n        </md-grid-list>\n      </div>\n    ";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var list = fixture.debugElement.query(platform_browser_1.By.directive(grid_list_1.MdGridList));
            expect(getProp(list, 'padding-bottom')).toBe('201px');
        });
    }));
    it('should set the correct list height in fixed mode', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"1\" rowHeight=\"100px\">\n        <md-grid-tile></md-grid-tile>\n        <md-grid-tile></md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var list = fixture.debugElement.query(platform_browser_1.By.directive(grid_list_1.MdGridList));
            expect(getProp(list, 'height')).toBe('201px');
        });
    }));
    it('should allow adjustment of tile colspan', testing_1.async(function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"4\">\n          <md-grid-tile [colspan]=\"colspan\"></md-grid-tile>\n        </md-grid-list>\n      </div>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.colspan = 2;
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            expect(getProp(tile, 'width')).toBe('199.5px');
            fixture.componentInstance.colspan = 3;
            fixture.detectChanges();
            expect(getProp(tile, 'width')).toBe('299.75px');
        });
    }));
    it('should allow adjustment of tile rowspan', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"1\" rowHeight=\"100px\">\n        <md-grid-tile [rowspan]=\"rowspan\"></md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.rowspan = 2;
            fixture.detectChanges();
            var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTile));
            expect(getProp(tile, 'height')).toBe('201px');
            fixture.componentInstance.rowspan = 3;
            fixture.detectChanges();
            expect(getProp(tile, 'height')).toBe('302px');
        });
    }));
    it('should lay out tiles correctly for a complex layout', testing_1.async(function () {
        var template = "\n      <div style=\"width:400px\">\n        <md-grid-list cols=\"4\" rowHeight=\"100px\">\n          <md-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\"\n                        [style.background]=\"tile.color\">\n            {{tile.text}}\n          </md-grid-tile>\n        </md-grid-list>\n      </div>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.componentInstance.tiles = [
                { cols: 3, rows: 1 },
                { cols: 1, rows: 2 },
                { cols: 1, rows: 1 },
                { cols: 2, rows: 1 }
            ];
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('md-grid-tile'));
                expect(getProp(tiles[0], 'width')).toBe('299.75px');
                expect(getProp(tiles[0], 'height')).toBe('100px');
                expect(getComputedLeft(tiles[0])).toBe(0);
                expect(getProp(tiles[0], 'top')).toBe('0px');
                expect(getProp(tiles[1], 'width')).toBe('99.25px');
                expect(getProp(tiles[1], 'height')).toBe('201px');
                expect(getComputedLeft(tiles[1])).toBe(300.75);
                expect(getProp(tiles[1], 'top')).toBe('0px');
                expect(getProp(tiles[2], 'width')).toBe('99.25px');
                expect(getProp(tiles[2], 'height')).toBe('100px');
                expect(getComputedLeft(tiles[2])).toBe(0);
                expect(getProp(tiles[2], 'top')).toBe('101px');
                expect(getProp(tiles[3], 'width')).toBe('199.5px');
                expect(getProp(tiles[3], 'height')).toBe('100px');
                expect(getComputedLeft(tiles[3])).toBe(100.25);
                expect(getProp(tiles[3], 'top')).toBe('101px');
            });
        });
    }));
    it('should add not add any classes to footers without lines', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"1\">\n        <md-grid-tile>\n          <md-grid-tile-footer>\n            I'm a footer!\n          </md-grid-tile-footer>\n        </md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTileText));
            expect(footer.nativeElement.classList.contains('md-2-line')).toBe(false);
        });
    }));
    it('should add class to footers with two lines', testing_1.async(function () {
        var template = "\n      <md-grid-list cols=\"1\">\n        <md-grid-tile>\n          <md-grid-tile-footer>\n            <h3 md-line>First line</h3>\n            <span md-line>Second line</span>\n          </md-grid-tile-footer>\n        </md-grid-tile>\n      </md-grid-list>";
        builder.overrideTemplate(TestGridList, template).createAsync(TestGridList).then(function (fixture) {
            fixture.detectChanges();
            var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MdGridTileText));
            expect(footer.nativeElement.classList.contains('md-2-line')).toBe(true);
        });
    }));
});
var TestGridList = (function () {
    function TestGridList() {
    }
    TestGridList = __decorate([
        core_1.Component({
            selector: 'test-grid-list',
            template: "",
            directives: [grid_list_1.MD_GRID_LIST_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TestGridList);
    return TestGridList;
}());
function getProp(el, prop) {
    return getComputedStyle(el.nativeElement).getPropertyValue(prop);
}
/** Gets the `left` position of an element. */
function getComputedLeft(element) {
    // While the other properties in this test use `getComputedStyle`, we use `getBoundingClientRect`
    // for left because iOS Safari doesn't support using `getComputedStyle` to get the calculated
    // `left` balue when using CSS `calc`. We subtract the `left` of the document body because
    // browsers, by default, add a margin to the body (typically 8px).
    var elementRect = element.nativeElement.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();
    return elementRect.left - bodyRect.left;
}
//# sourceMappingURL=grid-list.spec.js.map