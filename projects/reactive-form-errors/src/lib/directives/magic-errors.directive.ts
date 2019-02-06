import { EMPTY, merge, Observable, Subject } from 'rxjs';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Host,
  Inject,
  Injector,
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
import { MAGIC_ERROR_COMPONENT, FORM_MAGIC_ERRORS } from '../tokens';
import { FormSubmit } from './form-submit.directive';
import { MagicContainerDirective } from './magic-container.directive';
import { takeUntil } from 'rxjs/operators';
import { MagicErrorStrategy, MaterialMagicStrategy } from '../services/magic-strategy.service';


@Directive({
  selector: '[formControl], [formControlName]'
})
export class MagicErrorsDirective implements OnInit, OnDestroy {
  submit$: Observable<any>;
  ref: ComponentRef<any> | EmbeddedViewRef<any>;
  container: ViewContainerRef;
  private destroy$ = new Subject();
  @Input() errorTemplate: TemplateRef<any>;

  constructor(private applicationRef: ApplicationRef,
              private injector: Injector,
              private resolver: ComponentFactoryResolver,
              private vcr: ViewContainerRef,
              private magicStrategy: MagicErrorStrategy,
              @Self() private control: NgControl,
              @Optional() @Host() private form: FormSubmit,
              @Optional() controlErrorContainer: MagicContainerDirective,
              @Inject(MAGIC_ERROR_COMPONENT) private errorComponent: Type<any>,
              @Inject(FORM_MAGIC_ERRORS) private errors) {
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
        this.setError(undefined);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy();
  }

  private destroy() {
    if (this.ref) {
      if (this.ref instanceof ComponentRef) {
        this.magicStrategy.destroyComponent(this.ref);
      } else {
        this.magicStrategy.destroyTemplate(this.ref);
      }
      this.ref = null;
    }
  }

  private setError(text: string) {
    const ref = this.createRef();
    if (ref instanceof ComponentRef) {
      ref.instance.text = text;
    } else {
      ref.context.$implicit = text;
    }
  }

  private createRef(): ComponentRef<any> | EmbeddedViewRef<any> {
    if (!this.ref) {
      if (this.errorTemplate) {
        this.ref = this.magicStrategy.createTemplate(this.container, this.errorTemplate);
      } else {
        const factory = this.resolver.resolveComponentFactory(this.errorComponent);
        this.ref = this.magicStrategy.createComponent(this.container, factory);
      }
    }
    return this.ref;
  }

  private getError(key, error) {
    return this.errors[key] ? this.errors[key](error) : key;
  }
}


@Directive({
  selector: '[formControl][matInput], [formControlName][matInput]',
  providers: [{
    provide: MagicErrorStrategy, useClass: MaterialMagicStrategy
  }]
})
export class MaterialControlErrorsDirective {

}
