import { AuthService } from 'app/auth/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppointmentsListUpdateModel } from 'app/auth/models/appointmentListUpdate.model';
import { PaymentModeEnum, PaymentStatusEnum, ReportStatusEnum } from 'app/auth/models/common.enum';
import { BTResponseModel } from './../../../auth/models/general.model';
import { TestListModel } from './../../../auth/models/test.model';
import { ApiService } from './../../../auth/service/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usertestlist',
  templateUrl: './usertestlist.component.html',
  styleUrls: ['./usertestlist.component.scss']
})
export class UsertestlistComponent implements OnInit {

  testList: TestListModel[] = [];
  isFormSubmitted: boolean;



  constructor(private apiService: ApiService, private authService: AuthService,private toastr: ToastrService) { }
  ngOnInit() {
    this.getUserTestList();

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


  getUserTestList() {
    this.apiService
      .getData('assistants', 'getUserAssignList', null, null)
      .subscribe(
        (request: BTResponseModel<TestListModel[]>) => {
          if (request.status) {
            this.testList = request.data;
          }
        },
        (error: any) => {

        }
      );
  }

  InputChange(fileInputEvent: any, appointmentId: number) {
    
    this.onUplod(fileInputEvent.target.files[0], appointmentId);
  }
  onUplod(file: File, appointment: number) {
    const formData = new FormData();
    const model = {
      appointmentId: appointment,
      reportStatus: ReportStatusEnum.COMPLETED,
    };
    formData.append('userObj', JSON.stringify(model));
    formData.append('file', file);
    this.apiService.uploadFile('assistants', 'reportDetail', null, formData)
      .subscribe((response: BTResponseModel<AppointmentsListUpdateModel[]>) => {
        this.isFormSubmitted = false;
        if (response.status) {
          this.getUserTestList();
          this.authService.showSucceessMessage(response.message);
          // this.toastr.warning(response.message);
        } else {
          // alert(response.message);
          this.authService.showSucceessMessage(response.message);
        }
      }, (error: any) => {
        this.isFormSubmitted = false;
        console.error(error);
      }, () => {
        this.isFormSubmitted = false;
      });
  }

}
