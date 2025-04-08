import {HttpClient, HttpParams} from "@angular/common/http";
import {Injector} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {Page} from "../util/paginator/page";
import {BaseResourceModel} from "./base-resource-model";
import {Util} from "../util/util";
import {FilterParams} from "../util/paginator/filterParams";

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ){
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this) as (data: Object) => T[]),
            catchError(this.handleError)
        )
    }

    getById(id: string): Observable<T> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        )
    }

  delete(id: string | number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    search(parametros: FilterParams, params: HttpParams): Observable<Page<T> | any> {
        params = Util.createParams(parametros, params);
        return this.http.get(`${this.apiPath}`, {params}).pipe(
            catchError(this.handleError)
        );
    }

    // PROTECTED METHODS

    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(
            element => resources.push( this.jsonDataToResourceFn(element) )
        );
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any>{
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }

}
