// kit-list.component.ts
import {Component, Injector} from '@angular/core';
import {BaseResourceListComponent} from "../../../shared/abastracts/base-resource-list";
import {Product} from "../../../shared/models/product";
import {ProductService} from "../product.service";
import {StoreStateService} from "../../../shared/services/store-state.service";
import {Category} from "../../../shared/models/category";
import {SelectItem} from "primeng/api";
import {Gender} from "../../../shared/enums/gender-enum";
import {FilterParams} from "../../../shared/util/paginator/filterParams";
import {SortParams} from "../../../shared/util/paginator/sortParams";
import {HttpParams} from "@angular/common/http";
import {Page} from "../../../shared/util/paginator/page";
import {CategorySharedService} from "../../../shared/services/category-shared.services";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseResourceListComponent<Product> {

  filterParams: FilterParams = new FilterParams('0', new SortParams('name', 0));
  httpParams: HttpParams = new HttpParams();

  categories: Category[] = [];

  genderOptions: SelectItem[] = [
    { label: 'Todos', value: null },
    { label: 'Masculino', value: Gender.MASCULINO },
    { label: 'Feminino', value: Gender.FEMININO },
    { label: 'Unissex', value: Gender.UNISSEX },
    { label: 'Infantil', value: Gender.INFANTIL }
  ];

  constructor(
    protected override injector: Injector,
    public productService: ProductService,
    private readonly storeStateService: StoreStateService,
    private readonly categorySharedService: CategorySharedService
  ) {
    super(injector, productService);
  }

  protected override onLoadList(): void {
  }

  override onInit() {
    this.loadCategories(this.filterParams, this.httpParams);
  }

  loadCategories(filter: FilterParams, params: HttpParams) {
    this.categorySharedService.loadCategories(filter, params).subscribe((categories: Page<Category>) => {
      this.categories = categories.content;
    });
  }

  protected buildResourceForm(): void {
    const selectedStore = this.storeStateService.getSelectedStore();

    this.resourceForm = this.formBuilder.group({
      sku: [null],
      name: [null],
      minPrice: [null],
      maxPrice: [null],
      gender: [null],
      isAccessory: [null],
      active: [true],
      categoryId: [null],
      storeId: [selectedStore?.id?.toString()]
    });
  }

  filter() {
    super.search();
  }

  onNew() {
    this.router.navigate(['/products/new']);
  }

  onClear() {
    this.resourceForm.reset();
    this.table?.reset();
    this.page!.content = [];
    this.page! .totalElements = 0;
  }
}
