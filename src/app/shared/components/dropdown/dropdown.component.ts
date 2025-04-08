import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormGroup} from "@angular/forms";
import {BaseInput} from "../../abastracts/base-input";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends BaseInput implements ControlValueAccessor {

  @Input()
  override form!: FormGroup;

  @Input()
  override controlName!: string;

  @Input()
  override label!: string;

  @Input()
  options: any[] = [];

  @Input()
  filter: boolean = true;

  @Input()
  optionLabel!: string;

  @Input()
  optionLabel2!: string;

  @Input()
  virtualScrollOptions!: any;

  @Input()
  virtualScrollItemSize: number = 38;

  @Input()
  virtualScroll: boolean = false;

  @Output()
  changedSelection: EventEmitter<string> = new EventEmitter<string>();

  // Função de emissão de evento em caso de alteração de valor
  update(): void {
    this.changedSelection.emit(this.form.get(this.controlName)?.value);
  }

  // Métodos obrigatórios para a implementação de ControlValueAccessor
  writeValue(obj: any): void {
    if (this.form.get(this.controlName)) {
      this.form.get(this.controlName)!.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.form.get(this.controlName)) {
      isDisabled ? this.form.get(this.controlName)!.disable() : this.form.get(this.controlName)!.enable();
    }
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};
}
