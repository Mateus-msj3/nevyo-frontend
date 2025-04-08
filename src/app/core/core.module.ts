import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SharedModule} from "primeng/api";
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {AppLayoutModule} from "../layout/app.layout.module";
import {LoaderComponent} from "./componentes/loader/loader.component";


@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
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
