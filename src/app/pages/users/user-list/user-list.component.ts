import {Component, Injector} from '@angular/core';
import {BaseResourceListComponent} from "../../../shared/abastracts/base-resource-list";
import {User} from "../../../shared/models/user";
import {DialogConfig} from "../../../shared/util/dialog-config";
import {UserService} from "../user.service";
import {environment} from "../../../../enviroments/environment";

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent extends BaseResourceListComponent<User> {

  dialogConfig: DialogConfig = {header: 'Filter Users', visible: false, width: '800px', height: '600px'};

  constructor(protected override injector: Injector,
              public userService: UserService,) {
    super(injector, userService);
  }

  override onInit() {
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      firstname: [null],
      lastname: [null],
      email: [null],
      phoneNumber: [null],
      dateOfBirth: [null],
      accountLocked: [false],
      enabled: [true],
      client_id: [environment.clientId]
    });
  }

  protected onLoadList(): void {
  }

  onFilter() {
    this.dialogConfig.visible = true;
  }

  onNew() {
    this.router.navigate(['/users/new']);
  }

  onClear() {
    this.resourceForm.reset();
    this.table?.reset();
    this.page!.content = [];
    this.page! .totalElements = 0;
  }

  filter() {
    super.search();
    this.dialogConfig.visible = false;
  }

  cancelFilter() {
    this.dialogConfig.visible = false;
  }

  clearFormFilter() {
    this.resourceForm.reset({
      firstname: null,
      lastname: null,
      email: null,
      phoneNumber: null,
      dateOfBirth: null,
      accountLocked: false,
      enabled: true
    });
  }

}
