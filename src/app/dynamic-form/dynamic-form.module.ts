import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGeneratorService } from './form-generator.service';
import { TextControlComponent } from './controls/text-control/text-control.component';
import { NumberControlComponent } from './controls/number-control/number-control.component';
import { YesNoControlComponent } from './controls/yes-no-control/yes-no-control.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreatorComponent } from './creator/form-creator.component';
import { FormCreatorInputComponent } from './creator/form-creator-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  declarations: [TextControlComponent, NumberControlComponent, YesNoControlComponent, FormContainerComponent, FormCreatorComponent, FormCreatorInputComponent],
  entryComponents: [TextControlComponent, NumberControlComponent, YesNoControlComponent],
  exports: [FormContainerComponent, FormCreatorComponent],
  providers: [FormGeneratorService]
})
export class DynamicFormModule { }
