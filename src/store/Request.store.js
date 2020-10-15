import dayjs from 'dayjs'

export const ADD_LOADER = 'ADD_LOADER'
export const REMOVE_LOADER = 'REMOVE_LOADER'
export const RESET_COUNT = 'RESET_COUNT'
export const REQUEST_DATE = 'REQUEST_DATE'

let TIMEOUT_HOLDER
const TIMEOUT = 30000
const DEBOUNCE_TIME = 1000
export default {
  state: {
    requestPreCount: 0,
    requestCount: 0,
    latestRequestDate: new Date()
  },
  getters: {
    requestCount: state => state.requestCount,
    shouldShow: state => state.requestCount > 0,
    requestDate: state => state.requestDate,
    formattedRequestDate: (state) => (format = 'YYYY-MM-DD HH:mm:ss') => {
      if (!state.latestRequestDate) return ''
      return dayjs(state.latestRequestDate).format(format)
    }
  },
  mutations: {
    [ADD_LOADER] (state) {
      state.requestCount++
      /* if (state.requestCount > 0) {
        state.requestCount++
      } else {
        setTimeout(() => {
          if (state.requestPreCount > 0) {
            state.requestCount++
          }
        }, DEBOUNCE_TIME)
      } */
    },
    [REMOVE_LOADER] (state) {
      if (state.requestCount > 0) state.requestCount--
      if (state.requestPreCount > 0) state.requestPreCount--
    },
    [RESET_COUNT] (state) {
      state.requestCount = 0
      state.requestPreCount = 0
    },
    [REQUEST_DATE] (state) {
      state.latestRequestDate = new Date()
    }
  },
  actions: {
    [ADD_LOADER] (context) {
      context.commit(ADD_LOADER)
      if (TIMEOUT_HOLDER) clearTimeout(TIMEOUT_HOLDER)
      TIMEOUT_HOLDER = setTimeout(() => {
        context.commit(RESET_COUNT)
      }, TIMEOUT)
    },
    [REMOVE_LOADER] (context) {
      context.commit(REMOVE_LOADER)
    }
  }
}
