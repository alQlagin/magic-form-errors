import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlErrorComponent } from 'reactive-form-errors';

@Component({
  selector: 'app-bootstrap-error',
  template: `<small class="form-text text-danger">{{_text}}</small>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BootstrapErrorComponent implements ControlErrorComponent {

  _text = '';
  @Input() set text(value) {
    this._text = value;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {
  }
}
