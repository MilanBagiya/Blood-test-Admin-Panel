// import { AuthService } from './../service/auth.service';
// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { AuthenticationService } from 'app/auth/service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   /**
//    *
//    * @param {Router} _router
//    * @param {AuthenticationService} _authenticationService
//    */
//   constructor(private _router: Router, private _authenticationService: AuthenticationService, private authService: AuthService) {}

//   // canActivate
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentUser = this.authService.getUserDetailFromLocalStore;
// debugger
//     if (currentUser) {
//       // check if route is restricted by role
//       if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
//         // role not authorised so redirect to not-authorized page
//         this._router.navigate(['/login']);
//         return false;
//       }

//       // authorised so return true
//       return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }

import { AuthService } from '../../auth/service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorePath } from '../models/common.enum';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(LocalStorePath.user) !== undefined &&
      localStorage.getItem(LocalStorePath.user) !== null) {
      const role = route.data.permittedRoles as Array<number>;
      if (role) {
        if (this.authService.roleMatch(role)) {
          return true;
        } else {
          console.error('You are not authorized to view this page', 'Blood Test');
          // localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
