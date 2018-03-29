import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styles: []
})
export class FormCreatorComponent implements OnInit {

  creatorForm: FormArray;

  constructor(private fb: FormBuilder) {
    this.creatorForm = this.fb.array([]);
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

}
