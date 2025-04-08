import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {delay, finalize, Observable} from "rxjs";
import {LoaderService} from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requestsActives: number = 0;

  constructor(private readonly loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.requestsActives == 0) {
      this.loaderService.show();
    }
    this.requestsActives++;

    return next.handle(request).pipe(
      //Remover quando subir para produção
      // delay(1000),
      finalize(() => {
        this.requestsActives--;

        if (this.requestsActives == 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
