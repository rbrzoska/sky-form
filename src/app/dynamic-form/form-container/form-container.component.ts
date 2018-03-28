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

@Component({
  selector: 'app-form-container',
  template: `
  <form [formGroup]="myForm"  (submit)="submitForm()">
    <ng-container #formContainer></ng-container>
    <button class="btn btn-success">Submit</button>
    <button type="button" (click)="resetForm()" class="btn btn-danger">Reset</button>
  </form>
    <pre *ngIf="submittedValue">{{submittedValue | json}}</pre>
  `,
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  myForm: FormGroup;
  submittedValue: any;
  @Input() config: any[] = [
    {
      type: 'text',
      question: 'What is favourite team',
      controls: [{
        type: 'yesNo',
        question: 'Do you like them?',
        conditionType: 'equals',
        conditionValue: 'Bayern',
        controls: [{
          type: 'yesNo',
          question: 'Really?',
          conditionType: 'equals',
          conditionValue: 'yes',
        }]
      }, {
        type: 'text',
        question: 'Why not Bayern?',
        conditionType: 'equals',
        conditionValue: 'Barcelona',
      }]
    }, {
      type: 'text',
      question: 'What is your name',
    }, {
      type: 'number',
      question: 'How old are you',
      controls: [{
        type: 'text',
        question: 'Do you like alcohol?',
        conditionType: 'greater',
        conditionValue: 18,
      }
      ]
    }];

  @ViewChild('formContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef;

  controlsIndex = 0;
  textComponentFactory: ComponentFactory<TextControlComponent>;
  numberComponentFactory: ComponentFactory<NumberControlComponent>;
  yesnoComponentFactory: ComponentFactory<YesNoControlComponent>;
  constructor(private cdr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.myForm = new FormGroup({});
    this.textComponentFactory = this.cdr.resolveComponentFactory(TextControlComponent);
    this.numberComponentFactory = this.cdr.resolveComponentFactory(NumberControlComponent);
    this.yesnoComponentFactory = this.cdr.resolveComponentFactory(YesNoControlComponent);
    this.loadFormConfig(this.config);
  }

  private loadFormConfig(config: any[]) {

    this.viewContainer.clear();

    config.forEach(control => this.generateControl(control));
  }

  private generateControl(control: any, parentControlName?: string) {
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
    if (control.controls && control.controls.length) {
      control.controls.forEach(innerControl => this.generateControl(innerControl, ctrl.instance.controlName ));
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
