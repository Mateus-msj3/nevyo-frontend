import { Injectable } from '@angular/core';
import {Configuration} from "../models/configuration";
import {BehaviorSubject, Observable} from "rxjs";
import {ConfigurationService} from "../../pages/configurations/configuration.service";
import {UserConfigurationService} from "./user-configuration.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationUtilService {

  configuration: Configuration | null = null;

  constructor(private userConfigService: UserConfigurationService, private configService: ConfigurationService) {}

  getConfiguration(): Configuration | null {
    this.userConfigService.config$.subscribe(config => {
      this.configuration = config;
    });
    return this.configuration;
  }

}
