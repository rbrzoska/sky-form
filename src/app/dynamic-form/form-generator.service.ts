import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Injectable()
export class FormGeneratorService {

  constructor(private fb: FormBuilder) { }

  saveForm(formArray: FormArray) {
    const jsonForm: any[] = [];

    formArray.controls.forEach((f: FormGroup) => {
      jsonForm.push(this.addInputConfig(f));
    });
    localStorage.setItem('formState', JSON.stringify(jsonForm));

  }

  addInputConfig(formGroup: FormGroup): any {
    const inputObj = {
      type: formGroup.controls['type'].value,
      question: formGroup.controls['question'].value,
      dynamicControls: []
    };
    if (formGroup.controls['dynamicControls'] ) {
      var formArray = <FormArray>formGroup.controls['dynamicControls'];
      if(formArray.value.length) {
        for (let x = 0; x <= formArray.value.length; x++) {
          inputObj.dynamicControls.push(this.addInputConfig(<FormGroup>formArray.at(x)));
        }
      }

    }
    return inputObj;
  }

  loadFormObject(): FormArray {
    if (localStorage.getItem('formState')) {
      const jsonObject: any[] = JSON.parse(localStorage.getItem('formState'));
      const form = new FormArray([]);
      jsonObject.forEach(control => {
        form.push(this.loadCreatorInputConfig(control));
      });
      return form;
    } else {
      return new FormArray([]);
    }
  }

  loadCreatorInputConfig(control): FormGroup {
    const formGroup: FormGroup = this.fb.group({
      type: control.type,
      question: control.question
    });
    control.dynamicControls.forEach(c => {
      formGroup.addControl('dynamicControls', this.loadCreatorInputConfig(c));
    });

    return formGroup;
  }
}
