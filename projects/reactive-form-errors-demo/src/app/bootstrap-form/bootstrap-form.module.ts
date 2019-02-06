import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapFormComponent } from './bootstrap-form.component';
import { BootstrapErrorComponent } from './bootstrap-error.component';
import { CommonFormModule } from '../common-form.module';
import { MAGIC_ERROR_COMPONENT } from 'reactive-form-errors';

@NgModule({
  declarations: [
    BootstrapFormComponent,
    BootstrapErrorComponent,
  ],
  imports: [
    CommonModule,
    CommonFormModule,
  ],
  providers: [
    {provide: MAGIC_ERROR_COMPONENT, useValue: BootstrapErrorComponent}
  ],
  entryComponents: [BootstrapErrorComponent],
  exports: [BootstrapFormComponent]
})
export class BootstrapFormModule {
}
