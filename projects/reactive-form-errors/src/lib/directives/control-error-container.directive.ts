import {Directive, ViewContainerRef, TemplateRef, EmbeddedViewRef, OnDestroy, Optional} from '@angular/core';

@Directive({
  selector: '[controlContainer]'
})
export class ControlErrorContainerDirective implements OnDestroy {
  view: EmbeddedViewRef<any>;
  constructor(public vcr: ViewContainerRef, @Optional() templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.view = vcr.createEmbeddedView(templateRef, {});
    }
  }
  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}
