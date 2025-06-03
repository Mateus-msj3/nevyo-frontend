import {Component, Injector} from '@angular/core';
import {Util} from "../../../shared/util/util";
import {FileSelectEvent} from "primeng/fileupload";
import {Customer} from "../../../shared/models/customer";
import {BaseResourceFormComponent} from "../../../shared/abastracts/base-resource-form.component";
import {CustomerService} from "../customer.service";
import {User} from "../../../shared/models/user";
import {Validators} from "@angular/forms";
import {ConfigurationService} from "../../configurations/configuration.service";
import {HttpClient} from "@angular/common/http";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss'
})
export class CustomerForm extends BaseResourceFormComponent<Customer> {

  activeIndex: number = 0;

  protected readonly Util = Util;

  urlImageProfile!: string | undefined;

  typeUserOptions: SelectItem[] = [{label: 'Customer', value: 'CUSTOMER'}, {label: 'Employee', value: 'EMPLOYEE'}];

  constructor(protected override injector: Injector,
              public readonly customerService: CustomerService,
              public readonly configurationService: ConfigurationService,
              private readonly http: HttpClient) {
    super(injector, new Customer(), customerService, Customer.fromJson)
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      cpfOrCnpj: [null, [Validators.required]],
      dateOfBirth: [null],
      password: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null],
      accountLocked: [false],
      enabled: [true],
      originalFileName: [null],
      urlImageProfile: [null],
      typeUser: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      street: [null, [Validators.required]],
      number: [null, [Validators.required]],
      complement: [null],
      district: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]]
    });
  }

  protected init(): void {
  }

  protected override creationPageTitle(): string {
    return "New Customer Registration";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource?.firstName || "";
    return "Editing Customer: " + resourceName;
  }

  override afterLoadResource(resource: Customer) {
    this.urlImageProfile = resource.urlImageProfile;
  }

  override afterSave(resource: User) {
    this.configurationService.createDefaultConfigurationFromUser(resource.id!).subscribe(() => {
    });
  }

  toBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  onSelect(event: FileSelectEvent): void {
    for (const file of event.files) {
      this.toBase64(file, (base64String) => {
        this.resourceForm.patchValue({
          urlImageProfile: base64String,
          originalFileName: file.name
        })
        this.urlImageProfile = base64String;
      });
    }
  }

  searchZipCode() {
    const zipCode = this.resourceForm.get('zipCode')?.value?.replace(/\D/g, '');

    if (zipCode?.length !== 8) {
      return;
    }

    this.http.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      .subscribe({
        next: (data: any) => {
          if (!data.erro) {
            this.resourceForm.patchValue({
              street: data.logradouro,
              district: data.bairro,
              city: data.localidade,
              state: data.uf,
              complement: data.complemento
            });
          } else {
            this.customMessageService.showInfo("Information", "CEP not found");
          }
        },
        error: (error) => {
          this.customMessageService.showError("Error", "Error searching CEP" + error);
        }
      });
  }
}
