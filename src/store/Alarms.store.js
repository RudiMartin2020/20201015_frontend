// import SockJS from 'sockjs-client'
// import Stomp from 'webstomp-client'
// import API from '@/components/Apis/'
import Dayjs from 'dayjs'
import VueCookies from 'vue-cookies'

// let socket = null
// let stomp = null

export default {
  state: {
    alarms: [],
    newAlarmCount: 0
  },
  getters: {
    'alarm:alarms': state => {
      let alarms = [...state.alarms].splice(0, 99)
      return alarms
    },
    'alarm:newAlarmCount': state => state.newAlarmCount
  },
  actions: {
    alarmSocketConnect ({ commit, dispatch }) {
      // socket = new SockJS(API.spc.config().eventDataSocket)
      // stomp = Stomp.over(socket)
      // stomp.connect({}, frame => {
      //   stomp.subscribe('/iam/alarm/interlockEventData', tick => {
      //     dispatch('alarmAppend', tick)
      //   })
      // })
      let self = this
      dispatch('subscribe', {
        url: '/iam/alarm/interlockEventData',
        callback: function (tick) {
          let tickObj = JSON.parse(tick.body)
          self.dispatch('alarmAppend', tickObj)
        }
      })
      dispatch('subscribe', {
        url: '/iam/alarm/userAlarmEventData',
        callback: function (tick) {
          let tickObj = JSON.parse(tick.body)
          self.dispatch('iamAlarmAppend', tickObj)
        }
      })
    },
    alarmAppend ({ commit, state }, tickObj) {
      // console.log('@Alarm.store: alarmReceived', tick)
      commit('addAlarm', {
        received: Dayjs().format('YYYY-MM-DD HH:mm:ss'),
        origination: tickObj.origination,
        siteId: tickObj.siteId,
        eqpId: tickObj.eqpId,
        open: false,
        data: tickObj
      })
      // console.log('NEW ALARM COUNT:', state.newAlarmCount + 1)
      commit('setNewAlarmCount', state.newAlarmCount + 1)
    },
    iamAlarmAppend ({ commit, state }, tickObj) {
      let dataObj = JSON.parse(tickObj.data)
      let user = VueCookies.get('miipUser')
      if (dataObj.send === 0 || dataObj.send === user.groupIndex || user.userAccessLevel === 'Admin') {
        commit('addAlarm', {
          received: Dayjs().format('YYYY-MM-DD HH:mm:ss'),
          origination: tickObj.origination,
          siteId: tickObj.siteId,
          eqpId: tickObj.eqpId,
          open: false,
          data: dataObj
        })
        // console.log('NEW ALARM COUNT:', state.newAlarmCount + 1)
        commit('setNewAlarmCount', state.newAlarmCount + 1)
      }
    },
    'alarm:flushNewAlarmCount' ({ commit }) {
      commit('setNewAlarmCount', 0)
    }
  },
  mutations: {
    addAlarm (state, payload) {
      if (state.alarms.length > 999) state.alarms.pop()
      state.alarms.unshift(payload)
    },
    setNewAlarmCount (state, payload) {
      state.newAlarmCount = payload
    }

  }
}
