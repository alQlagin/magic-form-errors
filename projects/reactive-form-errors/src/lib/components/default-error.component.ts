import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlErrorComponent } from './control-error.interface';

@Component({
  selector: 'lib-control-error',
  template: `<small>{{_text}}</small>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultErrorComponent implements ControlErrorComponent {
  constructor(private cd: ChangeDetectorRef) {
  }

  _text: string;

  @Input() set text(value) {
    this._text = value;
    this.cd.detectChanges();
  }

}
