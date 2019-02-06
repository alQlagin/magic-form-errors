import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { DefaultErrorComponent } from './components/default-error.component';
import { MagicErrorsDirective, MaterialControlErrorsDirective } from './directives/magic-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { MagicContainerDirective } from './directives/magic-container.directive';
import { ControlErrorComponent } from './components/control-error.interface';
import { MAGIC_ERROR_COMPONENT } from './tokens';
import { DefaultMagicStrategy, MagicErrorStrategy } from './services/magic-strategy.service';

export interface MagicErrorsModuleOptions {
  errorComponent?: Type<ControlErrorComponent>;
}

@NgModule({
  declarations: [
    DefaultErrorComponent,
    MagicErrorsDirective,
    MagicContainerDirective,
    MaterialControlErrorsDirective,
    FormSubmitDirective,
  ],
  imports: [],
  exports: [
    MagicErrorsDirective,
    MagicContainerDirective,
    MaterialControlErrorsDirective,
    FormSubmitDirective,
  ],
  entryComponents: [
    DefaultErrorComponent
  ],
  providers: [
    {provide: MagicErrorStrategy, useClass: DefaultMagicStrategy}
  ]
})
export class MagicErrorsModule {
  static withCustomError(
    {errorComponent = DefaultErrorComponent}: MagicErrorsModuleOptions = {}
  ): ModuleWithProviders {
    return {
      ngModule: MagicErrorsModule,
      providers: [
        {provide: MAGIC_ERROR_COMPONENT, useValue: errorComponent}
      ]
    };
  }
}
