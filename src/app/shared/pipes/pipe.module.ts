import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullNamePipe} from "./full-name.pipe";
import {LocalDateTimePipe} from "./local-date-time.pipe";
import { BooleanToYesNoPipe } from './boolean-to-yes-no.pipe';



@NgModule({
  declarations: [
    FullNamePipe,
    LocalDateTimePipe,
    BooleanToYesNoPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    LocalDateTimePipe,
    BooleanToYesNoPipe,
  ]
})
export class PipeModule { }
