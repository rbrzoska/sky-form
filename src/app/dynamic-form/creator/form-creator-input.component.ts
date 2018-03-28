import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-creator-input',
  templateUrl: './form-creator-input.component.html',
  styles: []
})
export class FormCreatorInputComponent implements OnInit {

  @Input() formGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }


  addSubInput(){
    const controls = this.fb.array([this.createInput()]);
    this.formGroup.addControl('dynamicControls', controls)
    console.log(this.formGroup.controls)
  }

  private createInput(): FormGroup {
    return this.fb.group({
      question: '',
      type: ''
    })
  }

}
