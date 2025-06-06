import {Component, OnInit} from '@angular/core';

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
        label: 'Customers',
        icon: 'pi pi-users',
        routerLink: ['/customers']
      },
      {
        label: 'Orders',
        icon: 'pi pi-shopping-cart',
        routerLink: ['/orders']
      },
      {
        label: 'Kits',
        icon: 'pi pi-box',
        routerLink: ['/kits']
      },
      {
        label: 'Products',
        icon: 'pi pi-tags',
        routerLink: ['/products']
      },
      {
        label: 'Availability',
        icon: 'pi pi-calendar',
        routerLink: ['/availability']
      },
      {
        label: 'Inventory',
        icon: 'pi pi-database',
        routerLink: ['/inventory']
      },
      {
        label: 'Stores',
        icon: 'fa-solid fa-store',
        routerLink: ['/stores']
      },
      {
        label: 'Settings',
        icon: 'fas fa-tools',
        routerLink: ['/configurations'],
      }
    ];
  }
}
