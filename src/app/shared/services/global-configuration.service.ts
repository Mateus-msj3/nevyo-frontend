import {Injectable} from '@angular/core';
import {RadioButtonClickEvent} from "primeng/radiobutton";
import {SelectButtonOptionClickEvent} from "primeng/selectbutton";
import {MenuService} from "../../layout/app.menu.service";
import {ColorScheme, LayoutService, MenuColorScheme, MenuMode} from "../../layout/service/app.layout.service";
import {ConfigurationService} from "../../pages/configurations/configuration.service";
import {ColorSchemeEnum} from "../enums/color-scheme-enum";
import {MenuModeEnum} from "../enums/menu-mode-enum";
import {MenuThemeEnum} from "../enums/menu-theme-enum";
import {ComponentTheme} from "../interfaces/component-theme";
import {Language} from "../interfaces/language";
import {MenuType} from "../interfaces/menu-type";
import {Preference} from "../interfaces/preference";
import {Configuration} from "../models/configuration";
import {User} from "../models/user";
import {LocalStorageService} from "./local-storage.service";
import {UserConfigurationService} from "./user-configuration.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigurationService {

  config!: Configuration;

  componentThemes: ComponentTheme[] = [];

  menuTypes: MenuType[] = [];

  scales: number[] = [12, 13, 14, 15, 16];

  preferences: Preference[] = [];

  languages: Language[] = [];

  selectedLanguage!: string;

  autoLoadGrid: boolean = false;

  showFilterDialog: boolean = false;

  emailNotificationsEnabled: boolean = false;

  inAppNotificationsEnabled: boolean = false;

  autoRunQueries: boolean = false;

  staticMenuDesktopInactive: boolean = false;

  overlayMenuActive: boolean = false;

  profileSidebarVisible: boolean = false;

  configSidebarVisible: boolean = false;

  staticMenuMobileActive: boolean = false;

  menuHoverActive: boolean = false;

  sidebarActive: boolean = false;

  anchored: boolean = false;

  preferredLanguage: string = 'pt-BR';

  constructor(public localStorageService: LocalStorageService,
              public readonly configurationService: ConfigurationService,
              public readonly layoutService: LayoutService,
              public readonly menuService: MenuService,
              public readonly userConfigService: UserConfigurationService) {

    this.findConfigurationByUser();

    this.componentThemes = [
      {name: 'indigo', color: '#6366F1'},
      {name: 'blue', color: '#3B82F6'},
      {name: 'purple', color: '#8B5CF6'},
      {name: 'teal', color: '#14B8A6'},
      {name: 'cyan', color: '#06b6d4'},
      {name: 'green', color: '#10b981'},
      {name: 'orange', color: '#f59e0b'},
      {name: 'pink', color: '#d946ef'},
    ];

    this.menuTypes = [
      {name: 'Static', value: 'static'},
      {name: 'Overlay', value: 'overlay'},
      {name: 'Slim', value: 'slim'},
      {name: 'Slim+', value: 'slim-plus'},
      {name: 'Reveal', value: 'reveal'},
      {name: 'Drawer', value: 'drawer'},
      {name: 'Horizontal', value: 'horizontal'},
    ];

    this.preferences = [
      {name: 'autoLoadGrid', label: 'Automatic Data Loading in Tables', value: false},
      {name: 'showFilterDialog', label: 'Show Filter Dialog', value: false},
      {name: 'emailNotificationsEnabled', label: 'Email Notifications Enabled', value: false},
      {name: 'inAppNotificationsEnabled', label: 'In-App Notifications Enabled', value: false},
      {name: 'autoRunQueries', label: 'Automatic Query Execution', value: false},
      {name: 'staticMenuDesktopInactive', label: 'Static Menu on Desktop Inactive', value: false},
      {name: 'overlayMenuActive', label: 'Overlay Menu Active', value: false},
      {name: 'profileSidebarVisible', label: 'Profile Sidebar Visible', value: false},
      {name: 'configSidebarVisible', label: 'Configuration Sidebar Visible', value: false},
      {name: 'staticMenuMobileActive', label: 'Static Menu on Mobile Active', value: false},
      {name: 'menuHoverActive', label: 'Hover Menu Active', value: false},
      {name: 'sidebarActive', label: 'Sidebar Active', value: false},
      {name: 'anchored', label: 'Anchored', value: false}
    ];

    this.languages = [
      {name: 'Português', value: 'pt-BR', icon: 'https://img.icons8.com/color/48/brazil-circular.png'},
      {name: 'Inglês', value: 'en-US', icon: 'https://img.icons8.com/color/48/usa-circular.png'},
      {name: 'Espanhol', value: 'es-ES', icon: 'https://img.icons8.com/color/48/spain-circular.png'},
    ];
  }

  findConfigurationByUser() {
    const userId = this.localStorageService.getUserId();
    if (userId.length > 0) {
      this.configurationService.findByUser(userId).subscribe(config => {
        this.config = config;

        // Atualiza temas de componentes
        this.updateComponentThemesFromConfig();

        //Atualiza a escala
        this.updateScaleFromConfig();

        // Atualiza tipos de menu
        this.updateMenuTypesFromConfig();

        //Atualiza o Menu Theme
        this.updateMenuThemeFromConfig();

        //Atualiza o ColorScheme
        this.updateColorSchemeFromConfig();

        //Atualiza o Input Style
        this.updateInputStyleFromConfig();

        // Atualiza idiomas
        this.updateLanguagesFromConfig();

        // Atualiza as preferências com base no objeto config
        this.updatePreferencesFromConfig();
      });
    }
  }

  updateComponentThemesFromConfig() {
    const theme = this.componentThemes.find(theme => theme.name === this.config.primaryColor);
    if (theme) {
      const validMenuTheme: MenuColorScheme = theme.name as MenuColorScheme;
      this.menuTheme = validMenuTheme;
      this.changeTheme(validMenuTheme);
    }
  }

  updateScaleFromConfig() {
    if (this.config.scale && this.scales.includes(this.config.scale)) {
      this.scale = this.config.scale;
    } else {
      this.scale = this.scales[0];
    }
  }

  updateMenuTypesFromConfig() {
    const menuType = this.menuTypes.find(menu => menu.value === this.config.menuType);
    if (menuType) {
      const validMenuMode: MenuMode = menuType.value as MenuMode;
      this.menuMode = validMenuMode;
    }
  }

  updateMenuThemeFromConfig() {
    const validMenuTheme: MenuColorScheme = this.config.menuTheme as MenuColorScheme;
    this.menuTheme = validMenuTheme;
  }

  updateColorSchemeFromConfig() {
    const colorScheme: ColorScheme = this.config.colorScheme as ColorScheme;
    this.colorScheme = colorScheme;
  }

  updateInputStyleFromConfig() {
    this.inputStyle = this.config.inputStyle!;
  }

  updateLanguagesFromConfig() {
    const language = this.languages.find(lang => lang.value === this.config.preferredLanguage);
    if (language) {
      this.selectedLanguage = language.value;
    }
  }

  updatePreferencesFromConfig() {
    this.preferences.forEach(preference => {
      switch (preference.name) {
        case 'autoLoadGrid':
          preference.value = this.config.autoLoadGrid;
          this.autoLoadGrid = preference.value;
          break;
        case 'showFilterDialog':
          preference.value = this.config.showFilterDialog;
          this.showFilterDialog = preference.value;
          break;
        case 'emailNotificationsEnabled':
          preference.value = this.config.emailNotificationsEnabled;
          this.emailNotificationsEnabled = preference.value;
          break;
        case 'inAppNotificationsEnabled':
          preference.value = this.config.inAppNotificationsEnabled;
          this.inAppNotificationsEnabled = preference.value;
          break;
        case 'autoRunQueries':
          preference.value = this.config.autoRunQueries;
          this.autoRunQueries = preference.value;
          break;
        case 'staticMenuDesktopInactive':
          preference.value = this.config.staticMenuDesktopInactive;
          this.staticMenuDesktopInactive = preference.value;
          break;
        case 'overlayMenuActive':
          preference.value = this.config.overlayMenuActive;
          this.overlayMenuActive = preference.value;
          break;
        case 'profileSidebarVisible':
          preference.value = this.config.profileSidebarVisible;
          this.profileSidebarVisible = preference.value;
          break;
        case 'configSidebarVisible':
          preference.value = this.config.configSidebarVisible;
          this.configSidebarVisible = preference.value;
          break;
        case 'staticMenuMobileActive':
          preference.value = this.config.staticMenuMobileActive;
          this.staticMenuMobileActive = preference.value;
          break;
        case 'menuHoverActive':
          preference.value = this.config.menuHoverActive;
          this.menuHoverActive = preference.value;
          break;
        case 'sidebarActive':
          preference.value = this.config.sidebarActive;
          this.sidebarActive = preference.value;
          break;
        case 'anchored':
          preference.value = this.config.anchored;
          this.anchored = preference.value;
          break;
        default:
          break;
      }
    });
  }

  updatePreference(name: string, checked: boolean) {
    switch (name) {
      case 'autoLoadGrid':
        this.autoLoadGrid = checked;
        break;
      case 'showFilterDialog':
        this.showFilterDialog = checked;
        break;
      case 'emailNotificationsEnabled':
        this.emailNotificationsEnabled = checked;
        break;
      case 'inAppNotificationsEnabled':
        this.inAppNotificationsEnabled = checked;
        break;
      case 'autoRunQueries':
        this.autoRunQueries = checked;
        break;
      case 'staticMenuDesktopInactive':
        this.staticMenuDesktopInactive = checked;
        break;
      case 'overlayMenuActive':
        this.overlayMenuActive = checked;
        break;
      case 'profileSidebarVisible':
        this.profileSidebarVisible = checked;
        break;
      case 'configSidebarVisible':
        this.configSidebarVisible = checked;
        break;
      case 'staticMenuMobileActive':
        this.staticMenuMobileActive = checked;
        break;
      case 'menuHoverActive':
        this.menuHoverActive = checked;
        break;
      case 'sidebarActive':
        this.sidebarActive = checked;
        break;
      case 'anchored':
        this.anchored = checked;
        break;
      default:
        console.error('Preference not found:', name);
    }

    const preference = this.preferences.find(p => p.name === name);
    if (preference) {
      preference.value = checked;
    }
  }

  changeTheme(theme: string): string {
    this.theme = theme;
    switch (theme) {
      case 'blue':
        return 'BLUE';
      case 'purple':
        return 'PURPLE';
      case 'teal':
        return 'TEAL';
      case 'cyan':
        return 'CYAN';
      case 'green':
        return 'GREEN';
      case 'orange':
        return 'ORANGE';
      case 'pink':
        return 'PINK';
      default:
        return 'INDIGO';
    }
  }

  onMenuTypeSelected(event: SelectButtonOptionClickEvent) {
  }

  get menuMode(): MenuMode {
    return this.layoutService.config().menuMode;
  }

  set menuMode(_val: MenuMode) {
    this.layoutService.config.update((config) => ({
      ...config,
      menuMode: _val,
    }));
    if (
      this.layoutService.isSlimPlus() ||
      this.layoutService.isSlim() ||
      this.layoutService.isHorizontal()
    ) {
      this.menuService.reset();
    }
  }

  get theme(): string {
    return <string>this.layoutService.config().theme;
  }

  set theme(_val: string) {
    this.layoutService.config.update((config) => ({
      ...config,
      theme: _val,
    }));
  }

  get menuTheme(): MenuColorScheme {
    return this.layoutService.config().menuTheme;
  }

  set menuTheme(_val: MenuColorScheme) {
    this.layoutService.config.update((config) => ({
      ...config,
      menuTheme: _val,
    }));
  }

  get colorScheme(): ColorScheme {
    return this.layoutService.config().colorScheme;
  }

  set colorScheme(_val: ColorScheme) {
    this.layoutService.config.update((config) => ({
      ...config,
      colorScheme: _val,
    }));
  }

  get inputStyle(): string {
    return <string>this.layoutService.config().inputStyle;
  }

  set inputStyle(_val: string) {
    this.layoutService.config.update((config) => ({
      ...config,
      inputStyle: _val,
    }));
  }

  get scale(): number {
    return <number>this.layoutService.config().scale;
  }

  set scale(_val: number) {
    this.layoutService.config.update((config) => ({
      ...config,
      scale: _val,
    }));
  }

  decrementScale() {
    this.scale--;
  }

  incrementScale() {
    this.scale++;
  }

  onMenuThemeSelected(event: RadioButtonClickEvent) {
    this.buildConfig()
  }

  onLanguageChanged(event: SelectButtonOptionClickEvent) {
    this.preferredLanguage = event.option.value;
  }

  onInputStyleSelected(event: RadioButtonClickEvent) {
    // this.buildConfig();
  }

  onColorSchemeSelected(event: RadioButtonClickEvent) {
    // this.buildConfig();
  }

  transformMenuTypeToEnum(menuMode: MenuMode): string {
    const modeMap: { [key in MenuMode]: string } = {
      [MenuModeEnum.Static]: 'STATIC',
      [MenuModeEnum.Slim]: 'SLIM',
      [MenuModeEnum.SlimPlus]: 'SLIM_PLUS',
      [MenuModeEnum.Overlay]: 'OVERLAY',
      [MenuModeEnum.Reveal]: 'REVEAL',
      [MenuModeEnum.Drawer]: 'DRAWER',
      [MenuModeEnum.Horizontal]: 'HORIZONTAL'
    };
    return modeMap[menuMode] || '';
  }


  transformColorSchemeToEnum(colorScheme: ColorScheme): string {
    const color: { [key in ColorScheme]: string } = {
      [ColorSchemeEnum.Light]: 'LIGHT',
      [ColorSchemeEnum.Dim]: 'DIM',
      [ColorSchemeEnum.Dark]: 'DARK'
    };
    return color[colorScheme] || 'LIGHT';
  }

  transformMenuThemeToEnum(menuTheme: MenuColorScheme): string {
    const themeMap: { [key in MenuColorScheme]: string } = {
      [MenuThemeEnum.ColorScheme]: 'COLOR_SCHEME',
      [MenuThemeEnum.PrimaryColor]: 'PRIMARY_COLOR',
      [MenuThemeEnum.Transparent]: 'TRANSPARENT'
    };
    return themeMap[menuTheme] || 'COLOR_SCHEME';
  }

  transformInputStyleToEnum(inputStyle: string): string {
    switch (inputStyle) {
      case "filled":
        return "FILLED"
      default:
        return "OUTLINED";
    }
  }

  buildConfig() : Configuration {
    this.config.user = this.config?.user ? this.config.user : new User();
    this.config.menuTheme = this.transformMenuThemeToEnum(this.menuTheme);
    this.config.menuType = this.transformMenuTypeToEnum(this.menuMode);
    this.config.colorScheme = this.transformColorSchemeToEnum(this.colorScheme);
    this.config.primaryColor = this.changeTheme(this.theme);
    this.config.inputStyle = this.transformInputStyleToEnum(this.inputStyle);
    this.config.scale = this.scale;
    this.config.autoLoadGrid = this.autoLoadGrid;
    this.config.showFilterDialog = this.showFilterDialog;
    this.config.emailNotificationsEnabled = this.emailNotificationsEnabled;
    this.config.inAppNotificationsEnabled = this.inAppNotificationsEnabled;
    this.config.autoRunQueries = this.autoRunQueries;
    this.config.staticMenuDesktopInactive = this.staticMenuDesktopInactive;
    this.config.overlayMenuActive = this.overlayMenuActive;
    this.config.profileSidebarVisible = this.profileSidebarVisible;
    this.config.configSidebarVisible = this.configSidebarVisible;
    this.config.staticMenuMobileActive = this.staticMenuMobileActive;
    this.config.menuHoverActive = this.menuHoverActive;
    this.config.sidebarActive = this.sidebarActive;
    this.config.anchored = this.anchored;
    this.config.preferredLanguage = this.preferredLanguage;
    return this.config;
  }

  onSaveButtonAction() {
    this.configurationService.update(this.buildConfig()).subscribe(value => {
      this.userConfigService.updateConfig(value);
    });
  }
}
