import { Component } from '@angular/core';
import {AbstractDynamicControl} from '../abstract-dynamic-control';

@Component({
  selector: 'app-yes-no-control',
  templateUrl: './yes-no-control.component.html'
})
export class YesNoControlComponent extends AbstractDynamicControl {
  constructor() {
    super();
  }
}
