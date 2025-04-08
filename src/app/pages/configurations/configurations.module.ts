import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ConfigurationsRoutingModule} from "./configurations-routing.module";
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';


@NgModule({
  declarations: [
    ConfigurationFormComponent
  ],
  imports: [
    SharedModule,
    ConfigurationsRoutingModule
  ]
})
export class ConfigurationsModule {
}
