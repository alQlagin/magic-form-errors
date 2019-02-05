import { InjectionToken } from '@angular/core';
import { DefaultErrorComponent } from '../components/default-error.component';

export const ERROR_COMPONENT = new InjectionToken('FORM ERROR COMPONENT', {
  providedIn: 'root',
  factory: () => DefaultErrorComponent
});
