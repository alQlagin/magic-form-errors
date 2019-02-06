import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MagicErrorsModule } from 'reactive-form-errors';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MagicErrorsModule
  ],
  exports: [
    ReactiveFormsModule,
    MagicErrorsModule
  ]
})
export class CommonFormModule { }
