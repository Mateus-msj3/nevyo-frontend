import {BaseResourceModel} from "../abastracts/base-resource-model";
import {Product} from "./product";

export class KitAccessory extends BaseResourceModel {
  constructor(
    public product?: Product,
    public description?: string,
    public recommended?: boolean,
    public kitId?: string,
    public productId?: string
  ) {
    super();
    this.recommended = recommended || false;
  }

  static fromJson(jsonData: any): KitAccessory {
    return Object.assign(new KitAccessory(), jsonData);
  }
}
