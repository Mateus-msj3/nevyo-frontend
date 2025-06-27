import {BaseResourceModel} from "../abastracts/base-resource-model";
import {Product} from "./product";
import {ProductSize} from "./product-size";
import {Store} from "./store";

export class Availability extends BaseResourceModel {
  constructor(
    public product?: Product,
    public size?: ProductSize,
    public store?: Store,
    public date?: string, // Usando string para representar LocalDate
    public quantity: number = 0, // Estoque base
    public rented: number = 0, // Itens alugados
    public reserved: number = 0, // Reservas não confirmadas
    public manuallyBlocked: boolean = false,
    public blockReason?: string // Motivo do bloqueio (opcional)
  ) {
    super();
  }

  // Método para calcular disponibilidade
  public getAvailable(): number {
    return this.manuallyBlocked ? 0 : Math.max(this.quantity - this.rented - this.reserved, 0);
  }

  // Método para converter JSON em objeto Availability
  static fromJson(jsonData: any): Availability {
    return Object.assign(new Availability(), jsonData);
  }

  // Método opcional para validar se todos os campos obrigatórios estão preenchidos
  public isValid(): boolean {
    return !!(
      this.product &&
      this.size &&
      this.store &&
      this.date &&
      typeof this.quantity === 'number' &&
      typeof this.rented === 'number' &&
      typeof this.reserved === 'number' &&
      typeof this.manuallyBlocked === 'boolean'
    );
  }
}

