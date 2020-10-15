export const SPC = 'SPC'
export const MES = 'MES'
export const GRID = 'grid'
export const DAYJS = 'dayjs'
export const YYYYMMDD = 'YYYYMMDD'
export const YYYYMMDDHHMM = 'YYYYMMDDHHMM'
export const YYYYMMDDHHMMSS = 'YYYYMMDDHHMMSS'
export const YYYYMMDDHHMMSSMS = 'YYYYMMDDHHMMSSMS'
export const REQ = 'REQ'
export const RES = 'RES'

const VIEW_DATE_FORMAT = {
  [GRID]: {
    [YYYYMMDD]: 'yyyy-MM-dd',
    [YYYYMMDDHHMM]: 'yyyy-MM-dd HH:mm',
    [YYYYMMDDHHMMSS]: 'yyyy-MM-dd HH:mm:ss',
    [YYYYMMDDHHMMSSMS]: 'yyyy-MM-dd HH:mm:ss.fff'
  },
  [DAYJS]: {
    [YYYYMMDD]: 'YYYY-MM-DD',
    [YYYYMMDDHHMM]: 'YYYY-MM-DD HH:mm',
    [YYYYMMDDHHMMSS]: 'YYYY-MM-DD HH:mm:ss',
    [YYYYMMDDHHMMSSMS]: 'YYYY-MM-DD HH:mm:ss.SSS'
  }
}

const HTTP_DATE_FORMAT = {
  [SPC]: {
    [REQ]: 'YYYYMMDDHHmmss',
    [RES]: 'YYYYMMDDHHmmss'
  },
  [MES]: {
    [REQ]: 'YYYYMMDDHHmmss',
    [RES]: 'YYYY-MM-DDTHH:mm:ss+SSS'
  }
}

export default {
  state: {
    httpTo: MES,
    viewDateFormat: VIEW_DATE_FORMAT,
    httpDateFormat: HTTP_DATE_FORMAT[MES]
  },
  getters: {
    // getViewFormat (state, { TYPE, FORMAT }) {
    //   return VIEW_DATE_FORMAT[TYPE][FORMAT]
    // },
    // getHttpDateFormat (state, { TYPE = state.httpTo, FORMAT }) {
    //   return HTTP_DATE_FORMAT[TYPE][FORMAT]
    // },
    // changeHttpDestination (state, payload) {
    //   state.httpTo = payload
    //   state.httpDate = HTTP_DATE_FORMAT[payload]
    // }
  },
  mutations: {

  },
  actions: {

  }
}
