import axios from 'axios'
import * as wjCore from '@grapecity/wijmo'
import * as wjGrid from '@grapecity/wijmo.grid'
export default {
  name: 'ECEditor',
  methods: {
    initializeGrid (grid, e) {
      this.itemGrid.grid = grid

      grid.formatItem.addHandler((grid, e) => {
        if (e.panel === grid.cells) {
          // Managed
          if (grid.rows[e.row].dataItem.MANAGE_YN === true) {
            if (grid.columns[e.col].binding !== 'TARGET' && grid.columns[e.col].binding !== 'LSL' &&
                grid.columns[e.col].binding !== 'USL' && grid.columns[e.col].binding !== 'INTERLOCK_YN') {
              wjCore.addClass(e.cell, 'cell-managed')
            }
          }
          // Unmanaged
          if (grid.rows[e.row].dataItem.MANAGE_YN === false) {
            wjCore.addClass(e.cell, 'cell-unmanaged')
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }
          // No Spec(Out of SPEC 아닌경우)
          if (grid.rows[e.row].dataItem.MANAGE_YN === true && grid.rows[e.row].dataItem.INTERLOCK_YN === 'N') {
            if (grid.rows[e.row].dataItem.LSL === undefined || grid.rows[e.row].dataItem.LSL === '' ||
                grid.rows[e.row].dataItem.USL === undefined || grid.rows[e.row].dataItem.USL === '') {
              if (grid.columns[e.col].binding === 'TARGET' || grid.columns[e.col].binding === 'LSL' ||
                  grid.columns[e.col].binding === 'USL' || grid.columns[e.col].binding === 'INTERLOCK_YN') {
                wjCore.addClass(e.cell, 'cell-noSpec')
              }
            }
          }

          // Validation 체크, Out Of SPEC Limit
          if (grid.rows[e.row].dataItem.IS_VALIDATION_SPEC === false) {
            if (grid.columns[e.col].binding === 'TARGET' || grid.columns[e.col].binding === 'LSL' ||
                grid.columns[e.col].binding === 'USL' || grid.columns[e.col].binding === 'INTERLOCK_YN') {
              wjCore.addClass(e.cell, 'cell-outOfSpec')
            }
          }

          // VALUE_TYPE, UNIT_TYPE인경우 값이 있거나, MANAGE_YN == false면 disable
          if ((grid.columns[e.col].binding === 'VALUE_TYPE' || grid.columns[e.col].binding === 'UNIT_TYPE') &&
              ((grid.getCellData(e.row, e.col) !== '' && grid.getCellData(e.row, e.col) !== undefined) || (grid.rows[e.row].dataItem.MANAGE_YN === false))) {
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }

          // disable
          if (grid.columns[e.col].binding === 'ECID' || grid.columns[e.col].binding === 'NAME' ||
              grid.columns[e.col].binding === 'ALIAS' || grid.columns[e.col].binding === 'MANAGE_YN' ||
              grid.columns[e.col].binding === 'MIN_VALUE' || grid.columns[e.col].binding === 'MAX_VALUE' ||
              grid.columns[e.col].binding === 'DEFAULT_VALUE' || grid.columns[e.col].binding === 'UNIT' ||
              grid.columns[e.col].binding === 'DATA_TYPE' || grid.columns[e.col].binding === 'SPEC_OPTION' ||
              grid.columns[e.col].binding === 'SPEC_UNIT' || grid.columns[e.col].binding === 'ENUM' ||
              grid.columns[e.col].binding === 'ENUM_VALUE' || grid.columns[e.col].binding === 'MODIFY') {
            wjCore.addClass(e.cell, 'wj-state-disabled')
          }
        }
      })

      grid.cellEditEnding.addHandler((grid, e) => {
        let activeData = this.copyActiveData(grid, e)
        let sValue = activeData[grid.columns[e.col].binding]
        let sColumn = grid.columns[e.col].binding

        if (sValue === grid.rows[e.row].dataItem[grid.columns[e.col].binding]) {
          return
        }

        // Validation 체크, isValidationSPEC(activeData, gridData, row, col, isMessageShow)
        // Out Of SPEC Limit
        if (activeData.VALUE_TYPE !== '' && activeData.UNIT_TYPE !== '' &&
            (sColumn === 'TARGET' || sColumn === 'LSL' ||
             sColumn === 'USL' || sColumn === 'INTERLOCK_YN')) {
          if (sColumn === 'INTERLOCK_YN' && sValue === '') {
            e.cancel = true
            return
          }

          // VALUE_TYPE : CONTROL, SET 구분해서 체크함
          if (activeData.VALUE_TYPE === 'CONTROL') {
            if (sColumn === 'INTERLOCK_YN' &&
                sValue === 'Y' &&
                activeData.SPEC_OPTION === 'FIX') {
              let slData = Object()
              let ret = this.makeSPECLimit(activeData.SPEC_UNIT, slData)
              if (ret === true) {
                grid.rows[e.row].dataItem.LSL = slData.LSL
                grid.rows[e.row].dataItem.USL = slData.USL
                activeData.LSL = slData.LSL
                activeData.USL = slData.USL
              }
            }

            // validation체크
            let retValidation = this.isValidationSPEC(activeData, grid.rows[e.row].dataItem, e.row, e.col, true)
            if (retValidation === false) {
              e.cancel = true
              return
            }

            // spec limit 을 확인 한다.
            if (sColumn === 'TARGET' &&
                (activeData.INTERLOCK_YN === 'Y' || activeData.LSL === '' || activeData.USL === '') &&
                activeData.SPEC_OPTION !== '' &&
                activeData.SPEC_OPTION !== 'FIX') {
              let sSPECLimitLSL = this.getSpecLimitValue(activeData, sValue, false)
              let sSPECLimitUSL = this.getSpecLimitValue(activeData, sValue, true)
              if (sSPECLimitLSL !== '' && sSPECLimitUSL !== '') {
                activeData.LSL = String(sSPECLimitLSL)
                activeData.USL = String(sSPECLimitUSL)
                // validation체크
                let retValidation = this.isValidationSPEC(activeData, grid.rows[e.row].dataItem, e.row, e.col, true)
                if (retValidation === false) {
                  return
                }

                grid.rows[e.row].dataItem.LSL = String(sSPECLimitLSL)
                grid.rows[e.row].dataItem.USL = String(sSPECLimitUSL)
              }
            }
          } else {
            // SET
            if (sColumn !== 'INTERLOCK_YN' &&
                !(activeData.TARGET === activeData.LSL &&
                  activeData.TARGET === activeData.USL &&
                  activeData.LSL === activeData.USL)) {
              let sameMsg = "Patameters with a SPEC control type if 'SET' nust have the same TARGET, LSL, and USL value." +
                            'Do you want to set TARGET, LSL, and USL to the same value?'
              if (confirm(sameMsg)) {
                grid.rows[e.row].dataItem.TARGET = sValue
                grid.rows[e.row].dataItem.LSL = sValue
                grid.rows[e.row].dataItem.USL = sValue
                activeData.TARGET = sValue
                activeData.LSL = sValue
                activeData.USL = sValue

                // validation체크
                let retValidation = this.isValidationSPEC(activeData, grid.rows[e.row].dataItem, e.row, e.col, true)
                if (retValidation === false) {
                  e.cancel = true
                  return
                }
              } else {
                if (sColumn === 'TARGET') {
                  activeData.LSL = ''
                  activeData.USL = ''
                  activeData.INTERLOCK_YN = 'N'
                }

                // validation체크
                let retValidation = this.isValidationSPEC(activeData, grid.rows[e.row].dataItem, e.row, e.col, true)
                if (retValidation === false) {
                  e.cancel = true
                  return
                }

                if (sColumn === 'TARGET') {
                  grid.rows[e.row].dataItem.LSL = ''
                  grid.rows[e.row].dataItem.USL = ''
                  grid.rows[e.row].dataItem.INTERLOCK_YN = 'N'
                }
              }
            }

            if (sColumn === 'INTERLOCK_YN' && sValue === 'Y') {
              if (activeData.TARGET === '' ||
                  activeData.LSL === '' ||
                  activeData.USL === '') {
                alert('TARGET, LSL and USL values have to be existed in order to set the interlock')
                e.cancel = true
                return
              } else {
                if (!(activeData.TARGET === activeData.LSL &&
                      activeData.TARGET === activeData.USL &&
                      activeData.LSL === activeData.USL)) {
                  // SPEC Type이 'SET'인 TARGET, LSL, USL 값은 동일해야합니다.
                  let msg = "The parameter which SPEC Control Type is 'SET' needs to have the same values of TARGET, LSL, USL"
                  this.errValidationShow(grid.rows[e.row].dataItem, e.row, true, msg)
                  e.cancel = true
                  return
                }
              }
            }

            // validation체크
            let retValidation = this.isValidationSPEC(activeData, grid.rows[e.row].dataItem, e.row, e.col, true)
            if (retValidation === false) {
              e.cancel = true
            }
          }
        } else if (sColumn === 'VALUE_TYPE' || sColumn === 'UNIT_TYPE') {
          // validation체크
          this.isValidationSPEC(activeData, grid.rows[e.row].dataItem, e.row, e.col, true)
        }

        // row validation체크
        this.checkValidationSPEC(activeData, grid.rows[e.row].dataItem, e.row)

        // 업로드(upload) 구현 필요함
        // 업로드(upload) 구현 필요함
        // 업로드(upload) 구현 필요함
      })

      grid.cellEditEnded.addHandler((grid, e) => {
        if (e.panel === grid.cells) {
          /// 체크박스 주변 클릭하다가 체크박스 클릭하면 이벤트 발생안함. ///
          // 데이타 변경 체크
          for (var i = 0; i < this.itemGrid.itemData.length; i++) {
            this.itemGrid.itemData[i].MODIFY = false
            if (this.itemGrid.itemData[i].ADD === false) {
              for (var j = 0; j < grid.columns.length; j++) {
                if (grid.columns[j].binding !== 'SELECT' && grid.columns[j].binding !== 'DELETE' &&
                    grid.columns[j].binding !== 'MODIFY' && grid.columns[j].binding !== 'ADD' &&
                    grid.columns[j].binding !== 'ROW_NO' &&
                    this.itemGrid.itemData[i][grid.columns[j].binding] !== this.itemGrid.itemOriData[i][grid.columns[j].binding]
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

      const res = await axios.get('http://localhost:9090/ECEditor/getECSPECList?reqText=' + encodeURIComponent(JSON.stringify(this.sraechItem)))
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

          if (this.itemGrid.itemData[i].SPEC_RAWID !== undefined && this.itemGrid.itemData[i].INTERLOCK_YN === undefined) {
            this.itemGrid.itemData[i].INTERLOCK_YN = 'N'
          }

          // "true"/"fasle" -> 체크박스 변환
          for (var j = 0; j < this.itemGrid.grid.columns.length; j++) {
            if (this.itemGrid.grid.columns[j].binding === 'MANAGE_YN') {
              if (this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] === 'Y') {
                this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] = true
              }
              if (this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] === 'N') {
                this.itemGrid.itemData[i][this.itemGrid.grid.columns[j].binding] = false
              }
            }
          }

          // Validation 체크
          // row validation체크
          this.checkValidationSPEC(this.itemGrid.itemData[i], this.itemGrid.itemData[i], i)
        }

        // rmsValueTypeCodeList
        this.itemGrid.rmsValueTypeCodeList = res.data.rmsValueTypeCodeList
        let col = this.itemGrid.grid.getColumn('VALUE_TYPE')
        col.dataMap = new wjGrid.DataMap(this.itemGrid.rmsValueTypeCodeList, 'CODE', 'NAME')
        // rmsUnitTypeCodeList
        this.itemGrid.rmsUnitTypeCodeList = res.data.rmsUnitTypeCodeList
        col = this.itemGrid.grid.getColumn('UNIT_TYPE')
        col.dataMap = new wjGrid.DataMap(this.itemGrid.rmsUnitTypeCodeList, 'CODE', 'NAME')
        // interLock list
        var interLockYN = [
          { CODE: 'Y', NAME: 'YES' },
          { CODE: 'N', NAME: 'NO' }
        ]
        col = this.itemGrid.grid.getColumn('INTERLOCK_YN')
        col.dataMap = new wjGrid.DataMap(interLockYN, 'CODE', 'NAME')

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

          // 저장시 입력값 Validation 체크
          this.checkValidationSPEC(reqObject, reqObject, j)
          if (reqObject.IS_VALIDATION_SPEC === false) {
            alert('SPEC Over : ECID, NAME, UNIT TYPE, SPEC TYPE is mandatory.')
            return
          }

          /// ///////////////////////////////////////////////////////////////////
          // EQP_RAWID 저장
          // 조회조건의 EQP_RAWID로 변경 필요함
          // 저장, 히스토리 저장시 필요함
          reqObject.EQP_RAWID = '30002'
          reqObject.EQP_ID = 'CENC46A'
          reqObject.LOCATION_RAWID = '3'
          reqObject.AREA_RAWID = '2'
          reqObject.EQP_MODEL = 'CENTURA_14-17'
          /// ///////////////////////////////////////////////////////////////////

          // 수정히스토리 저장시 필요함
          reqObject.ORI_MANAGE_YN = this.itemGrid.itemOriData[j].MANAGE_YN
          reqObject.ORI_TARGET = this.itemGrid.itemOriData[j].TARGET
          reqObject.ORI_LSL = this.itemGrid.itemOriData[j].LSL
          reqObject.ORI_USL = this.itemGrid.itemOriData[j].USL
          reqObject.ORI_INTERLOCK_YN = this.itemGrid.itemOriData[j].INTERLOCK_YN

          for (var key in reqObject) {
            if (reqObject[key] === undefined) {
              reqObject[key] = ''
            }
          }

          reqTextArray.push(reqObject)
        }
      }

      reqText.itemData = reqTextArray
      const res = await axios.post('http://localhost:9090/ECEditor/saveECSPEC?reqText=' + encodeURIComponent(JSON.stringify(reqText)))
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

      let deletingMsg = "When deleting EC SPEC, Do you want to set MANAGE to 'NO'?" +
                        "\nYes : Set MANAGE to 'NO' when deleting EC SPEC." +
                        "\nCancel : MANAGE won't be changed when deleting EC SPEC."
                        // '\nCancel : Delete Process Will be Cancel.'
      let changeMANAGEYN = false
      if (confirm(deletingMsg)) {
        // MANAGE 삭제
        changeMANAGEYN = true
      }

      if (confirm('Do you want to delete the selected items?') === false) {
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
          reqObject.changeMANAGEYN = changeMANAGEYN

          /// ////////////////////////////////////////////////////
          // EQP_RAWID 저장
          // 조회조건의 EQP_RAWID로 변경 필요함
          // 저장, 히스토리 저장시 필요함
          reqObject.EQP_RAWID = '30002'
          reqObject.EQP_ID = 'CENC46A'
          reqObject.LOCATION_RAWID = '3'
          reqObject.AREA_RAWID = '2'
          reqObject.EQP_MODEL = 'CENTURA_14-17'
          /// /////////////////////////////////////////////////////

          reqTextArray.push(reqObject)
        }
      }

      // 삭제
      reqText.itemData = reqTextArray
      const res = await axios.delete('http://localhost:9090/ECEditor/deleteECSPEC?reqText=' + encodeURIComponent(JSON.stringify(reqText)))
      if (res.status === 200) {
        alert('You have sucessfully deleted.')
        this.getData()
      }
    },
    checkValidationSPEC: function (activeData, gridData, row) {
      // Row Validation 체크, Out Of SPEC Limit
      gridData.IS_VALIDATION_SPEC = true
      if (activeData.MANAGE_YN === undefined || activeData.MANAGE_YN === '' || activeData.MANAGE_YN === 'N' || activeData.MANAGE_YN === false) {
        return
      }
      for (var j = 0; j < this.itemGrid.grid.columns.length; j++) {
        if (this.isValidationSPEC(activeData, gridData, row, j, false) === false) {
          gridData.IS_VALIDATION_SPEC = false
          return
        }
      }
    },
    isValidationSPEC: function (activeData, gridData, row, col, isMessageShow) {
      let msg = ''

      if (activeData.VALUE_TYPE === '') {
        msg = 'Please select SPEC Type'
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }

      // SPEC_OPTION = FIX 인경우
      if (this.itemGrid.grid.columns[col].binding === 'LSL' || this.itemGrid.grid.columns[col].binding === 'USL') {
        if (activeData.SPEC_OPTION !== undefined && activeData.SPEC_OPTION !== '' &&
            activeData.SPEC_UNIT !== undefined && activeData.SPEC_UNIT !== '' &&
            activeData.SPEC_OPTION === 'FIX') {
          let slData = Object()
          let ret = this.makeSPECLimit(gridData.SPEC_UNIT, slData)
          if (ret === true) {
            if (this.itemGrid.grid.columns[col].binding === 'LSL') {
              if (activeData.LSL !== undefined && activeData.LSL !== '' && slData.LSL !== activeData.LSL) {
                msg = "If SPEC OPTION is set to 'FIX', LSL must be identical with LSL Value which denfined in SPEC Limit"
                this.errValidationShow(gridData, row, isMessageShow, msg)
                return false
              }
            }
            if (this.itemGrid.grid.columns[col].binding === 'USL') {
              if (activeData.USL !== undefined && activeData.USL !== '' && slData.USL !== activeData.USL) {
                msg = "If SPEC OPTION is set to 'FIX', USL must be identical with USL Value which denfined in SPEC Limit"
                this.errValidationShow(gridData, row, isMessageShow, msg)
                return false
              }
            }
          }
        }
      }

      // UNIT_TYPE = null 인경우
      if (activeData.UNIT_TYPE === undefined || activeData.UNIT_TYPE === '') {
        msg = 'There is no UNIT TYPE for Cell Validation of Target, LSL, and USL'
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }

      // INTERLOCK_YN = Y 인경우
      if (activeData.INTERLOCK_YN === 'Y') {
        if (activeData.TARGET === undefined || activeData.TARGET.trim() === '' ||
            activeData.LSL === undefined || activeData.LSL.trim() === '' ||
            activeData.USL === undefined || activeData.USL.trim() === '') {
          msg = 'Either TARGET, LSL or USL does not exist, Interlock can not be set'
          this.errValidationShow(gridData, row, isMessageShow, msg)
          return false
        }
      }

      // VALUE_TYPE = CONTRON, UNIT_TYPE = ASCII 인경우
      if (activeData.VALUE_TYPE === 'CONTROL' && activeData.UNIT_TYPE === 'ASCII') {
        msg = "If the SPEC Type is 'CONTROL', Data Type can not be 'ASCII'"
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }

      // TARGET, LSL, USL 체크
      let isSuccess = true
      if (activeData.UNIT_TYPE === 'INT' || activeData.UNIT_TYPE === 'UINT' || activeData.UNIT_TYPE === 'FLOAT') {
        isSuccess = this.isValidateIntType(activeData, gridData, row, isMessageShow)
      } else {
        isSuccess = this.isValidateEtcType(activeData, gridData, row, isMessageShow)
      }

      return isSuccess
    },
    isValidateIntType: function (activeData, gridData, row, isMessageShow) {
      let msg = ''

      // 숫자체크
      let numOpt = '5'
      if (activeData.UNIT_TYPE === 'INT' || activeData.UNIT_TYPE === 'UINT') {
        numOpt = '5'
      } else if (activeData.UNIT_TYPE === 'FLOAT') {
        numOpt = '6'
      }

      if ((activeData.TARGET !== undefined && activeData.TARGET !== '' && this.isNumeric(activeData.TARGET, numOpt) === false) ||
          (activeData.LSL !== undefined && activeData.LSL !== '' && this.isNumeric(activeData.LSL, numOpt) === false) ||
          (activeData.USL !== undefined && activeData.USL !== '' && this.isNumeric(activeData.USL, numOpt) === false)) {
        msg = '입력 문자열의 형식이 잘못되었습니다.'
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }

      if ((activeData.LSL !== undefined && activeData.LSL !== '') &&
          (activeData.USL !== undefined && activeData.USL !== '') &&
          (activeData.TARGET === undefined || activeData.TARGET === '')) {
        // * 문구 잘못된거 같음 * //
        // Target 값이 LSL 값의 범위를 벗어 납니다.
        msg = 'Target value is less than LSL Value'
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }

      if (activeData.VALUE_TYPE === 'SET') {
        if (activeData.LSL !== undefined && activeData.LSL !== '' &&
            activeData.TARGET !== undefined && activeData.TARGET !== '' &&
            activeData.LSL !== activeData.TARGET) {
          // SPEC Type이 'SET'인 TARGET, LSL, USL 값은 동일해야합니다.
          msg = "The parameter which SPEC Control Type is 'SET' needs to have the same values of TARGET, LSL, USL"
          this.errValidationShow(gridData, row, isMessageShow, msg)
          return false
        }

        if (activeData.USL !== undefined && activeData.USL !== '' &&
            activeData.TARGET !== undefined && activeData.TARGET !== '' &&
            activeData.USL !== activeData.TARGET) {
          // SPEC Type이 'SET'인 TARGET, LSL, USL 값은 동일해야합니다.
          msg = "The parameter which SPEC Control Type is 'SET' needs to have the same values of TARGET, LSL, USL"
          this.errValidationShow(gridData, row, isMessageShow, msg)
          return false
        }

        if (activeData.LSL !== undefined && activeData.LSL !== '' &&
            activeData.USL !== undefined && activeData.USL !== '' &&
            activeData.LSL !== activeData.USL) {
          // SPEC Type이 'SET'인 TARGET, LSL, USL 값은 동일해야합니다.
          msg = "The parameter which SPEC Control Type is 'SET' needs to have the same values of TARGET, LSL, USL"
          this.errValidationShow(gridData, row, isMessageShow, msg)
          return false
        }
      } else {
        if (activeData.LSL !== undefined && activeData.LSL !== '' &&
            activeData.TARGET !== undefined && activeData.TARGET !== '' &&
            Number(activeData.TARGET) < Number(activeData.LSL)) {
          // Target 값이 LSL 값의 범위를 벗어 납니다.
          msg = 'Target value is less than LSL Value'
          this.errValidationShow(gridData, row, isMessageShow, msg)
          return false
        }

        if (activeData.USL !== undefined && activeData.USL !== '' &&
            activeData.TARGET !== undefined && activeData.TARGET !== '' &&
            Number(activeData.TARGET) > Number(activeData.USL)) {
          // Target 값이 USL 값의 범위를 벗어 납니다.
          msg = 'Target value is greater than USL Value'
          this.errValidationShow(gridData, row, isMessageShow, msg)
          return false
        }

        if (activeData.LSL !== undefined && activeData.LSL !== '' &&
            activeData.USL !== undefined && activeData.USL !== '' &&
            Number(activeData.LSL) > Number(activeData.USL)) {
          // LSL 값이 USL 값의 범위를 벗어 납니다.
          return false
        }
      }

      return true
    },
    isValidateEtcType: function (activeData, gridData, row, isMessageShow) {
      let msg = ''

      if (activeData.LSL !== undefined && activeData.LSL !== '' &&
          activeData.TARGET !== undefined && activeData.TARGET !== '' &&
          activeData.LSL !== activeData.TARGET) {
        // SPEC Type이 'SET'인 TARGET, LSL, USL 값은 동일해야합니다.
        msg = "The parameter which SPEC Control Type is 'SET' needs to have the same values of TARGET, LSL, USL"
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }

      if (activeData.USL !== undefined && activeData.USL !== '' &&
          activeData.TARGET !== undefined && activeData.TARGET !== '' &&
          activeData.USL !== activeData.TARGET) {
        // SPEC Type이 'SET'인 TARGET, LSL, USL 값은 동일해야합니다.
        msg = "The parameter which SPEC Control Type is 'SET' needs to have the same values of TARGET, LSL, USL"
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }

      if (activeData.LSL !== undefined && activeData.LSL !== '' &&
          activeData.USL !== undefined && activeData.USL !== '' &&
          activeData.LSL !== activeData.USL) {
        // SPEC Type이 'SET'인 TARGET, LSL, USL 값은 동일해야합니다.
        msg = "The parameter which SPEC Control Type is 'SET' needs to have the same values of TARGET, LSL, USL"
        this.errValidationShow(gridData, row, isMessageShow, msg)
        return false
      }
    },
    copyActiveData: function (grid, e) {
      // activeData 복사(수정중인 데이터 복사)
      let activeData = Object()
      for (let p = 0; p < grid.columns.length; p++) {
        activeData[grid.columns[p].binding] = grid.rows[e.row].dataItem[grid.columns[p].binding]
        if (activeData[grid.columns[p].binding] === undefined) {
          activeData[grid.columns[p].binding] = ''
        }
      }

      let cellData = ''
      if (grid.activeEditor != null) {
        cellData = grid.activeEditor.value
      }

      activeData[grid.columns[e.col].binding] = cellData
      if (cellData === undefined || cellData == null || cellData.trim() === '') {
        activeData[grid.columns[e.col].binding] = ''
      }

      if (grid.columns[e.col].binding === 'INTERLOCK_YN') {
        if (activeData[grid.columns[e.col].binding] === 'YES') {
          activeData[grid.columns[e.col].binding] = 'Y'
        } else if (activeData[grid.columns[e.col].binding] === 'NO') {
          activeData[grid.columns[e.col].binding] = 'N'
        } else {
          activeData[grid.columns[e.col].binding] = ''
        }
      }

      return activeData
    },
    errValidationShow: function (gridData, row, isMessageShow, showMsg) {
      if (isMessageShow) {
        let msg = showMsg + '\nEC ID : ' + gridData.ECID + '\nEC Name : ' + gridData.NAME + '\nRow Index : ' + (row + 1)
        alert(msg)
      } else {
        gridData.IS_VALIDATION_SPEC = false
      }
    },
    makeSPECLimit: function (cellData, slData) {
      let isError = true
      let sLStr = ''
      let lsl, usl

      let arr = cellData.split(',')
      if (arr.length === 2) {
        for (let i = 0; i < arr.length; i++) {
          let arrSub = arr[i].split('=')
          if (arrSub.length !== 2) {
            isError = false
            break
          }

          if (arrSub[0] === 'LSL') {
            lsl = arrSub[1]
            if (this.isNumeric(lsl)) {
              if (sLStr === 'LSL') {
                // 중복
                isError = false
                break
              }
              sLStr = 'LSL'
            } else {
              isError = false
              break
            }
          } else if (arrSub[0] === 'USL') {
            usl = arrSub[1]
            if (this.isNumeric(usl)) {
              if (sLStr === 'USL') {
                // 중복
                isError = false
                break
              }
              sLStr = 'USL'
            } else {
              isError = false
              break
            }
          } else {
            isError = false
            break
          }
        }
      } else {
        isError = false
      }
      if (isError) {
        slData.LSL = lsl
        slData.USL = usl
      }
      return isError
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
      } else if (opt === '5') {
        // 부호 선택, 자릿수구분기호 미사용, 소수점 미사용
        regex = /^[+\\-]?[0-9]+$/g
      } else if (opt === '6') {
        // 부호 선택, 자릿수구분기호 미사용, 소수점 선택
        regex = /^[+\\-]?([0-9]+){1}(\.[0-9]+)?$/g
      } else {
        // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
        regex = /^[0-9]+$/g
      }

      if (regex.test(num)) {
        num = num.replace(/,/g, '')
        return !isNaN(num)
      } else { return false }
    },
    getSpecLimitValue: function (gridData, sValue, isMin) {
      let sResult = ''

      if (gridData.SPEC_OPTION !== '' &&
          gridData.SPEC_UNIT !== '' &&
          sValue !== '' &&
          gridData.VALUE_TYPE === 'CONTROL') {
        // 숫자체크
        if (this.isNumeric(gridData.SPEC_UNIT) === false) {
          return ''
        }
        gridData.SPEC_UNIT = gridData.SPEC_UNIT.replace(/,/gi, '')

        let dValue = Number(sValue)
        let dSpecLimit = Number(gridData.SPEC_UNIT)
        let dResult = 0.0
        if (gridData.SPEC_OPTION === '+/-') {
          if (isMin === false) {
            dResult = dValue - dSpecLimit
          } else {
            dResult = dValue + dSpecLimit
          }
        } else if (gridData.SPEC_OPTION === '%') {
          if (isMin === false) {
            dResult = dValue - (dValue * (dSpecLimit / 100))
          } else {
            dResult = dValue + (dValue * (dSpecLimit / 100))
          }
        }

        sResult = dResult
      }

      return sResult
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
          { label: 'ADD', binding: 'ADD', visible: false },
          { label: 'MODIFY', binding: 'MODIFY' },
          { label: 'DELETE', binding: 'DELETE' },
          { label: 'ECID', binding: 'ECID' },
          { label: 'NAME', binding: 'NAME' },
          { label: 'ALIAS', binding: 'ALIAS', readOnly: false, required: false },
          { label: 'MANAGE', binding: 'MANAGE_YN', readOnly: false },
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
          { label: 'TARGET', binding: 'TARGET', required: false },
          { label: 'LSL', binding: 'LSL', required: false },
          { label: 'USL', binding: 'USL', required: false },
          { label: 'I/L', binding: 'INTERLOCK_YN', required: false },
          { label: 'EQP_RAWID', binding: 'EQP_RAWID', visible: false },
          { label: 'RAWID', binding: 'RAWID', visible: false },
          { label: 'SPEC_RAWID', binding: 'SPEC_RAWID', visible: false },
          { label: 'EC_RAWID', binding: 'EC_RAWID', visible: false }
        ]
      }
    }
  }
}
