import { TimepickerModule } from '../src/timepicker.module';
import { NgModule } from '@angular/core';
import {TestComponent} from './test.component';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,FormsModule, TimepickerModule
    ],
  declarations: [ TestComponent ],
  bootstrap : [ TestComponent ]
})
export class TestModule { }