import {BaseResourceModel} from "../abastracts/base-resource-model";
import {Store} from "./store";

export class ProductSize extends BaseResourceModel {
  constructor(
    public size?: string,
    public stock?: number,
    public productId?: string | undefined,
    public store?: Store
  ) {
    super();
  }

  static fromJson(jsonData: any): ProductSize {
    return Object.assign(new ProductSize(), jsonData);
  }
}
