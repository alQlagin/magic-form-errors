import { EMPTY, merge, Observable, Subject } from 'rxjs';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  Type,
  ViewContainerRef,
  Injector,
  ApplicationRef,
  ElementRef,
  ComponentFactory
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { MatFormField } from '@angular/material';
import { ERROR_COMPONENT, FORM_DEFAULT_ERRORS } from '../tokens';
import { FormSubmit } from './form-submit.directive';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { takeUntil } from 'rxjs/operators';

interface MagicErrorStrategy {
  createComponent<T = any>(factory: ComponentFactory<T>): ComponentRef<T>;
  destroyComponent<T = any>(componentRef: ComponentRef<T>): void;

  createTemplate<T = any>(templateRef: TemplateRef<T>): EmbeddedViewRef<T>;
  destroyTemplate<T = any>(viewRef: EmbeddedViewRef<T>): void;
}

class DefaultMagicStrategy {

}

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  submit$: Observable<any>;
  ref: ComponentRef<any> | EmbeddedViewRef<any>;
  container: ViewContainerRef;
  private destroy$ = new Subject();
  @Input() errorTemplate: TemplateRef<any>;

  constructor(private applicationRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
    @Self() private control: NgControl,
    @Optional() @Host() private form: FormSubmit,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(ERROR_COMPONENT) private errorComponent: Type<any>,
    @Inject(FORM_DEFAULT_ERRORS) private errors) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  ngOnInit() {
    merge(
      this.submit$,
      this.control.valueChanges
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const controlErrors: ValidationErrors = this.control.errors;
      if (controlErrors) {
        const firstError = Object.keys(controlErrors)[0];
        const text = this.getError(firstError, controlErrors[firstError]);
        this.setError(text);
      } else {
        this.destroyRef();
      }
    });
  }

  private destroyRef() {
    if (this.ref) {
      if (this.ref instanceof ComponentRef) {
        this.destroyComponent(this.ref);
      } else {
        this.ref.destroy();
      }
      this.ref = null;
    }
  }

  private setError(text: string) {
    this.createRef();
    if (this.ref instanceof ComponentRef) {
      this.ref.instance.text = text;
    } else {
      this.ref.context.$implicit = text;
    }
  }

  private createRef() {
    if (this.ref) {
      return;
    }
    if (this.errorTemplate) {
      this.ref = this.container.createEmbeddedView(this.errorTemplate, {});
    } else {
      const factory = this.resolver.resolveComponentFactory(this.errorComponent);
      this.ref = this.createComponent(this.container, factory);
    }
  }

  createComponent(viewContainerRef: ViewContainerRef, factory: ComponentFactory<any>): ComponentRef<any> {
    return viewContainerRef.createComponent(factory);
  }

  destroyComponent(componentRef: ComponentRef<any>): void {
    componentRef.destroy();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getError(key, error) {
    return this.errors[key] ? this.errors[key](error) : key;
  }
}

@Directive({
  selector: '[formControl], [formControlName]'
})
export class MatControlErrorsDirective {

  get isMatFormField(): boolean {
    return !!this.matFormField;
  }

  constructor(
    @Optional() private matFormField: MatFormField,
    applicationRef: ApplicationRef,
    controlErrorsDirective: ControlErrorsDirective
  ) {
    if (this.isMatFormField) {
      controlErrorsDirective.createComponent = (container: ViewContainerRef, factory: ComponentFactory<any>): ComponentRef<any> => {
        const element = this.matFormField._elementRef.nativeElement;
        const componentContainer = element.querySelector('.mat-form-field-subscript-wrapper>div');
        const componentRef = factory.create(container.injector, [], componentContainer);
        applicationRef.attachView(componentRef.hostView);
        return componentRef;
      };

      controlErrorsDirective.destroyComponent = (componentRef: ComponentRef<any>): void => {
        applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
      };
    }
  }
}


// @Directive({
//   selector: '[formControl], [formControlName]'
// })
// export class MatControlErrorsDirective implements OnInit, OnDestroy {
//   submit$: Observable<any>;
//   ref: ComponentRef<any> | EmbeddedViewRef<any>;
//   container: ViewContainerRef;
//   private destroy$ = new Subject();
//   @Input() errorTemplate: TemplateRef<any>;

//   get isMatFormField(): boolean {
//     return !!this.matFormField;
//   }

//   constructor(private applicationRef: ApplicationRef,
//     private injector: Injector,
//     private resolver: ComponentFactoryResolver,
//     private vcr: ViewContainerRef,
//     @Optional() private matFormField: MatFormField,
//     @Self() private control: NgControl,
//     @Optional() @Host() private form: FormSubmit,
//     @Optional() controlErrorContainer: ControlErrorContainerDirective,
//     @Inject(ERROR_COMPONENT) private errorComponent: Type<any>,
//     @Inject(FORM_DEFAULT_ERRORS) private errors) {
//     this.submit$ = this.form ? this.form.submit$ : EMPTY;
//     this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
//   }

//   ngOnInit() {
//     if (this.isMatFormField) {
//       merge(
//         this.submit$,
//         this.control.valueChanges
//       ).pipe(
//         takeUntil(this.destroy$)
//       ).subscribe(() => {
//         const controlErrors: ValidationErrors = this.control.errors;
//         if (controlErrors) {
//           const firstError = Object.keys(controlErrors)[0];
//           const text = this.getError(firstError, controlErrors[firstError]);
//           this.setError(text);
//         } else {
//           this.destroyRef();
//         }
//       });
//     }
//   }

//   private destroyRef() {
//     if (this.ref) {
//       if (this.ref instanceof ComponentRef) {
//         this.applicationRef.detachView(this.ref.hostView);
//       }
//       this.ref.destroy();
//       this.ref = null;
//     }
//   }

//   private setError(text: string) {
//     this.createRef();
//     if (this.ref instanceof ComponentRef) {
//       this.ref.instance.text = text;
//     } else {
//       this.ref.context.$implicit = text;
//     }
//   }

//   private createRef() {
//     if (this.ref) {
//       return;
//     }

//     const factory = this.resolver.resolveComponentFactory(this.errorComponent);
//     const element = this.matFormField._elementRef.nativeElement;
//     const componentContainer = element.querySelector('.mat-form-field-subscript-wrapper>div');
//     this.ref = factory.create(this.container.injector, [], componentContainer);
//     this.applicationRef.attachView(this.ref.hostView);
//   }

//   ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   private getError(key, error) {
//     return this.errors[key] ? this.errors[key](error) : key;
//   }
// }
