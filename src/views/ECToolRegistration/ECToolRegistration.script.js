import axios from 'axios'
import * as wjCore from '@grapecity/wijmo'
import * as wjGrid from '@grapecity/wijmo.grid'
export default {
  name: 'ECToolRegistration',
  methods: {
    initializeGrid (grid, e) {
      this.itemGrid.grid = grid

      grid.formatItem.addHandler((grid, e) => {
        if (e.panel === grid.cells) {
          // User입력 부분 색상(User Registered)
          if (grid.rows[e.row].dataItem.EQP_RAWID != null && grid.rows[e.row].dataItem.EQP_RAWID !== '') {
            wjCore.addClass(e.cell, 'cell-userReg')
          }

          // User입력이 아닌경우 disable처리
          if ((grid.rows[e.row].dataItem.EQP_RAWID == null || grid.rows[e.row].dataItem.EQP_RAWID === '') &&
              (grid.columns[e.col].binding === 'SELECT' || grid.columns[e.col].binding === 'DELETE' || grid.columns[e.col].binding === 'INLINE_EQP_ID')) {
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }

          // disable
          if (grid.columns[e.col].binding === 'ADD' || grid.columns[e.col].binding === 'MODIFY' ||
              grid.columns[e.col].binding === 'LINE' || grid.columns[e.col].binding === 'AREA' ||
              grid.columns[e.col].binding === 'EQP_MODEL' || grid.columns[e.col].binding === 'EQP_TYPE' ||
              grid.columns[e.col].binding === 'EQP_ID' || grid.columns[e.col].binding === 'CREATE_DTTS' ||
              grid.columns[e.col].binding === 'CREATE_BY' || grid.columns[e.col].binding === 'CREATE_DTTS' ||
              grid.columns[e.col].binding === 'LAST_UPDATE_BY' || grid.columns[e.col].binding === 'LAST_UPDATE_DTTS') {
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }
        }
      })

      grid.cellEditEnded.addHandler((grid, e) => {
        if (e.panel === grid.cells) {
          /// 체크박스 주변 클릭하다가 체크박스 클릭하면 이벤트 발생안함. ///
          // 데이타 변경 체크
          for (var i = 0; i < this.itemGrid.itemData.length; i++) {
            this.itemGrid.itemData[i].MODIFY = false
            this.itemGrid.itemData[i].ADD = false
            for (var j = 0; j < grid.columns.length; j++) {
              if (grid.columns[j].binding !== 'SELECT' && grid.columns[j].binding !== 'DELETE' &&
                  grid.columns[j].binding !== 'MODIFY' && grid.columns[j].binding !== 'ADD' &&
                  grid.columns[j].binding !== 'ROW_NO' &&
                  this.itemGrid.itemData[i][grid.columns[j].binding] !== this.itemGrid.itemOriData[i][grid.columns[j].binding]) {
                if (this.itemGrid.itemData[i].EQP_RAWID != null && this.itemGrid.itemData[i].EQP_RAWID !== '') {
                  this.itemGrid.itemData[i].MODIFY = true
                } else {
                  this.itemGrid.itemData[i].ADD = true
                }
                break
              }
            }
          }
          grid.refresh()
        }
      })

      grid.beginningEdit.addHandler((grid, e) => {
        if (e.panel === grid.cells) {
          // InLineEQPList 조건 처리
          if (grid.columns[e.col].binding === 'INLINE_EQP_ID') {
            let inLineEQPArray = []
            for (var i = 0; i < this.itemGrid.inLineEQPList.length; i++) {
              if (this.itemGrid.inLineEQPList[i].LOCATION_RAWID === grid.rows[e.row].dataItem.LOCATION_RAWID &&
                  this.itemGrid.inLineEQPList[i].AREA_RAWID === grid.rows[e.row].dataItem.AREA_RAWID &&
                  this.itemGrid.inLineEQPList[i].EQP_ID !== grid.rows[e.row].dataItem.EQP_ID) {
                inLineEQPArray.push(this.itemGrid.inLineEQPList[i])
              }
            }
            grid.columns[e.col].dataMap = new wjGrid.DataMap(inLineEQPArray, 'EQP_ID', 'EQP_ID')
          }
        }
      })
    },
    getData: async function () {
      // 검색조건 추가 필요함
      const res = await axios.get('http://localhost:9090/ECToolRegistration/getToolList?reqText=')
      if (res.status === 200) {
        this.itemGrid.itemData = res.data.value
        if (this.itemGrid.itemData.length === 0) {
          alert('Data is not found.')
        }

        for (var i = 0; i < this.itemGrid.itemData.length; i++) {
          // SELECT, ADD, MODIFY, DELETE 체크박스 초기화
          this.itemGrid.itemData[i].SELECT = false
          this.itemGrid.itemData[i].ADD = false
          this.itemGrid.itemData[i].MODIFY = false
          this.itemGrid.itemData[i].DELETE = false

          // "true"/"fasle" -> 체크박스 변환
          for (var j = 0; j < this.itemGrid.grid.columns.length; j++) {
            if (this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] === 'true') {
              this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] = true
            }
            if (this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] === 'false') {
              this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] = false
            }
          }

          // INLINE_EQP_ID : undefined -> 빈칸 변경
          if (this.itemGrid.itemData[i].INLINE_EQP_ID === undefined || this.itemGrid.itemData[i].INLINE_EQP_ID === 'undefined') {
            this.itemGrid.itemData[i].INLINE_EQP_ID = ''
          }
        }

        // InLineEQPList
        this.itemGrid.inLineEQPList = res.data.inLineEQPList
        let col = this.itemGrid.grid.getColumn('INLINE_EQP_ID')
        col.dataMap = new wjGrid.DataMap(this.itemGrid.inLineEQPList, 'EQP_ID', 'EQP_ID')

        // 수정전 원본 저장
        this.itemGrid.itemOriData = JSON.parse(JSON.stringify(this.itemGrid.itemData))
      }
    },
    insertData: async function () {
      // ADD, MODIFY 없는경우
      var saveCount = 0
      for (var i = 0; i < this.itemGrid.itemData.length; i++) {
        if (this.itemGrid.itemData[i].ADD === true || this.itemGrid.itemData[i].MODIFY === true) {
          saveCount++
          break
        }
      }
      if (saveCount === 0) {
        alert('There is no data to save.')
        return
      }

      if (confirm('Do you want to save?') === false) {
        return
      }

      // 수정내용 저장
      let reqText = Object()
      let reqTextArray = []

      // ROW_NO 저장
      for (var m = 0; m < this.itemGrid.grid.collectionView.items.length; m++) {
        this.itemGrid.grid.collectionView.items[m].ROW_NO = m + 1
      }

      // SkGrid _status의 순환참조로 입력(수정)내용 복사함
      for (var j = 0; j < this.itemGrid.itemData.length; j++) {
        if (this.itemGrid.itemData[j].ADD === true || this.itemGrid.itemData[j].MODIFY === true) {
          let reqObject = Object()

          for (var p = 0; p < this.itemGrid.grid.columns.length; p++) {
            if (this.itemGrid.grid.columns[p].binding.indexOf('_status') === -1 &&
                this.itemGrid.grid.columns[p].binding.indexOf('__proto__') === -1) {
              reqObject[this.itemGrid.grid.columns[p].binding] = this.itemGrid.itemData[j][this.itemGrid.grid.columns[p].binding]
              if (reqObject[this.itemGrid.grid.columns[p].binding] === undefined) {
                reqObject[this.itemGrid.grid.columns[p].binding] = ''
              }
            }
          }

          // 수정히스토리 저장시 필요함
          reqObject.ORI_USED_YN = this.itemGrid.itemOriData[j].USED_YN
          reqObject.ORI_INTERLOCK_SEND_YN = this.itemGrid.itemOriData[j].INTERLOCK_SEND_YN
          reqObject.ORI_DOWNLOAD_YN = this.itemGrid.itemOriData[j].DOWNLOAD_YN
          reqObject.ORI_VALIDATION_YN = this.itemGrid.itemOriData[j].VALIDATION_YN
          reqObject.ORI_INLINE_EQP_ID = this.itemGrid.itemOriData[j].INLINE_EQP_ID

          reqTextArray.push(reqObject)
        }
      }

      reqText.itemData = reqTextArray
      // INLINE EQP 중복확인
      const dupRes = await axios.post('http://localhost:9090/ECToolRegistration/getInLineEQPCheckList?reqText=' + encodeURIComponent(JSON.stringify(reqText)))
      if (dupRes.status === 200) {
        let duplicateData = dupRes.data.value
        if (duplicateData.length > 0) {
          // 중복발생
          var duplicateText = ''
          for (var k = 0; k < duplicateData.length; k++) {
            duplicateText += 'Row No=' + duplicateData[k].ROW_NO + ', EQP ID=[' + duplicateData[k].DUPLICATION_EQP_ID +
                          '] => Duplicate in Line\nEquipment is found Please Check it again.\n'
          }
          alert(duplicateText)
          return
        }
      }

      // 저장
      const res = await axios.post('http://localhost:9090/ECToolRegistration/saveTool?reqText=' + encodeURIComponent(JSON.stringify(reqText)))
      if (res.status === 200) {
        alert('You have sucessfully saved.')
        this.getData()
      }
    },
    deleteData: async function () {
      // DELETE 없는경우
      var deleteCount = 0
      for (var i = 0; i < this.itemGrid.itemData.length; i++) {
        if (this.itemGrid.itemData[i].DELETE === true) {
          deleteCount++
          break
        }
      }
      if (deleteCount === 0) {
        alert('Please, select a row.')
        return
      }

      if (confirm('When deleting equipment, its recipe will be deleted as well.\nDo you want to delete?') === false) {
        return
      }

      let checkText = Object()
      let checkTextArray = []
      let reqText = Object()
      let reqTextArray = []

      // ROW_NO 저장
      for (var m = 0; m < this.itemGrid.grid.collectionView.items.length; m++) {
        this.itemGrid.grid.collectionView.items[m].ROW_NO = m + 1
      }

      // SkGrid _status의 순환참조로 입력,수정,삭제 내용 복사함
      for (var j = 0; j < this.itemGrid.itemData.length; j++) {
        if (this.itemGrid.itemData[j].DELETE === true) {
          let reqObject = Object()
          for (var p = 0; p < this.itemGrid.grid.columns.length; p++) {
            if (this.itemGrid.grid.columns[p].binding.indexOf('_status') === -1 &&
                this.itemGrid.grid.columns[p].binding.indexOf('__proto__') === -1) {
              reqObject[this.itemGrid.grid.columns[p].binding] = this.itemGrid.itemData[j][this.itemGrid.grid.columns[p].binding]
            }
          }
          reqTextArray.push(reqObject)

          let checkData = Object()
          checkData.INLINE_EQP_ID = this.itemGrid.itemData[j].EQP_ID
          checkData.ROW_NO = ''
          checkData.EQP_ID = ''
          checkTextArray.push(checkData)
        }
      }

      // 인라인있는경우 삭제 못함
      checkText.itemData = checkTextArray
      const checkRes = await axios.post('http://localhost:9090/ECToolRegistration/getInLineEQPCheckList?reqText=' + encodeURIComponent(JSON.stringify(checkText)))
      if (checkRes.status === 200) {
        let checkData = checkRes.data.value
        if (checkData.length > 0) {
          // 인라인있는경우
          alert('You about to delete INLINE EQP')
          return
        }
      }

      // 삭제
      reqText.itemData = reqTextArray
      const res = await axios.delete('http://localhost:9090/ECToolRegistration/deleteTool?reqText=' + encodeURIComponent(JSON.stringify(reqText)))
      if (res.status === 200) {
        alert('You have sucessfully deleted.')
        this.getData()
      }
    },
    ECList: function () {
      //  Equipment Constant ID 페이지로 이동
      var text = ''
      for (var i = 0; i < this.itemGrid.grid.collectionView.items.length; i++) {
        if (this.itemGrid.grid.collectionView.items[i].SELECT === true) {
          text += this.itemGrid.grid.collectionView.items[i].EQP_RAWID + ', '
        }
      }
      alert('EQP_RAWID : ' + text)
    }
  },
  data () {
    return {
      searchValue: '',
      itemGrid: {
        grid: null,
        itemData: [],
        itemOriData: [],
        inLineEQPList: [],
        gridColumns: [
          { label: 'SELECT', binding: 'SELECT', readOnly: false },
          { label: 'ADD', binding: 'ADD' },
          { label: 'MODIFY', binding: 'MODIFY' },
          { label: 'DELETE', binding: 'DELETE', readOnly: false },
          { label: 'LINE', binding: 'LINE' },
          { label: 'AREA', binding: 'AREA' },
          { label: 'EQP MODEL', binding: 'EQP_MODEL' },
          { label: 'EQP TYPE', binding: 'EQP_TYPE' },
          { label: 'EQP ID', binding: 'EQP_ID' },
          { label: 'USED', binding: 'USED_YN', readOnly: false },
          { label: 'I/L SEND', binding: 'INTERLOCK_SEND_YN', readOnly: false },
          { label: 'DOWNLOAD', binding: 'DOWNLOAD_YN', readOnly: false },
          { label: 'VALIDATION', binding: 'VALIDATION_YN', readOnly: false },
          { label: 'INLINE EQP', binding: 'INLINE_EQP_ID', readOnly: false, required: false },
          { label: 'CREATE TIME', binding: 'CREATE_DTTS' },
          { label: 'CREATE BY', binding: 'CREATE_BY' },
          { label: 'UPDATE TIME', binding: 'LAST_UPDATE_DTTS' },
          { label: 'UPDATE BY', binding: 'LAST_UPDATE_BY' },
          { label: 'ROW_NO', binding: 'ROW_NO', visible: false },
          { label: 'MODULE_ID', binding: 'MODULE_ID', visible: false },
          { label: 'EQP_RAWID', binding: 'EQP_RAWID', visible: false },
          { label: 'LOCATION_RAWID', binding: 'LOCATION_RAWID', visible: false },
          { label: 'AREA_RAWID', binding: 'AREA_RAWID', visible: false }
        ]
      }
    }
  }
}
