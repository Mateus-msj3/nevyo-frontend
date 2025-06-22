import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {KitListComponent} from "./kit-list/./kit-list.component";
import {KitFormComponent} from "./kit-form/kit-form.component";

const routes: Routes = [
  {
    path: '',
    component: KitListComponent,
  },
  {
    path: 'new',
    component: KitFormComponent,
    data: {breadcrumb: 'New Product'}
  },
  {
    path: ':id/edit',
    component: KitFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitsRoutingModule {
}
