import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormErrorsModule } from 'reactive-form-errors';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ReactiveFormErrorsModule
  ],
  exports: [
    ReactiveFormsModule,
    ReactiveFormErrorsModule
  ]
})
export class CommonFormModule { }
