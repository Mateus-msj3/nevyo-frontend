import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {CustomMessageService} from "../../shared/services/custom-message.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private readonly customMessageService: CustomMessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro desconhecido';

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = `Erro: ${error.error.message}`;
          this.customMessageService.showError('Erro do Cliente', errorMessage);
        } else {
          // Erros do lado do servidor
          switch (error.status) {
            case 400:
              this.handleBadRequest(error);
              break;
            case 401:
              this.handleUnauthorized(error);
              break;
            case 403:
              this.handleForbidden(error);
              break;
            case 404:
              this.handleNotFound(error);
              break;
            case 422:
              this.handleUnprocessableEntity(error);
              break;
            case 500:
              this.handleInternalServerError(error);
              break;
            case 503:
              this.handleServiceUnavailable(error);
              break;
            default:
              this.handleUnknownError(error);
              break;
          }
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleBadRequest(error: HttpErrorResponse): void {
    this.customMessageService.showError('Erro de Validação', error.error.message);
  }

  private handleUnauthorized(error: HttpErrorResponse): void {
    this.customMessageService.showError('Erro 401 - Unauthorized', 'Acesso não autorizado. Faça login novamente.');
  }

  private handleForbidden(error: HttpErrorResponse): void {
    this.customMessageService.showError('Erro 403 - Forbidden', 'Você não tem permissão para acessar este recurso.');
  }

  private handleNotFound(error: HttpErrorResponse): void {
    this.customMessageService.showError('Erro 404 - Not Found', 'Recurso não encontrado.');
  }

  private handleUnprocessableEntity(error: HttpErrorResponse): void {
    const errorResponse = error.error;
    if (errorResponse && errorResponse.errors) {
      errorResponse.errors.forEach((errorMsg: string) => {
        this.customMessageService.showError('Erro 422 - Unprocessable Entity', errorMsg);
      });
    } else {
      this.customMessageService.showError('Erro 422 - Unprocessable Entity', 'Erro de processamento.');
    }
  }

  private handleInternalServerError(error: HttpErrorResponse): void {
    this.customMessageService.showError('Erro 500 - Internal Server Error', 'Erro no servidor. Tente novamente mais tarde.');
  }

  private handleServiceUnavailable(error: HttpErrorResponse): void {
    this.customMessageService.showError('Erro 503 - Service Unavailable', 'Serviço indisponível. Tente novamente mais tarde.');
  }

  private handleUnknownError(error: HttpErrorResponse): void {
    this.customMessageService.showError(`Erro ${error.status} - ${error.statusText}`, 'Erro desconhecido.');
  }
}
