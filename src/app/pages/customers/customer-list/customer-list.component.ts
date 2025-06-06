import {Component, Injector} from '@angular/core';
import {Customer} from "../../../shared/models/customer";
import {BaseResourceListComponent} from "../../../shared/abastracts/base-resource-list";
import {CustomerService} from "../customer.service";
import {environment} from "../../../../enviroments/environment";
import {FilterParams} from "../../../shared/util/paginator/filterParams";
import {HttpParams} from "@angular/common/http";
import {Util} from "../../../shared/util/util";
import {Page} from "../../../shared/util/paginator/page";
import {SortParams} from "../../../shared/util/paginator/sortParams";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent extends BaseResourceListComponent<Customer> {

  filterParams: FilterParams = new FilterParams('0', new SortParams('firstName', 0));

  httpParams: HttpParams = new HttpParams();

  typeUserOptions: SelectItem[] = [
    { label: 'All Types', value: null },
    { label: 'Customer', value: 'CUSTOMER' },
    { label: 'Employee', value: 'EMPLOYEE' }
  ];

  constructor(protected override injector: Injector,
              public customerService: CustomerService,
              private readonly localStorageService: LocalStorageService) {
    super(injector, customerService);
  }

  override onInit() {
    // super.search();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      // Personal Information
      firstName: [null],
      lastName: [null],
      cpfOrCnpj: [null],
      phoneNumber: [null],
      dateOfBirth: [null],

      // Contact Information
      email: [null],
      typeUser: [null],

      // Location Information
      zipCode: [null],
      city: [null],
      state: [null],

      // Account Status
      accountLocked: [false],
      enabled: [true],

      // Hidden/System Fields
      client_id: [environment.clientId]
    });
  }

  protected onLoadList(): void {
  }

  onNew() {
    this.router.navigate(['/customers/new']);
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

  clearFormFilter(): void {
    this.resourceForm.reset({
      // Personal Information
      firstName: null,
      lastName: null,
      cpfOrCnpj: null,
      phoneNumber: null,
      dateOfBirth: null,

      // Contact Information
      email: null,
      typeUser: null,

      // Location Information
      zipCode: null,
      city: null,
      state: null,

      // Account Status - resetando para valores padrão
      accountLocked: false,
      enabled: true,

      // Mantendo o client_id
      client_id: environment.clientId
    });

    // Limpar a tabela e os resultados
    this.table?.reset();
    if (this.page) {
      this.page.content = [];
      this.page.totalElements = 0;
    }
  }

  onEdit(customer: any) {

  }

  onDelete(customer: any) {

  }
}
