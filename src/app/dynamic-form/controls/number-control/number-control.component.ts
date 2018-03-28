import { Component, OnInit } from '@angular/core';
import {AbstractDynamicControl} from '../abstract-dynamic-control';

@Component({
  selector: 'app-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.scss']
})
export class NumberControlComponent extends AbstractDynamicControl {
  constructor() {
    super();
  }

}

