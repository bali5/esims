import { ComponentRef, AfterViewInit } from '@angular/core';
import { BasePortalHost, ComponentPortal, TemplatePortal } from '@angular2-material/core/portal/portal';
import { MdDialogConfig } from './dialog-config';
/**
 * Internal component that wraps user-provided dialog content.
 */
export declare class MdDialogContainer extends BasePortalHost implements AfterViewInit {
    /** The portal host inside of this container into which the dialog content will be loaded. */
    private _portalHost;
    /**
     * Completer used to resolve the promise for cases when a portal is attempted to be attached,
     * but AfterViewInit has not yet occured.
     */
    private _deferredAttachCompleter;
    /** Portal to be attached upon AfterViewInit. */
    private _deferredAttachPortal;
    /** The dialog configuration. */
    dialogConfig: MdDialogConfig;
    /** TODO: internal */
    ngAfterViewInit(): void;
    /** Attach a portal as content to this dialog container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): Promise<ComponentRef<T>>;
    attachTemplatePortal(portal: TemplatePortal): Promise<Map<string, any>>;
}
