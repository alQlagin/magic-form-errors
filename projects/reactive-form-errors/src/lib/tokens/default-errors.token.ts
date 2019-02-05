import {InjectionToken} from '@angular/core';

export const defaultErrors = {
  required: error => 'Обязательное поле',
  minlength: ({requiredLength, actualLength}) =>
    `Минимальная длинна ${requiredLength}, не хватает еще ${requiredLength - actualLength} символов`,
  min: ({min}) => `Минимальное значение ${min}`,
  max: ({max}) => `Максимальное значение ${max}`
};


export const FORM_DEFAULT_ERRORS = new InjectionToken('FORM_DEFAULT_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
