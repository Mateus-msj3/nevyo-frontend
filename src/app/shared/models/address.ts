import {BaseResourceModel} from "../abastracts/base-resource-model";

export class Address extends BaseResourceModel {

  constructor(
    public street?: string,
    public city?: string,
    public country?: string,
    public zipCode?: string,
    public latitude?: number,
    public longitude?: number,
    public addressType?: string,
    public defaultAddress?: boolean,
  ) {
    super();
  }

  static fromJson(jsonData: any): Address {
    return Object.assign(new Address(), jsonData);
  }
}
