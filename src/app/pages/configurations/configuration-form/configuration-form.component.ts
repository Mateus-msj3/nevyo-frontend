import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {GlobalConfigurationService} from "../../../shared/services/global-configuration.service";

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss'
})
export class ConfigurationFormComponent implements OnInit {
  
  constructor(public readonly globalConfigService: GlobalConfigurationService,
              public readonly layoutService: LayoutService,) {
  }
  
  ngOnInit() {
    this.globalConfigService.findConfigurationByUser();
  }
  
}
