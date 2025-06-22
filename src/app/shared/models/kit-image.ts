import {BaseResourceModel} from "../abastracts/base-resource-model";

export class KitImage extends BaseResourceModel {
  constructor(
    public imageUrl?: string,
    public mainImage?: boolean,
    public originalFileName?: string,
    public contentType?: string,
    public kitId?: string
  ) {
    super();
    this.mainImage = mainImage || false;
  }

  static fromJson(jsonData: any): KitImage {
    return Object.assign(new KitImage(), jsonData);
  }
}
