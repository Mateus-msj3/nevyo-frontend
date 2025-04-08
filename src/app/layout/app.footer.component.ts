import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import {environment} from "../../enviroments/environment";

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
  styles: [`
    :host {
      position: relative;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4rem; /* Altura fixa do footer */
      transition: margin-left 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      border-top: 1px solid var(--surface-border);
      background-color: var(--surface);
      z-index: 1000; /* Garante que o footer sempre fique acima */
    }
  `]
})
export class AppFooterComponent {
    constructor(public layoutService: LayoutService) { }
  version = environment.version;
}
