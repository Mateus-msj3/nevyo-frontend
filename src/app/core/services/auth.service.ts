import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../enviroments/environment";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import { jwtDecode } from 'jwt-decode';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = `${environment.api.ssoUrl}`;

  constructor(private readonly http: HttpClient, private readonly localStorageService: LocalStorageService) {
  }

  exchangeToken(code: string | null, clientId: string): Observable<any> {
    const params = new HttpParams()
      .append('code', code!)
      .append('client_id', clientId);
    return this.http.post(
      this.url + '/oauth/token',
      {},
      { params }
    );
  }

  getToken(): string | null {
    return this.localStorageService.getItem('user_access_token');
  }

  // Método para decodificar o token e extrair as roles
  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.authorities || [];
    }
    return [];
  }

  // Método para verificar se o usuário tem uma role específica
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  hasPermission(requiredRoles: string[]): boolean {
    return requiredRoles.some((role) => this.getRoles().includes(role));
  }
}
