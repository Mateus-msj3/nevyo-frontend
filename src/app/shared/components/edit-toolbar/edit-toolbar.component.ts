import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  styleUrl: './edit-toolbar.component.scss'
})
export class EditToolbarComponent {

  constructor() {
  }

  @Input() pageTitle?: string;

  /**
   * listeners
   */
  @Output() saveCloseButtonAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveButtonAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeButtonAction: EventEmitter<void> = new EventEmitter<void>();

  onSaveCloseButtonAction() {
    this.saveCloseButtonAction.emit();
  }

  onSaveButtonAction() {
    this.saveButtonAction.emit();
  }

  onCloseButtonAction() {
    this.closeButtonAction.emit();
  }

}
