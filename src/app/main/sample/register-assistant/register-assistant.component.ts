import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BTResponseModel } from '../../../auth/models/general.model';
import { ApiService } from '../../../auth/service/api.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './../../../auth/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserSignUpmodel } from 'app/auth/models/user.model';
import { LocalStorePath } from 'app/auth/models/common.enum';

@Component({
  selector: 'app-register-assistant',
  templateUrl: './register-assistant.component.html',
  styleUrls: ['./register-assistant.component.scss']
})
export class RegisterAssistantComponent implements OnInit {

  public signUpFormGroup: FormGroup;
  isFormSubmitted: boolean;
  public submitted = false;
  errorMessage: string;
  public coreConfig: any;
  public passwordTextType: boolean;
  eRedirectUrl: any;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */

  constructor(
    private _coreConfigService: CoreConfigService,
    private apiService: ApiService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router) {

    this._unsubscribeAll = new Subject();


    this.signUpFormGroup = this.apiService.signUpFormModel;


    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }
  get f() {
    return this.signUpFormGroup.controls;
  }
  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.signUpFormGroup = this.apiService.signUpFormModel;
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  onSignUp(): void {
    this.submitted = true;
    const model = {
      name: this.signUpFormGroup.value.name,
      lastName: this.signUpFormGroup.value.lastName,
      email: this.signUpFormGroup.value.email,
      mobile_no: this.signUpFormGroup.value.mobile_no,
      address: this.signUpFormGroup.value.address,
      password: this.signUpFormGroup.value.password,
      userRole: this.signUpFormGroup.value.userRole,
    };
    this.isFormSubmitted = true;
    this.errorMessage = '';
    if (this.signUpFormGroup.valid) {
      this.apiService
        .saveData('assistants', 'add-assistant', null, model)
        .subscribe(
          (result: BTResponseModel<UserSignUpmodel>) => {
            debugger
            this.isFormSubmitted = false;
            if (result.status) {
              // this.authService.setLocalStorage(LocalStorePath.user, JSON.stringify(result.data));
              this.router.navigate(['user/choose-test']);
              if (this.eRedirectUrl) {
                this.router.navigate([atob(this.eRedirectUrl)]);
              } else {
                this.router.navigate(['/']);
                this.authService.showSucceessMessage('SignUp Success');
              }
            } else {
              // this.errorMessage = result.message;
              this.authService.showErrorMessage(result.message);
             
            }
          },
          (er: any) => {
            this.isFormSubmitted = false;
          },
          () => {
            this.isFormSubmitted = false;
          }
        );
    } else {

      this.authService.showInfoMessage('Please fill the requried information');
    }
  }

}

