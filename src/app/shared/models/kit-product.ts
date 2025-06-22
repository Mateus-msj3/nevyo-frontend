import {BaseResourceModel} from "../abastracts/base-resource-model";
import {Product} from "./product";

export class KitProduct extends BaseResourceModel {
  constructor(
    public product?: Product,
    public required?: boolean,
    public kitId?: string,
    public productId?: string
  ) {
    super();
    this.required = required || true;
  }

  static fromJson(jsonData: any): KitProduct {
    return Object.assign(new KitProduct(), jsonData);
  }
}
