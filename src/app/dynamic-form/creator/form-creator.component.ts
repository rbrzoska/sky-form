import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {FormGeneratorService} from '../form-generator.service';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styles: []
})
export class FormCreatorComponent implements OnInit {

  creatorForm: FormArray;

  constructor(private fb: FormBuilder, private formGenerator: FormGeneratorService) {
    this.creatorForm = formGenerator.loadFormObject();
  }

  ngOnInit() {
  }

  addInput() {
    this.creatorForm.push(this.createInput());
  }

  handleRemove(index: number) {
    this.creatorForm.removeAt(index);
  }

  private createInput(): FormGroup {
    return this.fb.group({
      question: '',
      type: ''
    });
  }

  save() {
    this.formGenerator.saveForm(this.creatorForm);
  }

}
