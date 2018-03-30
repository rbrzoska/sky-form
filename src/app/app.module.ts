import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {FormCreatorComponent} from './dynamic-form/creator/form-creator.component';
import { ExportComponent } from './dynamic-form/export/export.component';
import { PreviewComponent } from './dynamic-form/preview/preview.component';
import { SaveOnDeactvationGuard } from './save-on-deactvation.guard';

const routes: Routes = [
  {path: '', redirectTo: 'create', pathMatch: 'full'},
  {path: 'create', component: FormCreatorComponent, canDeactivate: [SaveOnDeactvationGuard]},
  {path: 'preview', component: PreviewComponent},
  {path: 'export', component: ExportComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    DynamicFormModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SaveOnDeactvationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
