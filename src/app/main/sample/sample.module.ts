import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SampleComponent } from './sample.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TestListsComponent } from './test-lists/test-lists.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LabAssitanatListComponent } from './lab-assitanat-list/lab-assitanat-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsertestlistComponent } from './usertestlist/usertestlist.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { RegisterAssistantComponent } from './register-assistant/register-assistant.component';

const routes: Routes = [
  {
    path: 'user',
    component: SampleComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { animation: 'dashboard' }
      },
      {
        path: 'appointments',
        component: AppointmentListComponent,
        data: { animation: 'dashboard' }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { animation: 'dashboard' }
      },
      {
        path: 'sample',
        component: SampleComponent,
        data: { animation: 'sample' }
      },
      {
        path: 'manager',
        component: ManagerListComponent,
        data: { animation: 'manager' }
      },
      {
        path: 'test-lists',
        component: TestListsComponent,
        data: { animation: 'test-lists' }
      },
      {
        path: 'user-lists',
        component: UsersListComponent,
        data: { animation: 'user-lists' }
      },
      {
        path: 'lab-lists',
        component: LabAssitanatListComponent,
        data: { animation: 'lab-lists' }
      },
      {
        path: 'usertest',
        component: UsertestlistComponent,
        data: { animation: 'usertest' }
      },
      {
        path: 'register',
        component:RegisterAssistantComponent,
        data: { animation: 'usertest' }
      }
    ]
  }
];

@NgModule({
  declarations: [SampleComponent, TestListsComponent, DashboardComponent, AppointmentListComponent, LabAssitanatListComponent, UsersListComponent, UsertestlistComponent, ManagerListComponent, RegisterAssistantComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule, NgSelectModule, NgbModule, NgxDatatableModule, ReactiveFormsModule, FormsModule ,BrowserAnimationsModule] ,
  exports: [SampleComponent]
})
export class SampleModule { }
