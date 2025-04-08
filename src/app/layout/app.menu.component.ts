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
        label: 'Library',
        icon: 'fa-regular fa-folder-open',
        routerLink: ['/library']
      },
      {
        label: 'Categories',
        icon: 'fa-solid fa-list-alt',
        routerLink: ['/categories']
      },
      {
        label: 'Reader',
        icon: 'fa-solid fa-book-open-reader',
        routerLink: ['/reading-progress-history']
      },
      {
        label: 'Reading Goal',
        icon: 'fa-solid fa-bullseye',
        routerLink: ['/reading-goals']
      },
      {
        label: 'Preferences',
        icon: 'fas fa-tools',
        routerLink: ['/configurations'],
      }
    ];
  }
}
