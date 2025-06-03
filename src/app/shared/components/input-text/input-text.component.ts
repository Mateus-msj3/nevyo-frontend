import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BaseInput} from "../../abastracts/base-input";

@Component({
  selector: 'app-input',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent extends BaseInput implements AfterViewInit {

  @Input() override controlName!: string;

  @Input() override label: string = '';

  @Input() override form!: FormGroup;

  @Input() type: string = 'text';

  @Input() override inputId!: string;

  @Input() limite: number = 999;

  @Input() blockPaste: boolean = false;

  @Input() noNumber: boolean = false;

  @ViewChild('input') input!: ElementRef<HTMLInputElement> | null;

  @Input() autoFocus: boolean = false;

  @Output() compOnBlur = new EventEmitter<FormControl>();

  @Input() mask!: string;

  @Input() value!: string;

  @Output() inputText = new EventEmitter<any>();


  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.input?.nativeElement.focus();
    }
  }

  trim() {
    const control = this.form.get(this.controlName);
    if (control?.value) {
      control.setValue((control.value as string).trim());
    }
    this.compOnBlur.emit(control as FormControl);
  }

  onInput(event: any): void {
    const rawValue = event?.target?.value || '';
    this.inputText.emit({
        target: {
            value: rawValue
        }
    });
}
}
