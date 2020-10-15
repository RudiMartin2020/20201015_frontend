import axios from 'axios'
import * as wjCore from '@grapecity/wijmo'
import * as wjGrid from '@grapecity/wijmo.grid'
export default {
  name: 'ECID',
  methods: {
    initializeGrid (grid, e) {
      this.itemGrid.grid = grid

      grid.formatItem.addHandler((grid, e) => {
        if (e.panel === grid.cells) {
          // User입력 부분 색상(User Registered)
          if (grid.rows[e.row].dataItem.EQP_RAWID != null && grid.rows[e.row].dataItem.EQP_RAWID !== '' && grid.rows[e.row].dataItem.EQP_RAWID !== undefined) {
            wjCore.addClass(e.cell, 'cell-userReg')
          }

          // 추가가 아닌경우 disable
          if ((grid.rows[e.row].dataItem.ADD === false) &&
              (grid.columns[e.col].binding === 'ECID' || grid.columns[e.col].binding === 'NAME' ||
               grid.columns[e.col].binding === 'MIN_VALUE' || grid.columns[e.col].binding === 'MAX_VALUE' ||
               grid.columns[e.col].binding === 'DEFAULT_VALUE' || grid.columns[e.col].binding === 'UNIT' ||
               grid.columns[e.col].binding === 'DATA_TYPE')) {
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }

          // 추가인경우 disable
          if ((grid.rows[e.row].dataItem.ADD === true) &&
              (grid.columns[e.col].binding === 'SELECT')) {
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }

          // disable
          if (grid.columns[e.col].binding === 'ADD' || grid.columns[e.col].binding === 'MODIFY') {
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }
        }
      })

      grid.cellEditEnding.addHandler((grid, e) => {
        let col = grid.columns[e.col]
        if (grid.activeEditor.value.trim() === '') {
          grid.activeEditor.value = ''
        }

        if (col.binding === 'SPEC_OPTION' && grid.activeEditor.value !== '') {
          if (grid.rows[e.row].dataItem.VALUE_TYPE === 'SET') {
            alert("Those parameters can not be inserted for the spec type 'SET' : SPEC OPTION")
            e.cancel = true
          }
        }

        if (col.binding === 'SPEC_UNIT' && grid.activeEditor.value !== '') {
          if (grid.rows[e.row].dataItem.VALUE_TYPE === 'SET') {
            alert("Those parameters can not be inserted for the spec type 'SET' : SPEC LIMIT")
            e.cancel = true
          } else if (grid.rows[e.row].dataItem.SPEC_OPTION === undefined || grid.rows[e.row].dataItem.SPEC_OPTION === '') {
            alert('NO SPEC OPTION is found. Please make sure to enter SPEC OPTION.')
            e.cancel = true
          } else if (grid.rows[e.row].dataItem.SPEC_OPTION === 'FIX') {
            // FIX인경우 Validataion체크
            let cellData = grid.activeEditor.value
            let isError = false
            let sLStr = ''
            let isSLError = false
            let lsl, usl

            let arr = cellData.split(',')
            if (arr.length === 2) {
              for (let i = 0; i < arr.length; i++) {
                let arrSub = arr[i].split('=')
                if (arrSub.length !== 2) {
                  isError = true
                  break
                }

                if (arrSub[0] === 'LSL') {
                  lsl = arrSub[1]
                  if (this.isNumeric(lsl)) {
                    if (sLStr === 'LSL') {
                      // 중복
                      isSLError = true
                      break
                    }
                    sLStr = 'LSL'
                  } else {
                    isError = true
                    break
                  }
                } else if (arrSub[0] === 'USL') {
                  usl = arrSub[1]
                  if (this.isNumeric(usl)) {
                    if (sLStr === 'USL') {
                      // 중복
                      isSLError = true
                      break
                    }
                    sLStr = 'USL'
                  } else {
                    isError = true
                    break
                  }
                } else {
                  isError = true
                  break
                }
              }
            } else {
              isError = true
            }

            if (isError) {
              alert('Row No=' + (e.row + 1) + ', SPEC LIMIT=[' + cellData +
                    "]=> IMPORTANT PARAMETER doesn't comply with format.\nSPEC OPTION if 'FIX' input format for the value\nex) LSL=10,USL=10")
              e.cancel = true
            } else if (isSLError) {
              alert('Row No=' + (e.row + 1) + ', IMPORTANT PRAMETER=[' + cellData + ']=> The data already exists.\n' + sLStr)
              e.cancel = true
            } else if (usl < lsl) {
              alert('Row No=' + (e.row + 1) + ', SPEC LIMIT=[' + cellData + "]=> LSL value is greater than USL value.\nSPEC OPTION if 'FIX' input format for the value\nex) LSL=10,USL=10")
              e.cancel = true
            } else if (grid.rows[e.row].dataItem.MAX_VALUE !== undefined && (usl - grid.rows[e.row].dataItem.MAX_VALUE) > 0) {
              alert('USL value is greater than the maxmum value.')
              e.cancel = true
            } else if (grid.rows[e.row].dataItem.MIN_VALUE !== undefined && (lsl - grid.rows[e.row].dataItem.MIN_VALUE) < 0) {
              alert('LSL value is less than the minimum value.')
              e.cancel = true
            }
          } else if (grid.rows[e.row].dataItem.SPEC_OPTION === '+/-' || grid.rows[e.row].dataItem.SPEC_OPTION === '%') {
            // 숫자 체크
            if (!this.isNumeric(grid.activeEditor.value)) {
              alert("You have wrongly input data. Only the input types such as\n'number|number' or 'number' are available.")
              e.cancel = true
            }
          }
        }

        if ((col.binding === 'ENUM' || col.binding === 'ENUM_VALUE') && grid.activeEditor.value !== '') {
          if (grid.rows[e.row].dataItem.VALUE_TYPE === 'CONTROL') {
            alert("Those parameters can not be inserted for the spec type\n'CONTROL' : " + col.binding)
            e.cancel = true
          }
        }

        if (col.binding === 'UNIT_TYPE' && grid.activeEditor.value !== '') {
          if (grid.rows[e.row].dataItem.VALUE_TYPE === 'CONTROL') {
            if (grid.activeEditor.value === 'ASCII' || grid.activeEditor.value === 'BINARY' || grid.activeEditor.value === 'BOOLEAN') {
              alert("In case that SPEC TYPE of a parameter is CONTROL, the unit type can not be set either 'ASCII','BINARY' or 'BOOLEAN'.\n" + grid.activeEditor.value)
              e.cancel = true
            }
          }
        }
      })

      grid.cellEditEnded.addHandler((grid, e) => {
        if (e.panel === grid.cells) {
          let col = grid.columns[e.col]
          if (col.binding === 'MANAGE_YN') {
            if (grid.getCellData(e.row, e.col) === true) {
              grid.rows[e.row].dataItem.USED_YN = true
            }
          }

          /// 체크박스 주변 클릭하다가 체크박스 클릭하면 이벤트 발생안함. ///
          // 데이타 변경 체크
          for (var i = 0; i < this.itemGrid.itemData.length; i++) {
            this.itemGrid.itemData[i].MODIFY = false
            if (this.itemGrid.itemData[i].ADD === false) {
              for (var j = 0; j < grid.columns.length; j++) {
                if (grid.columns[j].binding !== 'SELECT' && grid.columns[j].binding !== 'DELETE' &&
                    grid.columns[j].binding !== 'MODIFY' && grid.columns[j].binding !== 'ADD' &&
                    grid.columns[j].binding !== 'ROW_NO' &&
                    this.itemGrid.itemData[i][grid.columns[j].binding] !== this.itemGrid.itemOriData[i][grid.columns[j].binding] &&
                    this.itemGrid.itemData[i].EQP_RAWID != null && this.itemGrid.itemData[i].EQP_RAWID !== ''
                ) {
                  this.itemGrid.itemData[i].MODIFY = true
                  break
                }
              }
            }
          }
          grid.refresh()
        }
      })
    },
    getData: async function () {
      // 검색조건 추가 필요함
      this.sraechItem.LOCATION_RAWID = '3'
      this.sraechItem.AREA_RAWID = '2'
      this.sraechItem.EQP_ID = 'CENC46A'
      this.sraechItem.EQP_RAWID = '30002'
      this.sraechItem.EQP_MODEL = 'CENTURA_14'

      const res = await axios.get('http://localhost:9090/ECID/getECIDList?reqText=' + encodeURIComponent(JSON.stringify(this.sraechItem)))
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
            if (this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] === 'Y') {
              this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] = true
            }
            if (this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] === 'N') {
              this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] = false
            }
          }
        }

        // rmsValueTypeCodeList
        this.itemGrid.rmsValueTypeCodeList = res.data.rmsValueTypeCodeList
        let col = this.itemGrid.grid.getColumn('VALUE_TYPE')
        col.dataMap = new wjGrid.DataMap(this.itemGrid.rmsValueTypeCodeList, 'CODE', 'NAME')
        // rmsUnitTypeCodeList
        this.itemGrid.rmsUnitTypeCodeList = res.data.rmsUnitTypeCodeList
        col = this.itemGrid.grid.getColumn('UNIT_TYPE')
        col.dataMap = new wjGrid.DataMap(this.itemGrid.rmsUnitTypeCodeList, 'CODE', 'NAME')
        // rmsSpecOptionList
        this.itemGrid.rmsSpecOptionCodeList = res.data.rmsSpecOptionCodeList
        col = this.itemGrid.grid.getColumn('SPEC_OPTION')
        col.dataMap = new wjGrid.DataMap(this.itemGrid.rmsSpecOptionCodeList, 'CODE', 'NAME')

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

      // ECID 중복 체크
      let duplicateText = ''
      for (var x = 0; x < this.itemGrid.grid.collectionView.items.length; x++) {
        if ((this.itemGrid.grid.collectionView.items[x].ADD === true || this.itemGrid.grid.collectionView.items[x].MODIFY === true) &&
            this.itemGrid.grid.collectionView.items[x].ECID !== undefined &&
            this.itemGrid.grid.collectionView.items[x].ECID.trim() !== '') {
          for (var y = 0; y < this.itemGrid.grid.collectionView.items.length; y++) {
            if (x !== y && this.itemGrid.grid.collectionView.items[x].ECID === this.itemGrid.grid.collectionView.items[y].ECID) {
              duplicateText += 'Row No :' + this.itemGrid.grid.collectionView.items[x].ROW_NO +
                            ', ECID :' + this.itemGrid.grid.collectionView.items[x].ECID +
                            ' => Duplicate EC is found.\n'
              break
            }
          }
        }
      }
      if (duplicateText !== '') {
        alert(duplicateText)
        return
      }

      // 필수값 체크
      let mandatoryText = ''
      for (var z = 0; z < this.itemGrid.grid.collectionView.items.length; z++) {
        if (this.itemGrid.grid.collectionView.items[z].ECID === undefined || this.itemGrid.grid.collectionView.items[z].ECID.trim() === '' ||
            this.itemGrid.grid.collectionView.items[z].NAME === undefined || this.itemGrid.grid.collectionView.items[z].NAME.trim() === '' ||
            this.itemGrid.grid.collectionView.items[z].ALIAS === undefined || this.itemGrid.grid.collectionView.items[z].ALIAS.trim() === '') {
          let ecId = ''
          if (this.itemGrid.grid.collectionView.items[z].ECID !== undefined && this.itemGrid.grid.collectionView.items[z].ECID !== 'undefined') {
            ecId = this.itemGrid.grid.collectionView.items[z].ECID.trim()
          }
          mandatoryText += 'Row No :' + this.itemGrid.grid.collectionView.items[z].ROW_NO +
                          ', ECID :' + ecId +
                          ' => ECID, NAME, ALIAS is mandatory.\n'
        }
      }
      if (mandatoryText !== '') {
        alert(mandatoryText)
        return
      }

      // SkGrid _status의 순환참조로 입력(수정)내용 복사함
      for (let j = 0; j < this.itemGrid.itemData.length; j++) {
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

          // EQP_RAWID 저장
          // 조회조건의 EQP_RAWID로 변경 필요함
          // 저장, 히스토리 저장시 필요함
          reqObject.EQP_RAWID = '30002'
          reqObject.EQP_ID = 'CENC46A'
          reqObject.LOCATION_RAWID = '3'
          reqObject.AREA_RAWID = '2'
          reqObject.EQP_MODEL = 'CENTURA_14-17'

          // 수정히스토리 저장시 필요함
          reqObject.ORI_ALIAS = this.itemGrid.itemOriData[j].ALIAS
          reqObject.ORI_MANAGE_YN = this.itemGrid.itemOriData[j].MANAGE_YN
          reqObject.ORI_USED_YN = this.itemGrid.itemOriData[j].USED_YN
          reqObject.ORI_VALUE_TYPE = this.itemGrid.itemOriData[j].VALUE_TYPE
          reqObject.ORI_UNIT_TYPE = this.itemGrid.itemOriData[j].UNIT_TYPE
          reqObject.ORI_SPEC_OPTION = this.itemGrid.itemOriData[j].SPEC_OPTION
          reqObject.ORI_SPEC_UNIT = this.itemGrid.itemOriData[j].SPEC_UNIT
          reqObject.ORI_ENUM = this.itemGrid.itemOriData[j].ENUM
          reqObject.ORI_ENUM_VALUE = this.itemGrid.itemOriData[j].ENUM_VALUE
          for (var key in reqObject) {
            if (reqObject[key] === undefined) {
              reqObject[key] = ''
            }
          }

          reqTextArray.push(reqObject)
        }
      }

      reqText.itemData = reqTextArray
      const res = await axios.post('http://localhost:9090/ECID/saveECID?reqText=' + encodeURIComponent(JSON.stringify(reqText)))
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

      if (confirm('Do you want to delete the selected items?') === false) {
        return
      }

      // addRow 삭제
      deleteCount = 0
      for (var y = this.itemGrid.itemData.length - 1; y >= 0; y--) {
        if (this.itemGrid.itemData[y].DELETE === true) {
          if (this.itemGrid.itemData[y].EQP_RAWID != null && this.itemGrid.itemData[y].EQP_RAWID !== undefined && this.itemGrid.itemData[y].EQP_RAWID !== '') {
            deleteCount++
          } else {
            this.itemGrid.itemData.splice(y, 1)
            this.itemGrid.itemOriData.splice(y, 1)
          }
        }
      }
      if (deleteCount === 0) {
        this.itemGrid.grid.collectionView.refresh()
        return
      }

      let reqText = Object()
      let reqTextArray = []

      // SkGrid _status의 순환참조로 입력,수정,삭제 내용 복사함
      for (var j = 0; j < this.itemGrid.itemData.length; j++) {
        if (this.itemGrid.itemData[j].DELETE === true) {
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

          // EQP_RAWID 저장
          // 조회조건의 EQP_RAWID로 변경 필요함
          // 저장, 히스토리 저장시 필요함
          reqObject.EQP_RAWID = '30002'
          reqObject.EQP_ID = 'CENC46A'
          reqObject.LOCATION_RAWID = '3'
          reqObject.AREA_RAWID = '2'
          reqObject.EQP_MODEL = 'CENTURA_14-17'

          reqTextArray.push(reqObject)
        }
      }

      // 삭제
      reqText.itemData = reqTextArray
      const res = await axios.delete('http://localhost:9090/ECID/deleteECID?reqText=' + encodeURIComponent(JSON.stringify(reqText)))
      if (res.status === 200) {
        alert('You have sucessfully deleted.')
        this.getData()
      }
    },
    addRow: function () {
      if (this.sraechItem.EQP_ID === '') {
        alert('Please search for the condition first.')
        return
      }

      let addData = Object()
      addData.SELECT = false
      addData.ADD = true
      addData.MODIFY = false
      addData.DELETE = false
      addData.MANAGE_YN = false
      addData.USED_YN = false
      addData.EQP_RAWID = ''

      this.itemGrid.itemData.push(addData)
      this.itemGrid.grid.collectionView.refresh()

      this.itemGrid.itemOriData.push(addData)
    },
    selectList: function () {
      // select List
      var text = ''
      for (let i = 0; i < this.itemGrid.itemData.length; i++) {
        if (this.itemGrid.itemData[i].SELECT === true) {
          text += this.itemGrid.itemData[i].EQP_RAWID + ', '
        }
      }
      alert('EQP_RAWID : ' + text)
    },
    isNumeric: function (num, opt) {
      // 좌우 trim(공백제거)을 해준다.
      num = String(num).replace(/^\s+|\s+$/g, '')
      var regex
      if (typeof opt === 'undefined' || opt === '1') {
        // 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
        regex = /^[+\\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g
      } else if (opt === '2') {
        // 부호 사용, 자릿수구분기호 미사용, 소수점 선택
        regex = /^[+\\-]|[0-9]+(\.[0-9]+)?$/g
      } else if (opt === '3') {
        // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
        regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g
      } else if (opt === '4') {
        // 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
        regex = /^[0-9]+(\.[0-9]+)?$/g
      } else {
        // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
        regex = /^[0-9]$/g
      }

      if (regex.test(num)) {
        num = num.replace(/,/g, '')
        return !isNaN(num)
      } else { return false }
    }
  },
  data () {
    return {
      searchValue: '',
      sraechItem: {},
      itemGrid: {
        grid: null,
        itemData: [],
        itemOriData: [],
        rmsValueTypeCodeList: [],
        rmsUnitTypeCodeList: [],
        rmsSpecOptionCodeList: [],
        gridColumns: [
          { label: 'SELECT', binding: 'SELECT', readOnly: false },
          { label: 'ADD', binding: 'ADD' },
          { label: 'MODIFY', binding: 'MODIFY' },
          { label: 'DELETE', binding: 'DELETE', readOnly: false },
          { label: 'ECID', binding: 'ECID' },
          { label: 'NAME', binding: 'NAME' },
          { label: 'ALIAS', binding: 'ALIAS', readOnly: false, required: false },
          { label: 'MANAGE', binding: 'MANAGE_YN', readOnly: false },
          { label: 'USED', binding: 'USED_YN', readOnly: false },
          { label: 'SPEC TYPE', binding: 'VALUE_TYPE', readOnly: false, required: true },
          { label: 'UNIT TYPE', binding: 'UNIT_TYPE', readOnly: false, required: true },
          { label: 'MIN VALUE', binding: 'MIN_VALUE' },
          { label: 'MAX VALUE', binding: 'MAX_VALUE' },
          { label: 'DEFAULT VALUE', binding: 'DEFAULT_VALUE' },
          { label: 'SECS UNIT', binding: 'UNIT' },
          { label: 'DATA TYPE', binding: 'DATA_TYPE' },
          { label: 'SPEC OPTION', binding: 'SPEC_OPTION', readOnly: false, required: false },
          { label: 'SPEC LIMIT', binding: 'SPEC_UNIT', readOnly: false, required: false },
          { label: 'ENUM', binding: 'ENUM', readOnly: false, required: false },
          { label: 'ENUM VALUE', binding: 'ENUM_VALUE', readOnly: false, required: false },
          { label: 'EQP_RAWID', binding: 'EQP_RAWID', visible: false },
          { label: 'RAWID', binding: 'RAWID', visible: false }
        ]
      }
    }
  }
}
