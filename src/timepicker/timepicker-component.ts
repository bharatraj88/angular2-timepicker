import {ControlValueAccessor, NgModel} from "angular2/common";
import {Directive, ElementRef, Renderer, Input, OnChanges,Output,EventEmitter} from "angular2/core";
var $ = require("jquery");


export class TimepickerConfig{
  //Override where the dropdown is appended.
  //Takes either a string to use as a selector, a function that gets passed the clicked input element as argument or a jquery object to use directly.
  appendTo : string = "body";

  //A class name to apply to the HTML element that contains the timepicker dropdown.
  className : string

  //Close the timepicker when the window is scrolled. (Replicates <select> behavior.)
  closeOnWindowScroll : boolean = false;

  //Disable selection of certain time ranges. Input is an array of time pairs, like `[['3:00am', '4:30am'], ['5:00pm', '8:00pm']]. The start of the interval will be disabled but the end won't. default: []
  disableTimeRanges : any[];

  //Disable typing in the timepicker input box; force users to select from list. More information here.
  disableTextInput : boolean = false;

  //Disable the onscreen keyboard for touch devices. There can be instances where Firefox or Chrome have touch events enabled (such as on Surface tablets but not actually be a touch device. In this case disableTouchKeyboard will prevent the timepicker input field from being focused. More information here.
  disableTouchKeyboard : boolean = false;

  //The time against which showDuration will compute relative times. If this is a function, its result will be used.
  durationTime : string;

  //Force update the time to step settings as soon as it loses focus.
  forceRoundTime : boolean = false;

  //Language constants used in the timepicker. Can override the defaults by passing an object with one or more of the following properties: decimal, mins, hr, hrs.
  lang : Object = { am: 'am', pm: 'pm', AM: 'AM', PM: 'PM', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' };

  //The time that should appear last in the dropdown list. Can be used to limit the range of time options.
  //default: 24 hours after minTime
  maxTime : string;

  //The time that should appear first in the dropdown list.
  minTime :string = "12:00am";

  /**Adds one or more custom options to the top of the dropdown. Can accept several different value types:
  Boolean (true): Adds a "None" option that results in an empty input value
  String: Adds an option with a custom label that results in an empty input value
  Object: Similar to string, but allows customizing the element's class name and the resulting input value. Can contain label, value, and className properties. value must be a string type.
  Array: An array of strings or objects to add multiple non-time options **/
  noneOption : any;

  //By default the timepicker dropdown will be aligned to the bottom right of the input element, or aligned to the top left if there isn't enough room below the input. Force alignment with l (left), r (right), t (top), and b (bottom). Examples: tl, rb. default: 'l'
  orientation : string;

  //Function used to compute rounded times. The function will receive time in seconds and a settings object as arguments. The function should handle a null value for seconds. default: round to nearest step
  roundingFunction : Function;

  //If no time value is selected, set the dropdown scroll position to show the time provided, e.g. "09:00". A time string, Date object, or integer (seconds past midnight) is acceptible, as well as the string 'now'.
  scrollDefault : string;

  selectOnBlur : boolean = false;
  //Update the input with the currently highlighted time value when the timepicker loses focus.

  //Show "24:00" as an option when using 24-hour time format. You must also set timeFormat for this option to work.
  show2400 : boolean = false;

  //Shows the relative time for each item in the dropdown. minTime or durationTime must be set.
  showDuration : boolean = false;

  //Display a timepicker dropdown when the input fires a particular event. Set to null or an empty array to disable automatic display. Setting should be an array of strings. default: ['focus']
  showOn : string[];


  //The amount of time, in minutes, between each item in the dropdown. Alternately, you can specify a function to generate steps dynamically. The function will receive a count integer (0, 1, 2...) and is expected to return a step integer.
  step : number = 30;

  //When scrolling on the edge of the picker, it prevent parent containers () to scroll. default: false
  stopScrollPropagation : boolean = false;

  //How times should be displayed in the list and input element. Uses PHP's date() formatting syntax. Characters can be escaped with a preceeding double slash (e.g. H\\hi). Alternatively, you can specify a function instead of a string, to use completely custom time formatting. In this case, the format function receives a Date object and is expected to return a formatted time as a string. default: 'g:ia'
  timeFormat : string;

  //Highlight the nearest corresponding time option as a value is typed into the form input.
  typeaheadHighlight : boolean = true;

  //Convert the input to an HTML <SELECT> control. This is ideal for small screen devices, or if you want to prevent the user from entering arbitrary values. This option is not compatible with the following options: appendTo, closeOnWindowScroll, disableTouchKeyboard, forceRoundTime, scrollDefault, selectOnBlur, typeAheadHighlight.
  useSelect : boolean = false;

  //If a time greater than 24 hours (27:30, for example) is entered, apply modolo 24 to create a valid time. Setting this to false will cause an input of 27:30 to result in a timeFormatError event.
  wrapHours : boolean = true;
}






@Directive({
  selector: 'input.timepicker[ngControl],input.timepicker[ngFormControl],input.timepicker[ngModel]',
  host: {
    '(change)': 'onChange($event.target.value)', '(blur)': 'onChange($event.target.value)'
  }
})


export class TimePickerComponent implements ControlValueAccessor,OnChanges {
  @Input()
  options:TimepickerConfig;

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

  ngOnChanges():any {
    var self = this;
    let el = $(this._elementRef.nativeElement);
    // Unbinding if timepicker present
    el.timepicker('remove');
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
