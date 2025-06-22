import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {KitsRoutingModule} from "./kits-routing.module";
import { KitFormComponent } from './kit-form/kit-form.component';
import {KitListComponent} from "./kit-list/./kit-list.component";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    KitFormComponent,
    KitListComponent
  ],
  imports: [
    SharedModule,
    KitsRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class KitsModule {
}
