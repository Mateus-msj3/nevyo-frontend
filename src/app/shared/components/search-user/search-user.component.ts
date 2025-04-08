import {Component, EventEmitter, Input, Output} from '@angular/core';
import {environment} from "../../../../enviroments/environment";
import {User} from "../../models/user";
import {AutoCompleteSelectEvent} from "primeng/autocomplete";
import {UserService} from "../../../pages/users/user.service";
import {CustomMessageService} from "../../services/custom-message.service";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.scss'
})
export class SearchUserComponent {

  @Input()
  label!: string;

  @Input()
  showAsterisk: boolean = false;

  @Input()
  isCard: boolean = true;

  users: User[] = [];

  fullName: string = '';

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();

  private readonly clientId = environment.clientId;

  constructor(private readonly userService: UserService, private readonly customMessageService: CustomMessageService) {
  }

  search(event: any) {
    let query = event.query;
    this.userService.searchParams({param:query, client_id:this.clientId}).subscribe({
      next: (users: User[]) => {
        this.users = users.map(user => {
          this.fullName = `${user.firstname} ${user.lastname}`;
          return user;
        });
      },
      error: () => this.customMessageService.showError('Erro', 'Ocorreu um erro ao buscar a Pessoa informada.')
    });
  }


  onUserSelected(user: AutoCompleteSelectEvent) {
    this.userSelected.emit(user.value as User);
  }

}
