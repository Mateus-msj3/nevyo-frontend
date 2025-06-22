import { BaseResourceModel } from "../abastracts/base-resource-model";
import { Store } from "./store";
import { Gender } from "../enums/gender-enum";
import {KitImage} from "./kit-image";
import {KitProduct} from "./kit-product";
import {KitAccessory} from "./kit-acessory";


export class Kit extends BaseResourceModel {
  constructor(
    public name?: string,
    public description?: string,
    public store?: Store,
    public gender?: Gender,
    public price?: number,
    public maxAccessories?: number,
    public active?: boolean,
    public images?: KitImage[],
    public kitProducts?: KitProduct[],
    public accessories?: KitAccessory[]
  ) {
    super();
    this.active = active || true;
    this.maxAccessories = maxAccessories || 0;
  }

  static fromJson(jsonData: any): Kit {
    return Object.assign(new Kit(), jsonData);
  }
}
