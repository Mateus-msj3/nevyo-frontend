import { HttpParams } from '@angular/common/http';
import {environment} from "../../../../enviroments/environment";
import {SortParams} from "./sortParams";
export class FilterParams {

    readonly ITENS_PER_PAGE = environment.itensPerPage;
    public params: HttpParams;

  constructor(pagina: string, sort: SortParams | undefined) {
        this.params = new HttpParams()
       .append('page', pagina)
       .append('size', this.ITENS_PER_PAGE.toString())
    }
}
