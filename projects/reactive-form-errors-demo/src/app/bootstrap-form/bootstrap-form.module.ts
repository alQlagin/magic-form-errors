import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapFormComponent } from './bootstrap-form.component';
import { BootstrapErrorComponent } from './bootstrap-error.component';
import { CommonFormModule } from '../common-form.module';

@NgModule({
  declarations: [
    BootstrapFormComponent,
    BootstrapErrorComponent,
  ],
  imports: [
    CommonModule,
    CommonFormModule,
  ],
  entryComponents: [BootstrapErrorComponent],
  exports: [BootstrapFormComponent]
})
export class BootstrapFormModule {
}
