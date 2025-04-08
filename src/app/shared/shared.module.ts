import {NgModule} from '@angular/core';
import {SearchUserComponent} from "./components/search-user/search-user.component";
import {HasPermissionDirective} from "./directive/has.permission.directive";
import {TimeFormatPipe} from "./pipes/time-format.pipe";
import {PRIMENG_IMPORTS} from "./util/primeng-imports";
import {InputTextComponent} from "./components/input-text/input-text.component";
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {ErrorComponent} from "./components/error/error.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {ListToolbarComponent} from "./components/list-toolbar/list-toolbar.component";
import {EditToolbarComponent} from "./components/edit-toolbar/edit-toolbar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RadioComponent} from "./components/radio/radio.component";
import {CheckboxComponent} from "./components/checkbox/checkbox.component";
import {MultiSelectComponent} from "./components/multi-select/multi-select.component";
import {PipeModule} from "./pipes/pipe.module";
import {InputSwtichComponent} from "./components/input-swtich/input-swtich.component";
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import {ChipsComponent} from "./components/chips/chips.component";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {FileSizePipe} from "./pipes/file-size.pipe";
import {DateDiffPipe} from "./pipes/date-diff.pipe";


@NgModule({
  declarations: [
    EditToolbarComponent,
    ListToolbarComponent,
    InputTextComponent,
    DropdownComponent,
    ErrorComponent,
    CalendarComponent,
    RadioComponent,
    CheckboxComponent,
    MultiSelectComponent,
    InputSwtichComponent,
    FilterComponent,
    TableComponent,
    ChipsComponent,
    SearchUserComponent,
    TimeFormatPipe,
    HasPermissionDirective,
    FileSizePipe,
    DateDiffPipe
  ],
  imports: [
    PRIMENG_IMPORTS,
    ReactiveFormsModule,
    InputGroupAddonModule,
    InputGroupModule
  ],
  exports: [
    PRIMENG_IMPORTS,
    PipeModule,
    EditToolbarComponent,
    ListToolbarComponent,
    InputTextComponent,
    DropdownComponent,
    ErrorComponent,
    CalendarComponent,
    RadioComponent,
    CheckboxComponent,
    MultiSelectComponent,
    InputSwtichComponent,
    ReactiveFormsModule,
    FilterComponent,
    TableComponent,
    ChipsComponent,
    SearchUserComponent,
    TimeFormatPipe,
    HasPermissionDirective,
    FileSizePipe,
    DateDiffPipe
  ]
})
export class SharedModule {
}
