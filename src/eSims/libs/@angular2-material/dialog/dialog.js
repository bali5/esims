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
var core_1 = require('@angular/core');
var overlay_1 = require('@angular2-material/core/overlay/overlay');
var overlay_state_1 = require('@angular2-material/core/overlay/overlay-state');
var portal_1 = require('@angular2-material/core/portal/portal');
var dialog_ref_1 = require('./dialog-ref');
var dialog_injector_1 = require('./dialog-injector');
var dialog_container_1 = require('./dialog-container');
var dialog_config_1 = require('./dialog-config');
exports.MdDialogConfig = dialog_config_1.MdDialogConfig;
var dialog_ref_2 = require('./dialog-ref');
exports.MdDialogRef = dialog_ref_2.MdDialogRef;
// TODO(jelbourn): add shortcuts for `alert` and `confirm`.
// TODO(jelbourn): add support for opening with a TemplateRef
// TODO(jelbourn): add `closeAll` method
// TODO(jelbourn): add backdrop
// TODO(jelbourn): default dialog config
// TODO(jelbourn): focus trapping
// TODO(jelbourn): potentially change API from accepting component constructor to component factory.
/**
 * Service to open Material Design modal dialogs.
 */
var MdDialog = (function () {
    function MdDialog(_overlay, _injector) {
        this._overlay = _overlay;
        this._injector = _injector;
    }
    /**
     * Opens a modal dialog containing the given component.
     * @param component Type of the component to load into the load.
     * @param config
     */
    MdDialog.prototype.open = function (component, config) {
        var _this = this;
        var overlayRef;
        return this._createOverlay(config)
            .then(function (overlay) { return overlayRef = overlay; })
            .then(function (overlay) { return _this._attachDialogContainer(overlay, config); })
            .then(function (containerRef) { return _this._attachDialogContent(component, containerRef, overlayRef); });
    };
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param dialogConfig The dialog configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    MdDialog.prototype._createOverlay = function (dialogConfig) {
        var overlayState = this._getOverlayState(dialogConfig);
        return this._overlay.create(overlayState);
    };
    /**
     * Attaches an MdDialogContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    MdDialog.prototype._attachDialogContainer = function (overlay, config) {
        var containerPortal = new portal_1.ComponentPortal(dialog_container_1.MdDialogContainer, config.viewContainerRef);
        return overlay.attach(containerPortal).then(function (containerRef) {
            // Pass the config directly to the container so that it can consume any relevant settings.
            containerRef.instance.dialogConfig = config;
            return containerRef;
        });
    };
    /**
     * Attaches the user-provided component to the already-created MdDialogContainer.
     * @param component The type of component being loaded into the dialog.
     * @param containerRef Reference to the wrapping MdDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @returns A promise resolving to the MdDialogRef that should be returned to the user.
     */
    MdDialog.prototype._attachDialogContent = function (component, containerRef, overlayRef) {
        var dialogContainer = containerRef.instance;
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        var dialogRef = new dialog_ref_1.MdDialogRef(overlayRef);
        // We create an injector specifically for the component we're instantiating so that it can
        // inject the MdDialogRef. This allows a component loaded inside of a dialog to close itself
        // and, optionally, to return a value.
        var dialogInjector = new dialog_injector_1.DialogInjector(dialogRef, this._injector);
        var contentPortal = new portal_1.ComponentPortal(component, null, dialogInjector);
        return dialogContainer.attachComponentPortal(contentPortal).then(function (contentRef) {
            dialogRef.componentInstance = contentRef.instance;
            return dialogRef;
        });
    };
    /**
     * Creates an overlay state from a dialog config.
     * @param dialogConfig The dialog configuration.
     * @returns The overlay configuration.
     */
    MdDialog.prototype._getOverlayState = function (dialogConfig) {
        var state = new overlay_state_1.OverlayState();
        state.positionStrategy = this._overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        return state;
    };
    MdDialog = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [overlay_1.Overlay, core_1.Injector])
    ], MdDialog);
    return MdDialog;
}());
exports.MdDialog = MdDialog;
//# sourceMappingURL=dialog.js.map