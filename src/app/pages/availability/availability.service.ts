import {Injectable, Injector} from '@angular/core';
import {environment} from "../../../enviroments/environment";
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {Availability} from "../../shared/models/availability";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService extends BaseResourceService<Availability> {

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/availabilities`, injector, Availability.fromJson);
  }

  getFiltered(filters: any): Observable<Availability[]> {

    return this.http.get<Availability[]>(`${environment.api.baseUrl}/filtered`, {params: filters});


  }
}

