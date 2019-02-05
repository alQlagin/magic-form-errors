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
  ViewContainerRef
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { ERROR_COMPONENT, FORM_DEFAULT_ERRORS } from '../tokens';
import { FormSubmit } from './form-submit.directive';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  submit$: Observable<any>;
  ref: ComponentRef<any> | EmbeddedViewRef<any>;
  container: ViewContainerRef;
  private destroy$ = new Subject();
  @Input() errorTemplate: TemplateRef<any>;

  constructor(private resolver: ComponentFactoryResolver,
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
      this.ref.destroy();
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
      this.ref = this.container.createComponent(factory);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getError(key, error) {
    return this.errors[key] ? this.errors[key](error) : key;
  }
}
