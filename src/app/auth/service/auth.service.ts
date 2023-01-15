import { LocalUserModel } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LocalStorePath } from '../models/common.enum';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getlocalStorageItemByKey(key: string): string {
    return localStorage.getItem(key);
  }

  /**
   * Get Detail of user from local store in JSON format
   */
  get getUserDetailFromLocalStore(): LocalUserModel {
    return localStorage.getItem(LocalStorePath.user)
      ? JSON.parse(localStorage.getItem(LocalStorePath.user))
      : null;
  }

  roleMatch(allowedRoles: Array<number>): boolean {
    let isMatch = false;
    const userDetail = this.getUserDetailFromLocalStore;

    allowedRoles.forEach((element) => {
      if (userDetail.role === element) {
        isMatch = true;
      }
    });

    return isMatch;
  }

  prepareRouter(outlet: RouterOutlet): any {
    return outlet.activatedRouteData.state;
  }

  // startLoader(): void {
  //   this.spinner.show();
  // }

  // stopLoader(): void {
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 400);
  // }

  goToLogin(path?: string): void {
    if (path) {
      this.router.navigate(['/login', btoa(`${path}`)]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToLocation(path: string): void {
    if (path) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/']);
    }
  }

 
  showSucceessMessage(message: string): void {
    this.toastr.success(message, 'Blood Test Admin', {
      timeOut: 4000
    });
  }

  showErrorMessage(message: string): void {
    message = message ? message : 'Something went wrong. Please try after sometime';
    this.toastr.error(message, 'Blood Test Admin', {
      timeOut: 4000
    });
  }

  showInfoMessage(message: string): void {
    this.toastr.info(message, 'Blood Test Admin', {
      timeOut: 4000
    });
  }

  showWarningMessage(message: string): void {
    this.toastr.warning(message, 'Blood Test Admin', {
      timeOut: 4000
    });
  }
}
