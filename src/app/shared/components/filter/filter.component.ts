import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DialogConfig} from "../../util/dialog-config";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  
  @Input() form!: FormGroup;
  
  @Input() dialogConfig!: DialogConfig;
  
  @Output() filter = new EventEmitter<void>();
  
  @Output() clear = new EventEmitter<void>();
  
  @Output() cancel = new EventEmitter<void>();

}
