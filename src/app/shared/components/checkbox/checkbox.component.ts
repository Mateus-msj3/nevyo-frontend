import {Component, Input, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements OnInit {

    @Input()
    form!: FormGroup;

    @Input()
    label = '';

    @Input()
    options!: SelectItem[];

    @Input()
    name!: string;

    @Input()
    classColumns = 'ui-g-12';

    @Input()
    showError = true;

    @Input()
    styleLabel = 'font-size: 1.35em';

    constructor() {
    }

    ngOnInit() {
    }

    get formControl(): FormControl | null {
        const control: AbstractControl | null = this.form.get(this.name);
        return control instanceof FormControl ? control : null;
    }

}
