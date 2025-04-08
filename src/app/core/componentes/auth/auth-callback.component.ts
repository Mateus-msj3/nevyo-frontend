import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../enviroments/environment";
import {GlobalConfigurationService} from "../../../shared/services/global-configuration.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<p>Redirecionando...</p>`,
})
export class AuthCallbackComponent implements OnInit {

  userAccessToken: string | null = null;

  tokenType: string | null = null;

  userId: string | null = null;

  expiresIn: string | null = null;

  authorizationCode: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly authService: AuthService,
    private readonly globalConfigurationService: GlobalConfigurationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.authorizationCode = params['authorization_code'];
      this.userAccessToken = params['user_access_token'];
      this.userId = params['user_id'];
      this.tokenType = params['token_type'];
      this.expiresIn = params['expires_in'];
    });

    if (this.userAccessToken) {
      this.localStorageService.setUserAccessToken(this.userAccessToken);

      this.authService.exchangeToken(this.authorizationCode, environment.clientId).subscribe({
        next: response => {
          // Redirecionar para a página inicial ou outra rota
          this.localStorageService.setToken(response.access_token);
          this.localStorageService.setItem('userId', this.userId);
          this.globalConfigurationService.findConfigurationByUser();
          this.router.navigate(['/']);
        },
        error: () => {
          // Redireciona para login se houver erro
          window.location.href = this.buildSsoLoginUrl();
        }
      })

    } else {
      // Redireciona para login se houver erro ou token estiver ausente
      window.location.href = this.buildSsoLoginUrl();
    }
  }

  private buildSsoLoginUrl(): string {
    return `${environment.ssoLoginUrl}?client_id=${environment.clientId}`;
  }
}
