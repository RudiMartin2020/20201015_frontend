import * as wjCore from '@grapecity/wijmo'
import * as wjGauge from '@grapecity/wijmo.gauge'
import * as wjInput from '@grapecity/wijmo.input'

let { Control, Event, Globalize, asDate, asString } = wjCore
let { Calendar } = wjInput
let { LinearGauge } = wjGauge

export class DateTimePicker extends Control {
    // child elements
    _cal;
    _parts;
    _tm;
    _hour;
    _min;
    _sec;
    _ms;
    _btnNow;
    _btnDone;
    _ctlCal;
    _ctlHour;
    _ctlMin;
    _ctlSec;
    _ctlMs;

    // property storage
    _value;
    _fmt;
    _fmtTime;

    /**
     * Gets or sets the template used to instantiate {@link Calendar} controls.
     */
    static controlTemplate = '<div wj-part="cal"></div>' +
        '<div class="picker-control" wj-part="parts">' +
        '<div>Time</div><div wj-part="tm"></div>' +
        '<div>Hour</div><div wj-part="hour"></div>' +
        '<div>Minute</div><div wj-part="min"></div>' +
        '<div>Second</div><div wj-part="sec"></div>' +
        '<div>Millisecond</div><div wj-part="ms"></div>' +
        '</div>' +
        '<div class="picker-buttons" wj-part="buttons">' +
        '<button wj-part="btn-now" class="wj-btn" type="button">' +
        'Now' +
        '</button> ' +
        '<button wj-part="btn-done" class="wj-btn" type="button">' +
        'Done' +
        '</button>' +
        '</div>';

    /**
     * Initializes a new instance of the {@link Calendar} class.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor (element, options) {
      super(element)

      // let cells handle focus
      var host = this.hostElement
      host.tabIndex = -1

      // instantiate and apply template
      let tpl = this.getTemplate()
      this.applyTemplate('wj-control wj-content wj-datetimepicker sk-ms-picker', tpl, {
        _cal: 'cal',
        _parts: 'parts',
        _tm: 'tm',
        _hour: 'hour',
        _min: 'min',
        _sec: 'sec',
        _ms: 'ms',
        _btnNow: 'btn-now',
        _btnDone: 'btn-done'
      })

      // initialize child controls
      let uv = this._updateValue.bind(this)
      this._ctlCal = new Calendar(this._cal, { valueChanged: uv })
      this._ctlHour = new LinearGauge(this._hour, { isReadOnly: false, max: 24, valueChanged: uv })
      this._ctlMin = new LinearGauge(this._min, { isReadOnly: false, max: 60, valueChanged: uv })
      this._ctlSec = new LinearGauge(this._sec, { isReadOnly: false, max: 60, valueChanged: uv })
      this._ctlMs = new LinearGauge(this._ms, { isReadOnly: false, max: 1000, valueChanged: uv })

      // hook up event listeners
      this._btnNow.addEventListener('click', () => {
        this.value = new Date()
      })
      this._btnDone.addEventListener('click', () => {
        this.onDone()
      })

      // initialize value and format
      this._value = new Date()
      this._fmt = 'MM/dd/yyyy h:mm:ss.fff tt'
      this._updateUI()

      // initialize control options
      this.initialize(options)
    }

    // ** object model

    /**
     * Gets or sets the current value of the control.
     */
    get value () {
      return this._value
    }
    set value (value) {
      if (this._value.getTime() !== value.getTime()) {
        this._value = asDate(value)
        this._updateUI()
        this.onValueChanged()
      }
    }
    /**
     * Gets or sets the format used to display the current value.
     */
    get format () {
      return this._fmt
    }
    set format (value) {
      if (value !== this.format) {
        this._fmt = asString(value)
        this._updateUI()
      }
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
    /**
     * Event that fires when the user clicks the Done button.
     */
    done = new Event();
    /**
     * Raises the {@link done} event.
     */
    onDone () {
      this.done.raise(this)
    }

    // ** implementation

    // update the UI to reflect the current value
    _updateUI () {
      // build time format
      let fmt = this._fmt // full date/time format
      let fmtTime = '' // time format
      let hasHour = fmt.indexOf('h') > -1 || fmt.indexOf('H') > -1
      let hasMin = fmt.indexOf('m') > -1
      let hasSec = fmt.indexOf('s') > -1
      let hasMs = fmt.indexOf('f') > -1
      let hasAm = fmt.indexOf('t') > -1
      if (hasHour) fmtTime += fmt.indexOf('h') > -1 ? 'hh' : 'HH'
      if (hasMin) fmtTime += ':mm'
      if (hasSec) fmtTime += ':ss'
      if (hasMs) fmtTime += '.fff'
      if (hasAm) fmtTime += ' tt'
      this._fmtTime = fmtTime

      // show/hide parts depending on format
      this._showPart(this._ctlHour, hasHour)
      this._showPart(this._ctlMin, hasMin)
      this._showPart(this._ctlSec, hasSec)
      this._showPart(this._ctlMs, hasMs)
      this._parts.style.display = (hasHour || hasMin || hasSec || hasMs) ? '' : 'none'

      // update control values
      let dt = this._value
      this._tm.textContent = Globalize.formatDate(dt, this._fmtTime)
      this._ctlHour.value = dt.getHours()
      this._ctlMin.value = dt.getMinutes()
      this._ctlSec.value = dt.getSeconds()
      this._ctlMs.value = dt.getMilliseconds()
      this._ctlCal.value = dt
    }

    // show/hide a part of the time display
    _showPart (ctl, show) {
      ctl.hostElement.style.display = show ? '' : 'none'
      ctl.hostElement.previousSibling.style.display = show ? '' : 'none'
    }

    // update the value to reflect the UI
    _updateValue () {
      let dt = this._ctlCal.value
      dt.setHours(this._ctlHour.value)
      dt.setMinutes(this._ctlMin.value)
      dt.setSeconds(this._ctlSec.value)
      dt.setMilliseconds(this._ctlMs.value)
      this._tm.textContent = Globalize.formatDate(dt, this._fmtTime)
      this._value = dt
      this.onValueChanged()
    }
}
