import { PaymentModeEnum, PaymentStatusEnum, ReportStatusEnum } from './common.enum';

export class AppintmentListModel {
    appointmentId: number;
    appointment_date: Date;
    paymentMode: PaymentModeEnum;
    paymentStatus: PaymentStatusEnum;
    reportStatus: ReportStatusEnum;
    userFullName: string;
    assistantName: string;
    mobile_no: string;
}

export class SelectListModel {
    Value: string;
    Text: string;
  }