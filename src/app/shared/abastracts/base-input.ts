import {Directive, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Util} from "../util/util";

@Directive()
export abstract class BaseInput implements OnInit {

    controlName!: string;
    form!: FormGroup;
    label!: string;
    labelErro!: string;
    inputId: string | null | undefined;

    ngOnInit(): void {

        if (this.form == null) {
            this.throwError('o Form não foi informado');
        }

        if (this.controlName == null) {
            this.throwError('O controlname não foi informado');
        }

        if (this.form.get(this.controlName) == null) {
            this.throwError('O controlname informado não existe dentro do form');
        }
        if (this.inputId == null) {
            this.inputId = this.controlName;
        }

        if (this.labelErro == null) {
            this.labelErro = this.label;
        }

    }

    showAsterisk() {
        if (this.label == null || this.label.trim().length === 0) {
            return false;
        }
        return Util.hasRequired(this.form.get(this.controlName)) && !this.form.get(this.controlName)?.disabled;
    }

    private throwError(msg: string) {
        throw new Error(`ERRO NO COMPONENTE DE LABEL <<< ${this.label} >>> E CONTROLNAME <<< ${this.controlName}>>>. ${msg}`);
    }
}