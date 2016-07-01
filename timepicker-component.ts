import {ControlValueAccessor, NgModel} from "angular2/common";
import {Directive, ElementRef, Renderer, Input, AfterViewInit,Output,EventEmitter} from "angular2/core";
import $ from "jquery";

declare var jQuery:JQueryStatic;

@Directive({
  selector: 'input.timepicker[ngControl],input.timepicker[ngFormControl],input.timepicker[ngModel]',
  host: {
    '(change)': 'onChange($event.target.value)', '(blur)': 'onChange($event.target.value)'
  }
})


export class TimePickerComponent implements ControlValueAccessor,AfterViewInit {
  @Input()
  options:Object;

  @Output()
  changeTime:EventEmitter<Object> = new EventEmitter();
  @Output()
  timeFormatError:EventEmitter<Object> = new EventEmitter();
  @Output()
  hideTimepicker:EventEmitter<Object> = new EventEmitter();
  @Output()
  selectTime:EventEmitter<Object> = new EventEmitter();
  @Output()
  showTimepicker:EventEmitter<Object> = new EventEmitter();
  @Output()
  timeRangeError:EventEmitter<Object> = new EventEmitter();

  ngAfterViewInit():any {
    var self = this;
    let el = $(this._elementRef.nativeElement);
    el.timepicker(this.options);
    el.on('changeTime', function (event) {
      self.onUpdate(event);
      self.changeTime.emit(event);
    });
    el.on('timeFormatError', function (event) {
      self.timeFormatError.emit(event);
    });
    el.on('hideTimepicker', function (event) {
      self.hideTimepicker.emit(event);
    });
    el.on('selectTime', function (event) {
      self.selectTime.emit(event);
    });
    el.on('showTimepicker', function (event) {
      self.showTimepicker.emit(event);
    });
    el.on('timeRangeError', function (event) {
      self.timeRangeError.emit(event);
    });
  }

  onChange = (_) => {
  };

  onTouched = () => {
  };

  constructor(private _renderer:Renderer, private _elementRef:ElementRef,private _ngModel:NgModel) {
  }

  private onUpdate(event:any) {
    let value = this._elementRef.nativeElement.value;
    this.writeValue(value);
    this._ngModel.viewToModelUpdate(value);
    this._elementRef.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
  }

  writeValue(value: any): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
  }

  registerOnChange(fn: () => any): void { this.onChange = fn; }
  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

}
