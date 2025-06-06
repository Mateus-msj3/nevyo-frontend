import {Component, Injector} from '@angular/core';
import {BaseResourceFormComponent} from "../../../shared/abastracts/base-resource-form.component";
import {Store} from "../../../shared/models/store";
import {StoreService} from "../store.service";
import {Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {SelectItem} from "primeng/api";
import {FileUploadHandlerEvent} from "primeng/fileupload";

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent extends BaseResourceFormComponent<Store> {

  activeIndex: number = 0;
  logoUrl?: string;
  bannerUrl?: string;
  flagUrl?: string;

  themeOptions: SelectItem[] = [
    {label: 'Light', value: 'LIGHT'},
    {label: 'Dark', value: 'DARK'},
    {label: 'Custom', value: 'CUSTOM'}
  ];

  constructor(
    protected override injector: Injector,
    public storeService: StoreService,
    private readonly http: HttpClient
  ) {
    super(injector, new Store(), storeService, Store.fromJson);
  }

  protected override init(): void {
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      tenantId: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      slug: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null],
      whatsapp: [null],
      instagram: [null],
      bannerUrl: [null],
      logoUrl: [null],
      flagUrl: [null],
      openTime: [null, [Validators.required]],
      closeTime: [null, [Validators.required]],
      about: [null],
      maxKitsPerPickup: [1, [Validators.min(1)]],
      theme: ['LIGHT'],
      active: [true],
      zipCode: [null, [Validators.required]],
      street: [null, [Validators.required]],
      number: [null, [Validators.required]],
      complement: [null],
      district: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]]
    });
  }

  onImageSelect(event: FileUploadHandlerEvent, imageType: 'logo' | 'banner' | 'flag'): void {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      this.toBase64(file, (base64String) => {
        switch (imageType) {
          case 'logo':
            this.logoUrl = base64String;
            this.resourceForm.patchValue({logoUrl: base64String});
            break;
          case 'banner':
            this.bannerUrl = base64String;
            this.resourceForm.patchValue({bannerUrl: base64String});
            break;
          case 'flag':
            this.flagUrl = base64String;
            this.resourceForm.patchValue({flagUrl: base64String});
            break;
        }
      });
    }
  }

  private toBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  searchZipCode(): void {
    const zipCode = this.resourceForm.get('zipCode')?.value?.replace(/\D/g, '');
    if (zipCode?.length !== 8) return;

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
            this.customMessageService.showInfo("Informação", "CEP não encontrado");
          }
        },
        error: (error) => {
          this.customMessageService.showError("Erro", "Erro ao buscar CEP: " + error);
        }
      });
  }

  override beforeSave(): void {
    const openTime = this.resourceForm.get('openTime')?.value;
    const closeTime = this.resourceForm.get('closeTime')?.value;

    if (openTime) {
      const formattedOpenTime = this.formatTime(openTime);
      this.resourceForm.patchValue({openTime: formattedOpenTime});
    }

    if (closeTime) {
      const formattedCloseTime = this.formatTime(closeTime);
      this.resourceForm.patchValue({closeTime: formattedCloseTime});
    }
  }

  private formatTime(date: Date): string {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  override afterLoadResource(resource: Store): void {
    if (resource.openTime) {
      const [hours, minutes] = resource.openTime.split(':');
      const openTime = new Date();
      openTime.setHours(parseInt(hours), parseInt(minutes));
      this.resourceForm.patchValue({openTime});
    }

    if (resource.closeTime) {
      const [hours, minutes] = resource.closeTime.split(':');
      const closeTime = new Date();
      closeTime.setHours(parseInt(hours), parseInt(minutes));
      this.resourceForm.patchValue({closeTime});
    }
  }

  protected override creationPageTitle(): string {
    return "New Store Registration";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource?.name || "";
    return "Editing Store: " + resourceName;
  }

}
