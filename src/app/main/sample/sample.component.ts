import {  Component,  OnInit } from '@angular/core'

export interface ISelectListModel {
  id: number;
  value: string;
}

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})


export class SampleComponent implements OnInit {


  constructor() {
 
  }
  ngOnInit() {
   
  }
}
