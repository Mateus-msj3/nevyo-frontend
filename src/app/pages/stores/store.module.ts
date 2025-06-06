import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {StoreRoutingModule} from "./store-routing.module";
import {StoreFormComponent} from './store-form/store-form.component';
import {StoreListComponent} from "./store-list/store-list.component";
import {NgxMaskModule} from "ngx-mask";
import {SkeletonModule} from "primeng/skeleton";


@NgModule({
  declarations: [
    StoreFormComponent,
    StoreListComponent,
  ],
  imports: [
    SharedModule,
    StoreRoutingModule,
    NgxMaskModule.forRoot(),
    SkeletonModule
  ]
})
export class StoreModule {
}
