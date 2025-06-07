import {Component, Injector} from '@angular/core';
import {BaseResourceListComponent} from "../../../shared/abastracts/base-resource-list";
import {Category} from "../../../shared/models/category";
import {CategoryService} from "../category.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {StoreStateService} from "../../../shared/services/store-state.service";

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(protected override injector: Injector,
              public categoryService: CategoryService,
              private readonly storeStateService: StoreStateService) {
    super(injector, categoryService);
  }

  override onInit() {
  }

  protected buildResourceForm(): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    this.resourceForm = this.formBuilder.group({
      name: [null],
      description: [null],
      storeId: [selectedStore!.id?.toString()]
    });
  }

  protected onLoadList(): void {
  }

  onFilter() {
  }

  onNew() {
    this.router.navigate(['/categories/new']);
  }

  onClear() {
    this.resourceForm.reset();
    this.table?.reset();
    this.page!.content = [];
    this.page!.totalElements = 0;
  }

  filter() {
    super.search();
  }

  cancelFilter() {
  }

  clearFormFilter() {
    this.resourceForm.reset({
      name: null,
      description: null,
    });
  }

}
