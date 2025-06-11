import {BaseResourceModel} from "../abastracts/base-resource-model";
import {Store} from "./store";

export class ProductImage extends BaseResourceModel {
  constructor(
    public imageUrl?: string,
    public description?: string,
    public productId?: string,
    public store?: Store
  ) {
    super();
  }

  static fromJson(jsonData: any): ProductImage {
    return Object.assign(new ProductImage(), jsonData);
  }
}
