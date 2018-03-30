import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-creator-input',
  templateUrl: './form-creator-input.component.html',
  styles: [``]
})
export class FormCreatorInputComponent{

  @Input() formGroup: FormGroup;
  @Input() index: number;
  @Input() isRootControl = false;
  @Output() remove = new EventEmitter<number>();
  @Output() add = new EventEmitter<any>();

  get dynamicControls(): FormArray { return this.formGroup.get('dynamicControls') as FormArray; }

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  addSubInput() {
    this.add.emit(this.createInput());
  }
  ngOnInit() {
    this.formGroup.statusChanges.subscribe(() => this.cdr.detectChanges());
  }

  private createInput(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      type: ['', Validators.required],
      conditionType: ['', Validators.required],
      conditionValue: ['', Validators.required],
      dynamicControls: this.fb.array([])
    });
  }

  removeInput() {
    this.remove.emit(this.index);
  }
  handleRemoveSubInput(index: number) {
    this.dynamicControls.removeAt(index);
  }
  handleAddSubInput(control: FormGroup) {
    (<FormArray>this.dynamicControls.at(this.index).get('dynamicControls')).push(control);
    console.log(this.dynamicControls)
  }

}
