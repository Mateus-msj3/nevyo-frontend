import {BaseResourceModel} from "../abastracts/base-resource-model";

export class Store extends BaseResourceModel {
  constructor(
    public tenantId?: string,
    public name?: string,
    public slug?: string,
    public email?: string,
    public phone?: string,
    public whatsapp?: string,
    public instagram?: string,
    public bannerUrl?: string,
    public logoUrl?: string,
    public flagUrl?: string,
    public openTime?: string,  // Using string for LocalTime
    public closeTime?: string, // Using string for LocalTime
    public about?: string,
    public maxKitsPerPickup?: number,
    public theme?: string,
    public active: boolean = true,
    // Address fields
    public zipCode?: string,
    public street?: string,
    public number?: string,
    public complement?: string,
    public district?: string,
    public city?: string,
    public state?: string
  ) {
    super();
  }

  static fromJson(jsonData: any): Store {
    return Object.assign(new Store(), jsonData);
  }
}
