// category-shared.service.ts
import { Injectable } from '@angular/core';
import {CategoryService} from "../../pages/categories/category.service";
import {StoreStateService} from "./store-state.service";
import {FilterParams} from "../util/paginator/filterParams";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../util/paginator/page";
import {Category} from "../models/category";
import {Util} from "../util/util";


@Injectable({
  providedIn: 'root'
})
export class CategorySharedService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly storeStateService: StoreStateService
  ) {}

  loadCategories(filter: FilterParams, params: HttpParams): Observable<Page<Category>> {
    params = params.set('storeId', this.storeStateService.getSelectedStore()!.id!.toString());
    params = params.set('size', '100');
    params = Util.createParams(filter, params);
    return this.categoryService.search(filter, params);
  }
}
