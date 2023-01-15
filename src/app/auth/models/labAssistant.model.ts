import { UserRoles } from "./common.enum";

export class LabAssistantListModel {
    appointmentId: number;
    user_id: number;
    name: string;
    lastName: string;
    email: string;
    address: string;
    mobile_no: string;
    userRole: UserRoles;
}