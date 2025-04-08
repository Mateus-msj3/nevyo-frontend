import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BaseInput} from "../../abastracts/base-input";

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent extends BaseInput {

    @Input()
    override form!: FormGroup;

    @Input()
    override controlName!: string;

    @Input()
    filter = true;

    @Input()
    optionLabel!: string;

    @Input()
    override label!: string;

    @Input()
    options: any[] = [];

    @Output()
    changedSelection: EventEmitter<String> = new EventEmitter<String>();
    
    update() {
        this.changedSelection.emit(this.form.get(this.controlName)!.value);
    }


}
