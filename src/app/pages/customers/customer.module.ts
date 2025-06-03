import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CustomerRoutingModule} from "./customer-routing.module";
import { CustomerForm } from './customer-form/customer-form';
import {CustomerList} from "./customer-list/customer-list";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    CustomerForm,
    CustomerList
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class CustomerModule {
}
