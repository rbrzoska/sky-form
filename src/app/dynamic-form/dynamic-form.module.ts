import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGeneratorService } from './form-generator.service';
import { TextControlComponent } from './controls/text-control/text-control.component';
import { NumberControlComponent } from './controls/number-control/number-control.component';
import { YesNoControlComponent } from './controls/yes-no-control/yes-no-control.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  declarations: [TextControlComponent, NumberControlComponent, YesNoControlComponent, FormContainerComponent],
  entryComponents: [TextControlComponent, NumberControlComponent, YesNoControlComponent],
  exports: [FormContainerComponent],
  providers: [FormGeneratorService]
})
export class DynamicFormModule { }
