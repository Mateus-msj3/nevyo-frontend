import {AfterContentChecked, Directive, Injector, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, of, switchMap, tap, timer} from "rxjs";

import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {BaseResourceModel} from "./base-resource-model";
import {BaseResourceService} from "./base-resource-service";
import {CustomMessageService} from "../services/custom-message.service";


@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

	currentAction!: string;
	resourceForm!: FormGroup;
	pageTitle!: string;
	serverErrorMessages: string[] = [];
	submittingForm: boolean = false;

	protected route: ActivatedRoute;
	protected router: Router;
	protected formBuilder: FormBuilder;
	protected messageService: MessageService;
	protected customMessageService: CustomMessageService;

	@ViewChild(Table) table: Table | null | undefined;

	constructor(
		protected injector: Injector,
		public resource: T,
		protected resourceService: BaseResourceService<T>,
		protected jsonDataToResourceFn: (jsonData: any) => T,
	) {
		this.route = this.injector.get(ActivatedRoute);
		this.router = this.injector.get(Router);
		this.formBuilder = this.injector.get(FormBuilder);
		this.messageService = this.injector.get(MessageService);
		this.customMessageService = this.injector.get(CustomMessageService);
	}

	protected abstract buildResourceForm(): void;

	protected abstract init(): void;

	ngOnInit() {
		this.init();
		this.setCurrentAction();
		this.buildResourceForm();
		this.loadResource();
	}

	ngAfterContentChecked() {
		this.setPageTitle();
	}

	submitForm() {
		this.submittingForm = true;

		if (this.currentAction == "new")
			this.createResource();
		else // currentAction == "edit"
			this.updateResource();
	}

	// PRIVATE METHODS

	protected setCurrentAction() {
		if (this.route.snapshot?.url[0].path == "new")
			this.currentAction = "new"
		else
			this.currentAction = "edit"
	}

	protected loadResource() {
		if (this.currentAction == "edit") {
			this.beforeLoadResource();
			this.route.paramMap.pipe(
				switchMap(params => {
					// Captura o ID como uma string e passa diretamente
					const id = params.get("id")!;
					return this.resourceService.getById(id);
				})
			).subscribe({
					next:
						(resource) => {
							this.resource = resource;
							this.resourceForm?.patchValue(resource); // binds loaded resource data to resourceForm
							this.afterLoadResource(resource);
						},
					error: (error) => alert('Ocorreu um erro no servidor, tente mais tarde.'),
				}
			);
		}
	}

	protected setPageTitle() {
		if (this.currentAction == 'new')
			this.pageTitle = this.creationPageTitle();
		else {
			this.pageTitle = this.editionPageTitle();
		}
	}

	protected creationPageTitle(): string {
		return "Novo"
	}

	protected editionPageTitle(): string {
		return "Edição"
	}

	protected createResource() {
		const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);
		this.beforeSave(resource);
		this.resourceService.create(resource)
			.subscribe({
					next:
						(resource: T) => {
							this.actionsForSuccess(resource)
							this.afterSave(resource)
							// Atraso na execução do afterSave
							// of(resource).pipe(
							// 	delay(2000) // 2000 milissegundos de atraso (2 segundos)
							// ).subscribe(() => this.afterSave(resource));
						},
					error: error => this.actionsForError(error)
				}
			);
	}

	protected createResourceAndClose() {
		const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);
		this.beforeSave(resource);
		this.resourceService.create(resource)
			.subscribe({
					next:
						(resource: T) => {
						this.actionsForSuccessAndClose(resource)
							this.afterSave(resource)
						},
					error: error => this.actionsForError(error)
				}
			);
	}

	protected updateResource() {
		const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);
		this.beforeUpdate(resource);
		this.resourceService.update(resource)
			.subscribe({
					next:
						(resource: T) => {
							this.actionsForSuccess(resource)
							this.afterUpdate(resource)
						},
					error: error => this.actionsForError(error)
				}
			);
	}

	protected updateResourceAndClose() {
		const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);
		this.beforeUpdate(resource);
		this.resourceService.update(resource)
			.subscribe({
					next:
						(resource: T) => {
							this.actionsForSuccessAndClose(resource)
							this.afterUpdate(resource)
						},
					error: error => this.actionsForError(error)
				}
			);
	}

	protected actionsForSuccess(resource: T) {
		this.customMessageService.showSuccess('Sucesso', 'Solicitação processada com sucesso!');
		const baseComponentPath: string = <string>this.route.snapshot.parent?.url[0].path;
		// redirect/reload component page
		timer(2000).pipe(
			tap(() => {
				this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
					() => this.router.navigate([baseComponentPath, resource.id, "edit"])
				)
			})
		).subscribe();
	}

	protected actionsForSuccessAndClose(resource: T) {
		this.customMessageService.showSuccess('Sucesso', 'Solicitação processada com sucesso!');
		const currentRoute = this.route.snapshot.parent?.routeConfig?.path;
		if (currentRoute) {
			timer(1000).pipe(
				tap(() => {
					this.router.navigateByUrl(currentRoute, {skipLocationChange: true}).then(
						() => this.router.navigate([currentRoute])
					)
				})
			).subscribe();
		}
	}

	protected actionsForError(error: any) {
		this.submittingForm = false;
		this.serverErrorMessages = [];

		if (error.status === 422) {
			const errorResponse = error.error;
			if (errorResponse && errorResponse.errors) {
				this.serverErrorMessages = errorResponse.errors;
			} else {
				this.serverErrorMessages = ['Erro de validação. Verifique os dados enviados.'];
			}
		} else {
			this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente novamente mais tarde.'];
		}

		this.serverErrorMessages.forEach(errorMessage => {
			this.customMessageService.showError('Erro', errorMessage);
		});
	}

	getEnumOptions(enumObject: any): any[] {
		return Object.keys(enumObject).map(key => ({label: enumObject[key], value: key}));
	}

	isEditMode(): boolean {
		if (this.route.snapshot?.url.length > 1 && this.route.snapshot?.url[1].path === "edit") {
			return true
		} else {
			return false
		}
	}

	applyFilterGlobal(event: any, stringVal: any) {
		this.table!.filterGlobal((event.target as HTMLInputElement).value, stringVal);
	}

	saveAndClose() {
		this.submittingForm = true;

		if (this.currentAction == "new") {
			this.createResourceAndClose();
		} else {
			this.updateResourceAndClose();
		}

	}

	save() {
		this.submittingForm = true;

		if (this.currentAction == "new")
			this.createResource();
		else // currentAction == "edit"
			this.updateResource();
	}

	onClose() {
		window.history.back();
	}

	beforeLoadResource() {

	}

	afterLoadResource(resource: T) {

	}

	beforeSave(resource: T) {

	}

	afterSave(resource: T) {

	}

	beforeUpdate(resource: T) {
	}

	afterUpdate(resource: T) {

	}

}
