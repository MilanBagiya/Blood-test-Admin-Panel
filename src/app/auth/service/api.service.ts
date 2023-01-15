import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserRoles } from '../models/common.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  header: HttpHeaders;
  baseUrl: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.header = new HttpHeaders().set('Content-Type', 'application/json');
    this.baseUrl = environment.baseUrl;
  }

  /**
   * Login form Model
   */
  loginFormModel = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
  });

  createProjectModel = this.fb.group({
    UserId: ['', Validators.required],
    ProjectId: [0],
    CategoryId: ['', [Validators.required]],
    // ProjectMedia: this.fb.array([]),
    ProjectTitle: ['', [Validators.required, Validators.maxLength(100)]],
    ProjectShortDescription: [''],
    ProjectDescription: ['', Validators.required],
    ProjectAmount: ['', [Validators.required, Validators.min(1000)]],
    ProjectDays: [
      '',
      [Validators.required, Validators.min(10), Validators.max(365)],
    ],
  });

  /**
   * Sign up form model
   */
  signUpFormModel = this.fb.group({

    name: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
    password: ['', Validators.required],
    address: ['', [Validators.maxLength(500)]],
    mobile_no: ['', [Validators.required, Validators.maxLength(10)]],
    userRole: [UserRoles.laborataryAssistant]
  });



  sendCommentFormModel = this.fb.group({
    Comments: ['', [Validators.required]],
  });

  faqFormModel = this.fb.group({
    FAQHeading: ['', [Validators.required]],
    FAQAnswer: ['', [Validators.required]],
  });

  otherProjectsFormModel = this.fb.group({
    firstName: [''],
    lastName: [''],
    serviceType: [0],
    addressLine1: [''],
    addressLine2: [''],
    country: [''],
    state: [''],
    city: [''],
    pinCode: ['', [Validators.maxLength(10)]],
    contactNo: ['', [Validators.maxLength(13)]],
    emailId: ['', [Validators.email]],
    description: [''],
  });

  /**
   * Compare password
   * @param fb Form Group
   */
  // comparePasswords(fg: FormGroup): void {
  //   const confirmPasswordCtrl = fg.get('ConfirmPassword');
  //   // passwordMissMatch
  //   if (
  //     confirmPasswordCtrl.errors == null ||
  //     'passwordMissMatch' in confirmPasswordCtrl.errors
  //   ) {
  //     if (fg.get('Password').value !== confirmPasswordCtrl.value) {
  //       confirmPasswordCtrl.setErrors({ passwordMissMatch: true });
  //     } else {
  //       confirmPasswordCtrl.setErrors(null);
  //     }
  //   }
  // }

  /**
   * Get Call
   * @param controllerName: Name of controller
   * @param actionName: Name of action
   * @param urlParameters: Model with url parameter
   * @param entity: model if there is enity
   */
  getData(
    controllerName: string,
    actionName: string,
    urlParameters: any,
    entity: any
  ): Observable<any> {
    let url = this.baseUrl + controllerName + '/' + actionName;

    let parameters = '';

    if (
      urlParameters !== undefined &&
      urlParameters != null &&
      urlParameters !== ''
    ) {
      parameters = this.objectToUrlString(urlParameters);
    }

    if (parameters !== '') {
      url += '?' + parameters;
    }

    if (entity !== undefined && entity != null) {
      return this.http.post(url, entity, { headers: this.header });
    } else {
      return this.http.get(url, { headers: this.header });
    }
  }

  /**
   * Save update Data
   * @param controllerName: Name of controller
   * @param actionName: Name of action
   * @param urlParameters: Model with url parameter
   * @param entity: model if there is enity
   */
  saveData(
    controllerName: string,
    actionName: string,
    urlParameters: any,
    entity: any
  ): Observable<any> {
    // by default take all records with out filter
    let url = this.baseUrl + controllerName + '/' + actionName;

    let parameters = '';
    // convert object to url string
    if (
      urlParameters !== undefined &&
      urlParameters != null &&
      urlParameters !== ''
    ) {
      parameters = this.objectToUrlString(urlParameters);
    }

    // check for parameter filter
    if (parameters !== '') {
      url += '?' + parameters;
    }

    if (entity !== undefined && entity != null) {
      return this.http.post(url, entity, { headers: this.header });
    } else {
      return this.http.post(url, { headers: this.header });
    }
  }

  /**
   * Delete data
   * @param controllerName: Name of controller
   * @param actionName: Name of action
   * @param urlParameters: Model with url parameter
   */
  deleteData(
    controllerName: string,
    actionName: string,
    urlParameters: any
  ): Observable<any> {
    // by default url with api link, controller and action
    let url = this.baseUrl + controllerName + '/' + actionName;

    let parameters = '';
    // convert object to url string
    if (
      urlParameters !== undefined &&
      urlParameters !== null &&
      urlParameters !== ''
    ) {
      parameters = this.objectToUrlString(urlParameters);
    }

    if (parameters !== '') {
      url += '?' + parameters;
    }
    return this.http.delete(url, { headers: this.header });
  }

  /**
   * Upload any files
   * @param controllerName: Name of controller
   * @param actionName: Name of action
   * @param urlParameters: Model with url parameter
   * @param formData: Form data of files to upload
   */
  uploadFile(
    controllerName: string,
    actionName: string,
    urlParameters: any,
    formData: FormData
  ): Observable<any> {
    // by default url with api link, controller and action
    let url = this.baseUrl + controllerName + '/' + actionName;

    let parameters = '';
    // convert object to url string
    if (
      urlParameters !== undefined &&
      urlParameters !== null &&
      urlParameters !== ''
    ) {
      parameters = this.objectToUrlString(urlParameters);
    }

    if (parameters !== '') {
      url += '?' + parameters;
    }
    return this.http.post(url, formData);
  }

  /**
   * Convert object to url parameter string
   * @param target Model for changing it to string
   */
  objectToUrlString(target: any): string {
    let outField = '';
    let parameterCount = 0;

    // tslint:disable-next-line: forin
    for (const key in target) {
      if (parameterCount > 0) {
        outField += outField !== '' ? '&' : '';
      }
      if (target.hasOwnProperty(key)) {
        outField += key + '=' + target[key];
        parameterCount += 1;
      }
    }

    return outField;
  }
}
