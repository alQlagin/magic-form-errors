import { Directive, ElementRef, Input, Self } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { ControlContainer } from '@angular/forms';

export class FormSubmit {
  submit$: Observable<Event>;
}

@Directive({
  selector: 'form',
  providers: [
    {provide: FormSubmit, useExisting: FormSubmitDirective}
  ]
})
export class FormSubmitDirective {
  @Input() submittedClass = '';
  submit$ = fromEvent(this.element, 'submit')
    .pipe(
      tap(() => {
        if (this.submittedClass && this.element.classList.contains(this.submittedClass) === false) {
          this.element.classList.add(this.submittedClass);
        }
      }),
      shareReplay(1)
    );

  constructor(private host: ElementRef,
              @Self() private control: ControlContainer) {

  }

  private get element() {
    return this.host.nativeElement;
  }


}
