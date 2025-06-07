import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '../models/store';
import {LocalStorageService} from "./local-storage.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StoreStateService {
  private readonly selectedStore = new BehaviorSubject<Store | null>(null);

  constructor(private readonly localStorageService: LocalStorageService) {
    const storedStore = this.localStorageService.getItem('selectedStore');
    if (storedStore) {
      this.selectedStore.next(JSON.parse(storedStore));
    }
  }

  hasSelectedStore(): Observable<boolean> {
    return this.selectedStore.pipe(
      map(store => !!store)
    );
  }

  getSelectedStore(): Store | null {
    return JSON.parse(this.localStorageService.getItem('selectedStore') || '{}');
  }

  setSelectedStore(store: Store): void {
    this.localStorageService.setItem('selectedStore', JSON.stringify(store));
    this.selectedStore.next(store);
  }

  clearSelectedStore(): void {
    this.localStorageService.removeItem('selectedStore');
    this.selectedStore.next(null);
  }
}
