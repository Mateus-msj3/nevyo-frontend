import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {environment} from "../../../enviroments/environment";
import {Customer} from "../../shared/models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceService<Customer> {

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/customers`, injector, Customer.fromJson);
  }

}
