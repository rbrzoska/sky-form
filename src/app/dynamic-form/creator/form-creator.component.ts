import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataStorageService } from '../form-data-storage.service';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styles: []
})
export class FormCreatorComponent {

  creatorForm: FormArray;

  constructor(private fb: FormBuilder, private formGenerator: FormDataStorageService) {
    this.creatorForm = formGenerator.loadReactiveFormObject();
  }

  addInput() {
    this.creatorForm.push(this.createInputGroup());
  }

  handleRemove(index: number) {
    this.creatorForm.removeAt(index);
  }
  handleAdd(control: FormGroup, index: number) {
    let dynamicForms = this.creatorForm.at(index).get('dynamicControls') as FormArray;
    dynamicForms.push(control);
  }

  private createInputGroup(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      type: ['', Validators.required],
      conditionType: '',
      conditionValue: '',
      dynamicControls: this.fb.array([])
    });
  }
  save(silentSave: boolean = false): boolean {
    if(this.creatorForm.valid) {
      this.formGenerator.saveForm(this.creatorForm, silentSave);
      return true
    } else {
      return false;
    }
  }

}
