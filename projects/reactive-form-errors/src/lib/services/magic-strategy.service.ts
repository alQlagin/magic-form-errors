import { ApplicationRef, ComponentFactory, ComponentRef, EmbeddedViewRef, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material';

export abstract class MagicErrorStrategy {
  abstract createComponent<T = any>(viewContainerRef: ViewContainerRef, factory: ComponentFactory<T>): ComponentRef<T>;

  abstract destroyComponent<T = any>(componentRef: ComponentRef<T>): void;

  abstract createTemplate<T = any>(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<T>): EmbeddedViewRef<T>;

  abstract destroyTemplate<T = any>(viewRef: EmbeddedViewRef<T>): void;
}

export class DefaultMagicStrategy implements MagicErrorStrategy {
  createComponent<T = any>(viewContainerRef: ViewContainerRef, factory: ComponentFactory<T>): ComponentRef<T> {
    return viewContainerRef.createComponent(factory);
  }

  destroyComponent<T = any>(componentRef: ComponentRef<T>): void {
    componentRef.destroy();
  }

  createTemplate<T = any>(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<T>): EmbeddedViewRef<T> {
    return viewContainerRef.createEmbeddedView(templateRef, {} as T);
  }

  destroyTemplate<T = any>(viewRef: EmbeddedViewRef<T>): void {
    viewRef.destroy();
  }

}

export class MaterialMagicStrategy extends DefaultMagicStrategy {

  get isMaterial(): boolean {
    return !!this.matFormField && !!this.matInput;
  }

  constructor(
    @Optional() private matFormField: MatFormField,
    @Optional() private matInput: MatInput,
    private applicationRef: ApplicationRef
  ) {
    super();
  }

  createComponent<T = any>(viewContainerRef: ViewContainerRef, factory: ComponentFactory<T>): ComponentRef<T> {
    if (!this.isMaterial) {
      return super.createComponent(viewContainerRef, factory);
    }
    const element = this.matFormField._elementRef.nativeElement;
    const componentContainer = element.querySelector('.mat-form-field-subscript-wrapper>div');
    console.log({componentContainer, element});
    const componentRef = factory.create(viewContainerRef.injector, [], componentContainer);
    this.applicationRef.attachView(componentRef.hostView);
    return componentRef;
  }

  createTemplate<T = any>(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<T>): EmbeddedViewRef<T> {
    if (!this.isMaterial) {
      return super.createTemplate(viewContainerRef, templateRef);
    }
    throw new Error('material does not support templated errors');
  }

  destroyComponent<T = any>(componentRef: ComponentRef<T>): void {
    if (!this.isMaterial) {
      return super.destroyComponent(componentRef);
    }
    // this.applicationRef.detachView(componentRef.hostView);
    // componentRef.destroy();
  }

  destroyTemplate<T = any>(viewRef: EmbeddedViewRef<T>): void {
    if (!this.isMaterial) {
      return super.destroyTemplate(viewRef);
    }
    throw new Error('material does not support templated errors');
  }

}
