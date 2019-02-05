import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormErrorsModule, FORM_DEFAULT_ERRORS } from 'reactive-form-errors';
import { CustomErrorComponent } from './custom-error/custom-error.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomErrorComponent
  ],
  entryComponents: [CustomErrorComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ReactiveFormErrorsModule.withCustomError({
      errorComponent: CustomErrorComponent
    })
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
