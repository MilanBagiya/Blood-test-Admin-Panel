import { animate } from '@angular/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginV2Component } from './authentication/auth-login-v2/auth-login-v2.component';
import { RegisterComponent } from './authentication/register/register.component';

// routing
const routes: Routes = [
  {
    path: '',
    component: AuthLoginV2Component,
    data: { animation: 'auth' },
    children: [
      {
        path: '/login',
        component: AuthLoginV2Component,
        data: { animation: 'auth' },
      },
      {
        path: 'user/register1',
        component: RegisterComponent,
        data: { animation: 'auth' }
      },
      
    ]
  }
];


@NgModule({
  declarations: [
    AuthLoginV2Component,
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MiscellaneousModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  ],

  providers: []
})
export class PagesModule { }
