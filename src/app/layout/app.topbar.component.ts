import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../enviroments/environment";
import {UserService} from "../pages/users/user.service";
import {Configuration} from "../shared/models/configuration";
import {User} from "../shared/models/user";
import {LocalStorageService} from "../shared/services/local-storage.service";
import {UserConfigurationService} from "../shared/services/user-configuration.service";
import {LayoutService} from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit {

  user: User | null = null;

  userId: string | undefined = undefined;

  configuration!: Configuration | null;

  private readonly ssoLoginUrl = environment.ssoLoginUrl;

  private readonly clientId = environment.clientId;

  @ViewChild('menubutton') menuButton!: ElementRef;

  constructor(public layoutService: LayoutService,
              private readonly userConfigService: UserConfigurationService,
              private readonly localStorageService: LocalStorageService,
              private readonly userService: UserService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.userId = this.localStorageService.getUserId();
    this.userConfigService.config$.subscribe(config => {
      this.configuration = config;
    });

    // this.userService.getById(this.userId).subscribe((user: User) => {
    //   this.user = user;
    // });
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    if (this.configuration?.profileSidebarVisible) {
      this.layoutService.showProfileSidebar();
    }
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  onLogout() {
    this.localStorageService.clearToken();
    window.location.href = this.buildSsoLoginUrl();
  }

  private buildSsoLoginUrl(): string {
    return `${this.ssoLoginUrl}?client_id=${this.clientId}`;
  }
}
