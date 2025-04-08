import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {BaseInput} from "../../abastracts/base-input";

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.css']
})
export class RadioComponent extends BaseInput {

    @Input()
    override form!: FormGroup;

    @Input()
    override label = '';

    @Input()
    options: SelectItem[] | undefined;

    @Input()
    inline = true;

    @Input()
    override controlName!: string;

    @Output()
    clickEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    showError = true;

    onClickEvent(value: any) {
        this.clickEventEmitter.emit(value);
    }
}
