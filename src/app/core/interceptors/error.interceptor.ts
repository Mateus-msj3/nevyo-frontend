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
        if (error.error instanceof ErrorEvent) {
          // Erro do cliente
          this.customMessageService.showError('Erro do Cliente', error.error.message);
        } else {
          // Erro do servidor
          const errorMessage = this.getServerErrorMessage(error);
          this.handleServerError(error);
        }

        return throwError(() => error);
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: return error.error?.message || 'Erro de validação';
      case 401: return 'Acesso não autorizado';
      case 403: return 'Acesso proibido';
      case 404: return 'Recurso não encontrado';
      case 422: return this.getUnprocessableEntityMessage(error);
      case 500: return 'Erro interno do servidor';
      case 503: return 'Serviço indisponível';
      default: return 'Erro desconhecido';
    }
  }

  private getUnprocessableEntityMessage(error: HttpErrorResponse): string {
    if (error.error?.errors && Array.isArray(error.error.errors)) {
      return error.error.errors.join(', ');
    }
    return error.error?.message || 'Erro de processamento';
  }

  private handleServerError(error: HttpErrorResponse): void {
    const message = this.getServerErrorMessage(error);
    this.customMessageService.showError(`Erro ${error.status}`, message);
  }
}
