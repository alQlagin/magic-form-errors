import { Component, HostBinding } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.css'],
  providers: [
    FormService,
  ],
})
export class BootstrapFormComponent {
  @HostBinding('class') class = 'bootstrap';

  constructor(private formService: FormService) {
  }

  get form() {
    return this.formService.form;
  }
}
