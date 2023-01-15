import { AuthService } from 'app/auth/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentStatusEnum, PaymentModeEnum, ReportStatusEnum } from '../../../auth/models/common.enum';
import { AppointmentsListUpdateModel } from '../../../auth/models/appointmentListUpdate.model';
import { AppintmentListModel } from '../../../auth/models/appointment.model';
import { ApiService } from '../../../auth/service/api.service';
import { BTResponseModel } from '../../../auth/models/general.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabAssistantListModel } from '../../../auth/models/labAssistant.model';

export interface ISelectListModel {
  id: number;
  value: string;
}

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  public signUpFormGroup: FormGroup;

  public contentHeader: object;
  public hideValue: boolean = true;
  public toastStyle: object = {};
  isFormSubmitted: boolean;

  update: string;
  appointmentForm: FormGroup;

  assistantList: ISelectListModel[] = [];

  appointmentList: AppintmentListModel[] = [];
  toastService: any;

  // serverID: number = 10;  
  // serverStatus: string = 'PENDING ';  

  constructor(
    private apiService: ApiService,
    private config: NgbModalConfig,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authService:AuthService

  ) {
    // this.serverStatus = Math.random() > 0.5 ? 'PENDING' : 'COMPLETED';  
  }
  ngOnInit(): void {
    this.getAppintmentList();

  }

  getAppintmentList() {

    this.apiService
      .getData('manager', 'all-appointment', null, null)
      .subscribe(
        (request: BTResponseModel<AppintmentListModel[]>) => {
          if (request.status) {
            this.appointmentList = request.data;

          }
        },
        (error: any) => {

        }
      );
  }

  resetForm(appointment: AppointmentsListUpdateModel) {
    this.appointmentForm = this.fb.group({
      appointmentId: [appointment.appointmentId, [Validators.required]],
      assistantId: [appointment.assistantId > 0 ? appointment.assistantId : '', [Validators.required]],
    });
  }

  openUpdateAssistantModel(appointment: AppointmentsListUpdateModel, content: any) {
    this.update = 'Update';
    this.assistantList = [];
    this.apiService.getData('manager', 'laboratoryManagerList', null, null)
      .subscribe((result: BTResponseModel<LabAssistantListModel[]>) => {
        if (result.status && result.data) {
          result.data.forEach(x => {
            this.assistantList.push({
              id: x.user_id,
              value: x.name
            })

            this.resetForm(appointment);
            this.config.backdrop = 'static';
            this.config.keyboard = false;
            this.modalService.open(content);
          })
        }
      }, (err: any) => {

      });
  }


  getPaymentStatusKey(paymentStatus: PaymentStatusEnum) {
    return PaymentStatusEnum[paymentStatus];
  }

  getPaymentModeKey(paymentMode: PaymentModeEnum) {
    return PaymentModeEnum[paymentMode];
  }

  getReportStatusKey(reportStatus: ReportStatusEnum) {
    return ReportStatusEnum[reportStatus];
  }

  saveAppointment() {
    if (this.appointmentForm.valid) {
      this.apiService.saveData('manager', 'assignAssistant', null, this.appointmentForm.value)
        .subscribe((res: BTResponseModel<null>) => {
          if (res.status) {
            this.modalService.dismissAll();
          }
          this.getAppintmentList();
          this.authService.showSucceessMessage(res.message);
          // alert(res.message);
        })
    }
  }

  // InputChange(fileInputEvent: any,) {
  //   debugger
  //   this.onUplod(fileInputEvent.target.files[0])
  // }
  // onUplod(file: File) {
  //   debugger
  //   const formData = new FormData();
  //   const model = {
  //     appointmentId: 17,
  //     reportStatus: ReportStatusEnum.COMPLETED,
  //   };
  //   formData.append('userObj', JSON.stringify(model));
  //   formData.append('file', file);
  //   this.apiService.uploadFile('assistants', 'reportDetail', null, formData)
  //     .subscribe((response: BTResponseModel<null>) => {
  //       this.isFormSubmitted = false;
  //       if (response.status) {
  //         alert(response.message);
  //       } else {
  //         alert(response.message);
  //       }
  //     }, (error: any) => {
  //       this.isFormSubmitted = false;
  //       console.error(error);
  //     }, () => {
  //       this.isFormSubmitted = false;
  //     });
  // }
}
