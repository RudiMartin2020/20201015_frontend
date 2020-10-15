import * as wjCore from '@grapecity/wijmo'
import * as wjInput from '@grapecity/wijmo.input'
import * as wjGrid from '@grapecity/wijmo.grid'
import Dayjs from 'dayjs'
import { InputDateTime } from './input-date-time'

export class CustomGridEditor {
  /**
   * Initializes a new instance of a CustomGridEditor.
   */
  constructor (flex, binding, EdtClass, options, format = 'YYYY-MM-DD HH:mm:ss.SSS') {
    this._dayFormat = format
    // save references
    this._grid = flex
    this._col = flex.columns.getColumn(binding)
    this._isDateInput = EdtClass === wjInput.InputDate || EdtClass === wjInput.InputDateTime || EdtClass === InputDateTime
    this.options = options
    // create editor
    if (this._isDateInput) {
      this.cached = new Date()
      options.textChanged = (e) => {
        this.cached = Dayjs(e._oldText, format).toDate()
      }
    }
    this._ctl = new EdtClass(document.createElement('div'), options)
    // connect grid events
    flex.beginningEdit.addHandler(this._beginningEdit, this)
    flex.sortingColumn.addHandler(() => {
      this._commitRowEdits()
    })
    flex.scrollPositionChanged.addHandler(() => {
      if (this._ctl.containsFocus()) {
        flex.focus()
      }
    })
    flex.selectionChanging.addHandler((s, e) => {
      if (e.row !== s.selection.row) {
        this._commitRowEdits()
      }
    })
    // connect editor events
    this._ctl.addEventListener(this._ctl.hostElement, 'keydown', (e) => {
      switch (e.keyCode) {
        case wjCore.Key.Tab:
        case wjCore.Key.Enter:
          e.preventDefault() // TFS 255685
          this._closeEditor(true)
          this._grid.focus()
          // forward event to the grid so it will move the selection
          const evt = document.createEvent('HTMLEvents')
          evt.initEvent('keydown', true, true)
          'altKey,metaKey,ctrlKey,shiftKey,keyCode'.split(',').forEach((prop) => {
            evt[prop] = e[prop]
          })
          this._grid.hostElement.dispatchEvent(evt)
          break
        case wjCore.Key.Escape:
          this._closeEditor(false)
          this._grid.focus()
          break
      }
    })
    // close the editor when it loses focus
    this._ctl.lostFocus.addHandler(() => {
      setTimeout(() => {
        if (!this._ctl.containsFocus()) {
          this._closeEditor(true) // apply edits and close editor
          this._grid.onLostFocus() // commit item edits if the grid lost focus
        }
      })
    })
    // commit edits when grid loses focus
    this._grid.lostFocus.addHandler(() => {
      setTimeout(() => {
        if (!this._grid.containsFocus() && !CustomGridEditor._isEditing) {
          this._commitRowEdits()
        }
      })
    })
    // open drop-down on f4/alt-down
    this._grid.addEventListener(this._grid.hostElement, 'keydown', (e) => {
      // open drop-down on f4/alt-down
      this._openDropDown = false
      if (e.keyCode === wjCore.Key.F4 ||
        (e.altKey && (e.keyCode === wjCore.Key.Down || e.keyCode === wjCore.Key.Up))) {
        const colIndex = this._grid.selection.col
        if (colIndex > -1 && this._grid.columns[colIndex] === this._col) {
          this._openDropDown = true
          this._grid.startEditing(true)
          e.preventDefault()
        }
      }
      // commit edits on Enter (in case we're at the last row, TFS 268944)
      if (e.keyCode === wjCore.Key.Enter) {
        this._commitRowEdits()
      }
    }, true)
    // close editor when user resizes the window
    // REVIEW: hides editor when soft keyboard pops up (TFS 326875)
    window.addEventListener('resize', () => {
      if (this._ctl.containsFocus()) {
        this._closeEditor(true)
        this._grid.focus()
      }
    })
  }
  // gets an instance of the control being hosted by this grid editor
  get control () {
    return this._ctl
  }
  // handle the grid's beginningEdit event by canceling the built-in editor,
  // initializing the custom editor and giving it the focus.
  _beginningEdit (grid, args) {
    const timeout = 50
    // check that this is our column
    if (grid.columns[args.col] !== this._col) {
      return
    }
    // check that this is not the Delete key
    // (which is used to clear cells and should not be messed with)
    const evt = args.data
    if (evt && evt.keyCode === wjCore.Key.Delete) {
      return
    }
    // cancel built-in editor
    args.cancel = true
    // save cell being edited
    this._rng = args.range
    CustomGridEditor._isEditing = true
    // initialize editor host
    setTimeout(() => {
      const rcCell = grid.getCellBoundingRect(args.row, args.col)
      const rcBody = document.body.getBoundingClientRect()
      const ptOffset = new wjCore.Point(-rcBody.left, -rcBody.top)
      const zIndex = (args.row < grid.frozenRows || args.col < grid.frozenColumns) ? '3' : ''
      wjCore.setCss(this._ctl.hostElement, {
        position: 'absolute',
        left: rcCell.left - 1 + ptOffset.x,
        top: rcCell.top - 1 + ptOffset.y,
        width: rcCell.width + 1,
        height: grid.rows[args.row].renderHeight + 1,
        borderRadius: '0px',
        zIndex: zIndex
      })
      // initialize editor content
      if (!wjCore.isUndefined(this._ctl['value']) && (this._ctl instanceof wjInput.InputDate || this._ctl instanceof wjInput.InputDateTime || this._ctl instanceof InputDateTime)) {
        const cellData = grid.getCellData(this._rng.row, this._rng.col, true)
        if (cellData.constructor === String) {
          const date = Dayjs(cellData)
          this._ctl['value'] = date.isValid() ? date.toDate() : new Date()
        } else if (!cellData) {
          this._ctl['value'] = new Date()
        }
      } else if (!wjCore.isUndefined(this._ctl['text'])) {
        this._ctl['text'] = grid.getCellData(this._rng.row, this._rng.col, true)
      } else {}
      // start editing item
      const ecv = grid.editableCollectionView
      const item = grid.rows[args.row].dataItem
      if (ecv && item && item !== ecv.currentEditItem) {
        setTimeout(function () {
          grid.onRowEditStarting(args)
          ecv.editItem(item)
          grid.onRowEditStarted(args)
        }, timeout) // wait for the grid to commit edits after losing focus
      }
      // activate editor
      document.body.appendChild(this._ctl.hostElement)
      this._ctl.focus()
      // get the key that triggered the editor
      const key = (evt && evt.charCode > 32)
        ? String.fromCharCode(evt.charCode)
        : null
      // get input element in the control
      const input = this._ctl.hostElement.querySelector('input')
      // send key to editor
      if (input) {
        if (key) {
          input.value = key
          wjCore.setSelectionRange(input, key.length, key.length)
          var evtInput = document.createEvent('HTMLEvents')
          evtInput.initEvent('input', true, false)
          input.dispatchEvent(evtInput)
        } else {
          input.select()
        }
      }
      // give the control focus
      if (!input && !this._openDropDown) {
        this._ctl.focus()
      }
      // open drop-down on F4/alt-down
      if (this._openDropDown && this._ctl instanceof wjInput.DropDown) {
        this._ctl.isDroppedDown = true
        this._ctl.dropDown.focus()
      }

      if (this._ctl instanceof wjInput.ComboBox) {
        this._ctl.isDroppedDown = true
        CustomGridEditor._isEditing = true
      }
    }, timeout)
  }
  // close the custom editor, optionally saving the edits back to the grid
  _closeEditor (saveEdits) {
    if (this._rng) {
      const flexGrid = this._grid
      const ctl = this._ctl
      const host = ctl.hostElement
      // raise grid's cellEditEnding event
      const e = new wjGrid.CellEditEndingEventArgs(flexGrid.cells, this._rng)
      flexGrid.onCellEditEnding(e)
      // save editor value into grid
      if (saveEdits) {
        if (this._isDateInput) {
          this._grid.setCellData(this._rng.row, this._rng.col, wjCore.Globalize.format(this.cached, this.options.format))
        } else {
          if (!wjCore.isUndefined(ctl['value'])) {
            this._grid.setCellData(this._rng.row, this._rng.col, ctl['value'])
          } else if (!wjCore.isUndefined(ctl['text'])) {
            this._grid.setCellData(this._rng.row, this._rng.col, ctl['text'])
          } else {}
        }
        this._grid.invalidate()
      }
      // close editor and remove it from the DOM
      if (ctl instanceof wjInput.DropDown) {
        ctl.isDroppedDown = false
      }
      host.parentElement.removeChild(host)
      this._rng = null
      CustomGridEditor._isEditing = false
      // raise grid's cellEditEnded event
      flexGrid.onCellEditEnded(e)
    }
  }
  // commit row edits, fire row edit end events (TFS 339615)
  _commitRowEdits () {
    const flexGrid = this._grid
    const ecv = flexGrid.editableCollectionView
    this._closeEditor(true)
    if (ecv && ecv.currentEditItem) {
      const e = new wjGrid.CellEditEndingEventArgs(flexGrid.cells, flexGrid.selection)
      ecv.commitEdit()
      setTimeout(() => {
        flexGrid.onRowEditEnding(e)
        flexGrid.onRowEditEnded(e)
        flexGrid.invalidate()
        flexGrid.focus()
      })
    }
  }
  done () {

  }
}
