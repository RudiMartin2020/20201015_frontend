import API from '@/views/Mes/Apis/'
import '@grapecity/wijmo.vue2.grid'
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx'
import * as wjcXlsx from '@grapecity/wijmo.xlsx'
import * as wjcGrid from '@grapecity/wijmo.grid'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex' // 사용자 정보
// import { ComboBox } from '@grapecity/wijmo.input'
import { YYYYMMDDHHMMSSMS } from '@/store/App.store'
export default {
  name: 'MesSkslTest',
  mounted () {
    this.changedLoadMorePage(0, this.pagingSize)
  },
  props: {
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
    }
  },
  computed: { // 사용자 정보
    ...mapGetters([
      'user',
      'theSite',
      'theApis'
    ])
  },
  watch: {
    cdId: function (val) {
      this.searchValue = ''
    }
  },

  methods: {
    // #region Grid Initialized
    initGrid (grid, e) {
      this.tnSkslTestFlex = grid
    },
    // #endregion

    // #region Grid Event
    _getSelectionStats: function (grid) {
      var val = {}
      let sel = grid.selection
      for (let r = sel.topRow; r <= sel.bottomRow; r++) {
        for (let c = 0; c < grid.columns.length; c++) {
          val[grid.columns[c].binding] = grid.cells.getCellData(r, c, false)
        }
      }
      return val
    },
    testGridSelectionChanged: function (grid) {
      if (grid.rows.length > 0) {
        this.changeSelectedPanel('test-grid')
        this.selectTtnSkslTest = this._getSelectionStats(grid)
      }
    },
    // #endregion

    // #region Get Data
    async getTestList (page, size) {
      try {
        let payload = {}
        // SkslTest.js에서 API 호출
        let data = response.data
        return data
      } catch (error) {

      }
    },
    // #endregion

    // #region CRUD
    async createSkcTest (payload) {
      try {
        let data = await API.skslTest.saveStudents(payload, 'saveHist=true')
        return data
      } catch (error) {

      }
    },
    async updateSkcTest (payload) {
      try {
        let data = await API.skslTest.updateStudents(payload, 'saveHist=true')
        return data
      } catch (error) {

      }
    },
    async saveTestTables (payload, params) {
      var checkRowData = this.$refs.tnSkslTestGrid.checkedRows
      var keys = Object.keys(checkRowData)
      if (keys.length === 0) {
        this.$dialog.alert(this.$t('mes.MESSAGE.W002'))
        return
      }
      // var insertDataList = []
      // var updateDataList = []
      var row = null

      for (var i = 0; i < keys.length; i++) {
        for (var k = 0; k < this.keyColumns.length; k++) {
          if (this.keyColumns[k].readOnly === false &&
                        (checkRowData[keys[i]][this.keyColumns[k].key] === undefined || checkRowData[keys[i]][this.keyColumns[k].key] === null || checkRowData[keys[i]][this.keyColumns[k].key] === '')
          ) {
            this.$dialog.alert(this.$t('mes.MESSAGE.W003'))
            return
          }
          this.$dialog.alert(this.$t('mes.MESSAGE.I001'))
          let payload = 'name=' + checkRowData[keys[i]][this.keyColumns[k].key] + '&teamName=' + checkRowData[keys[i]][this.keyColumns[k + 1].key]
          this.createSkcTest(payload)
          // let data = await API.skslTest.saveStudents(payload)
          // return data
        }

        row = {}
        row = this.createSkcTestData(checkRowData[keys[i]])

        if (row === null) {
          return
        }
        // if (checkRowData[keys[i]].isNew || checkRowData[keys[i]].isImport) {
        //   insertDataList.push(row)
        // } else {
        //   updateDataList.push(row)
        // }
      }
      // var self = this
      // this.$dialog.confirm({
      //   message: (insertDataList.length + updateDataList.length) + self.$t('mes.MESSAGE.I002'),
      //   cancelText: self.$t('mes.common.cancel'),
      //   confirmText: self.$t('mes.common.ok'),
      //   onConfirm: function () {
      //     if (insertDataList.length > 0 && updateDataList.length === 0) {
      //       self.createSkcTest(insertDataList).then(result => {
      //         if (result.result) {
      //           self.$dialog.alert(self.$t('mes.MESSAGE.I001'))
      //           self.refreshSearch()
      //         } else {
      //         }
      //       })
      //     }
      //     if (updateDataList.length > 0 && insertDataList.length === 0) {
      //       self.updateSkcTest(updateDataList).then(result => {
      //         if (result.result) {
      //           self.$dialog.alert(self.$t('mes.MESSAGE.I001'))
      //           self.refreshSearch()
      //         } else {
      //         }
      //       })
      //     }
      //     if (updateDataList.length > 0 && insertDataList.length > 0) {
      //       self.createSkcTest(insertDataList).then(result => {
      //         if (result.result) {
      //           self.updateSkcTest(updateDataList).then(result => {
      //             if (result.result) {
      //               self.$dialog.alert(self.$t('mes.MESSAGE.I001'))
      //               self.refreshSearch()
      //             } else {
      //             }
      //           })
      //         } else {
      //         }
      //       })
      //     }
      //   },
      //   onCancel: function () {
      //   }
      // })
    },
    createSkcTestData (checkRowData) {
      var row = {}
      try {
        for (var i = 0; i < this.gridColumns.length; i++) {
          if (this.gridColumns[i].readOnly === false || this.gridColumns[i].modifiable === false) {
            row[this.gridColumns[i].binding] = checkRowData[this.gridColumns[i].binding]
          }
        }
        self.$dialog.alert(self.$t('mes.MESSAGE.I001'))
        self.changedLoadMorePage(0, self.pagingSize)
      } catch (error) {
        this.$dialog.alert(this.$t('mes.MESSAGE.W005'))
        return row
      }
      return row
    },
    // #endregion

    // #region Event
    changeSelectedPanel (panel) {
      this.selectedPanel = panel
    },
    addRow () {
      let row = {}
      // for (var i = 0; i < this.gridColumns.length; i++) {
      //   if (this.gridColumns[i].binding === 'siteId') {
      //     row[this.gridColumns[i].binding] = this.theSite.siteId
      //   } else if (this.gridColumns[i].binding === 'useStatCd') {
      //     row[this.gridColumns[i].binding] = 'Usable'
      //   } else if (this.gridColumns[i].binding === 'mdfyUserId' || this.gridColumns[i].binding === 'crtUserId') {
      //     row[this.gridColumns[i].binding] = this.user.userId
      //   } else {
      //     row[this.gridColumns[i].binding] = null
      //   }
      // }
      row.isNew = true
      this.$refs.tnSkslTestGrid.addRows([row], { checked: true })
    },
    exportExcel () {
      wjcGridXlsx.FlexGridXlsxConverter.saveAsync(
        this.tnSkslTestFlex, {
          includeColumnHeaders: true,
          includeCellStyles: false,
          includeColumns: function (columns) {
            return columns.binding !== '_status.checked'
          },
          formatItem: function (args) {
            let p = args.panel
            let xlsxCell = args.xlsxCell

            if (p.cellType === wjcGrid.CellType.ColumnHeader) {
              xlsxCell.style.fill = {}
              xlsxCell.style.fill.color = '#EEEEEE'
            }
          }
        },
        'MesSkslTest-' + dayjs().format(this.dayjsDF[YYYYMMDDHHMMSSMS]) + '.xlsx'
      )
    },
    importExcel () {
      let self = this

      document.getElementById('importFileInput').addEventListener('change', function () {
        let fileInput = document.getElementById('importFileInput')
        if (fileInput.files[0]) {
          if (fileInput.files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                        fileInput.files[0].type !== 'application/vnd.ms-excel.sheet.macroEnabled.12') {
            // E001: '.xlsx 형식의 파일만 가능합니다.',
            self.$dialog.alert(self.$t('mes.MESSAGE.E001'))
            var agent = navigator.userAgent.toLowerCase()
            if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.indexOf('msie') !== -1)) {
              document.getElementById('importFileInput').replaceWith(document.getElementById('importFileInput').clone(true))
            } else {
              document.getElementById('importFileInput').value = ''
            }
            return ''
          }

          let reader = new FileReader()
          reader.onload = function (e) {
            let workbook = new wjcXlsx.Workbook()
            workbook.loadAsync(reader.result, (result) => {
              // let excelcell = workbook.sheets[0].rows[0]
              var importHeaderList = []
              var importBodyList = []
              for (let f = 0; f < workbook.sheets[0].rows[0].cells.length; f++) {
                for (var gc = 0; gc < self.gridColumns.length; gc++) {
                  if (self.gridColumns[gc].label === workbook.sheets[0].rows[0].cells[f].value) {
                    importHeaderList.push(self.gridColumns[gc].binding)
                  }
                }
              }
              var row = {}
              for (let i = 1; i < workbook.sheets[0].rows.length; i++) {
                row = {}
                for (let h = 0; h < importHeaderList.length; h++) {
                  try {
                    row[importHeaderList[h]] = workbook.sheets[0].rows[i].cells[h].value
                  } catch (error) {
                    row[importHeaderList[h]] = null
                  }
                }
                row.isImport = true
                row['_status'] = {}
                row['_status']['checked'] = true
                importBodyList.push(row)
              }
              self.tnSkslTest = importBodyList
              var agent = navigator.userAgent.toLowerCase()
              if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.indexOf('msie') !== -1)) {
                document.getElementById('importFileInput').replaceWith(document.getElementById('importFileInput').clone(true))
              } else {
                document.getElementById('importFileInput').value = ''
              }
            })
          }
          reader.readAsDataURL(fileInput.files[0])
        }
      })

      document.getElementById('importFileInput').click()
    },
    editRow () {
      var position = 0
      // 20200409 currentPosition = -1일 경우 0으로 set
      if (this.tnSkslTestFlex.collectionView.currentPosition !== -1) {
        position = this.tnSkslTestFlex.collectionView.currentPosition
      }
      for (var gk = 0; gk < this.gridColumns.length; gk++) {
        if (this.tnSkslTestFlex.rows[position].dataItem.isNew === true) {
          this.tnSkslTestFlex.rows[position].dataItem[this.gridColumns[gk].binding] = this.selectTtnSkslTest[this.gridColumns[gk].binding] === undefined ? null : this.selectTtnSkslTest[this.gridColumns[gk].binding]
        } else {
          if (this.gridColumns[gk].modifiable !== false) {
            this.tnSkslTestFlex.rows[position].dataItem[this.gridColumns[gk].binding] = this.selectTtnSkslTest[this.gridColumns[gk].binding] === undefined ? null : this.selectTtnSkslTest[this.gridColumns[gk].binding]
          }
        }
      }
      this.tnSkslTestFlex.rows[position].dataItem['_status'].checked = true
      this.tnSkslTestFlex.collectionView.refresh()

      // for (var gk = 0; gk < this.gridColumns.length; gk++) {
      //   this.tnSkslTestFlex.rows[this.tnSkslTestFlex.collectionView.currentPosition].dataItem[this.gridColumns[gk].binding] = this.selectTtnSkslTest[this.gridColumns[gk].binding] === undefined ? null : this.selectTtnSkslTest[this.gridColumns[gk].binding]
      // }
      // this.tnSkslTestFlex.rows[this.tnSkslTestFlex.collectionView.currentPosition].dataItem['_status'].checked = true
      // this.tnSkslTestFlex.collectionView.refresh()
    },
    appendRow () {
      this.selectTtnSkslTest.isNew = true
      delete this.selectTtnSkslTest['_status']
      delete this.selectTtnSkslTest['_status.checked']

      this.$refs.tnSkslTestGrid.addRows([JSON.parse(JSON.stringify(this.selectTtnSkslTest))], { checked: true })
    },
    deleteRow () {
      this.$refs.tnSkslTestGrid.deleteCheckedAndAddedRows()
    },
    disableANDableCheck () {
      if (this.$refs.tnSkslTestGrid && this.$refs.tnSkslTestGrid.checkedRowCount === 0) {
        return true
      }
      return false
    },
    dateFormatter (format) {
      return date => dayjs(date).format(format)
    },
    async changedLoadMorePage (page, size) {
      if (page === 0) {
        this.loadMoreCurrentPage = -1
        this.loadMoreAppendData = []
        this.totalPages = 0
        this.totalElements = 0
        this.tnSkslTest = []
      }
      this.loadMoreCurrentPage = this.loadMoreCurrentPage + 1
      let response = await this.getTestList(page, size)
      if (response === undefined) {
        return
      }
      if (page > 0) {
        this.loadMoreAppendData = response
      } else {
        this.tnSkslTest = response
      }
    }
    // #endregion
  },
  data () {
    return {
      searchValue: undefined,
      payload: {},
      // Grid Data
      tnSkslTest: [],
      // Grid Description
      tnSkslTestDescData: '',
      tnSkslTestGrid: [],
      selectTtnSkslTest: {},
      selectedPanel: '',
      // Scroll Paging
      loadMoreCurrentPage: 0,
      loadMoreAppendData: [],
      totalPages: 0,
      totalElements: 0,
      pagingSize: 100,
      // Grid Column
      gridColumns: [
        { label: 'member_id', binding: 'id', readOnly: true }
        // USERNAME BINDING
        // TEAM id BINDING
      ],
      keyColumns: [
        // USERNAME KEY
        // TEAM ID KEY
      ],
      internalColumns: [
        // MEMBER ID KEY
      ],
      defaultColumns: [
        { label: 'username', key: 'name', value: '', readOnly: true },
        { label: 'member_id', key: 'id', value: '', readOnly: true },
        { label: 'team_id', key: 'team.name', value: '', readOnly: true }
      ]
    }
  },
  beforeRouteLeave (to, from, next) {
    let modifiedRow = this.$refs.tnSkslTestGrid.getModifiedRows().length
    if (modifiedRow > 0) {
      let result = confirm(`${modifiedRow}개의 수정된 항목이 있습니다. 계속 하시겠습니까?`)
      if (!result) {
        next(false)
        return
      }
    }
    next()
  }
}
