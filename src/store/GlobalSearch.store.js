let getObjFromNode = (
  node = {},
  obj = {},
  result = [],
  propagation = true
) => {
  let flag = false
  for (let key in obj) {
    if (node[key].toLowerCase().indexOf(obj[key].toLowerCase()) > -1 && node.progrmPathNm !== null) flag = true
  }
  if (flag) result.push(node)
  if (node.children && propagation) {
    getObjFromNodes(node.children, obj, result, propagation)
  }
  return result
}

let getObjFromNodes = (
  nodes = [],
  obj = {},
  result = [],
  propagation = true
) => {
  nodes.forEach(node => {
    getObjFromNode(node, obj, result, propagation)
  })
  return result
}

export default {
  state: {
    searchResultList: [],
    searchText: ''
  },
  getters: {
    'globalsearch:searchResultList': state => state.searchResultList,
    'globalsearch:searchText': state => state.searchText
  },
  actions: {
    search ({ commit, getters, state }, searchText) {
      let programs = getters.programs
      let nodes = []

      searchText = searchText.trim()
      if (searchText !== '') {
        let splitedSearchText = searchText.split(' ')

        for (let i in splitedSearchText) {
          if (i === '0') {
            nodes = programs
          }
          nodes = getObjFromNodes(nodes, { progrmHist: splitedSearchText[i], url: splitedSearchText[i] })
        }

        for (let i in nodes) {
          let splitedPath = nodes[i].progrmHist.replace('/', '').split('/')
          nodes[i].service = splitedPath[0]
          nodes[i].splitedPath = splitedPath
        }
      }
      commit('setSearchResultList', nodes)
      commit('setSearchText', searchText)
    },
    resetGlobalSearch ({ commit }) {
      commit('setSearchResultList', [])
      commit('setSearchText', '')
    }
  },
  mutations: {
    setSearchResultList (state, payload) {
      state.searchResultList = payload
    },
    setSearchText (state, payload) {
      state.searchText = payload
    }
  }
}
