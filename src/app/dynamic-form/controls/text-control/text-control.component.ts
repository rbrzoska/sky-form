import { Component, OnInit } from '@angular/core';
import {AbstractDynamicControl} from '../abstract-dynamic-control';

@Component({
  selector: 'app-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss']
})
export class TextControlComponent extends AbstractDynamicControl {
  constructor() {
    super();
  }

}
