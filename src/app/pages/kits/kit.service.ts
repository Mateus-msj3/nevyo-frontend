import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {environment} from "../../../enviroments/environment";
import {Kit} from "../../shared/models/kit";

@Injectable({
  providedIn: 'root'
})
export class KitService extends BaseResourceService<Kit> {

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/kits`, injector, Kit.fromJson);
  }

}
