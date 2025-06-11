import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseInput } from "../../abastracts/base-input";
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent extends BaseInput implements ControlValueAccessor {
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
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    if (this.form && this.controlName) {
      if (value) {
        this.form.get(this.controlName)?.disable();
      } else {
        this.form.get(this.controlName)?.enable();
      }
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Output() inputText = new EventEmitter<any>();

  private _disabled: boolean = false;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.disabled) {
      this.form.get(this.controlName)?.disable();
    }
  }

  // Implementação do ControlValueAccessor
  writeValue(value: any): void {
    if (this.form && this.controlName) {
      this.form.get(this.controlName)?.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  trim() {
    const control = this.form.get(this.controlName);
    if (control?.value) {
      const trimmedValue = (control.value as string).trim();
      control.setValue(trimmedValue);
      this.onChange(trimmedValue);
    }
    this.onTouched();
    this.compOnBlur.emit(control as FormControl);
  }

  onInput(event: any): void {
    const rawValue = event?.target?.value || '';
    if (this.form && this.controlName) {
      this.form.get(this.controlName)?.setValue(rawValue);
      this.onChange(rawValue);
    }
    this.inputText.emit({
      target: {
        value: rawValue
      }
    });
  }
}
