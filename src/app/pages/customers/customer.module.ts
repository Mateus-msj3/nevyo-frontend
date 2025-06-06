import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CustomerRoutingModule} from "./customer-routing.module";
import { CustomerFormComponent } from './customer-form/customer-form.component';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class CustomerModule {
}
