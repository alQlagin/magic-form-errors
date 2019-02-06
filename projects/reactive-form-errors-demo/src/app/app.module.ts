import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FORM_DEFAULT_ERRORS } from 'reactive-form-errors';
import { BootstrapFormModule } from './bootstrap-form/bootstrap-form.module';
import { MaterialFormModule } from './material-form/material-form.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BootstrapFormModule,
    MaterialFormModule,
  ],
  providers: [
    {
      provide: FORM_DEFAULT_ERRORS,
      useValue: {
        required: () => 'Required field',
        minlength: ({requiredLength, actualLength}) =>
          `Minimal length is ${requiredLength}, ${requiredLength - actualLength} symbols remaining`,
        min: ({min}) => `Min value ${min}`,
        max: ({max}) => `Max value ${max}`,
        email: () => 'Email required',
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
