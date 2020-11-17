import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class WizardguardGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let result = true;
    this.storage.get('anserdwizard').then((val) => {
      console.log(val);
      result = val;
      if (!result && val != null) {
        this.router.navigate(['/tabs/tabs/homepage']);
      }else {
        this.router.navigate(['']);
        result = false;
      }
      return result;
    });

    return result;
  }
}
