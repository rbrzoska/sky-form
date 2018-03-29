import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-creator-input',
  templateUrl: './form-creator-input.component.html',
  styles: []
})
export class FormCreatorInputComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() index: number;
  @Output() remove = new EventEmitter<number>();
  dynamicControls: FormArray;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.dynamicControls = this.fb.array([]);
    this.formGroup.addControl('dynamicControls', this.dynamicControls);
  }


  addSubInput() {
    this.dynamicControls.push(this.createInput());
  }

  private createInput(): FormGroup {
    return this.fb.group({
      question: '',
      type: '',
      conditionType: '',
      conditionValue: ''
    });
  }

  removeInput() {
    this.remove.emit(this.index);
  }
  handleRemoveSubInput(index: number) {
    this.dynamicControls.removeAt(index);
  }

}
