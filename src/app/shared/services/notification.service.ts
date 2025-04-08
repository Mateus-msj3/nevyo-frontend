import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../enviroments/environment";
import {Notification} from "../models/notification";
import {BaseResourceService} from "../abastracts/base-resource-service";
import {Page} from "../util/paginator/page";


@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseResourceService<Notification> {

  serverUrl = `${environment.api.baseUrl}/notifications`;

  constructor(protected override injector: Injector) {
    super(`${environment.api.baseUrl}/notifications`, injector, Notification.fromJson);
  }

  getNotificationsUnread(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.serverUrl + '/unread');
  }

  onLazyNotifications(pageNumber: number, pageSize: number) {
    return this.http.get<Page<Notification>>(`${this.serverUrl}?page=${pageNumber}&size=${pageSize}`);
  }

  markAllAsRead(): Observable<void> {
    return this.http.patch<void>(this.serverUrl + '/mark-all-as-read', {});
  }
}
