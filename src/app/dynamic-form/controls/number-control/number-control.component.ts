import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.scss']
})
export class NumberControlComponent implements OnInit {

  form: FormGroup;
  parentControlName: string;
  controlTitle: string;
  controlName: string;
  constructor() { }

  ngOnInit() {
  }

}
