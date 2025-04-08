import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../shared/services/local-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // URL ou rota que quero ignorar
    const loginUrl = '/api/v1/auth/login';
    // Verifica se a URL da requisição é a URL de login
    if (req.url.includes(loginUrl)) {
      // Se for uma requisição de login, passa ela adiante sem adicionar o cabeçalho de autenticação
      return next.handle(req);
    }

    let authReq = req;
    const token = this.localStorageService.getItem('user_access_token');

    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      });
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
