import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Table} from "primeng/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  
  @Input() data: any[] = [];
  
  @Input() columns: { field: string, header: string }[] = [];
  
  @Input() globalFilterFields: string[] = [];
  
  @Output() edit = new EventEmitter<any>();
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
