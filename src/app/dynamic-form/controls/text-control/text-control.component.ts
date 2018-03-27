import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss']
})
export class TextControlComponent implements OnInit {

  form: FormGroup;
  parentControlName: string;
  controlTitle: string;
  controlName: string;
  constructor() { }

  ngOnInit() {
  }

}
