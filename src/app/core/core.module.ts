import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SharedModule} from "primeng/api";
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {AppLayoutModule} from "../layout/app.layout.module";
import {LoaderComponent} from "./componentes/loader/loader.component";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    AppLayoutModule,
    RouterModule,
    PasswordModule,
    CheckboxModule,
    LoaderComponent,
    SharedModule
  ],
  providers: [
  ]
})
export class CoreModule {
}
