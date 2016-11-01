import { TimePicker } from './timepicker/timepicker';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule,FormsModule,TimePicker],
    declarations: [TimePicker],
    exports: [TimePicker]
})
export class TimepickerModule { }