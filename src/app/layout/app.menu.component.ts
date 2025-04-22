import {OnInit} from '@angular/core';
import {Component} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Dashboards',
        icon: 'fa-solid fa-chart-pie',
        routerLink: ['/dashboard']
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: ['/customers']
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-shopping-cart',
        routerLink: ['/orders']
      },
      {
        label: 'Kits',
        icon: 'pi pi-box',
        routerLink: ['/kits']
      },
      {
        label: 'Produtos',
        icon: 'pi pi-tags',
        routerLink: ['/products']
      },
      {
        label: 'Disponibilidade',
        icon: 'pi pi-calendar',
        routerLink: ['/availability']
      },
      {
        label: 'Estoque',
        icon: 'pi pi-database',
        routerLink: ['/inventory']
      },
      {
        label: 'Configurações',
        icon: 'fas fa-tools',
        routerLink: ['/configurations'],
      }
    ];
  }
}
