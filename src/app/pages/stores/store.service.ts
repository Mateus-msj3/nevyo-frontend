import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {environment} from "../../../enviroments/environment";
import {Store} from "../../shared/models/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseResourceService<Store> {

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/stores`, injector, Store.fromJson);
  }

}
