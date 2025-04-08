import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ListService} from "../../services/list-service";
import {BaseInput} from "../../abastracts/base-input";

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent extends BaseInput {

    dateSetting: any;

    @Input()
    override controlName!: string;

    @Input()
    override label!: string;

    @Input()
    override form!: FormGroup;

    @Input()
    maxDate!: Date;

    @Input()
    minDate!: Date;

    @Input()
    monthNavigator = true;

    @Input()
    yearNavigator = true;

    @Input()
    readonlyInput = false;

    @Input()
    showIcon = false;

    @Input()
    yearRange = '1900:2100';

    @Output()
    selectedDate: EventEmitter<String> = new EventEmitter<String>();

    override ngOnInit() {
        super.ngOnInit();
        this.dateSetting = ListService.configureDate();
    }

    selectDate() {
        this.selectedDate.emit(this.form.get(this.controlName)?.value);
    }

    onBlur() {
        this.selectedDate.emit(this.form.get(this.controlName)?.value);
    }

    onClearClick() {
        this.selectedDate.emit();
    }
}
