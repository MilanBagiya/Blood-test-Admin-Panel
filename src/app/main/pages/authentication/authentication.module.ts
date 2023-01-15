
import { NgxSpinnerModule } from 'ngx-spinner';
import { animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { AuthLoginV2Component } from 'app/main/pages/authentication/auth-login-v2/auth-login-v2.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { RegisterComponent } from './register/register.component';

// routing
const routes: Routes = [
  {
    path: 'user/register1',
    component: RegisterComponent,
    data: { animation: 'auth' }
  },
];

@NgModule({
  declarations: [ RegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule, Ng2FlatpickrModule, NgxSpinnerModule]
})
export class AuthenticationModule { }
