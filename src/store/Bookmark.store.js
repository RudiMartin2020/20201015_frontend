import API from '@/components/Apis/'

export default {
  state: {
    bookmarks: []
  },
  getters: {
    'bookmark:bookmarks': state => state.bookmarks
  },
  actions: {
    async addBookmark ({ commit, dispatch }, program) {
      let res = await API.settings.addBookmark(program.progrmIndex)
      if (res && res.error) {
        console.error(res.error)
      } else {
        // commit('addBookmark', program)
        dispatch('getBookmarks')
      }
    },
    async deleteBookmark ({ commit }, program) {
      let res = await API.settings.deleteBookmark(program.progrmIndex)
      if (res && res.error) {
        console.error(res.error)
      } else {
        commit('deleteBookmark', program)
      }
    },
    async getBookmarks ({ commit }) {
      let res = await API.settings.getBookmarkList()
      if (res && res.error) {
        console.error(res.error)
      } else {
        for (let i in res) {
          let splitedPath = res[i].progrmHist.split('/')
          res[i].service = splitedPath[1]
          res[i].label = splitedPath[splitedPath.length - 1]
        }
        commit('setBookmarks', res)
      }
    },
    async updateBookmark ({ commit }, payload) {
      try {
        let result = await API.settings.orderBookmarks(payload)
        if (result.result === false) {
          this.$dialog.alert('변경 에러')
        }
      } catch (err) {
        console.error(err)
      }
      commit('setBookmarks', payload)
    }
  },
  mutations: {
    addBookmark (state, payload) {
      let splitedPath = payload.progrmHist.split('/')
      payload.service = splitedPath[1]
      payload.label = splitedPath[splitedPath.length - 1]
      state.bookmarks.push(payload)
    },
    deleteBookmark (state, payload) {
      for (let i in state.bookmarks) {
        if (state.bookmarks[i].progrmHist === payload.progrmHist) {
          state.bookmarks.splice(i, 1)
        }
      }
    },
    setBookmarks (state, payload) {
      state.bookmarks = payload
    }
  }
}
