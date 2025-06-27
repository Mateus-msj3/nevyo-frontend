import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceListComponent } from "../../../shared/abastracts/base-resource-list";
import { AvailabilityService } from "../availability.service";
import { StoreStateService } from "../../../shared/services/store-state.service";
import { Availability } from "../../../shared/models/availability";
import { FormBuilder } from "@angular/forms";
import { ProductService } from "../../products/product.service";
import { Product } from "../../../shared/models/product";
import { ProductSize } from "../../../shared/models/product-size";

// FullCalendar imports
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.scss']
})
export class AvailabilityListComponent extends BaseResourceListComponent<Availability> implements OnInit {

  calendarOptions: CalendarOptions | undefined;
  showDialog: boolean = false;
  selectedAvailability: Availability | null = null;
  view: 'display' | 'edit' | 'new' = 'display';
  dialogHeader: string = '';

  // Dados para os filtros
  products: Product[] = [];
  sizes: ProductSize[] = [];
  blockViewOptions = [
    { label: 'All', value: 'all' },
    { label: 'Blocked Only', value: 'blocked' },
    { label: 'Available Only', value: 'available' }
  ];

  hasChanges: boolean = false;
  private originalAvailabilities: Availability[] = [];
  private modifiedAvailabilities: Set<Availability> = new Set();

  constructor(
    protected override injector: Injector,
    public availabilityService: AvailabilityService,
    private readonly storeStateService: StoreStateService,
    private readonly productService: ProductService,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
    super(injector, availabilityService);
    this.initializeCalendar();
  }

  override onInit() {
    this.loadProducts();
    this.buildResourceForm();
  }

  protected override onLoadList(): void {
  }

  protected buildResourceForm(): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    this.resourceForm = this.fb.group({
      productId: [null],
      sizeId: [null],
      showBlocked: ['all'],
      storeId: [selectedStore?.id?.toString()]
    });

    // Observar mudanças nos filtros
    this.resourceForm.valueChanges.subscribe(() => {
      this.loadAvailabilities();
    });
  }

  private initializeCalendar(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: (e: any) => this.onEventClick(e),
      select: (e: any) => this.onDateSelect(e),
      eventContent: this.renderEventContent.bind(this)
    };
  }

  private loadProducts(): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    if (selectedStore) {
      this.productService.getAll().subscribe(products => {
        this.products = products.filter(p => p.store?.id === selectedStore.id);
      });
    }
  }

  onProductChange(event: any): void {
    const productId = event.value;
    if (productId) {
      const product = this.products.find(p => p.id === productId);
      this.sizes = product?.sizes || [];
    } else {
      this.sizes = [];
    }
    this.resourceForm.patchValue({ sizeId: null });
  }

  loadAvailabilities(): void {
    const filters = this.resourceForm.value;
    this.availabilityService.getFiltered(filters).subscribe(availabilities => {
      const events = this.mapAvailabilitiesToEvents(availabilities);
      this.calendarOptions = { ...this.calendarOptions, events };
    });
  }

  private mapAvailabilitiesToEvents(availabilities: Availability[]): any[] {
    return availabilities.map(availability => ({
      id: availability.id,
      start: availability.date,
      end: availability.date,
      availability: availability,
      backgroundColor: this.getAvailabilityColor(availability),
      borderColor: this.getAvailabilityColor(availability),
      display: 'background'
    }));
  }

  private getAvailabilityColor(availability: Availability): string {
    if (availability.manuallyBlocked) return '#6c757d'; // Cinza para bloqueado
    const available = availability.getAvailable();
    if (available === 0) return '#dc3545'; // Vermelho para indisponível
    if (available < availability.quantity) return '#ffc107'; // Amarelo para parcialmente disponível
    return '#28a745'; // Verde para totalmente disponível
  }

  getAvailabilityStatus(availability: Availability): { severity: string; label: string } {
    if (availability.manuallyBlocked) {
      return { severity: 'danger', label: 'BLOCKED' };
    }
    const available = availability.getAvailable();
    if (available === 0) {
      return { severity: 'danger', label: 'UNAVAILABLE' };
    }
    if (available < availability.quantity) {
      return { severity: 'warning', label: 'PARTIAL' };
    }
    return { severity: 'success', label: 'AVAILABLE' };
  }

  onEventClick(e: any): void {
    this.selectedAvailability = { ...e.event.extendedProps.availability };
    this.view = 'display';
    this.dialogHeader = 'Availability Details';
    this.showDialog = true;
  }

  onDateSelect(e: any): void {
    // Criar nova disponibilidade
    this.selectedAvailability = new Availability();
    this.selectedAvailability.date = e.startStr;
    this.selectedAvailability.product = this.products.find(p => p.id === this.resourceForm.get('productId')?.value);
    this.selectedAvailability.size = this.sizes.find(s => s.id === this.resourceForm.get('sizeId')?.value);
    this.selectedAvailability.store = this.storeStateService.getSelectedStore()!;

    this.view = 'new';
    this.dialogHeader = 'New Availability';
    this.showDialog = true;
  }

  onEditClick(): void {
    this.view = 'edit';
    this.dialogHeader = 'Edit Availability';
  }

  // Modifique o método handleSave para salvar todas as mudanças
  handleSave(): void {
    if (!this.selectedAvailability) return;

    if (this.view === 'new') {
        this.availabilityService.create(this.selectedAvailability)
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Availability created successfully'
                    });
                    this.loadAvailabilities();
                    this.showDialog = false;
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error creating availability'
                    });
                }
            });
    } else if (this.view === 'edit') {
        this.availabilityService.update(this.selectedAvailability)
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Changes saved successfully'
                    });
                    this.loadAvailabilities();
                    this.showDialog = false;
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error saving changes'
                    });
                }
            });
    }
}

  // Modifique o método que atualiza a disponibilidade
  updateAvailability(availability: Availability): void {
    this.modifiedAvailabilities.add(availability);
    this.hasChanges = true;
  }

  cancelEdit(): void {
    this.showDialog = false;
    this.selectedAvailability = null;
  }

  // Método para renderizar o conteúdo do evento no calendário
  private renderEventContent(eventInfo: any): any {
    const availability: Availability = eventInfo.event.extendedProps.availability;
    return {
      html: `<div class="availability-event">
              <div class="quantity">${availability.getAvailable()}/${availability.quantity}</div>
             </div>`
    };
  }

  // Sobrescreva o método filter
  filter(): void {
    if (this.hasChanges) {
      this.confirmationService.confirm({
        message: 'You have unsaved changes. Do you want to continue?',
        accept: () => {
          this.loadAvailabilities();
          this.modifiedAvailabilities.clear();
          this.hasChanges = false;
        }
      });
    } else {
      this.loadAvailabilities();
    }
  }

  // Sobrescreva o método onClear
  onClear(): void {
    if (this.hasChanges) {
      this.confirmationService.confirm({
        message: 'You have unsaved changes. Do you want to continue?',
        accept: () => {
          this.resourceForm.reset();
          this.modifiedAvailabilities.clear();
          this.hasChanges = false;
          this.loadAvailabilities();
        }
      });
    } else {
      this.resourceForm.reset();
      this.loadAvailabilities();
    }
  }
}
