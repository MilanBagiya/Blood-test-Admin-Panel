export enum LocalStorePath {
  // accessToken = 'accessToken',
  user = 'user',
  accessToken = "accessToken"
}


export enum UserRoles {
  user = 1,
  laborataryAssistant = 2,
  manager = 3,
}

export enum PaymentStatusEnum {
    PAID = 0,
    NOT_PAID = 1
}

export enum PaymentModeEnum {
    ONLINE = 0,
    OFFLINE = 1
}

export enum ReportStatusEnum {
    PENDING = 0,
    RESULT_PENDING = 1,
    COMPLETED = 2
}