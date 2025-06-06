import {Component, Injector} from '@angular/core';
import {BaseResourceListComponent} from "../../../shared/abastracts/base-resource-list";
import {StoreService} from "../store.service";
import {FilterParams} from "../../../shared/util/paginator/filterParams";
import {HttpParams} from "@angular/common/http";
import {SortParams} from "../../../shared/util/paginator/sortParams";
import {SelectItem} from "primeng/api";
import {Store} from "../../../shared/models/store";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent extends BaseResourceListComponent<Store> {

  filterParams: FilterParams = new FilterParams('0', new SortParams('name', 0));
  httpParams: HttpParams = new HttpParams();

  themeOptions: SelectItem[] = [
    { label: 'All Themes', value: null },
    { label: 'Light', value: 'LIGHT' },
    { label: 'Dark', value: 'DARK' },
    { label: 'Custom', value: 'CUSTOM' }
  ];

  constructor(
    protected override injector: Injector,
    public storeService: StoreService
  ) {
    super(injector, storeService);
  }

  override onInit() {
    // super.search();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      // Basic Information
      name: [null],
      slug: [null],

      // Contact Information
      email: [null],
      phone: [null],
      whatsapp: [null],
      instagram: [null],

      // Operating Hours
      openTime: [null],
      closeTime: [null],

      // Business Details
      maxKitsPerPickup: [null],
      theme: [null],

      // Location Information
      zipCode: [null],
      city: [null],
      state: [null],

      // Status
      active: [true],

      // System Fields
      tenantId: [null]
    });
  }

  onNew() {
    this.router.navigate(['/stores/new']);
  }

  clearFormFilter(): void {
    this.resourceForm.reset({
      name: null,
      slug: null,
      email: null,
      phone: null,
      whatsapp: null,
      instagram: null,
      openTime: null,
      closeTime: null,
      maxKitsPerPickup: null,
      theme: null,
      zipCode: null,
      city: null,
      state: null,
      active: true,
      tenantId: null
    });

    this.table?.reset();
    if (this.page) {
      this.page.content = [];
      this.page.totalElements = 0;
    }
  }

  protected onLoadList(): void {
  }

  onClear() {
    this.resourceForm.reset();
    this.table?.reset();
    this.page!.content = [];
    this.page! .totalElements = 0;
  }

  filter() {
    super.search();
  }

}
