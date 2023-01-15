import { Component, OnInit } from '@angular/core';
import { UserListModel } from '../../../auth/models/user.model';
import { ApiService } from './../.././../auth/service/api.service';
import { BTResponseModel } from './../../../auth/models/general.model';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {

    ManagerList: UserListModel[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.getUserList();
  }

  
  getUserList() {
    this.apiService
      .getData('user', 'findAllUser', null, null)
      .subscribe(
        (request: BTResponseModel<UserListModel[]>) => {
          if (request.status) {
            this.ManagerList = request.data;
          }
        },
        (error: any) => {

        }
      );
  }


}

