import {Directive, Injector, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../../enviroments/environment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, take, takeUntil} from "rxjs";
import {CustomMessageService} from "../services/custom-message.service";
import {Table} from "primeng/table";
import {LazyLoadEvent, SortEvent} from "primeng/api";
import {Page} from "../util/paginator/page";
import {BaseResourceService} from "./base-resource-service";
import {FilterParams} from "../util/paginator/filterParams";
import {SortParams} from "../util/paginator/sortParams";
import {BaseResourceModel} from "./base-resource-model";

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit, OnDestroy {

  readonly ITENS_PER_PAGE = environment.itensPerPage;

  page: Page<T> | undefined;

  resourceForm!: FormGroup;

  protected formBuilder: FormBuilder;

  protected actualPage = 0;

  protected direction: number | undefined = 0;

  protected coluna: string | undefined;

  protected sort: SortParams | undefined;

  protected router: Router;

  protected route: ActivatedRoute;

  protected unsubscribe: Subject<void> = new Subject();

  protected customMessageService: CustomMessageService;

  @ViewChild(Table) table: Table | null | undefined;

  resources: T[] = [];

  constructor(protected injector: Injector, private resourceService: BaseResourceService<T>) {
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.formBuilder = this.injector.get(FormBuilder);
    this.customMessageService = this.injector.get(CustomMessageService);
  }

  /**
   * Metodo a ser utilizado no onInit para construção auxiliares do formulário. Ex: carregamento de combos
   */
  protected abstract onLoadList(): void;

  /**
   * Metodo para construção do forumulário de pesquisa
   */
  protected abstract buildResourceForm(): void;

  ngOnInit() {
    this.onLoadList();
    this.buildResourceForm();
    this.onInit();
  }

  onInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  get first() {
    return this.page ? this.page.offset : 0;
  }

  /**
   * Método recebedor do evento de load da tabela, este método é chamado pelos htmls.
   * @param event
   */
  search(event?: LazyLoadEvent) {
    if (this.table) {
      this.table.first = 0;
    }
    this.actualPage = 0;
    this.doSearch(event);
  }

  /**
   * Método utilizado pos validação para tratamento do filtro de pesquisa.
   * @param event?
   */
  doSearch(event?: LazyLoadEvent) {
    let filter: any = null;
    filter = this.defineFilterSearch(filter, event);
    this.executeSearch(filter);
  }

  protected getObservableSearch(filtro: any, filtroParams: FilterParams) {
    return this.resourceService.search(filtro, filtroParams.params);
  }

  /**
   * Construção dos parametros de filtragem.
   */
  protected paramFilter() {
    return new FilterParams(this.actualPage.toString(), this.sort);
  }

  public defineFilterSearch(filtro: any, event: LazyLoadEvent | undefined) {
    filtro = this.resourceForm?.getRawValue();
    this.definePage(event);
    return filtro;
  }

  /**
   * Método de definição da página a ser pesquisada.
   *
   * @param event
   */
  protected definePage(event: LazyLoadEvent | undefined) {
    if (event && event.first !== undefined && event.rows !== undefined) {
      this.actualPage = event.first / event.rows;
    }
  }

  onSortList(event: SortEvent) {
    if (this.page && this.page.content && this.page.content.length > 0) {
      this.coluna = event.field;
      this.direction = event.order;
      this.sort = new SortParams(this.coluna, this.direction);
      this.doSearch(event);
    }
  }


  /**
   * Seta o retorno do backend a classe Page, que é utilizada no html
   */
  protected onSubscribe(value: Page<T> | undefined) {
    this.page = value;
  }

  /**
   * Método que deve fato efetua a pesquisa, chamando a service.
   *
   * @param filtro
   */
  protected executeSearch(filtro: any) {
    const filtroParams = this.paramFilter();
    this.beforeSearch();
    this.getObservableSearch(filtro, filtroParams)
      .pipe(take(1))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        this.onSubscribe(value);
        this.afterSearch(value);
        if (this.page?.totalElements === 0) {
          this.customMessageService.showInfo('Informação', 'Nenhum registro encontrado');
        }
      });
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      if (resource.id != null) {
        this.resourceService.delete(resource.id).subscribe({
            next: () => this.resources = this.resources.filter(element => element != resource),
            error: () => alert("Erro ao tentar excluir!")
          }
        );
      }
    }
  }

  applyFilterGlobal(event: any, stringVal: any) {
    this.table!.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  getEnumOptions(enumObject: any): any[] {
    return Object.keys(enumObject).map(key => ({label: enumObject[key], value: key}));
  }

  beforeSearch() {

  }

  afterSearch(resource: Page<T>) {

  }

}
