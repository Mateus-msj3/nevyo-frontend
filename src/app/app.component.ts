import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GlobalConfigurationService} from "./shared/services/global-configuration.service";
import {PrimeNGConfig} from "primeng/api";
import {CoreModule} from "./core/core.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private readonly primengConfig: PrimeNGConfig,
              private readonly globalConfigurationService: GlobalConfigurationService) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.globalConfigurationService.findConfigurationByUser();
  }

}
