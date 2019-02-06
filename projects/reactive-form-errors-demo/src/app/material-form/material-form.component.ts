import { Component, HostBinding } from '@angular/core';
import { ERROR_COMPONENT } from 'reactive-form-errors';
import { MaterialErrorComponent } from './material-error.component';
import { FormService } from '../form.service';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  providers: [
    FormService,
    {provide: ERROR_COMPONENT, useValue: MaterialErrorComponent},
  ]
})
export class MaterialFormComponent {

  @HostBinding('class') class = 'material';

  constructor(private formService: FormService) {
  }

  get form() {
    return this.formService.form;
  }
}
