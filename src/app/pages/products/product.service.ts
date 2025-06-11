import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {environment} from "../../../enviroments/environment";
import {Product} from "../../shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseResourceService<Product> {

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/products`, injector, Product.fromJson);
  }

}
