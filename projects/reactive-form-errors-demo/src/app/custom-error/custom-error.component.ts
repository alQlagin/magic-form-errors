import { Component, Input } from '@angular/core';
import { ControlErrorComponent } from 'reactive-form-errors';

@Component({
  selector: 'app-custom-error',
  template: `
    <small class="form-text text-danger">{{text}}</small>`,
  styleUrls: ['./custom-error.component.css']
})
export class CustomErrorComponent implements ControlErrorComponent {

  constructor() {
  }

  @Input() text;

}
