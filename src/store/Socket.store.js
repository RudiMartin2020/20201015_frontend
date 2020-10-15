import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
// import API from '@/components/Apis/'

export default {
  state: {
    socket: null,
    stomp: null,
    subscribeIds: {},
    isConnected: false,
    subscribeQueue: []
  },
  getters: {
    'socket:stomp': state => state.stomp,
    'socket:isConnected': state => state.isConnected
  },
  actions: {
    socketConnect ({ commit, dispatch, state, getters }) {
      // state.socket = new SockJS(API.spc.config().eventDataSocket, null, { timeout: 10 * 1000 })
      let site = getters['theSite']
      let timeout = getters['timeout']
      let socketList = JSON.parse(site._webSocketId)
      if (socketList && socketList != null) {
        // state.socket = new SockJS('http://' + socketList[0].socketIp + ':' + socketList[0].socketPort + '/miip')
        // state.socket = new SockJS('http://' + socketList[0].socketIp + ':' + socketList[0].socketPort + '/miip', null, { timeout: 1 * 1000 * 60 * 60 * 24 * 7 })
        // state.socket = new SockJS('http://' + socketList[0].socketIp + ':' + socketList[0].socketPort + '/miip', null, { timeout: 0 })
        var uri = (process.env.VUE_APP_HTTPS_ENABLE === 'true' ? 'https://' : 'http://') + socketList[0].socketIp + ':' + socketList[0].socketPort + '/miip'
        state.socket = new SockJS(uri, null, { timeout: 1 * 1000 * 60 * 60 * Number(timeout) })
        // state.stomp = Stomp.over(state.socket, { heartbeat: false, debug: false })
        state.stomp = Stomp.over(state.socket, { heartbeat: false, debug: true })
        state.stomp.connect({}, frame => {
          state.isConnected = true
          if (state.subscribeQueue.length) {
            state.subscribeQueue.forEach(socket => {
              dispatch('subscribe', socket)
            })
            commit('CLEAR_SUBSCRIPTION_QUEUE')
          }
        })
      }
    },
    subscribe ({ state, commit }, data) {
      if (!state.isConnected) {
        commit('ADD_SUBSCRIPTION_QUEUE', data)
      } else if (!state.subscribeIds[data.url]) {
        let subscribeId = state.stomp.subscribe(data.url, data.callback)
        state.subscribeIds[data.url] = subscribeId
      }
    },
    unsubscribe ({ state }, data) {
      if (state.subscribeIds[data.url]) {
        state.subscribeIds[data.url].unsubscribe()
        delete state.subscribeIds[data.url]
      }
    },
    socketDisconnect ({ state }) {
      state.stomp.disconnect()
    }
  },
  mutations: {
    ADD_SUBSCRIPTION_QUEUE (state, payload) {
      state.subscribeQueue.push(payload)
    },
    CLEAR_SUBSCRIPTION_QUEUE (state) {
      state.subscribeQueue = []
    }
  }
}
