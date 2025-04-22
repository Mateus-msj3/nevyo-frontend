import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {MenuModeEnum} from "../shared/enums/menu-mode-enum";
import {PrimaryColorEnum} from "../shared/enums/primary-color-enum";
import {UserConfigurationService} from "../shared/services/user-configuration.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent {
    timeout: any = null;

    @ViewChild('menuContainer') menuContainer!: ElementRef;
    constructor(public layoutService: LayoutService,
                public el: ElementRef,
                private readonly cdr: ChangeDetectorRef,
  public userConfigurationService: UserConfigurationService) {}


    onMouseEnter() {
        if (!this.layoutService.state.anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.state.sidebarActive = true;
        }
    }

    onMouseLeave() {
        if (!this.layoutService.state.anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => this.layoutService.state.sidebarActive = false, 300);
            }
        }
    }

    anchor() {
        this.layoutService.state.anchored = !this.layoutService.state.anchored;
    }

  get logoPath(): string {
    const color: PrimaryColorEnum = this.layoutService._config.theme as PrimaryColorEnum;
    const menuMode: MenuModeEnum = this.layoutService._config.menuMode as MenuModeEnum;
    const isLightTheme = this.layoutService._config.colorScheme === 'light';

    // Diretório base das imagens
    const basePath = '../../assets/layout/images';

    // Nome do arquivo do logo baseado na cor
    const logoColor = isLightTheme ? `nevyo-${color}` : `nevyo-${color}-dark`;

    // Definição do logo baseado no menu selecionado
    switch (menuMode) {
      case MenuModeEnum.SlimPlus:
        return `${basePath}/${logoColor}.png`;
      case MenuModeEnum.Static:
        return `${basePath}/nevyo-${color}.png`;
      case MenuModeEnum.Horizontal:
        return `${basePath}/nevyo-${color}.png`;
      case MenuModeEnum.Slim:
        return `${basePath}/nevyo-${color}.png`;
      case MenuModeEnum.Overlay:
        return `${basePath}/nevyo-${color}.png`;
      case MenuModeEnum.Reveal:
        return `${basePath}/nevyo-${color}.png`;
      case MenuModeEnum.Drawer:
        return `${basePath}/nevyo-${color}.png`;
      default:
        return `${basePath}/nevyo-default.png`;
    }
  }

  get logoStyle(): any {
    const menuMode: MenuModeEnum = this.layoutService._config.menuMode as MenuModeEnum;

    switch (menuMode) {
      case MenuModeEnum.Horizontal:
        return { width: '5rem', height: '5rem' };
      case MenuModeEnum.Slim:
        return { width: '4rem', height: '4rem' };
      case MenuModeEnum.Static:
        return { width: '9rem', height: '9rem' };
      case MenuModeEnum.Overlay:
        return { width: '9rem', height: '9rem' };
      case MenuModeEnum.Reveal:
        return { width: '6rem', height: '6rem' };
      default:
        return { width: '6rem', height: '6rem' }; // Tamanho padrão para outros menus class="w-6rem h-6rem"
    }
  }


}
