import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[controlContainer]'
})
export class ControlErrorContainerDirective {
  constructor(public vcr: ViewContainerRef) { }
}
