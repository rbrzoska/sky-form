import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormDataStorageService {

  constructor(private fb: FormBuilder) {
  }

  saveForm(formArray: FormArray, silentSave: boolean) {
    localStorage.setItem('formState', JSON.stringify(formArray.value));
    if (!silentSave) {
      alert('Form saved')
    }

  }

  loadReactiveFormObject(): FormArray {
    if (localStorage.getItem('formState')) {
      const jsonObject: any[] = JSON.parse(localStorage.getItem('formState'));
      const form = new FormArray([]);
      jsonObject.forEach(control => {
        form.push(this.loadReactiveFormControls(control, true));
      });
      return form;
    } else {
      return this.fb.array([]);
    }
  }

  private loadReactiveFormControls(control: ControlObject, isRoot: boolean = false): FormGroup {
    const formGroup: FormGroup = this.fb.group({
      type: [control.type, Validators.required],
      question: [control.question, Validators.required],
      conditionType: [control.conditionType, isRoot ? null : Validators.required],
      conditionValue: [control.conditionValue, isRoot ? null : Validators.required],
      dynamicControls: new FormArray([])
    });
    control.dynamicControls.forEach(c => {
      (<FormArray>formGroup.controls.dynamicControls).push(this.loadReactiveFormControls(c));
    });

    return formGroup;
  }

  loadFormJson(): FormConfig {
    if (localStorage.getItem('formState')) {
      return JSON.parse(localStorage.getItem('formState'));
    } else {
      return [];
    }
  }
}
