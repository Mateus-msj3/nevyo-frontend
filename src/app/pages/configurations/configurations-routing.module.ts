import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ConfigurationFormComponent} from "./configuration-form/configuration-form.component";

const routes: Routes = [
  {
    path: '',
    component: ConfigurationFormComponent,
    data: { breadcrumb: 'Configurations' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule {
}
