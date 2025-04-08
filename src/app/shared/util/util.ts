import {HttpParams} from '@angular/common/http';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    NgControl,
    NgForm, ɵFormGroupRawValue,
    ɵGetProperty,
    ɵTypedOrUntyped
} from '@angular/forms';
import {SelectItem} from 'primeng/api';

/**
 * An utility service.
 */
export class Util {

    static dataURItoBlob(dataURI: string, contentType: string) {
        const sliceSize = 512;
        dataURI = dataURI.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
        const byteCharacters = atob(dataURI);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    }

    static createNewParams(parametros: any): HttpParams {
        const params = new HttpParams();
        return this.appendParams(parametros, params);
    }

    static createParams(parametros: any, params: HttpParams): HttpParams {
        return this.appendParams(parametros, params);
    }

    private static appendParams(parametros: any, params: HttpParams) {
        if (parametros) {
            Object.entries(parametros).forEach(([key, value]) => {
                if (value instanceof Array) {
                    if (value.length > 0) {
                        params = params.append(key, value.toString());
                    }
                } else {
                    if (value != null
                        && value !== '') {
                        if (value instanceof Date) {
                            params = params.append(key, value.toISOString());
                        } else {
                            params = params.append(key, value.toString());
                        }
                    }
                }
            });
        }
        return params;
    }

    static convertToBrazilPattern(data: Date): string | null {
        if (data) {
            const options: any = {year: 'numeric', month: '2-digit', day: '2-digit'};
            return data.toLocaleDateString('pt-BR', options);
        }
        return null;
    }


    static toValue(elements: { value: any }[]) {
        return elements.map(element => element.value);
    }

    static hasRequired(control: AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, string>> | null) {
        const validator = control?.validator;
        if (validator) {
            const validationErrors = validator({} as AbstractControl);
            if (validationErrors && validationErrors['required']) {
                return true;
            }
        }
        return false;
    }

    static hasValidator(control: AbstractControl, validatorName: string) {
        const validator = control.validator;
        if (validator) {
            const validationErrors = validator({} as AbstractControl);
            if (validationErrors && validationErrors[validatorName]) {
                return true;
            }
        }
        return false;
    }

    static getLabel(value: any, options: { label: string | undefined; value: any }[]) {
        for (const option of options) {
            if (option.value === value) {
                return option.label;
            }
        }
        return null;
    }


    static getLabelFromSelectItem(value: any, options: SelectItem[]) {
        return Util.getLabel(value, options.map(option => {
            return {value: option.value, label: option.label};
        }));
    }

    static getLabelFromMultiSelectItem(values: any[], options: SelectItem[]) {

        const labels: any[] = [];
        values.forEach(value => {
            labels.push(this.getLabelFromSelectItem(value, options));
        });
        return labels.join(', ');
    }

    static getEnumKeyByEnumValue(myEnum: any, enumValue: any) {
        const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
        return keys.length > 0 ? keys[0] : null;
    }

    static horaToDate(hora: string) {
        return new Date(`0000-01-01T${hora}`);
    }


    static rangeNumber(ini: number, fim: number): number[] {
        const res: number[] = [];
        for (let i = ini; i <= fim; i++) {
            res.push(i);
        }
        return res;
    }

    static rangerNumberSI(ini: number, fim: number): SelectItem[] {
        const res: SelectItem[] = [];
        for (let i = ini; i <= fim; i++) {
            res.push({label: i.toString(), value: i});
        }
        return res;
    }

    static enumToSI(enumType: any) {
        return Object.keys(enumType).map(key => {
            return {
                value: key,
                label: enumType[key]
            };
        });
    }

    static surfaceCopy(source: any, target: any) {
        const keys = Object.keys(target);
        keys.forEach(key => {
            const isToCopyNow = source[key] != null && !(source[key] instanceof Object);
            if (isToCopyNow) {
                target[key] = source[key];
            } else if (source[key] instanceof Date) {
                target[key] = new Date(source[key]);
            }
        });
        return target;
    }

    static markAllNgModelsFieldsAsDirty(formGroup: NgForm) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched({onlySelf: true});
            control.markAsDirty({onlySelf: true});
        });
    }

    static markAllFieldsAsDirty(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched({onlySelf: true});
            control.markAsDirty({onlySelf: true});
        });
    }

    static getLastDayNextMonth(startDate: Date) {
        let fullYear = startDate.getFullYear();
        let month = startDate.getMonth();
        if (month === 11) {
            month = 0;
            fullYear = fullYear + 1;
        }
        return new Date(fullYear, month + 2, 0);
    }

    static getLastDayPreviousMonth(startDate: Date) {
        let fullYear = startDate.getFullYear();
        let month = startDate.getMonth();
        if (month === 1) {
            month = 11;
            fullYear = fullYear - 1;
        }
        return new Date(fullYear, month - 1, 1);
    }

    static sortSelectItem(a: any, b: any): number {
        return a.label.localeCompare(b.label, 'pt-br', {sensitivity: 'base'});
    }

    static sortItem(a: any, b: any, param: string): number {
        return a[param].localeCompare(b[param], 'pt-br', {sensitivity: 'base'});
    }

    static compareString(a: any, b: any): number {
        return a.localeCompare(b, 'pt-br', {sensitivity: 'base'});
    }

    static validateAllFormFields(formGroup: FormGroup) {
        formGroup.markAsTouched({onlySelf: true});
        formGroup.markAsDirty({onlySelf: true});
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
                control.markAsDirty({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    static visitAllFormFilds(formGroup: FormGroup, doVisit: (control: AbstractControl) => boolean) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                const continueIterate = doVisit(control);
                if (!continueIterate) {
                    return;
                }
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    static capitalizar(txt: string) {

        if (txt == null) {
            return null;
        }

        if (0 === txt.length) {
            return '';
        }

        const prep: string[] = ['por', 'a', 'para', 'de', 'em', 'pelo', 'ao', 'pro', 'do', 'no', 'pela', 'à', 'pra',
            'da', 'na', 'pelos', 'aos', 'pros', 'dos', 'nos', 'pelas', 'às', 'pras', 'das', 'nas'];

        const partes = txt.split(' ');

        const res = [];

        for (const parte of partes) {
            const lowered = parte.toLocaleLowerCase();
            if (prep.includes(lowered)) {
                res.push(lowered);
            } else {
                res.push(lowered.charAt(0).toLocaleUpperCase() + lowered.slice(1));
            }
        }

        return res.join(' ');
    }
    
    static generatePassword(resourceForm: FormGroup, controlName: string, secondControlName?: string): void {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        resourceForm.get(controlName)?.setValue(password);
        
        if (secondControlName) {
            resourceForm.get(secondControlName)?.setValue(password);
        }
    }

}


