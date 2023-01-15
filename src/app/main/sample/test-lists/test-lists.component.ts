  import { BTResponseModel } from './../../../auth/models/general.model';
  import { TestListModel } from './../../../auth/models/test.model';
  import { Component, OnInit } from '@angular/core';
  import { ApiService } from './../../../auth/service/api.service';


@Component({
  selector: 'app-test-lists',
  templateUrl: './test-lists.component.html',
  styleUrls: ['./test-lists.component.scss'],
})
export class TestListsComponent implements OnInit{
 
  testList: TestListModel[] = [];

  constructor(private apiService: ApiService) {
   
  }

  ngOnInit(): void {
    this.getTestList();
  }

  getTestList() {
    this.apiService
      .getData('tests', 'findAllTest', null, null)
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

}

 
//   public selectedStatus = [];
//   public searchValue = '';
//   public contentHeader: object;
//   public previousStatusFilter = '';
//   public rows;
//   public tempFilterData;
//   show = false;

 
//   ngOnInit() {
//     this.contentHeader = {
//       headerTitle: 'Home',
//       actionButton: true,
//       breadcrumb: {
//         type: '',
//         links: [
//           {
//             name: 'ad',
//             isLink: true,
//             link: '/'
//           },
//           {
//             name: 'Sample',
//             isLink: false
//           }
//         ]
//       }
//     }

//     let response = [
//       {
//         id: 1,
//         name: "name",
//         description:"dsassdfffffffffffad",
//         productPrice:"@zxcc",
//       }
//     ]

//   }

// }
