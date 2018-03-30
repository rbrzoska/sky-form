import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextControlComponent } from './controls/text-control/text-control.component';
import { NumberControlComponent } from './controls/number-control/number-control.component';
import { YesNoControlComponent } from './controls/yes-no-control/yes-no-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreatorComponent } from './creator/form-creator.component';
import { FormCreatorInputComponent } from './creator/form-creator-input.component';
import { ExportComponent } from './export/export.component';
import { FormDataStorageService } from './form-data-storage.service';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  declarations: [TextControlComponent, NumberControlComponent, YesNoControlComponent, PreviewComponent, FormCreatorComponent, FormCreatorInputComponent, ExportComponent],
  entryComponents: [TextControlComponent, NumberControlComponent, YesNoControlComponent],
  exports: [PreviewComponent, FormCreatorComponent, ExportComponent],
  providers: [FormDataStorageService]
})
export class DynamicFormModule { }
