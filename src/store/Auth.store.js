import API from '@/components/Apis/'
import VueCookies from 'vue-cookies'
import axios from 'axios'

let getObjFromNode = (node = {}, obj = {}, result = [], propagation = true) => {
  let flag = true
  for (let key in obj) {
    if (node[key] !== obj[key]) flag = false
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

let getDomain = (domain = null) => {
  return domain ? domain.split(':')[0] : domain
}

export default {
  state: {
    currentProgram: 'mes',
    authed: null,
    accessToken: '',
    refreshToken: '',
    user: null,
    programs: [],
    theSite: {},
    theApis: {},
    lang: '',
    timeout: '24',
    domain: '',
    subDomain: '',
    subdomains: {}
  },
  getters: {
    user: state => {
      return state.user
    },
    authed: state => {
      return state.authed
    },
    program: state => condition => {
      let result = getObjFromNodes(state.programs, condition)
      return result.length ? result[0] : {}
    },
    programs: state => {
      return state.programs
    },
    theSite: state => state.theSite,
    lang: state => {
      return state.lang
    },
    accessToken: state => {
      return state.accessToken
    },
    timeout: state => {
      return state.timeout
    },
    theApis: state => {
      return state.theApis
    },
    theDomain: state => {
      return state.domain
    },
    subDomain: state => {
      return state.subDomain
    },
    subDomains: state => {
      return state.subDomains
    }
  },
  actions: {
    async login ({ commit, state, dispatch }, loginReq) {
      // console.log('@ Auth.store.js login()')
      let response = await API.settings.getLoginResult({
        ...loginReq,
        siteId: loginReq.site.siteId,
        site: null
      })
      if (response.data) {
        let payload = {
          loginResult: response.data, // accessToken, refreshToken, User
          loginReq: loginReq // userId, userPassword, lang, site, timeOut
        }
        dispatch('afterLogin', payload)
      }
    },
    afterLogin ({ commit, dispatch, state }, payload) {
      let domain = process.env.NODE_ENV === 'production' ? payload.loginReq.site._webUrl : null
      payload.loginReq.site.siteApiItm = payload.loginReq.site.siteApiItm === null ? JSON.parse(payload.loginReq.site._apiItm) : payload.loginReq.site.siteApiItm
      payload.loginReq.site.siteWebSocket = payload.loginReq.site.siteWebSocket === null ? JSON.parse(payload.loginReq.site._webSocketId) : payload.loginReq.site.siteWebSocket
      dispatch('setSite', payload.loginReq.site)
      dispatch('setLangCommit', payload.loginReq.lang)
      dispatch('getApis', payload.loginReq.site.siteApiItm)

      // set cookies
      VueCookies.set('miipAccessToken', payload.loginResult.accessToken, null, null, getDomain(domain))
      VueCookies.set('miipRefreshToken', payload.loginResult.refreshToken, null, null, getDomain(domain))
      VueCookies.set('miipUser', payload.loginResult.user, null, null, getDomain(domain))
      axios.defaults.headers.common['AT'] = payload.loginResult.accessToken
      state.timeout = payload.loginReq.timeout

      // commit tokens to store
      if (payload.loginResult.accessToken) {
        commit('setAccessToken', payload.loginResult.accessToken)
      }
      if (payload.loginResult.refreshToken) {
        commit('setRefreshToken', payload.loginResult.refreshToken)
      }
      if (payload.loginResult.user) commit('setUser', payload.loginResult.user)
      VueCookies.remove('miipResult', null, getDomain(domain))
      dispatch('getPrograms')
      commit('setAuthState', true)
    },
    logout ({ commit, dispatch, state }) {
      // console.log('@ Auth.store.js logout()')
      VueCookies.remove('miipAccessToken', null, getDomain(state.domain))
      VueCookies.remove('miipRefreshToken', null, getDomain(state.domain))
      VueCookies.remove('miipLang', null, getDomain(state.domain))
      VueCookies.remove('miipUser', null, getDomain(state.domain))
      VueCookies.remove('miipSite', null, getDomain(state.domain))
      VueCookies.remove('miipTime', null, getDomain(state.domain))
      VueCookies.remove('miipError', null, getDomain(state.domain))
      VueCookies.remove('miipResult', null, getDomain(state.domain))
      commit('setAccessToken', '')
      commit('setRefreshToken', '')
      commit('SET_SITE', '')
      commit('SET_APIS', [])
      commit('setAuthState', false)
      commit('setLang', '')
      commit('setPrograms', [])
      dispatch('socketDisconnect')
    },
    getApis ({ commit }, payload) {
      if (payload) {
        commit('SET_APIS', payload)
      } else {
        commit('SET_APIS', VueCookies.get('miipSite').siteApiItm)
      }
    },
    async getPrograms ({ commit }) {
      // console.log('@ Auth.store.js getPrograms()')
      let response = await API.settings.getProgramList()
      if (response && response.length > 0) {
        let subDomains = {}
        response.forEach(item => {
          subDomains[item.title.toLowerCase()] = item.progrmSubnet
        })
        commit('setPrograms', response)
        commit('SET_SUB_DOMAINS', subDomains)
      }
    },
    async validToken ({ commit, dispatch }) {
      // console.log('@ Auth.store.js validToken()')
      let response = await API.settings.tokenValid()
      if (response.isAxiosError) {
        if (response.response.data && response.response.data.code === 1000) {
          // console.log('@토큰 리프레시 필요')
          dispatch('refreshToken')
        } else {
          // console.log('@토큰 통과 못함')
          commit('setAuthState', false)
        }
      } else {
        // console.log('@토큰 인증 성공')
        dispatch('getPrograms')
        commit('setAuthState', true)
      }
    },
    async refreshToken ({ commit, state, dispatch }) {
      // console.log('refresh token : ', state.refreshToken)
      let refreshToken = VueCookies.get('miipRefreshToken')
      let response = await API.settings.refreshToken({ RT: refreshToken })
      if (response.status) {
        VueCookies.set(
          'miipAccessToken',
          response.data.accessToken,
          null,
          null,
          getDomain(state.domain)
        )
        axios.defaults.headers.common['AT'] = response.data.accessToken
        commit('setAccessToken', response.data.accessToken)
        // console.log('@store.refreshToken:return', response)
        return response
      }
    },
    async setLangCommit ({ commit, state }, payload) {
      commit('setLang', payload)
      VueCookies.set('miipLang', payload, null, null, getDomain(state.domain))
    },
    async setSite ({ commit, state, dispatch }, payload) {
      let domain
      if (payload) {
        domain = process.env.NODE_ENV === 'production' ? payload._webUrl : null
        dispatch('getApis', payload.siteApiItm)
        commit('SET_SITE', payload)
        VueCookies.set('miipSite', payload, null, null, getDomain(domain))
      } else {
        let site = VueCookies.get('miipSite')
        domain = process.env.NODE_ENV === 'production' ? site._webUrl : null
        if (site) {
          dispatch('getApis')
          commit('SET_SITE', site)
        }
      }
      commit('SET_DOMAIN', domain)
      commit('SET_SUB_DOMAIN', window.location.hostname.split('.')[0])
    },
    async getUserInfo ({ commit, state }) {
      let response = await API.settings.getUserSearch()
      if (response) {
        VueCookies.set('miipUser', response[0], null, null, getDomain(state.domain))
        commit('setUser', response[0])
      }
    },
    async SET_TIMEOUT ({ commit, state }, timeout) {
      VueCookies.set('miipTime', timeout, null, null, getDomain(state.domain))
      commit('setTimeout', timeout)
    },
    async removeOauthResult ({ state }) {
      let site = VueCookies.get('miipSite')
      let domain = process.env.NODE_ENV === 'production' ? site._webUrl : null
      VueCookies.remove('miipError', null, getDomain(domain))
      VueCookies.remove('miipResult', null, getDomain(domain))
      VueCookies.remove('miipLang', null, getDomain(domain))
      VueCookies.remove('miipSite', null, getDomain(domain))
      VueCookies.remove('miipTime', null, getDomain(domain))
    }
  },
  mutations: {
    setTimeout (state, payload) {
      state.timeout = payload
    },
    setAccessToken (state, payload) {
      state.accessToken = payload
    },
    setRefreshToken (state, payload) {
      state.refreshToken = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setAuthState (state, payload) {
      state.authed = payload
    },
    setPrograms (state, payload) {
      state.programs = payload
    },
    setLang (state, payload) {
      state.lang = payload
    },
    SET_SITE (state, payload) {
      state.theSite = payload
    },
    SET_APIS (state, payload = []) {
      let obj = {}
      payload.forEach(item => {
        obj[item.siteDomn] = item
      })
      state.theApis = obj
    },
    SET_DOMAIN (state, payload = '') {
      state.domain = payload
    },
    SET_SUB_DOMAIN (state, payload = '') {
      state.subDomain = payload
    },
    SET_SUB_DOMAINS (state, payload = '') {
      state.subDomains = payload
    }
  }
}
