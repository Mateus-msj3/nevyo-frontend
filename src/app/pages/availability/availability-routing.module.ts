import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AvailabilityFormComponent} from "./availability-form/availability-form.component";
import {AvailabilityListComponent} from "./availability-list/availability-list.component";

const routes: Routes = [
  {
    path: '',
    component: AvailabilityListComponent,
    data: { breadcrumb: 'Availability' }
  },
  {
    path: 'new',
    component: AvailabilityFormComponent,
    data: { breadcrumb: 'New Availability' }
  },
  {
    path: ':id/edit',
    component: AvailabilityFormComponent,
    data: { breadcrumb: 'Edit Availability' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityRoutingModule {
}
