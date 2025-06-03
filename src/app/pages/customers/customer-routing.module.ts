import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CustomerForm} from "./customer-form/customer-form";
import {CustomerList} from "./customer-list/customer-list";

const routes: Routes = [
  {
    path: '',
    component: CustomerList,
  },
  {
    path: 'new',
    component: CustomerForm,
    data: {breadcrumb: 'New Customer'}
  },
  {
    path: ':id/edit',
    component: CustomerForm,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
