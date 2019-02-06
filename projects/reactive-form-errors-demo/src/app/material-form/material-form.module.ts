import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MaterialFormComponent } from './material-form.component';
import { MaterialErrorComponent } from './material-error.component';
import { CommonFormModule } from '../common-form.module';

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
  ]
})
export class MaterialFormModule {
}
