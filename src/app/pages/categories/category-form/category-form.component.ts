import {Component, Injector} from '@angular/core';
import {Validators} from "@angular/forms";
import {BaseResourceFormComponent} from "../../../shared/abastracts/base-resource-form.component";
import {Category} from "../../../shared/models/category";
import {CategoryService} from "../category.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {StoreStateService} from "../../../shared/services/store-state.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  activeIndex: number = 0;

  constructor(
    protected override injector: Injector,
    public readonly categoryService: CategoryService,
    private readonly storeStateService: StoreStateService
  ) {
    super(injector, new Category(), categoryService, Category.fromJson);
  }

  protected init(): void {
  }

  protected buildResourceForm(): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required, Validators.minLength(2)]],
      storeId: [selectedStore!.id?.toString()]
    });
  }

  protected override creationPageTitle(): string {
    return "New Category";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editing Category: " + resourceName;
  }


}
