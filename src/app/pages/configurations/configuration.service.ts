import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {environment} from "../../../enviroments/environment";
import {Observable} from "rxjs";
import {Configuration} from "../../shared/models/configuration";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseResourceService<Configuration> {
  
  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/configurations`, injector, Configuration.fromJson);
  }
  
  findByUser(userId: string): Observable<Configuration> {
    const url = `${environment.api.baseUrl}/configurations/user/${userId}`;
    return this.http.get<Configuration>(url);
  }

  createDefaultConfigurationFromUser(userId: string | number): Observable<Configuration> {
    const url = `${environment.api.baseUrl}/configurations/user/${userId}`;
    return this.http.post<Configuration>(url, {});
  }
  
}
