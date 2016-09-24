import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, Compiler } from '@angular/core';

import { DialogProvider, Dialog } from './dialog.provider';

@Component({
  selector: 'es-dialog-text',
  template: '{{content}}'
})
export class DialogTextElement {
  public content: string;
}

@Component({
  selector: 'es-dialog',
  templateUrl: 'views/common/dialog.html'
})
export class DialogElement implements AfterViewInit {
  @ViewChild('header', { read: ViewContainerRef }) header: ViewContainerRef;
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

  constructor(private provider: DialogProvider, private componentFactoryResolver: ComponentFactoryResolver, compiler: Compiler) {
    provider.currentChanged.subscribe((d) => this.dialogChanged(d));
  }

  ngAfterViewInit() {
    this.updateDialog();
  }

  dialogChanged(dialog: Dialog) {
    this.updateDialog();
  }

  updateDialog() {
    if (!this.content) return;

    this.content.clear();

    if (this.provider.current) {
      this.updateContainer(this.header, this.provider.current.header);
      this.updateContainer(this.content, this.provider.current.content);
    }
  }

  updateContainer(container: ViewContainerRef, content: any) {
    if (!container) return;

    container.clear();

    if (content) {
      let isText = (typeof content == 'string');

      let componentFactory = isText
        ? this.componentFactoryResolver.resolveComponentFactory(DialogTextElement)
        : this.componentFactoryResolver.resolveComponentFactory(content)
        ;

      let component = container.createComponent(componentFactory);

      if (isText) {
        (<any>component.instance).content = content;
      }
    }
  }

  cancel() {
    this.provider.reject();
  }

}
