import {Injectable, Injector} from '@angular/core';
import {User} from "../../shared/models/user";
import {BaseResourceService} from "../../shared/abastracts/base-resource-service";
import {environment} from "../../../enviroments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {ResetPassword} from "../../shared/models/reset-password";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<User> {

  private readonly userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/users`, injector, User.fromJson);
  }

  updateStatus(id: string, status: string, value: boolean): Observable<void> {
    const url = `${environment.api.baseUrl}/users/${id}/status/${status}/${value}`;
    return this.http.patch<void>(url, { value });
  }

  // searchParams(parameter: string): Observable<User[]> {
  //   const url = `${environment.api.baseUrl}/users/search`;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const params = { param: parameter };
  //   return this.http.get<User[]>(url, { headers: headers, params: params });
  // }

  searchParams(parameters: { [key: string]: string }): Observable<User[]> {
    const url = `${environment.api.baseUrl}/users/search`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Passa o objeto de parâmetros diretamente
    return this.http.get<User[]>(url, { headers: headers, params: parameters });
  }


  resetPassword(resetPassword: ResetPassword): Observable<void> {
    const url = `${environment.api.baseUrl}/users/reset-password`;
    return this.http.patch<void>(url, resetPassword);
  }

  findUserByEmail(email: string): Observable<User> {
    const url = `${environment.api.baseUrl}/users/email/${email}`;
    return this.http.get<User>(url);
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

}
