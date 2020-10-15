// :items-source="paraData"
// :initialized="initializeParaList"
// :row-edit-ended="rowEditEnded"
// :selection-changed="selectChanged"
// ref="myParaListGrid"
// style="width: 100%"

import * as wjCore from '@grapecity/wijmo'
import * as wjGrid from '@grapecity/wijmo.grid'
import * as WjGridXlsx from '@grapecity/wijmo.grid.xlsx'
import * as wjInput from '@grapecity/wijmo.input'
import _ from 'lodash'
import PUtil from '@/components/Utils/PUtil'
import Dayjs from 'dayjs'
import { YYYYMMDD, YYYYMMDDHHMM, YYYYMMDDHHMMSSMS } from '../../../store/App.store'
import { InputDateTime } from './custom/input-date-time'
import { CustomGridEditor } from './custom/custom-grid-editor'

export const Editor = {
  datePicker: 'datePicker',
  dateTimePicker: 'dateTimePicker',
  dateTimeMilliPicker: 'dateTimeMilliPicker',
  multiCombo: 'multiCombo'
}
export default {
  name: 'SkGrid2',
  mounted () {
    this.resetData()
    if (this.itemsSource && this.itemsSource.length > 0) {
      this.initialItemsSource = true
      // let { row2, col } = this.selectedCells
      // this.grid.selection = new wjGrid.CellRange(row2, col, row2, col)
      // 그리드가 initialized 되기 전에는 this.grid를 참조할 수 없으므로 주석처리
      if (this.autoSizeColumn) {
        this.grid.autoSizeColumns()
      }
    }
  },
  props: {
    // SK Wijmo Grid Props.
    // 체크박스를 이용한 row 선택
    useCheckbox: {
      type: Boolean,
      default: true
    },

    // Column Filter 사용
    useFilter: {
      type: Boolean,
      default: true
    },

    // use-checkbox 설정이 되어있을 떄는 raw data를 보여주지 않음.이 떄, raw data도 같이 보여주려면 이친구를 true로 설정하면 tada!!!
    showRawData: {
      type: Boolean,
      default: false
    },

    // Header를 2줄로 표시할 때 Merge 할 Header를 받습니다. Array의 length가 있으면 일단 header를 모두 2줄로 표시합니다
    mergeHeaders: {
      type: Array,
      default () {
        return []
      }
    },

    // mergeHeaders 의 값이 있을 때, merge되지 않는 header의 title
    mergeHeadersTitle: {
      type: [String, Array],
      default: ''
    },

    // row grouping 등을 사용할 떄 쓸 collectionView의 옵션
    collectionViewOptions: {
      type: Object,
      default () {
        return {}
      }
    },

    // column별 data type 설정
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    // grid 날짜 형식
    exportDateFormat: {
      type: String,
      default: 'YYYY-MM-DDTHH:mm:ss.sssZ'
    },

    // readOnly인지 설정합니다. _status를 생성하지 않으므로 로딩 속도가 향상됩니다.
    readOnly: {
      type: Boolean,
      default: false
    },

    // Wijmo Flex Grid Props
    allowAddNew: {
      type: Boolean,
      default: false
    },
    allowDelete: {
      type: Boolean,
      default: false
    },
    allowMerging: {
      type: String,
      default: 'None'
    },
    allowSorting: {
      type: Boolean,
      default: true
    },
    alternatingRowStep: {
      type: Number,
      default: 0
    },
    autoGenerateColumns: {
      type: Boolean,
      default: true
    },
    deferResizing: {
      type: Boolean,
      default: true
    },
    frozenColumns: {
      type: Number,
      default: 0
    },
    frozenRows: {
      type: Number,
      default: 0
    },
    groupHeaderFormat: {
      type: String,
      default: ''
    },
    itemsSource: {
      type: Array,
      default () {
        return []
      }
    },
    itemsAppendSource: {
      type: Array,
      default () {
        return []
      }
    },
    itemFormatter: {
      type: Function,
      default: undefined
    },
    headersVisibility: {
      type: String,
      default: 'Column'
    },
    initialized: {
      type: Function,
      default () {
        return () => {}
      }
    },
    initialFocus: {
      type: Boolean,
      default: true
    },
    autoSizeColumn: {
      type: Boolean,
      default: false
    },
    newRowAtTop: {
      type: Boolean,
      default: false
    },
    preserveOutlineState: {
      type: Boolean,
      default: true
    },
    preserveSelectedState: {
      type: Boolean,
      default: false
    },
    quickAutoSize: {
      type: Boolean,
      default: false
    },
    refreshOnEdit: {
      type: Boolean,
      default: true
    },
    rightToLeft: {
      type: Boolean,
      default: false
    },
    selectionChanged: {
      type: Function,
      default () {
        return () => {}
      }
    },
    showDropDown: {
      type: Boolean,
      default: true
    },
    showErrors: {
      type: Boolean,
      default: true
    },
    showGroups: {
      type: Boolean,
      default: true
    },
    showSelectedHeaders: {
      type: String,
      default: 'All'
    },
    showSort: {
      type: Boolean,
      default: true
    },
    showRowIndex: {
      type: [Number, null],
      default: null
    },
    treeIndent: {
      type: [Number, null],
      default: 15
    },
    selectionMode: {
      type: String,
      default: 'CellRange'
    },
    contextMenu: {
      type: Array,
      default () {
        return []
      }
    },
    dayjsDF: {
      type: Object,
      default () {
        return this.$store.state.app.viewDateFormat.dayjs
      }
    },
    gridDF: {
      type: Object,
      default () {
        return this.$store.state.app.viewDateFormat.grid
      }
    },
    pagingType: {
      type: String,
      default: 'none',
      validator: (val) => ['none', 'load-more', 'pagination'].includes(val)
    },
    pagingSize: {
      type: Number,
      default: 50
    },
    totalElementCount: {
      type: Number,
      default: 1
    },
    pagingRangeBefore: {
      type: Number,
      default: 10
    },
    pagingRangeAfter: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    itemsSourceCollection () {
      return Array.isArray(this.itemsSource) ? this.createCollectionView(this.itemsSource) : this.itemsSource
    }
  },
  watch: {
    itemsSource (newval, oldVal) {
      this.initialItemsSource = newval !== oldVal // 새로 할당되는 경우에만 init 하도록 수정된 데이터와 구분
      if (this.initialItemsSource) {
        this.resetData()
      }

      if (this.pagingType === 'load-more') {
        this.isScrollPositioning = false
      }
    },
    totalElementCount (newval) {
      this.paging.total = newval
    },
    itemsAppendSource (newval) {
      this.itemsSource.push(...newval)
      this.grid.collectionView.refresh()
    },
    statuses: {
      handler (newval) {
        let stat = this.getItemStatuses(newval)
        this.$emit('status-changed', stat)
        this.addedRows = stat.addedRows
        this.addedRowCount = stat.addedRows.length
        this.modifiedRows = stat.modifiedRows
        this.modifiedRowCount = stat.modifiedRows.length
        this.checkedRows = stat.checkedRows
        this.checkedRowCount = stat.checkedRows.length
        this.totalModifiedRows = stat.totalModifiedRows
        this.totalModifiedRowCount = stat.totalModifiedRows.length
      },
      deep: true
    },
    columns: {
      handler (newval, oldval) {
        if (this.grid && this.grid.columns) {
          this._initCustomEditor(this.grid)
        }
      }
    },
    currentPage (val) {
      this.paging.currentPageNumber = val + 1
    },
    totalPage (val) {
      this.paging.totalPageNumber = val
    },
    useCheckbox (val) {
      if (val) this.setGridCheckable(this.grid)
    }
  },
  methods: {
    resetData () {
      this.paging.currentPageNumber = this.currentPage + 1
      this.paging.totalPageNumber = this.totalPage
      this.requestPage = this.paging.currentPageNumber

      this.selectionChangedCount = 0
      this.addedRows = []
      this.addedRowCount = 0
      this.modifiedRows = []
      this.modifiedRowCount = 0
      this.checkedRows = []
      this.checkedRowCount = 0
      this.totalModifiedRows = []
      this.totalModifiedRowCount = 0
      let coord = this.initialFocus ? 0 : -1
      this.selectedCells = { row: coord, col: coord, row2: coord, col2: coord }
    },

    /**
     * 인자로 받은 rows의 _sel 을 false로 바꿉니다.
     *
     * @param {*} [rows=[{}]]
     */
    unselectRows (rows = [{}]) {
      if (!this.useCheckbox) return rows
      rows.forEach(item => {
        if (item._status) {
          item._status.checked = false
        }
      })
      return rows
    },

    /**
     * Grid의 rows에 css class를 추가 지정합니다.
     *
     * @param {Array} [rows=[0]]
     * @param {String} cls 추가한 css class
     */
    addClassToRows (rows = [0], cls = '-addedClass') {
      // rows.forEach(row => {
      //   console.log(row, this.grid.rows[row].cssClass)
      //   this.grid.rows[row].cssClass = (this.grid.rows[row].cssClass === undefined) ? cls : this.grid.rows[row].cssClass + ' ' + cls
      // })
      // since add event clear other class
      this.grid.rows.forEach(r => {
        if (r.dataItem && r.dataItem._status && r.dataItem._status.added) {
          r.cssClass = (r.cssClass === undefined) ? cls : r.cssClass + ' ' + cls
        } else if (r.dataItem && r.dataItem._status && r.dataItem._status.modified) {
          r.cssClass = (r.cssClass === undefined) ? '-modified' : r.cssClass + ' ' + '-modified'
        }
      })
    },

    /**
     * Grid에 Row를 추가합니다. Focus가 없을 때는 최상단에, Focus가 있을 떄는 Focused row 아래에.
     *
     */
    addRows (
      data = {},
      status = {}
    ) {
      // grid에 추가할 배열을 생성합니다.
      let arr = Array.isArray(data) ? data : []
      if (!Array.isArray(data)) {
        for (let index in data) {
          arr.push(data[index])
        }
      }

      this.unselectRows(arr) // 선택된 행이 있으면 다 선택취소

      // 입력한 행의 기본 status 설정.
      status = Object.assign({
        checked: false,
        modified: false,
        added: true
      }, status)
      arr.forEach(item => {
        item._status = _.clone(status)
      })

      let { col, row2 } = this.selectedCells
      row2 += 1 // 하단에 추가된 row 위치로 selection 이동

      // focusedRow를 찾아 해당 row 근처에 row 추가.
      let focusedRow = 0
      if (this.grid.selectedRows.length) {
        focusedRow = this.grid.selectedRows[this.grid.selectedRows.length - 1].index
        this.itemsSource.splice(focusedRow + 1, 0, ...arr)
      } else {
        row2 = 0 // focus 없는 경우 add 시
        col = 0
        this.itemsSource.splice(0, 0, ...arr)
      }
      this.$emit('update:items-source', this.itemsSource)

      // grid의 업데이트가 완료된 후에 클래스 추가 실행
      this.$nextTick(function () {
        this.grid.collectionView.refresh()
        this.applyGirdCustomCss(this.grid)
        this.grid.selection = new wjGrid.CellRange(row2, col, row2, col)
      })
    },

    /**
     * Check 된 Row 를 삭제합니다.
     */
    deleteCheckedRows () {
      let { col, row2 } = this.selectedCells
      for (let i = 0; i < this.itemsSource.length; i++) {
        if (this.itemsSource[i]._status.checked) {
          this.itemsSource.splice(i, 1)
          i--
        }
      }
      this.$emit('update:items-source', this.itemsSource)

      // grid 업데이트 후 Selection 이동
      this.$nextTick(function () {
        this.grid.collectionView.refresh()
        this.applyGirdCustomCss(this.grid)
        this.grid.selection = new wjGrid.CellRange(row2, col, row2, col)
      })
    },

    /**
     * Check 된 Row 를 삭제합니다.
     */
    deleteCheckedAndAddedRows () {
      let { col, row2 } = this.selectedCells
      for (let i = 0; i < this.itemsSource.length; i++) {
        if (this.itemsSource[i]._status.checked && this.itemsSource[i]._status.added) {
          this.itemsSource.splice(i, 1)
          i--
        }
      }
      this.$emit('update:items-source', this.itemsSource)

      // grid 업데이트 후 Selection 이동
      this.$nextTick(function () {
        this.grid.collectionView.refresh()
        this.applyGirdCustomCss(this.grid)
        this.grid.selection = new wjGrid.CellRange(row2, col, row2, col)
      })
    },

    /**
     * Select 된 Row 를 삭제합니다.
     */
    deleteSelectedRows () {
      let { col, row2 } = this.selectedCells
      this.itemsSource.splice(row2, 1)

      this.$emit('update:items-source', this.itemsSource)

      // grid 업데이트 후 Selection 이동
      this.$nextTick(function () {
        this.grid.collectionView.refresh()
        this.applyGirdCustomCss(this.grid)
        this.grid.selection = new wjGrid.CellRange(row2, col, row2, col)
      })
    },

    /**
     * 특정 Row를 삭제합니다.
     */
    deleteRow (rowNum) {
      this.itemsSource.splice(rowNum, 1)

      this.$emit('update:items-source', this.itemsSource)

      // grid 업데이트 후 Selection 이동
      this.$nextTick(function () {
        this.grid.collectionView.refresh()
        this.applyGirdCustomCss(this.grid)
        this.grid.selection = new wjGrid.CellRange(-1, -1, -1, -1)
      })
    },

    /**
     * itemsSource를 collectionView로 변경합니다.
     * 다만, 변경하기 전에, 체크박스 사용이나 데이트 표기 형식 변경등에 대해 살짝 수정을 가해줍니다.
     * @param {Array} itemsSource itemsSource로 받는 배열
     * @param {Object} options CollectionView를 생성할 떄 사용할 옵션
     */
    createCollectionView (
      itemsSource = this.itemsSource,
      options = this.collectionViewOptions
    ) {
      if (!this.readOnly) itemsSource = this._setItemStatus(itemsSource)
      itemsSource = this._setDateFormatInItemSource(itemsSource) // TODO 이건 새로운 넘한테만 넣어주는 걸로 ...
      if (this.grid && this.grid.collectionView && !this.initialItemsSource) {
        this.applyGirdCustomCss(this.grid) // when scroll added, deleted ...
        return this.grid.collectionView
      }
      this.initialItemsSource = false
      return new wjCore.CollectionView(itemsSource, options)
    },

    /**
     * grid를 Excel 파일로 export 합니다. export 버튼의 disabled처리는 isActionable에서 처리합니다.
     *
     * @param {filename} export 받을 파일명
     * @param {options} Wijmo FlexGrid
     * @param {grid} flexGrid
     */
    exportExcel (
      filename = 'Exported',
      options = {},
      grid = this.grid,
      onSaved = () => {},
      onError = () => {}
    ) {
      filename += '-' + Dayjs().format('YYYY-MM-DD_HH:mm:ss') + '.xlsx'
      // console.log('@exportData', grid)
      options = Object.assign({
        includeColumnHeaders: true,
        includeCellStyles: false,
        includeColumns: function (columns) {
          return columns.binding !== '_status.checked'
        },
        formatItem: function (args) {
          let p = args.panel
          let xlsxCell = args.xlsxCell

          if (p.cellType === wjGrid.CellType.ColumnHeader) {
            xlsxCell.style.fill = {}
            xlsxCell.style.fill.color = '#EEEEEE'
          }
        }
      }, options)
      this.$emit('excel-export-start', options)
      let onSavedCallback = base64 => {
        this.$emit('excel-export-success', base64)
        onSaved(base64)
      }
      let onErrorCallback = reason => {
        this.$emit('excel-export-error', reason)
        onError(reason)
      }

      WjGridXlsx.FlexGridXlsxConverter.saveAsync(grid, options, filename, onSavedCallback, onErrorCallback)
    },

    /**
     * 그리드 이니셜라이즈 래핑.
     *
     * @param {WjFlexGrid} grid
    */
    initializeGrid (grid) {
      this.grid = grid
      // link wijmo default properties
      this.rows = grid.rows
      this.scrollPosition = grid.scrollPosition
      this.scrollSize = grid.scrollSize
      this.selectedItems = grid.selectedItems
      this.selectedRanges = grid.selectedRanges
      this.selectedRows = grid.selectedRows
      this.selection = grid.selection
      this.topLeftCells = grid.topLeftCells

      // set porps that unsettable with vue props
      this.grid.headersVisibility = this.headersVisibility
      this.grid.selectionMode = this.selectionMode

      // set eventHandlers
      // grid.beginningEdit.addHandler(this.beginningEdit)

      // set item formatter
      this.grid.itemFormatter = this.itemFormatter

      // set collection view
      this.collectionView = grid.collectionView

      // set mergedHeaders
      if (this.mergeHeaders.length) this.addGroupedHeader(grid, this.mergeHeaders, this.mergeHeadersTitle)

      // set focus to out of grid
      // this.grid.select(0, -1) 셀렉션을 감추는것에 대한 사이드이펙트가 크므로 일단 주석처리

      // row grouping을 설정할 때 checkbox column width 조정
      if (this.collectionViewOptions.groupDescriptions) {
        this.checkColumnWidth = 60
      }

      // generate checkboxes
      if (this.useCheckbox) this.setGridCheckable(grid)

      // console.log('@init: grid:', this.grid)

      // Set Load more
      if (this.pagingType === 'load-more') {
        this.grid.scrollPositionChanged.addHandler((s, e) => {
          if (s.viewRange.bottomRow >= s.rows.length - 1 &&
            this.paging.currentPageNumber < this.paging.totalPageNumber &&
            !this.isSortingColumn
          ) {
            this.pos = this.grid.scrollPosition

            if (this.requestPage === this.paging.currentPageNumber + 1) return
            this.requestPage = this.paging.currentPageNumber + 1
            this.isScrollPositioning = true
            this.$emit('changed-page', this.requestPage - 1, this.pagingSize)
          }
          this.isSortingColumn = false

          if (this.pos) {
            s.scrollPosition = Object.assign({}, this.pos)
            if (!this.isScrollPositioning) {
              this.pos = null
            }
          }
        })
      }

      // run interited initialized function
      this.initialized(grid)
      this.initColumn()
      this._initCustomEditor(grid)
      this._initDateEditor()

      this._initHeader(grid)
      this._registerContextMenu(grid)
      this.$emit('initialized', grid)
    },

    /**
     * 테이블 헤더에 대해 그루핑 설정을 합니다.
     * @param {FlexGrid} grid WijmoGrid
     * @param {Array} mergeHeaders Merge될 헤더들의 목록. 정확하게는, 그루핑 하지 않을 컬럼의 목록을 받습니다.
     * @param {String} mergeHeadersTitle 그루핑 된 헤더의 제목
     */
    addGroupedHeader (
      grid = this.grid,
      mergeHeaders = this.mergeHeaders,
      mergeHeadersTitle = this.mergeHeadersTitle
    ) {
      let extraRow = new wjGrid.Row()
      extraRow.allowMerging = true

      let panel = grid.columnHeaders
      panel.rows.splice(0, 0, extraRow)

      mergeHeaders.forEach(binding => {
        let col = grid.getColumn(binding)
        col.allowMerging = true
        panel.setCellData(0, col.index, col.header)
      })

      if (this.useCheckbox) {
        let col = grid.getColumn('_status.checked')
        col.allowMerging = true
        panel.setCellData(0, col.index, col.header)
      }

      let currentMergeHeader = 0
      grid.columns.forEach(column => {
        if (!column.allowMerging) {
          if (Array.isArray(mergeHeadersTitle)) {
            panel.setCellData(0, column.index, mergeHeadersTitle[currentMergeHeader])
            currentMergeHeader++
          } else {
            panel.setCellData(0, column.index, mergeHeadersTitle)
          }
        }
      })

      grid.formatItem.addHandler((s, e) => {
        let html
        if (e.panel === s.columnHeaders && e.range.rowSpan > 1) {
          html = e.cell.innerHTML
          e.cell.innerHTML = `<div class="-vertical-center">${html}</div>`
        } else if (e.panel === s.columnHeaders && e.range.columnSpan > 1) {
          html = e.cell.innerHTML
          e.cell.innerHTML = `<div class="-horizontal-center">${html}</div>`
        }
      })
    },

    /**
     * Grid의 itemsSource에 check를 감지하는 '_sel' 키를 추가합니다.
     *
     * @param {Array} [itemsSource] itemsSource Array
     */
    _setItemStatus (
      itemsSource = this.itemsSource
    ) {
      // console.info('@setItemStatus')
      let statuses = []

      itemsSource.forEach((item, i) => {
        // console.log('A: defval:', defaultVal, '_sel:', item._sel)
        let status = Object.assign({
          checked: false,
          modified: false,
          added: false,
          origin: {}, // 필드 변경시 원본 유지 (변경여부 판단)
          parent: item
        }, item._status)
        statuses.push(status)
        item._status = status
        // console.log('B: defval:', defaultVal, '_sel:', item._sel)
      })
      this.statuses = statuses
      return itemsSource
    },

    /**
     * 지정된 컬럼 데이터 타입에 따라 각각의 아이템들의 표시형식을 수정합니다.
     * @param {Array} itemsSource itemsSource로 받는 Array
     * @param {Array} columns {field, label, type} 등이 포함된 컬럼 형식 배열
     */
    _setDateFormatInItemSource (
      itemsSource = this.itemsSource,
      columns = this.columns
    ) {
      columns.forEach((column, i) => {
        if (column.dataType === 'Date') {
          itemsSource.forEach((item, i) => {
            if (item[column.binding]) _.set(item, column.binding, Dayjs(item[column.binding]).toDate())
            else _.set(item, column.binding, item[column.binding])
          })
        }
      })

      return itemsSource
    },

    /**
     * 추가, 수정, 선택된 row들을 설정할 떄 각각 아이템들의 데이터 규격을 편집합니다.
     * @param {Object} item Row Data
     * @param {Array} columns Grid Columns Data
     * @param {String} exportDateFormat Date를 내보낼 떄 포멧팅 형식
     */
    _makeupItemForExport (
      item = {},
      columns = this.columns,
      exportDateFormat = this.exportDateFormat
    ) {
      item = _.cloneDeep(item)
      columns.forEach((column) => {
        if (_.get(item, column.binding) && column.dataType === 'Date') {
          _.set(item, column.binding, Dayjs(item[column.binding]).format(exportDateFormat))
          // console.log(_.get(item, column.binding))
        }
      })
      if (item._status) delete item._status
      return item
    },

    /**
     * itemSource의 _status로부터 checkedRows modifiedRows, addedRows를 구해냅니다.
     */
    getItemStatuses (statuses = this.statuses) {
      let addedRows = []
      let modifiedRows = []
      let checkedRows = []
      let totalModifiedRows = []

      statuses.forEach(status => {
        if (status) {
          if (status.checked || status.added || status.modified) {
            let clone = this._makeupItemForExport(status.parent)
            if (status.checked) checkedRows.push(clone)
            if (status.added) addedRows.push(clone)
            if (status.modified) modifiedRows.push(clone)
          }
        }
      })

      totalModifiedRows = [...modifiedRows, ...addedRows]
      return {
        addedRows: addedRows,
        addedRowCount: addedRows.length,
        modifiedRows: modifiedRows,
        modifiedRowCount: modifiedRows.length,
        checkedRows: checkedRows,
        checkedRowCount: checkedRows.length,
        totalModifiedRows: totalModifiedRows,
        totalModifiedRowCount: totalModifiedRows.length
      }
    },

    getModifiedRows () {
      return this.totalModifiedRows || []
    },

    /**
     * 그리드에서 체크박스를 이용해 아이템을 선택할 수 있도록 합니다.
     *
     * @param {WijmoFlexGrid} grid
     */
    setGridCheckable (grid) {
      // console.log('@setGridCheckable')
      // console.log(grid)
      grid.formatItem.addHandler((grid, event) => {
        if (event.panel === grid.columnHeaders) {
          if (grid.columns[event.col].binding === '_status.checked') {
            event.cell.innerHTML = `<input class="select-all" tabindex="-1" type="checkbox" />`
            this._updateSelectAllBox(grid)
          }
        } else if (event.panel === grid.cells) {
          if (grid.rows[event.row].dataItem._status) {
            wjCore.setAttribute(
              event.cell.parentElement,
              'aria-selected',
              grid.rows[event.row].dataItem._status.checked
            )
          }
        }
      })
      grid.hostElement.addEventListener('click', event => {
        if (wjCore.hasClass(event.target, 'select-all') && event.target instanceof HTMLInputElement) {
          grid.deferUpdate(() => {
            grid.collectionView.items.forEach(item => {
              item._status.checked = (event.target).checked
            })
          })
        }
      })
    },
    /**
     * header의 체크박스의 상태에 따라 전체 row의 체크박스 를 체크/언체크 합니다.
     *
     * @param {Object} grid
     */
    _updateSelectAllBox (grid = this.grid) {
      let cb = grid.hostElement.querySelector('.select-all')
      if (!grid.collectionView) return false
      if (cb instanceof HTMLInputElement) {
        let items = grid.collectionView.items
        let last = null
        let indeterminate = false
        for (let i = 0; i < items.length; i++) {
          if (last != null && items[i]._status.checked !== last) {
            indeterminate = true
            break
          }
          last = items[i]._status.checked
        }
        cb.checked = last
        if (indeterminate) {
          cb.indeterminate = true
        }
      }
    },
    updatedView (s, e) {
      // if (this.rowCount) {
      //   this.rowCount.textContent = s.rows.length
      // }
      // if (this.cellCount) {
      //   this.cellCount.textContent = s.hostElement.querySelectorAll('.wj-cell').length
      // }
    },
    gridSelectionChanging (grid, event) {
      this.$emit('selection-changing', grid, event)
    },
    gridSelectionChanged (grid, event) {
      // 그리드 최초 로드시에도 selection changed가 발생하는것을 막기 위해 count를 도입
      if (this.selectionChangedCount > 0 && this.itemsSource.length > 0) {
        this.$emit('selection-changed', grid, event) // === await
      } else {
        event.cancel = true
        if (this.selectedCells.row2 === -1) {
          grid.selection = new wjGrid.CellRange(-1, -1, -1, -1)
        }
      }
      this.selectionChangedCount++

      let [row, row2, col, col2] = PUtil.getRowColFromRange(event.range)
      this.selectedCells = { row, col, row2, col2 }

      if (this.grid) {
        this.setClassToCells('-focused-row', row, 0, row2, this.grid.columns.length)
      }
    },

    /**
     * Rows, Columns좌표에 해당하는 놈들에게 CSS 클래스를 설정합니다.
     * @param {String} cls 설정할 CSS 클래스 이름
     * @param {Number} r start row index
     * @param {Number} c start column index
     * @param {Number} r2 end row index
     * @param {Number} c2 end column index
     *
     */
    setClassToCells (
      cls = '',
      r = 0,
      c = 0,
      r2 = this.grid.rows.length,
      c2 = this.grid.columns.length
    ) {
      let rows = document.querySelectorAll('.wj-cell.' + cls)
      rows.forEach(row => {
        wjCore.removeClass(row, cls)
      })

      for (let rowIndex = r; rowIndex <= r2; rowIndex++) {
        if (!this.grid) break
        // let row = this.grid.rows[rowIndex]
        for (let colIndex = c; colIndex <= c2; colIndex++) {
          let cell = this.grid.cells.getCellElement(rowIndex, colIndex)
          wjCore.addClass(cell, cls)
        }
      }
    },

    gridRowAdded (grid, event) {
      let { col, row2 } = this.selectedCells
      this.grid.selection = new wjGrid.CellRange(row2, col, row2, col)

      this.$emit('row-added', grid, event)
    },
    gridBeginningEdit (grid, event) {
      // this.activeEditingValue = event.data
      // console.log(event)
      this.$emit('beginning-edit', grid, event)
    },
    gridRowEditStarting (grid, event) {
      this.$emit('row-edit-starting', grid, event)
    },
    gridRowEditStarted (grid, event) {
      this.$emit('row-edit-started', grid, event)
    },
    gridRowEditEnded (grid, event) {
      this.$emit('row-edit-ended', grid, event)
    },
    gridRowEditEnding (grid, event) {
      this.$emit('row-edit-ending', grid, event)
    },
    gridCellEditEnded (grid, event) {
      this.checkModified(grid, event.range)

      this.$emit('cell-edit-ended', grid, event)
    },
    gridCellEditEnding (grid, event) {
      // useCheckbox 설정이 되어있을 경우 패스.
      if (this.useCheckbox && event.col === 0) return

      // TODO: 변경 전후 데이타 체크해서 modify 여부 확인
      // debugger
      // kyjeon 2019-08-13 import 후 저장 시 강제 edit 상태로 변경위해 호출합니다. setModifiedRows 만들어주시면 좋을듯 합니다.
      if (grid.activeEditor) {
        // let value = grid.activeEditor.value
        // console.log(grid.rows[event.row], value)
      }
      this.setOrigins(grid, event.range)
      this.$emit('cell-edit-ending', grid, event)
    },
    gridPasting (grid, event) {
      this.setOrigins(grid, event.range)
    },
    gridPasted (grid, event) {
      this.checkModified(grid, event.range)

      this.$forceUpdate()
      this.$emit('cell-edit-ending', grid, event)
    },
    gridSortingColumn (s, e) {
      if (this.pagingType === 'load-more') {
        this.isSortingColumn = true
      }
    },
    gridSortedColumn (s, e) {
      this.applyGirdCustomCss(s)
    },
    gridLoadingRows (grid, args) {
      this.$emit('loading-rows', grid, args)
    },
    gridLoadedRows (grid, args) {
      this.$emit('loaded-rows', grid, args)
    },
    gridRefreshing (control, args) {
      this.$emit('refreshing', control, args)
    },
    gridRefreshed (control, args) {
      this.$emit('refreshed', control, args)
    },
    setOrigins (grid, range) {
      let [row1, row2, col1, col2] = PUtil.getRowColFromRange(range)
      for (let i = row1; i <= row2; i++) {
        if (_.isEmpty(grid.rows[i])) continue
        let row = grid.rows[i].dataItem
        if (row._status.added) continue
        for (let j = col1; j <= col2; j++) {
          let column = grid.cells.columns[j]
          if (column && _.isEmpty(row._status.origin[column.binding])) { // 변경전 데이터만 보관
            Object.assign(row._status.origin, { [column.binding]: row[column.binding] })
          }
        }
      }
    },
    checkModified (grid, range) {
      let [row1, row2, col1, col2] = PUtil.getRowColFromRange(range)
      for (let i = row1; i <= row2; i++) {
        if (_.isEmpty(grid.rows[i])) continue
        let row = grid.rows[i].dataItem
        if (row._status.added) continue
        if (this.useCheckbox && col1 === 0) continue // skip check box

        row._status.modified = false
        for (let j = col1; j <= col2; j++) {
          let column = grid.cells.columns[j] // : GridPanel.ColumnCollection[]
          if (column && row._status.origin[column.binding] === row[column.binding]) {
            delete row._status.origin[column.binding]
          } else if (row._status.origin[column.binding] !== row[column.binding]) {
            row._status.modified = true
          } else {
          }
        }

        if (row._status.modified) {
          grid.rows[i].cssClass = '-modified'
        } else if (_.isEmpty(row._status.origin)) {
          grid.rows[i].cssClass = ''
        }
      }
    },
    applyGirdCustomCss (grid) {
      for (let i = 0; i < grid.rows.length; i++) {
        if (_.isEmpty(grid.rows[i]) || !grid.rows[i].dataItem) continue
        let row = grid.rows[i].dataItem
        if (!row._status) continue
        if (row._status.added) {
          grid.rows[i].cssClass = '-added-row'
        } else if (row._status.modified) {
          grid.rows[i].cssClass = '-modified'
        } else if (_.isEmpty(row._status.origin)) {
          grid.rows[i].cssClass = ''
        }
      }
    },
    _initHeader (grid) {
      grid.formatItem.addHandler((s, e) => {
        if (e.panel.cellType === wjGrid.CellType.ColumnHeader) {
          const column = e.panel.columns[e.col]
          if (column.isReadOnly) {
            wjCore.addClass(e.cell, 'header-read-only')
          }
          if (column.isRequired) {
            wjCore.addClass(e.cell, 'header-required')
          }
        }
      })
    },
    _registerContextMenu (grid) {
      grid.hostElement.addEventListener('contextmenu', e => {
        e.preventDefault()
        e.stopImmediatePropagation()
        if (e.target['wj-cell-index'] !== undefined) {
          this.menu.row = e.target['wj-cell-index'].row
          this.menu.col = e.target['wj-cell-index'].col
          this.menu.removable = this.statuses[this.menu.row].added
          setTimeout(() => {
            this.menu.$el.show(e)
          }, 100)
        }
      })
    },
    initMenu (menu) {
      this.menu.$el = menu
    },
    menuItemClicked (menu, event) {
      const selectedMenu = this.menu.context.filter(v => v.id === menu.selectedValue)[0]
      selectedMenu.onSelected && selectedMenu.onSelected(this.$parent, this.grid, this.menu.row, this.menu.col, this.statuses[this.menu.row])
      // 부모의 onSelected 실행시 컴포넌트 데이터 참조를 위해 this.$parent 추가. sckim.
    },
    initColumn () {
      this.columns.forEach(v => {
        this.gridColumnsMap[v.binding] = v
      })
      this.grid.beginningEdit.addHandler((grid, event) => {
        const column = this._getCurrentColumn(grid)
        if (!column) return
        const row = grid.selection.row
        const modifiable = column.modifiable === undefined ? true : column.modifiable
        event.cancel = (!grid.rows[row].dataItem._status.added && !modifiable) || column.readOnly
      })
    },
    itemsSourceChanged (s, e) {
      if (this.autoSizeColumn) {
        s.autoSizeColumns()
      }
    },
    _initCustomEditor (grid) {
      let modifiedCount = 0
      grid.columns.forEach(col => {
        const column = this.gridColumnsMap[col.binding]
        if (column && column.editor === Editor.multiCombo) {
          if (column.dataMap === undefined) return
          if (this.initializedMultiComboColumns[col.binding]) return
          this.initializedMultiComboColumns[col.binding] = true
          const items = column.dataMap.collectionView.items
          const template = column.template
          const customEditor = new CustomGridEditor(this.grid, column.binding, wjInput.ComboBox, {
            headerPath: column.dataMap._displayPath,
            displayMemberPath: column.dataMap._displayPath,
            itemsSource: items,
            formatItem: function (s, e) {
              e.item.innerHTML = wjCore.format(template, e.data)
            }
          })
          customEditor.done()
          modifiedCount++
          col.cssClassAll = 'multi-combo'
        }
      })
      if (modifiedCount > 0) {
        this.grid.refresh()
      }
    },
    _initDateEditor () {
      this.grid.columns.forEach(col => {
        const column = this.gridColumnsMap[col.binding]
        if (column && column.editor === Editor.datePicker) {
          const customEditor = new CustomGridEditor(this.grid, column.binding, wjInput.InputDate, {
            format: column.format || this.gridDF[YYYYMMDD]
          }, this.dayjsDF[YYYYMMDDHHMMSSMS])
          customEditor.done()
        } else if (column && column.editor === Editor.dateTimePicker) {
          const customEditor = new CustomGridEditor(this.grid, column.binding, wjInput.InputDateTime, {
            format: column.format || this.gridDF[YYYYMMDDHHMM],
            timeStep: column.timeStep || 1
          }, this.dayjsDF[YYYYMMDDHHMMSSMS])
          customEditor.done()
        } else if (column && column.editor === Editor.dateTimeMilliPicker) {
          const customEditor = new CustomGridEditor(this.grid, column.binding, InputDateTime, { // new CustomGridJqueryDateTimePicker(this.grid, column.binding)
            format: column.format || this.gridDF[YYYYMMDDHHMMSSMS] // 'yyyy/mm/dd hh:mm:ss.fff tt'
          }, this.dayjsDF[YYYYMMDDHHMMSSMS])
          customEditor.done()
        }
      })
    },
    _getCurrentColumn (grid) {
      if (!grid.columns[grid.selection.col] || !this.gridColumnsMap[grid.columns[grid.selection.col].binding]) return
      const column = this.gridColumnsMap[grid.columns[grid.selection.col].binding]
      return column
    },
    _getColumnByBinding (grid, bindingName) {
      return grid.columns.filter(v => v.binding === bindingName)[0]
    },
    changingPage (pageNumber) {
      let page = _.isUndefined(pageNumber) ? 0 : pageNumber
      let event = { cancel: false }
      this.$emit('changing-page', event)
      // pagination type 에서 page 변경을 할 수 없을 경우 page number 원복
      if (event.cancel) {
        let prevPageNum = this.paging.currentPageNumber
        this.$nextTick(function () {
          this.paging.currentPageNumber = prevPageNum
        })
      } else {
        this.changedPage(page - 1)
      }
    },
    changedPage (pageNumber) {
      this.$emit('changed-page', pageNumber, this.pagingSize)
    },
    /**
     *  Grid의 선택 영역을 지정합니다. 외부에서 사용할 수 있습니다.
     * @param {Number} r 시작 row
     * @param {Number} c 시작 column
     * @param {Number} r2 끝 row
     * @param {Number} c2 끝 column
     */
    setSelection (
      r = -1,
      c = -1,
      r2 = -1,
      c2 = -1
    ) {
      this.grid.selection = new wjGrid.CellRange(r, c, r2, c2)
    }
  },
  data () {
    return {
      statuses: [],
      addedRows: [],
      addedRowCount: 0,
      modifiedRows: [],
      modifiedRowCount: 0,
      paging: {
        total: this.totalPage * this.pagingSize,
        totalPageNumber: this.totalPage,
        currentPageNumber: this.currentPage + 1, // currentPageNumber start from 1, currentPage start from 0
        perPage: this.pagingSize
      },
      checkedRows: [],
      checkedRowCount: 0,
      totalModifiedRows: [],
      totalModifiedRowCount: 0,
      // selectionChangedCount: 0,
      activeEditingValue: undefined, // 그리드 editStarted시 값을 저장하고, editEnd시 비교함.
      checkColumnWidth: 30, // useCheckbox일 때, checkbox의 width. sortDescription + groupDescriptions를 사용할 때는 자동으로 60이 됩니다.
      gridColumnsMap: {},
      isRevertSelection: false,
      selectedCells: { row: -1, col: -1, row2: -1, col2: -1 },
      menu: {
        context: [ ...this.contextMenu ],
        $el: null,
        row: 0,
        col: 0
      },
      initializedMultiComboColumns: {}
    }
  }

}
