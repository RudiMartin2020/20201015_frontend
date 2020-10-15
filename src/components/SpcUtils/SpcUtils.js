export default {
  /**
    * [P1, P2, P3] => {grpLvl0Name: P1, grpLvl1Name: P2, grpLvl2Name: P3} 형태로 변환합니다.
    * @param {Array} parents 트리의 부모들이 기록된 Array
    * @param {String} pattern 리턴할 Object의 Key가 될 String Pattern. {{n}} 을 숫자로 치환합니다.
    */
  convertParaGroupToObject (parents = [], pattern = 'grpLvl{{n}}Name', startIndex = 1) {
    let obj = {}
    parents.forEach(parent => {
      let name = pattern.replace('{{n}}', startIndex)
      obj[name] = parent
      startIndex++
    })
    // console.log('@convertParaGroupToObject:', obj)
    return obj
  },

  /**
   * key가 patter과 일치하는 값을만 찾아서 그 Value를 Array로 리턴합니다.
   *
   * @param {Object} [obj={}]
   * @param {RegEXp} [pattern=/(grpLvl[0-9]+Name)/]
   * @param {Number} [startIndex=1]
   */
  convertObjToArray (obj = {}, pattern = /(grpLvl[0-9]+Name)/, startIndex = 1) {
    let arr = []
    for (let key in obj) {
      if (key.match(pattern)) {
        arr.push(obj[key])
      }
    }
    return arr
  },

  /**
   * 두 개의 Flat Object가 같은 내용을 가지고 있는지 체크합니다
   *
   * @param {Object} orgObj
   * @param {Object} newObj
   * @returns 같으면 true
   */
  diffFlatObject (orgObj, newObj) {
    let same = true
    for (let key in orgObj) {
      if (newObj[key] !== orgObj[key]) same = false
    }
    return same
  },

  objToQueryString (obj) {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')
  }
}
