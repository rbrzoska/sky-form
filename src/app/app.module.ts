import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {FormCreatorComponent} from './dynamic-form/creator/form-creator.component';
import {FormContainerComponent} from './dynamic-form/form-container/form-container.component';

const routes: Routes = [
  {path: '', redirectTo: 'create', pathMatch: 'full'},
  {path: 'create', component: FormCreatorComponent},
  {path: 'preview', component: FormContainerComponent}
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
