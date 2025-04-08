import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrl: './list-toolbar.component.scss'
})
export class ListToolbarComponent {

  @Input() iconClass!: string;

  @Input() pageTitle?: string;

  @Input() showNewButton: boolean = true;

  @Input() showFilterButton: boolean = true;

  @Input() showClearButton: boolean = true;

  /**
   * listeners
   */
  @Output() filterButtonAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() newButtonAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() clearButtonAction: EventEmitter<void> = new EventEmitter<void>();

  onFilterButtonAction() {
    this.filterButtonAction.emit();
  }

  onNewButtonAction() {
    this.newButtonAction.emit();
  }

  onClearButtonAction() {
    this.clearButtonAction.emit();
  }

}
