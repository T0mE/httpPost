import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class Step3Guard implements CanActivate {
  constructor(private dataService: DataService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { input, select1, select2, radio, resp } = this.dataService.currentFormData;

    console.log(this.dataService.currentFormData)
    console.log(input && select1 && select2 && radio && (radio === 'b' ? resp : true) ? true : false)
    return input && select1 && select2 && radio && (radio === 'b' ? resp : true) ? true : false;
  }

}
