import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DialogProvider {

  public dialogs: Dialog[] = [];
  public current: Dialog;

  public currentChanged: EventEmitter<Dialog> = new EventEmitter<Dialog>();

  message(title: string, message: string, actions?: string[]): Promise<string> {
    let dialog = new Dialog();

    dialog.header = title;
    dialog.content = message;
    dialog.actions = actions || ['Ok'];

    return this.show(dialog);
  }

  show(dialog: Dialog): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {
      dialog.resolve = (value: string | PromiseLike<string>) => {
        this.current = this.dialogs.length ? this.dialogs.pop() : null;
        resolve(value);
      };
      dialog.reject = (reason?: any) => {
        this.current = this.dialogs.length ? this.dialogs.pop() : null;
        reject(reason);
      };

      if (this.current) {
        this.dialogs.push(this.current);
      }
      this.current = dialog;
      this.currentChanged.emit(dialog);
    });

    // Handle reject without catch
    promise.catch(() => {});

    return promise;
  }

  resolve(value: string | PromiseLike<string>) {
    if (this.current) {
      this.current.resolve(value);
    }
  }

  reject(reason?: any) {
    if (this.current) {
      this.current.reject(reason);
    }
  }

}

export class Dialog {
  public header: any;
  public content: any;
  public actions: string[];

  public isFullScreen: boolean = false;
  public canCancel: boolean = false;

  public resolve: (value: string | PromiseLike<string>) => void;
  public reject: (reason?: any) => void;
}