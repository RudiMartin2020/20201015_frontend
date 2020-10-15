import _ from 'lodash'

/**
 * Util (pure)functions
 */

export default {
  /**
   * generate range list include end
   * @param from: number
   * @param to: number
   * @param isReverse: boolean
   * @returns {number[]}
   */
  getRange (from, to, isReverse = false) {
    return isReverse ? _.range(from, to + 1).reverse() : _.range(from, to + 1)
  },

  /**
   * get row1, 2 and col1, 2 from range
   * @param range: {row, row1, col, col2}
   * @return [row1, row2, col1, col2]
   */
  getRowColFromRange (range) {
    let [row1, row2] = range.row < range.row2 ? [range.row, range.row2] : [range.row2, range.row]
    let [col1, col2] = range.col < range.col2 ? [range.col, range.col2] : [range.col2, range.col]
    return [row1, row2, col1, col2]
  },

  validateByColumns (key, columns, data) {
    for (var k = 0; k < columns.length; k++) {
      if (columns[k].readOnly === false && __isEmpty(data[key][columns[k].key])) {
        return false
      }
    }
    return true
  },

  validateRequiredByColumns (key, columns, data) {
    for (var k = 0; k < columns.length; k++) {
      if (columns[k].required === true && __isEmpty(data[key][columns[k].key])) {
        return false
      }
    }
    return true
  }
}

function __isEmpty (datum) {
  return (datum === undefined || datum === null || datum === '')
}
