import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RadioEnum } from 'src/app/data/radio.enum';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class Step4Guard implements CanActivate {
  constructor(private dataService: DataService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { input, select1, select2, radio, resp, radio2 } = this.dataService.currentFormData;

    return input && select1 && select2 && radio && (radio === RadioEnum.File ? resp : true) && radio2 ? true : false;
  }

}
