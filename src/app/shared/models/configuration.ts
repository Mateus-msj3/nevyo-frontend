import {User} from "./user";
import {BaseResourceModel} from "../abastracts/base-resource-model";

export class Configuration extends BaseResourceModel{
  
  constructor(
    public user?: User,
    public screen?: string,
    public menuTheme?: string,
    public menuType?: string,
    public colorScheme?: string,
    public primaryColor?: string,
    public inputStyle?: string,
    public scale?: number,
    public autoLoadGrid: boolean = false,
    public showFilterDialog: boolean = false,
    public emailNotificationsEnabled: boolean = false,
    public inAppNotificationsEnabled: boolean = false,
    public autoRunQueries: boolean = false,
    public staticMenuDesktopInactive: boolean = false,
    public overlayMenuActive: boolean = false,
    public profileSidebarVisible: boolean = false,
    public configSidebarVisible: boolean = false,
    public staticMenuMobileActive: boolean = false,
    public menuHoverActive: boolean = false,
    public sidebarActive: boolean = false,
    public anchored: boolean = false,
    public preferredLanguage?: string
  ) {
    super();
  }
  
  static fromJson(jsonData: any): Configuration {
    return Object.assign(new Configuration(), jsonData);
  }
}
