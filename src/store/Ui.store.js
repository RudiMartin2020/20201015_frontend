import VueCookies from 'vue-cookies'

let getDomain = (domain = null) => {
  return domain ? domain.split(':')[0] : domain
}

export default {
  state: {
    sideNavExpanded: false,
    appBody: {},
    refreshRouter: false,
    themes: ['day', 'night'],
    theme: 'day',
    itemsOnEditing: {}
  },
  getters: {
    refreshRouter: state => state.refreshRouter,
    /**
     * state.itemsOnEditing의 모든 값들중 true가 하나라도 있는지 리턴합니다.
     * componentName 주어질 경우, 해당 componentName의 True/False 여부를 리턴합니다.
     */
    itemsOnEditing: state => (key) => {
      if (key) {
        return state.itemsOnEditing[key]
      }
      if (Object.values(state.itemsOnEditing).length) {
        return Object.values(state.itemsOnEditing).includes(true)
      }
      return false
    }
  },
  mutations: {
    toggleSideNav (state) {
      state.sideNavExpanded = !state.sideNavExpanded
    },
    setSideNav (state, payload) {
      state.sideNavExpanded = payload
    },
    setAppBody (state, payload) {
      state.appBody = payload
    },
    toggleRefreshRouter (state) {
      state.refreshRouter = !state.refreshRouter
    },
    setRefreshRouter (state, payload) {
      state.refreshRouter = payload
    },
    setTheme (state, payload) {
      state.theme = payload
    },
    setItemsOnEditing (state, payload) {
      state.itemsOnEditing = {
        ...state.itemsOnEditing,
        ...payload
      }
    },
    clearItemsOnEditing (state) {
      state.itemsOnEditing = {}
    }
  },
  actions: {
    toggleSideNav (context) {
      context.commit('toggleSideNav')
    },
    setSideNav (context, payload) {
      context.commit('setSideNav', payload)
    },
    setAppBody (context, payload) {
      context.commit('setAppBody', payload)
    },
    setTheme ({ commit }, payload) {
      let domain
      let site = VueCookies.get('miipSite')
      if (site) {
        domain = process.env.NODE_ENV === 'production' ? site._webUrl : null
      }
      if (payload) {
        VueCookies.set('miipTheme', payload, null, null, getDomain(domain))
        commit('setTheme', payload)
      } else {
        let theme = VueCookies.get('miipTheme') || 'night'
        commit('setTheme', theme)
      }
    },
    /**
     * state.itemsOnEditing을 수정하기 위해 사용합니다.
     * state.itemsOnEditing: { 컴포넌트명: true }일 경우 해당 컴포넌트가 수정중인 형태라고 판단합니다. Vuex Store에서는 해당 컴포넌트가 수정중인지, 아닌지에 대한 데이터만 가지고 있습니다. 라우트 변경, 혹은 컴포넌트 내용의 리프레시 상황에서의 Confirm 처리는 개별 화면에서 처리해야 합니다.
     * @param {Object} payload { 컴포넌트명: Boolean } 형태의 Object를 받습니다.
     */
    setItemsOnEditing ({ commit }, payload) {
      if (!payload) {
        commit('clearItemsOnEditing')
      } else {
        commit('setItemsOnEditing', payload)
      }
    }
  }
}
