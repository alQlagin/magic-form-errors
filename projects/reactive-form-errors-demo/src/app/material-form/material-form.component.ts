import { Component, HostBinding } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  providers: [
    FormService,
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
