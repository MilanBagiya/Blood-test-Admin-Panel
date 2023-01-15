import { StatModule } from '../../../auth/modules/stat/stat.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule, StatModule],
    declarations: []

})
export class DashboardModule { }
