import {Notification} from "../models/notification";

export interface PageNotification {
  content: Notification[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
}

