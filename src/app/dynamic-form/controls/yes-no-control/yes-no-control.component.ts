import { Component, OnInit } from '@angular/core';
import {AbstractDynamicControl} from '../abstract-dynamic-control';

@Component({
  selector: 'app-yes-no-control',
  templateUrl: './yes-no-control.component.html',
  styleUrls: ['./yes-no-control.component.scss']
})
export class YesNoControlComponent extends AbstractDynamicControl {
  constructor() {
    super();
  }
}
