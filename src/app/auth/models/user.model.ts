import { UserRoles } from "./common.enum";

export class LocalUserModel {
    fullName: string;
    role: UserRoles;
}

export class LoginUserModel {
    fullName: string;
    role: UserRoles;
    token: string;
}

export class UserListModel {
    id: number;
    name: string;
    lastName: string;
    email: string;
    address: string;
    mobile_no: string;
    userRole: UserRoles;
}

export class UserSignUpmodel{
    name: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    address: string =' ';
    mobile_no: string = '';
    userRole: string = '';
}