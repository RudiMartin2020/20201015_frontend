import Dayjs from 'dayjs'
import _ from 'lodash'

const getRanged = (
  item = {},
  binding = '',
  range = undefined,
  series = []
) => {
  let ranged = {}
  if (_.isString(range)) {
    // dayjs.startOf를 이용해 range별로 그루핑
    // ranged = Dayjs(item[binding]).startOf(range).valueOf()

    series.forEach(ser => {
      if (item[ser] === null || item[ser] === undefined) {
        ranged[ser] = null
      } else {
        ranged[ser] = Dayjs(item[binding]).startOf(range).valueOf()
      }
    })
  } else if (_.isNumber(range)) {
    series.forEach(ser => {
      if (item[ser] === null || item[ser] === undefined) {
        ranged[ser] = null
      } else {
        let ranged = Math.floor(item[ser] / range) * range
        ranged[ser] = parseFloat(ranged.toFixed(getPrecision(range)))
      }
    })
  } else {
    // ranged = item[binding]
    series.forEach(ser => {
      ranged[ser] = item[ser]
    })
  }
  return ranged
}

function getPrecision (num) {
  if (!isFinite(num)) return 0
  let e = 1
  let p = 0
  while (Math.round(num * e) / e !== num) { e *= 10; p++ }
  return p
}

const getBaseRangeArr = (
  rangedResult = [],
  range = 1
) => {
  let seriesRanges = Object.values(rangedResult).reduce((acc, item) => {
    return [...acc, ...Object.keys(item)]
  }, []).sort((a, b) => a - b)

  let minRange = Number(seriesRanges[0])
  let maxRange = Number(seriesRanges[seriesRanges.length - 1])

  let result = {}
  for (let i = minRange; i < maxRange; i += range) {
    let n = Number(i.toFixed(getPrecision(range)))
    result[n] = 0
  }
  return result
}

export default {
  sum (
    items = [],
    binding = '',
    range = undefined
  ) {
    let result = {}
    let arr = []
    items.forEach(item => {
      let ranged = getRanged(item, binding, range)
      // item의 value로 ranged를 만듦.
      // ex: 31.5.... 39,1 => 30으로 뭉뚱그림
      console.log('@Aggregates.ranged:', range, '=>', ranged)
      if (!result[ranged]) {
        result[ranged] = item[binding]
      } else {
        result[ranged] += item[binding]
      }
    })
    for (let key in result) {
      let object = {}
      object['SUM'] = result[key]
      object[binding] = Number(key)
      arr.push(object)
    }
    return arr
  },

  count (
    items = [],
    binding = '',
    range = undefined,
    series = []
  ) {
    let result = {}
    let arr = []
    items.forEach(item => {
      let ranged = getRanged(item, binding, range, series)
      // ranged: { EQP-1: 25, EQP-2: null, EQP-3: null }
      for (let key in ranged) {
        if (ranged[key] !== null) {
          if (!result[key]) result[key] = {}
          if (!result[key][ranged[key]]) {
            result[key][ranged[key]] = 1
          } else {
            result[key][ranged[key]]++
          }
        }
      }
    })

    // getRanged를 통해 ranged된 값이 없을 경우에도 기본으로 0을 가지고 있어야 하므로
    // getBaseRangeArr을 통해 { range: 0 } 을 기본으로 설정.
    for (let key in result) {
      result[key] = { ...getBaseRangeArr(result, range), ...result[key] }
    }

    // result: { EQP-1: { 10: 5, 20: 10, 30: 0 }, EQP-2: { 10: 2, 20: 3 } }
    // {10: 100, 20: 15, 30: 32}
    let obj = {}
    for (let key in result) {
      let sers = result[key]
      for (range in sers) {
        if (!obj[range]) obj[range] = {}
        obj[range][key] = sers[range]
      }
    }
    arr = Object.values(obj)
    for (let range in obj) {
      obj[range]['COUNT'] = 0
      for (let ser in obj[range]) {
        if (series.length > 1) {
          obj[range]['COUNT'] += obj[range][ser]
        } else {
          obj[range]['COUNT'] = obj[range][ser]
        }
      }
      obj[range][binding] = Number(range)
    }

    arr = _.sortBy(arr, binding)

    console.log('@aggregates: count:', arr)
    /* let vvv = arr.reduce((val, item) => {
      // console.log(item.COUNT, val.COUNT)
      return { COUNT: item.COUNT + val.COUNT }
    }) */
    // console.log('VVV:', vvv)
    return arr
    // [{ COUNT: 10, avgVal: 15 }, { COUNT: 20: avgVal: 35 }]
    // [{ COUNT: 10, EQP-1: 10, EQP-2: 20 }, {COUNT: 20, EQP-1: 15, EQP-2: 3}]
  }
}
