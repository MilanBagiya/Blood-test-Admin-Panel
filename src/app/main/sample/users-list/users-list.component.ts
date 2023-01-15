import { Component, OnInit } from '@angular/core';
import { UserListModel } from '../../../auth/models/user.model';
import { ApiService } from './../.././../auth/service/api.service';
import { BTResponseModel } from './../../../auth/models/general.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  userList: UserListModel[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.getUserList();
  }

  
  getUserList() {
    debugger
    this.apiService
      .getData('user', 'findAllUser', null, null)
      .subscribe(
        (request: BTResponseModel<UserListModel[]>) => {
          debugger
          if (request.status) {
            this.userList = request.data;
          }
        },
        (error: any) => {

        }
      );
  }


}
