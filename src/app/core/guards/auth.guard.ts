import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {Router} from "@angular/router";
import {CustomMessageService} from "../../shared/services/custom-message.service";
import {environment} from "../../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  private readonly ssoLoginUrl = environment.ssoLoginUrl;
  private readonly clientId = environment.clientId;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly customMessageService: CustomMessageService
  ) {}

  canActivate(): boolean {
    if (this.localStorageService.isLoggedIn()) {
      if (this.localStorageService.isTokenExpired()) {
        this.customMessageService.showWarning("Seu tempo de acesso expirou", "É necessário realizar um novo login!");
        window.location.href = this.buildSsoLoginUrl(); // Redireciona para o SSO com client_id
        return false;
      }
      return true;
    } else {
      window.location.href = this.buildSsoLoginUrl(); // Redireciona para o SSO com client_id
      return false;
    }
  }

  private buildSsoLoginUrl(): string {
    return `${this.ssoLoginUrl}?client_id=${this.clientId}`;
  }
}

