import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { routerTransition } from '../../../../../app/router.animations';
import { ApiService } from '../../../../auth/service/api.service';
import { AuthService } from '../../../../auth/service/auth.service';
import { LocalStorePath } from '../../../../auth/models/common.enum';
import { BTResponseModel } from '../../../../auth/models/general.model';
import { LocalUserModel, LoginUserModel } from '../../../../auth/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()],
})
export class AuthLoginV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: FormGroup;
  public submitted = false;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public data: any;

  private _unsubscribeAll: Subject<any>;

  isFormSubmitted: boolean;
  errorMessage: string;
  eRedirectUrl: string;
  isLoginForm: boolean;
  today: string;
  maxDate: Date;
  private loginFormGroup: FormGroup

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    public authService: AuthService,
    private spinner: NgxSpinnerService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
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
    this.isFormSubmitted = false;

    this.isLoginForm = true;
  }
  onLogin() {
    const model = {
      email: this.apiService.loginFormModel.value.Email,
      password: this.apiService.loginFormModel.value.Password,
    };
    this.isFormSubmitted = true;
    this.errorMessage = '';
    
    if (this.apiService.loginFormModel.valid) {
      this.apiService.saveData('user', 'login', null, model).subscribe(
        (request: BTResponseModel<LoginUserModel>) => {
          this.isFormSubmitted = false;
          if (request.status) {
            localStorage.setItem('isLoggedin', 'true');
            let user = new LocalUserModel();

            user = {
              fullName: request.data.fullName,
              role: request.data.role
            };
            this.authService.setLocalStorage(
              LocalStorePath.user,
              JSON.stringify(user)
            );

            this.authService.setLocalStorage(LocalStorePath.accessToken, request.data.token);
            this.router.navigate(['/user/dashboard']);
            this.authService.showSucceessMessage('Log in Successfull!');
          } else {
            this.errorMessage = request.message;
          }
        }, (err) => {
          // alert('Invalid email or password');
          this.authService.showErrorMessage('Invalid email or password');
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        });
    } else {
      // alert('Please fill the requried information');
      this.authService.showInfoMessage('Please fill the requried information');
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cityName: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
