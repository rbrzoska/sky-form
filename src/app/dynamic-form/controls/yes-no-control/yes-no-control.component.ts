import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-yes-no-control',
  templateUrl: './yes-no-control.component.html',
  styleUrls: ['./yes-no-control.component.scss']
})
export class YesNoControlComponent implements OnInit {
  form: FormGroup;
  parentControlName: string;
  controlTitle: string;
  controlName: string;
  constructor() { }

  ngOnInit() {
  }

}
