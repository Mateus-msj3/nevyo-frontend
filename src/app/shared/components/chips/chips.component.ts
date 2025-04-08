import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseInput} from "../../abastracts/base-input";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent extends BaseInput {

  @Input() override controlName!: string;

  @Input() override label: string = '';

  @Input() override form!: FormGroup;

  @Input() type: string = 'text';

  @Input() override inputId!: string;

  @Output() compOnBlur = new EventEmitter<FormControl>();

  override ngOnInit(): void {
    super.ngOnInit();
  }

  trim() {
    const control = this.form.get(this.controlName);
    if (control?.value) {
      control.setValue((control.value as string).trim());
    }
    this.compOnBlur.emit(control as FormControl);
  }
}
