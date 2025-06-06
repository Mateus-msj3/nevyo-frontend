import {Component, OnInit} from '@angular/core';
import {Store} from "../../../shared/models/store";
import {StoreService} from "../../../pages/stores/store.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {Router} from "@angular/router";
import {FilterParams} from "../../../shared/util/paginator/filterParams";
import {SortParams} from "../../../shared/util/paginator/sortParams";
import {HttpParams} from "@angular/common/http";
import {StoreStateService} from "../../../shared/services/store-state.service";

@Component({
  selector: 'app-store-selector',
  templateUrl: './store-selector.component.html',
  styleUrl: './store-selector.component.scss'
})
export class StoreSelectorComponent implements OnInit {
    searchTerm: string = '';
    filteredStores: Store[] = [];

  filterParams: FilterParams = new FilterParams('0', new SortParams('name', 0));

  httpParams: HttpParams = new HttpParams();

  stores: Store[] = [];

  loading: boolean = true;

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly storeStateService: StoreStateService
  ) {}

    ngOnInit(): void {
        this.loadStores();
    }

    loadStores(): void {
        this.loading = true;
        this.storeService.search(this.filterParams, this.httpParams).subscribe({
            next: (response) => {
                this.stores = response.content;
                this.filteredStores = [...this.stores];
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    filterStores(): void {
        if (!this.searchTerm.trim()) {
            this.filteredStores = [...this.stores];
            return;
        }

        const search = this.searchTerm.toLowerCase().trim();
        this.filteredStores = this.stores.filter(store =>
            store.name!.toLowerCase().includes(search) ||
            store.city!.toLowerCase().includes(search) ||
            store.state!.toLowerCase().includes(search)
        );
    }

  selectStore(store: Store): void {
    this.storeStateService.setSelectedStore(store);
    this.router.navigate(['/']);
  }

}
