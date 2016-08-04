"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var portal_1 = require('@angular2-material/core/portal/portal');
var portal_directives_1 = require('@angular2-material/core/portal/portal-directives');
var promise_completer_1 = require('@angular2-material/core/async/promise-completer');
var dialog_errors_1 = require('./dialog-errors');
/**
 * Internal component that wraps user-provided dialog content.
 */
var MdDialogContainer = (function (_super) {
    __extends(MdDialogContainer, _super);
    function MdDialogContainer() {
        _super.apply(this, arguments);
    }
    /** TODO: internal */
    MdDialogContainer.prototype.ngAfterViewInit = function () {
        var _this = this;
        // If there was an attempted call to `attachComponentPortal` before this lifecycle stage,
        // we actually perform the attachment now that the `@ViewChild` is resolved.
        if (this._deferredAttachCompleter) {
            this.attachComponentPortal(this._deferredAttachPortal).then(function (componentRef) {
                _this._deferredAttachCompleter.resolve(componentRef);
                _this._deferredAttachPortal = null;
                _this._deferredAttachCompleter = null;
            }, function () {
                _this._deferredAttachCompleter.reject();
                _this._deferredAttachCompleter = null;
                _this._deferredAttachPortal = null;
            });
        }
    };
    /** Attach a portal as content to this dialog container. */
    MdDialogContainer.prototype.attachComponentPortal = function (portal) {
        if (this._portalHost) {
            if (this._portalHost.hasAttached()) {
                throw new dialog_errors_1.MdDialogContentAlreadyAttachedError();
            }
            return this._portalHost.attachComponentPortal(portal);
        }
        else {
            // The @ViewChild query for the portalHost is not resolved until AfterViewInit, but this
            // function may be called before this lifecycle event. As such, we defer the attachment of
            // the portal until AfterViewInit.
            if (this._deferredAttachCompleter) {
                throw new dialog_errors_1.MdDialogContentAlreadyAttachedError();
            }
            this._deferredAttachPortal = portal;
            this._deferredAttachCompleter = new promise_completer_1.PromiseCompleter();
            return this._deferredAttachCompleter.promise;
        }
    };
    MdDialogContainer.prototype.attachTemplatePortal = function (portal) {
        throw Error('Not yet implemented');
    };
    __decorate([
        core_1.ViewChild(portal_directives_1.PortalHostDirective), 
        __metadata('design:type', portal_directives_1.PortalHostDirective)
    ], MdDialogContainer.prototype, "_portalHost", void 0);
    MdDialogContainer = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'md-dialog-container',
            template: "<template portalHost></template> ",
            styles: ["/** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ :host { display: block; overflow: hidden; padding: 24px; background: #424242; box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); } "],
            directives: [portal_directives_1.PortalHostDirective],
            host: {
                'class': 'md-dialog-container',
                '[attr.role]': 'dialogConfig?.role'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdDialogContainer);
    return MdDialogContainer;
}(portal_1.BasePortalHost));
exports.MdDialogContainer = MdDialogContainer;
//# sourceMappingURL=dialog-container.js.map