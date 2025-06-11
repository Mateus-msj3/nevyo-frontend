import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseISO, format } from 'date-fns';

@Injectable()
export class ConvertDateInterceptor implements HttpInterceptor {
  private readonly regexYMD = /^\d{4}[-]\d{2}[-]\d{2}(T\d{2}[:]\d{2}[:]\d{2}([.]\d{3}[Z])?)?$/;
  private processed = new WeakSet();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.processed = new WeakSet(); // Reset processed objects
    const clonedRequest = req.clone({
      body: this.convertDateToString(req.body)
    });

    return next.handle(clonedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.processed = new WeakSet(); // Reset processed objects
          const modifiedBody = this.convertDates(event.body);
          return event.clone({ body: modifiedBody });
        }
        return event;
      })
    );
  }

  private convertDates(object: any): any {
    if (!object || typeof object !== 'object') {
      return object;
    }

    if (this.processed.has(object)) {
      return object;
    }

    this.processed.add(object);

    if (Array.isArray(object)) {
      return object.map(item => this.convertDates(item));
    }

    const updatedObject: Record<string, any> = { ...object };

    Object.keys(updatedObject).forEach(key => {
      const value = updatedObject[key];
      if (typeof value === 'string' && this.regexYMD.test(value)) {
        updatedObject[key] = parseISO(value);
      } else if (value && typeof value === 'object' && !this.processed.has(value)) {
        updatedObject[key] = this.convertDates(value);
      }
    });

    return updatedObject;
  }

  private convertDateToString(object: any): any {
    if (!object || typeof object !== 'object') {
      return object;
    }

    if (this.processed.has(object)) {
      return object;
    }

    this.processed.add(object);

    if (Array.isArray(object)) {
      return object.map(item => this.convertDateToString(item));
    }

    const updatedObject: Record<string, any> = { ...object };

    Object.keys(updatedObject).forEach(key => {
      const value = updatedObject[key];
      if (value instanceof Date) {
        updatedObject[key] = format(value, 'yyyy-MM-dd\'T\'HH:mm:ss');
      } else if (value && typeof value === 'object' && !this.processed.has(value)) {
        updatedObject[key] = this.convertDateToString(value);
      }
    });

    return updatedObject;
  }
}
