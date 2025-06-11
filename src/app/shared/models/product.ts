import { BaseResourceModel } from "../abastracts/base-resource-model";
import { Category } from "./category";
import { Store } from "./store";
import { ProductSize } from "./product-size";
import { ProductImage } from "./product-image";
import {Gender} from "../enums/gender-enum";

export class Product extends BaseResourceModel {
  constructor(
    public sku?: string,
    public name?: string,
    public description?: string,
    public price?: number,
    public quantityStore?: number,
    public quantitySite?: number,
    public gender?: Gender,
    public isAccessory?: boolean,
    public active?: boolean,
    public category?: Category,
    public store?: Store,
    public sizes?: ProductSize[],
    public images?: ProductImage[]
  ) {
    super();
    this.isAccessory = isAccessory || false;
    this.active = active || true;
  }

  static fromJson(jsonData: any): Product {
    return Object.assign(new Product(), jsonData);
  }
}
