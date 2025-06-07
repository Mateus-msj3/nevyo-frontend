import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {CategoryListComponent} from "./category-list/category-list.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    data: { breadcrumb: 'Categories' }
  },
  {
    path: 'new',
    component: CategoryFormComponent,
    data: { breadcrumb: 'New Category' }
  },
  {
    path: ':id/edit',
    component: CategoryFormComponent,
    data: { breadcrumb: 'Edit Category' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
