import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StoreFormComponent} from "./store-form/store-form.component";
import {StoreListComponent} from "./store-list/store-list.component";

const routes: Routes = [
  {
    path: '',
    component: StoreListComponent,
  },
  {
    path: 'new',
    component: StoreFormComponent,
    data: {breadcrumb: 'New Store'}
  },
  {
    path: ':id/edit',
    component: StoreFormComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
