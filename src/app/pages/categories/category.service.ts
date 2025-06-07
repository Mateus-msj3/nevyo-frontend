import {Injectable, Injector} from '@angular/core';
import {environment} from "../../../enviroments/environment";
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {Category} from "../../shared/models/category";
import {Configuration} from "../../shared/models/configuration";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/categories`, injector, Configuration.fromJson);
  }

}
