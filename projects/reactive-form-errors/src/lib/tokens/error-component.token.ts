import { InjectionToken } from '@angular/core';
import { DefaultErrorComponent } from '../components/default-error.component';

export const MAGIC_ERROR_COMPONENT = new InjectionToken('MAGIC FORM ERROR COMPONENT', {
  providedIn: 'root',
  factory: () => DefaultErrorComponent
});
