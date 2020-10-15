import _ from 'underscore'

/**
   * return false : 다르다 , true : 같다
   */
var modifiedRowCheck = function (gridData, originalData, key) {
  // var gridCeckObjectKey = '_status'
  // var gridCeckChildtKey = 'checked'
  var modifiedRows = gridData.modifiedRows
  var selectedRows = gridData.checkedRows
  var equalKeyCount = 0
  // 필수 키 값이 변경 된 경우를 위한 키
  var checkModifyModelCount = 0
  var check = false
  for (var mc = 0; mc < modifiedRows.length; mc++) {
    check = false
    for (var sc = 0; sc < selectedRows.length; sc++) {
      if (_.isEqual(modifiedRows[mc], selectedRows[sc])) {
        check = true
        break
      }
    }
    if (!check) {
      for (var oc = 0; oc < originalData.length; oc++) {
        equalKeyCount = 0
        for (var kc = 0; kc < key.length; kc++) {
          if (modifiedRows[mc][key[kc]] === originalData[oc][key[kc]]) {
            equalKeyCount++
          }
          if (equalKeyCount === key.length) {
            if (!_.isEqual(modifiedRows[mc], originalData[oc])) {
              return false
            } else {
              return true
            }
          }
        }
        // if (modifiedRows[mc][key] === originalData[oc][key] && !_.isEqual(modifiedRows[mc], originalData[oc])) {
        //   message = saveMessage
        //   updateModelCheck = true
        //   break
        // }
      }
    } else {
      checkModifyModelCount++
    }
    // if (modifiedRows[mc][gridCeckObjectKey][gridCeckChildtKey] === false) {

    // } else {
    //   checkModifyModelCount++
    // }
  }
  if (checkModifyModelCount === modifiedRows.length) {
    return true
  }
  return false
}
export default {
  createMessageFunction: (gridData, originalData, key, defaultMessage) => {
    // var gridCeckObjectKey = '_status'
    // var gridCeckChildtKey = 'checked'
    var saveMessage = '변경되었으나 체크되지 않은 항목이 있습니다.<br>체크되지 않은 항목에 변경 부분은 사라집니다.<br><br>'
    var message = ''
    var addedRows = gridData.addedRows
    var selectedRows = gridData.checkedRows
    var updateModelCheck = true
    var check = false
    for (var ac = 0; ac < addedRows.length; ac++) {
      check = false
      for (var sc = 0; sc < selectedRows.length; sc++) {
        if (_.isEqual(addedRows[ac], selectedRows[sc])) {
          check = true
          break
        }
      }
      // if (addedRows[ac][gridCeckObjectKey][gridCeckChildtKey] === false) {
      if (!check) {
        message += saveMessage
        updateModelCheck = false
        break
      }

      // }
    }
    if (updateModelCheck) {
      var modifiedResult = modifiedRowCheck(gridData, originalData, key)
      message += modifiedResult === false ? saveMessage : ''
    }
    // var addedRowCount = this.$refs.tableGrid.addedRowCount
    // var modifiedRowCount = this.$refs.tableGrid.modifiedRowCount
    // var totalModifiedRows = this.$refs.tableGrid.totalModifiedRows
    // var totalModifiedRowCount = this.$refs.tableGrid.totalModifiedRowCount
    // if (!_.isEqual(checkRowData, modifiedRows)) {
    //   message = '변경되었으나 체크되지 않은 항목이 있습니다.<br>저장할 경우 체크되지 않은 항목에 변경 부분은 사라집니다.<br><br>'
    // }

    message += defaultMessage
    return message
  }
}
