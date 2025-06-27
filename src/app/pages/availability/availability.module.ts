import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {AvailabilityRoutingModule} from "./availability-routing.module";
import {AvailabilityFormComponent} from './availability-form/availability-form.component';
import {AvailabilityListComponent} from "./availability-list/availability-list.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import {ConfirmationService} from "primeng/api";


@NgModule({
  declarations: [
    AvailabilityFormComponent,
    AvailabilityListComponent,
  ],
  imports: [
    SharedModule,
    AvailabilityRoutingModule,
    FullCalendarModule
  ],
  exports: [
    AvailabilityFormComponent,
    AvailabilityListComponent,
  ],
  providers: [
    ConfirmationService
  ]
})
export class AvailabilityModule {
}
