import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {ErrorMessageMap} from "../../util/error-message-map";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  readonly errorMessageMap: ErrorMessageMap = new ErrorMessageMap();

  @Input()
  target: AbstractControl | null = null;

  @Input()
  label = '';

  constructor() {}

  ngOnInit() {}

  getMsg() {
    let msg = '';
    const errors = this.target?.errors;
    if (errors && this.target?.invalid && (this.target.touched || this.target.dirty)) {
      const errorsKeys = Object.keys(errors);
      if (errorsKeys.length > 0) {
        const key = errorsKeys[0];
        msg = this.errorMessageMap.get(key, (this.label || '').replace(/[*:]/g, ''), errors[key]);
      }
    }
    return msg;
  }
}

