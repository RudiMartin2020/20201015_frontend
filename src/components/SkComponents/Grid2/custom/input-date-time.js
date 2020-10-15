import { DateTimePicker } from './date-time-picker'
import * as wjCore from '@grapecity/wijmo'
import * as wjInput from '@grapecity/wijmo.input'

let { addClass, Event, Globalize, isDate } = wjCore
let { DropDown } = wjInput

export class InputDateTime extends DropDown {
    _dtPicker;

    /**
     * Initializes a new instance of the {@link InputDateTime} class.
     */
    constructor (element, options) {
      super(element)
      addClass(this.hostElement, 'wj-inputdatetime')
      this._dtPicker = new DateTimePicker(this._dropDown, {
        done: () => (this.isDroppedDown = false),
        valueChanged: () => this._updateText()
      })
      this.inputElement.addEventListener('change', this._updateValue.bind(this))
      this.initialize(options)
    }

    // ** object model

    /**
     * Gets or sets the current value of the control.
     */
    get value () {
      return this._dtPicker.value
    }
    set value (value) {
      this._dtPicker.value = value
    }
    /**
     * Gets or sets the format used to display the current value.
     */
    get format () {
      return this._dtPicker.format
    }
    set format (value) {
      this._dtPicker.format = value
      this._updateText()
    }

    /**
     * Event that fires when the {@link value} property changes.
     */
    valueChanged = new Event();
    /**
     * Raises the {@link valueChanged} event.
     */
    onValueChanged () {
      this.valueChanged.raise(this)
    }

    // ** overrides

    // give focus to picker when it opens
    onIsDroppedDownChanged (e) {
      super.onIsDroppedDownChanged(e)
      if (this.isDroppedDown) {
        this._dtPicker.focus()
      }
    }

    // ** implementation

    // update text when value changes
    _updateText () {
      this.text = Globalize.formatDate(this.value, this.format)
      this.onValueChanged()
    }

    // update value when text changes
    _updateValue () {
      let dt = Globalize.parseDate(this.inputElement.value, this.format)
      if (isDate(dt)) {
        this.value = dt
      } else {
        this.text = Globalize.formatDate(this.value, this.format)
      }
    }
}
