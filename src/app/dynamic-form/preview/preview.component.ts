import {
  Component, ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TextControlComponent } from '../controls/text-control/text-control.component';
import { NumberControlComponent } from '../controls/number-control/number-control.component';
import { YesNoControlComponent } from '../controls/yes-no-control/yes-no-control.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormDataStorageService } from '../form-data-storage.service';

@Component({
  selector: 'app-form-preview',
  template: `
    <div class="card">
      <div class="card-body">
        <form [formGroup]="myForm"  (submit)="submitForm()">
          <ng-container #formContainer></ng-container>
          <button class="btn btn-success">Submit</button>
          <button type="button" (click)="resetForm()" class="btn btn-danger">Reset</button>
        </form>
      </div>
    </div>
    <pre *ngIf="submittedValue">{{submittedValue | json}}</pre>
  `
})
export class PreviewComponent implements OnInit {

  myForm: FormGroup;
  submittedValue: FormConfig | null;
  @Input() config: FormConfig;

  @ViewChild('formContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef;

  controlsIndex = 0;
  textComponentFactory: ComponentFactory<TextControlComponent>;
  numberComponentFactory: ComponentFactory<NumberControlComponent>;
  yesnoComponentFactory: ComponentFactory<YesNoControlComponent>;
  constructor(private cdr: ComponentFactoryResolver, private formGenerator: FormDataStorageService) {
    this.config = formGenerator.loadFormJson();
  }

  ngOnInit() {
    this.myForm = new FormGroup({});
    this.textComponentFactory = this.cdr.resolveComponentFactory(TextControlComponent);
    this.numberComponentFactory = this.cdr.resolveComponentFactory(NumberControlComponent);
    this.yesnoComponentFactory = this.cdr.resolveComponentFactory(YesNoControlComponent);
    this.loadFormConfig(this.config);
  }

  private loadFormConfig(config: FormConfig) {

    this.viewContainer.clear();

    config.forEach(control => this.generateControl(control));
  }

  private generateControl(control: ControlObject, parentControlName?: string) {
    let ctrl;
    if (control.type === 'text') {
      ctrl = this.viewContainer.createComponent(this.textComponentFactory);
    }
    if (control.type === 'number') {
      ctrl = this.viewContainer.createComponent(this.numberComponentFactory);
    }
    if (control.type === 'yesNo') {
      ctrl = this.viewContainer.createComponent(this.yesnoComponentFactory);
    }
    this.controlsIndex++;
    ctrl.instance.controlName = 'control' + this.controlsIndex;
    ctrl.instance.controlTitle = control.question;
    ctrl.instance.form = this.myForm;
    ctrl.instance.parentControlName = parentControlName;
    ctrl.instance.controlConditionType = control.conditionType;
    ctrl.instance.controlConditionValue = control.conditionValue;
    this.myForm.addControl('control' + this.controlsIndex, new FormControl());
    if (control.dynamicControls && control.dynamicControls.length) {
      control.dynamicControls.forEach(innerControl => this.generateControl(innerControl, ctrl.instance.controlName ));
    }
  }

  submitForm() {
    this.submittedValue = this.myForm.value;
  }
  resetForm() {
    this.submittedValue = null;
    this.myForm.reset();
  }

}
