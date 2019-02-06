import { Component, HostBinding } from '@angular/core';
import { FormService } from '../form.service';
import { ERROR_COMPONENT } from 'reactive-form-errors';
import { BootstrapErrorComponent } from './bootstrap-error.component';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.css'],
  providers: [
    FormService,
    {provide: ERROR_COMPONENT, useValue: BootstrapErrorComponent}
  ]
})
export class BootstrapFormComponent {
  @HostBinding('class') class = 'bootstrap';

  constructor(private formService: FormService) {
  }

  get form() {
    return this.formService.form;
  }
}
