import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlErrorComponent } from 'reactive-form-errors';

@Component({
  selector: 'app-material-error',
  template: `<mat-error>{{_text}}</mat-error>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialErrorComponent implements ControlErrorComponent {
  _text = '';
  @Input() set text(value) {
    this._text = value;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {
  }
}
