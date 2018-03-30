import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { FormCreatorComponent } from './dynamic-form/creator/form-creator.component';

@Injectable()
export class SaveOnDeactvationGuard implements CanDeactivate<FormCreatorComponent> {
  canDeactivate(component: FormCreatorComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): boolean {
    return component.save(true)
  }

}
