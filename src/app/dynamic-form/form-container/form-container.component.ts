import {
  Component, ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnInit,
  TemplateRef,
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
  <form [formGroup]="myForm" #formContainer></form>
  `,
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  myForm: FormGroup;

  @Input() config: any[] = [
    {
      type: 'text',
      question: 'What is favourite team',
      controls: [{
        type: 'yesNo',
        question: 'Do you like them?',
        equals: 'Bayern',
        controls: [{
          type: 'yesNo',
          question: 'Really?',
          equals: 'yes'
        }]
      }, {
        type: 'text',
        question: 'Why not Bayern?',
        equals: 'Barcelona',
      }]
    }, {
      type: 'text',
      question: 'What is your name',
    }, {
      type: 'number',
      question: 'How old are you',
      greaterThan: 18,
      controls: [{
        type: 'text',
        question: 'Do you like alcohol?'
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
    this.myForm.valueChanges.subscribe(x => console.log(x))
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
    this.myForm.addControl('control' + this.controlsIndex, new FormControl());
    if (control.controls && control.controls.length) {
      control.controls.forEach(innerControl => this.generateControl(innerControl, 'control' + this.controlsIndex ))
    }
  }

}
