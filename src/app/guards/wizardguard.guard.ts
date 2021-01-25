import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import {TouchID} from '@ionic-native/touch-id/ngx';

@Injectable({
  providedIn: 'root'
})
export class WizardguardGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router, private touchId: TouchID) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let result = true;
    this.storage.get('anserdwizard').then((val) => {
      result = val;
      if (!result && val != null) {
        this.router.navigate(['/tabs/tabs/homepage']);
        this.touchId.isAvailable()
            .then(
                res => console.log('TouchID is available!'),
                err => console.error('TouchID is not available', err)
            );

        this.touchId.verifyFingerprint('Scan your fingerprint please')
            .then(
                res => console.log('Ok', res),
                err => console.error('Error', err)
            );
      }else {
        this.router.navigate(['']);
        result = false;
      }
      return result;
    });

    return result;
  }
}
