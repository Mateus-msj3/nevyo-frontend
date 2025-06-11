import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ProductsRoutingModule} from "./products-routing.module";
import { ProductFormComponent } from './product-form/product-form.component';
import {ProductListComponent} from "./product-list/product-list.component";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class ProductsModule {
}
