import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SharedModule} from "primeng/api";
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {AppLayoutModule} from "../layout/app.layout.module";
import {LoaderComponent} from "./componentes/loader/loader.component";
import {NgxMaskModule} from "ngx-mask";
import {StoreSelectorComponent} from "./componentes/store-selector/store-selector.component";
import {SkeletonModule} from "primeng/skeleton";
import {AvatarModule} from "primeng/avatar";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {DockModule} from "primeng/dock";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    LoaderComponent,
    StoreSelectorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    SkeletonModule,
    AvatarModule,
    TagModule,
    ButtonModule,
    DockModule,
    FormsModule,
  ],
  exports: [
    AppLayoutModule,
    RouterModule,
    PasswordModule,
    CheckboxModule,
    LoaderComponent,
    SharedModule,
    StoreSelectorComponent,
    InputTextModule

  ],
  providers: [
  ]
})
export class CoreModule {
}
