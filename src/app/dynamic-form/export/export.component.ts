import { Component, OnInit } from '@angular/core';
import { FormDataStorageService } from '../form-data-storage.service';

@Component({
  selector: 'app-export',
  template: `<div class="card">
                  <div class="card-body">
                    <pre>{{config | json}}</pre>
                  </div>
                </div>`
})
export class ExportComponent {

  config: FormConfig;
  constructor(formGenerator: FormDataStorageService) {
    this.config = formGenerator.loadFormJson();
  }
}
