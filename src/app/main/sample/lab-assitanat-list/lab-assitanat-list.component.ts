import { Component, OnInit } from '@angular/core';
import { LabAssistantListModel } from '../../../auth/models/labAssistant.model';
import { BTResponseModel } from './../../../auth/models/general.model';
import { ApiService } from './../../../auth/service/api.service';

@Component({
  selector: 'app-lab-assitanat-list',
  templateUrl: './lab-assitanat-list.component.html',
  styleUrls: ['./lab-assitanat-list.component.scss']
})
export class LabAssitanatListComponent implements OnInit {

  assistantList: LabAssistantListModel[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.getAssistantList();
  }
  getAssistantList() {
    this.apiService
      .getData('manager', 'laboratoryManagerList', null, null)
      .subscribe(
        (request: BTResponseModel<LabAssistantListModel[]>) => {
          if (request.status) {
            this.assistantList = request.data;
          }
        },
        (error: any) => {

        }
      );
  }
}
