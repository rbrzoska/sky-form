import {FormGroup} from '@angular/forms';
import {OnInit} from '@angular/core';

export abstract class AbstractDynamicControl implements OnInit {

  form: FormGroup;
  parentControlName: string;
  controlTitle: string;
  controlName: string;
  controlConditionType: string;
  controlConditionValue: string | number;

  enableControl = () => {

    if (!this.parentControlName) {
      return true;
    }

    switch (this.controlConditionType) {
      case 'equals': {
        if (this.form.controls[this.parentControlName].value === this.controlConditionValue) {
          this.form.controls[this.controlName].enable();
          return true;
        } else {
          this.form.controls[this.controlName].disable();
          return false;
        }
      }
      case 'greater': {
        if (this.form.controls[this.parentControlName].value > this.controlConditionValue) {
          this.form.controls[this.controlName].enable();
          return true;
        } else {
          this.form.controls[this.controlName].disable();
          return false;
        }
      }
      case 'less': {
        if (this.form.controls[this.parentControlName].value < this.controlConditionValue) {
          this.form.controls[this.controlName].enable();
          return true;
        } else {
          this.form.controls[this.controlName].disable();
          return false;
        }
      }
    }
  }


  ngOnInit() {
    if (this.parentControlName) {
      this.form.controls[this.controlName].disable();
    }
  }
}
