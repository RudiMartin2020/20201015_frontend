export default {
  state: {
    pinned: [],
    names: []
  },
  getters: {
    'dashboard:pinned': state => {
      return state.pinned
    },
    'dashboard:is-pinned': state => name => {
      // console.log('getter.is-pinned:', name, state.names.includes(name))
      return state.names.includes(name)
    }
  },
  actions: {
    'dashboard:pin-panel' ({ commit, state }, payload) {
      commit('pinPanel', payload)
    }
  },
  mutations: {
    pinPanel (state, payload) {
      if (!state.names.includes(payload.name)) {
        state.names.push(payload.name)
        state.pinned.push(payload)
      } else {
        let index = state.names.indexOf(payload.name)
        state.names.splice(index, 1)
        state.pinned.splice(index, 1)
      }
    }
  }
}
