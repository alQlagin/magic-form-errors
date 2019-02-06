import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { DefaultErrorComponent } from './components/default-error.component';
import { ControlErrorsDirective, MatControlErrorsDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { MatErrorDirective } from './directives/mat-error.directive';
import { ControlErrorComponent } from './components/control-error.interface';
import { ERROR_COMPONENT } from './tokens';

export interface ReactiveFormErrorsModuleOptions {
  errorComponent?: Type<ControlErrorComponent>;
}

@NgModule({
  declarations: [
    DefaultErrorComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    MatErrorDirective,
    FormSubmitDirective,
    MatControlErrorsDirective
  ],
  imports: [],
  exports: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    MatErrorDirective,
    FormSubmitDirective,
    MatControlErrorsDirective
  ],
  entryComponents: [
    DefaultErrorComponent
  ]
})
export class ReactiveFormErrorsModule {
  static withCustomError(
    {errorComponent = DefaultErrorComponent}: ReactiveFormErrorsModuleOptions = {}
  ): ModuleWithProviders {
    return {
      ngModule: ReactiveFormErrorsModule,
      providers: [
        {provide: ERROR_COMPONENT, useValue: errorComponent}
      ]
    };
  }
}
