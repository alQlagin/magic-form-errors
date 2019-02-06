import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MaterialFormComponent } from './material-form.component';
import { MaterialErrorComponent } from './material-error.component';
import { CommonFormModule } from '../common-form.module';
import { MAGIC_ERROR_COMPONENT } from 'reactive-form-errors';

@NgModule({
  declarations: [
    MaterialFormComponent,
    MaterialErrorComponent
  ],
  entryComponents: [MaterialErrorComponent],
  exports: [MaterialFormComponent],
  imports: [
    CommonModule,
    CommonFormModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [
    {provide: MAGIC_ERROR_COMPONENT, useValue: MaterialErrorComponent},
  ]
})
export class MaterialFormModule {
}
