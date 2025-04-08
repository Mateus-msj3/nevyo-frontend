import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BaseInput} from "../../abastracts/base-input";

@Component({
  selector: 'app-switch',
  templateUrl: './input-swtich.component.html',
  styleUrls: ['./input-swtich.component.scss']
})

export class InputSwtichComponent extends BaseInput {
  
  @Input()
  override form!: FormGroup;
  
  @Input()
  override label = '';
  
  @Input()
  override controlName!: string;
  
  @Output()
  changeEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  showError = true;
  
  onChangeEvent(event: any) {
    this.changeEventEmitter.emit(event.checked);
  }
  
}
