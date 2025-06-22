import {Component, Injector} from '@angular/core';
import {BaseResourceListComponent} from "../../../shared/abastracts/base-resource-list";
import {KitService} from "../kit.service";
import {StoreStateService} from "../../../shared/services/store-state.service";
import {SelectItem} from "primeng/api";
import {Gender} from "../../../shared/enums/gender-enum";
import {Kit} from "../../../shared/models/kit";

@Component({
  selector: 'app-kit-list',
  templateUrl: './kit-list.component.html',
  styleUrls: ['./kit-list.component.scss']
})
export class KitListComponent extends BaseResourceListComponent<Kit> {

  genderOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Male', value: Gender.MASCULINO },
    { label: 'Female', value: Gender.FEMININO },
    { label: 'Unisex', value: Gender.UNISSEX },
    { label: 'Kids', value: Gender.INFANTIL }
  ];

  constructor(
    protected override injector: Injector,
    public kitService: KitService,
    private readonly storeStateService: StoreStateService
  ) {
    super(injector, kitService);
  }

  protected override buildResourceForm(): void {
    const selectedStore = this.storeStateService.getSelectedStore();

    this.resourceForm = this.formBuilder.group({
      name: [null],
      minPrice: [null],
      maxPrice: [null],
      gender: [null],
      active: [true],
      storeId: [selectedStore?.id?.toString()]
    });
  }

  filter(): void {
    super.search();
  }

  onNew(): void {
    this.router.navigate(['/kits/new']);
  }

  onClear(): void {
    this.resourceForm.reset();
    this.table?.reset();
    this.page!.content = [];
    this.page!.totalElements = 0;
  }

  protected onLoadList(): void {
  }
}
