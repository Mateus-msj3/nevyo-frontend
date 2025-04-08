import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';
import {PipeModule} from "../shared/pipes/pipe.module";
import {AppConfigModule} from './config/app.config.module';
import {AppLayoutComponent} from './app.layout.component';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {AppSidebarComponent} from './app.sidebar.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppProfileSidebarComponent} from './app.profilesidebar.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {AppFooterComponent} from "./app.footer.component";

@NgModule({
  declarations: [
    AppLayoutComponent,
    AppBreadcrumbComponent,
    AppSidebarComponent,
    AppTopbarComponent,
    AppProfileSidebarComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppFooterComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    ButtonModule,
    TooltipModule,
    RippleModule,
    RouterModule,
    AppConfigModule,
    NgClass,
    NgForOf,
    AsyncPipe,
    NgIf,
    PipeModule,
    NgStyle
  ]
})
export class AppLayoutModule {
}
